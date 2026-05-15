import type { GlobalConfig, Field, FieldHook } from 'payload'

/**
 * Integrations — the single admin dashboard for every external service the
 * platform talks to.
 *
 * Design
 * ------
 * • One place for every API key, secret, webhook, SMTP setting.
 * • Each field acts as a runtime override over its matching env var.
 *   `lib/integrations.ts#getIntegration` reads global → env → undefined.
 * • Secret fields preserve their value if an admin submits the form with
 *   the field left blank (so they don't have to retype the secret to save
 *   unrelated changes).
 * • Six themed tabs: AI · Email · Security · Hosting · Webhooks · Status.
 *
 * Access (per current instruction): OPEN to any authenticated user.
 */

// ─── field-level helpers ────────────────────────────────────────────────────

/** beforeChange hook: keep existing value if submitter sent empty string. */
const preserveIfBlank: FieldHook = ({ value, originalDoc, field }) => {
  if (value === '' || value === null || value === undefined) {
    const existing = (originalDoc as Record<string, unknown> | undefined)?.[field.name as string]
    return existing
  }
  return value
}

const secretField = (
  name: string,
  label: string,
  envVar: string,
  hint?: string,
): Field => ({
  name,
  label,
  type: 'text',
  hooks: { beforeChange: [preserveIfBlank] },
  admin: {
    description: [
      hint,
      `Stored secret. Leave blank to keep the current value.`,
      `Env fallback: \`${envVar}\`.`,
    ]
      .filter(Boolean)
      .join(' · '),
    placeholder: '••••••••  (leave blank to keep current)',
  },
})

const plainField = (
  name: string,
  label: string,
  envVar?: string,
  hint?: string,
): Field => ({
  name,
  label,
  type: 'text',
  admin: {
    description: [hint, envVar ? `Env fallback: \`${envVar}\`.` : null]
      .filter(Boolean)
      .join(' · '),
  },
})

// ─── tabs ───────────────────────────────────────────────────────────────────

const aiTab = {
  label: 'AI & Agents',
  description:
    'Anthropic, the fact-check pipeline, and image lookup. The Claude Code subscription flow only needs the Fact-Check Ingest Secret — everything else is optional.',
  fields: [
    {
      type: 'collapsible' as const,
      label: 'Anthropic (server-side fact-check)',
      admin: {
        description:
          "Required only for the server-side fact-check route at `/api/agents/fact-check`. The `/factcheck` Claude Code slash command (which is what you're using) does NOT need this.",
        initCollapsed: true,
      },
      fields: [
        secretField('anthropicApiKey', 'Anthropic API key', 'ANTHROPIC_API_KEY'),
        {
          name: 'anthropicModel',
          label: 'Default model',
          type: 'select' as const,
          defaultValue: 'claude-opus-4-7',
          options: [
            { label: 'Claude Opus 4.7 (most capable)', value: 'claude-opus-4-7' },
            { label: 'Claude Sonnet 4.6 (faster, cheaper)', value: 'claude-sonnet-4-6' },
            { label: 'Claude Haiku 4.5 (cheapest)', value: 'claude-haiku-4-5' },
          ],
        },
      ],
    },
    {
      type: 'collapsible' as const,
      label: 'Fact-check ingest',
      admin: {
        description:
          'The `/factcheck` Claude Code slash command POSTs draft articles to this site. The secret below is the `X-Ingest-Secret` header it must send. Rotate by entering a new value — the slash command picks it up on next run.',
      },
      fields: [
        secretField(
          'factCheckIngestSecret',
          'Fact-check ingest secret',
          'FACT_CHECK_INGEST_SECRET',
          'Used by the `/factcheck` Claude Code slash command to POST draft articles.',
        ),
      ],
    },
    {
      type: 'collapsible' as const,
      label: 'Unsplash (hero images)',
      admin: {
        description: 'Optional — used by the fact-check pipeline to auto-pick a hero image.',
        initCollapsed: true,
      },
      fields: [
        secretField('unsplashAccessKey', 'Unsplash access key', 'UNSPLASH_ACCESS_KEY'),
      ],
    },
  ],
}

const emailTab = {
  label: 'Email',
  description:
    "SMTP credentials for admin password resets, vote receipts, and newsletter dispatch. Skip if you don't need transactional email yet.",
  fields: [
    {
      type: 'collapsible' as const,
      label: 'SMTP',
      fields: [
        {
          type: 'row' as const,
          fields: [
            {
              ...plainField('smtpHost', 'SMTP host', 'SMTP_HOST'),
              admin: { description: 'Falls back to env `SMTP_HOST`.', width: '60%' },
            } as Field,
            {
              name: 'smtpPort',
              label: 'Port',
              type: 'number' as const,
              defaultValue: 587,
              admin: { width: '40%', description: 'Falls back to env `SMTP_PORT`.' },
            },
          ],
        },
        {
          type: 'row' as const,
          fields: [
            {
              ...plainField('smtpUser', 'Username', 'SMTP_USER'),
              admin: { description: 'Falls back to env `SMTP_USER`.', width: '50%' },
            } as Field,
            {
              ...secretField('smtpPassword', 'Password', 'SMTP_PASSWORD'),
              admin: {
                ...(secretField('smtpPassword', 'Password', 'SMTP_PASSWORD').admin ?? {}),
                width: '50%',
              },
            } as Field,
          ],
        },
        plainField(
          'smtpFrom',
          'From address',
          'SMTP_FROM',
          'Example: `The New India Government <noreply@newindiagovernment.com>`',
        ),
      ],
    },
    {
      type: 'collapsible' as const,
      label: 'Resend (alternative — recommended)',
      admin: {
        description:
          'If you set a Resend API key, the app prefers Resend over SMTP. Resend offers 100 emails/day free.',
        initCollapsed: true,
      },
      fields: [secretField('resendApiKey', 'Resend API key', 'RESEND_API_KEY')],
    },
  ],
}

const securityTab = {
  label: 'Security',
  description:
    'CAPTCHA keys, vote anti-fraud salt, and the secret used by the on-demand revalidation endpoint. Treat every value here as production-critical.',
  fields: [
    {
      type: 'collapsible' as const,
      label: 'Cloudflare Turnstile (CAPTCHA)',
      admin: {
        description:
          "The vote widget and petition forms use Turnstile to block bots. Currently using Cloudflare's TEST keys — they accept everyone. Add real keys before launch.",
      },
      fields: [
        plainField(
          'turnstileSiteKey',
          'Site key (public)',
          'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
          'Public, safe to expose. From Cloudflare → Turnstile → Add site.',
        ),
        secretField(
          'turnstileSecretKey',
          'Secret key',
          'TURNSTILE_SECRET_KEY',
          'Server-side verification token.',
        ),
      ],
    },
    {
      type: 'collapsible' as const,
      label: 'Vote anti-fraud',
      admin: {
        description:
          'Hashed with IP+UA to dedupe votes without storing PII. Changing this resets the dedupe window.',
        initCollapsed: true,
      },
      fields: [secretField('voteSalt', 'Vote salt', 'VOTE_SALT')],
    },
    {
      type: 'collapsible' as const,
      label: 'On-demand revalidation',
      admin: {
        description:
          'Required as `?secret=` on `POST /api/revalidate` — bypasses the ISR cache for a tag or path.',
        initCollapsed: true,
      },
      fields: [
        secretField('revalidateSecret', 'Revalidate secret', 'REVALIDATE_SECRET'),
      ],
    },
  ],
}

const hostingTab = {
  label: 'Hosting',
  description:
    "Where this site lives. Editing these values doesn't move the site — they're labels surfaced elsewhere in admin.",
  fields: [
    plainField('siteUrl', 'Site URL', 'NEXT_PUBLIC_SITE_URL'),
    plainField('payloadServerUrl', 'Payload server URL', 'PAYLOAD_PUBLIC_SERVER_URL'),
    {
      type: 'row' as const,
      fields: [
        {
          name: 'hostingProvider',
          label: 'Provider',
          type: 'select' as const,
          options: [
            { label: 'Render', value: 'render' },
            { label: 'Vercel', value: 'vercel' },
            { label: 'Fly.io', value: 'fly' },
            { label: 'Self-hosted', value: 'self' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'render',
          admin: { width: '50%' },
        },
        {
          name: 'hostingRegion',
          label: 'Region',
          type: 'text' as const,
          admin: { width: '50%', description: 'e.g. Singapore, Frankfurt, Oregon' },
        },
      ],
    },
    {
      type: 'row' as const,
      fields: [
        {
          name: 'gitSha',
          label: 'Git SHA (last deploy)',
          type: 'text' as const,
          admin: {
            width: '50%',
            description: 'Set by CI on each deploy.',
            readOnly: true,
          },
        },
        {
          name: 'lastDeployedAt',
          label: 'Last deployed at',
          type: 'date' as const,
          admin: {
            width: '50%',
            readOnly: true,
            date: { pickerAppearance: 'dayAndTime' as const },
          },
        },
      ],
    },
  ],
}

const webhooksTab = {
  label: 'Webhooks',
  description:
    'Outbound webhooks fired by the app. Toggle `enabled` off to pause without deleting.',
  fields: [
    {
      name: 'webhooks',
      label: 'Outbound webhooks',
      type: 'array' as const,
      admin: {
        description:
          'POST to `url` when `event` fires. Body is JSON; `X-Signature` is HMAC-SHA256 of the body with `signingSecret`.',
      },
      fields: [
        {
          type: 'row' as const,
          fields: [
            { name: 'name', type: 'text' as const, required: true, admin: { width: '40%' } },
            {
              name: 'event',
              type: 'select' as const,
              required: true,
              defaultValue: 'article.published',
              options: [
                { label: 'Article published', value: 'article.published' },
                { label: 'Petition signed', value: 'petition.signed' },
                { label: 'Vote cast', value: 'vote.cast' },
                { label: 'Fact-check approved', value: 'factcheck.approved' },
                { label: 'Newsletter signup', value: 'newsletter.subscribed' },
              ],
              admin: { width: '40%' },
            },
            {
              name: 'enabled',
              type: 'checkbox' as const,
              defaultValue: true,
              admin: { width: '20%' },
            },
          ],
        },
        { name: 'url', type: 'text' as const, required: true },
        secretField('signingSecret', 'Signing secret', '—', 'HMAC-SHA256 key.'),
        {
          type: 'row' as const,
          fields: [
            {
              name: 'lastFiredAt',
              type: 'date' as const,
              admin: {
                width: '50%',
                readOnly: true,
                date: { pickerAppearance: 'dayAndTime' as const },
              },
            },
            {
              name: 'lastStatus',
              type: 'text' as const,
              admin: {
                width: '50%',
                readOnly: true,
                description: 'HTTP status of last attempt.',
              },
            },
          ],
        },
      ],
    },
  ],
}

const statusTab = {
  label: 'Status',
  description:
    'Quick view of what is configured. Each item below is configured if its value (here OR in env) is non-empty.',
  fields: [
    {
      name: 'statusNote',
      type: 'textarea' as const,
      defaultValue:
        "Wire-up checklist:\n\n☐ Anthropic API key  →  AI tab\n☐ Fact-check ingest secret  →  AI tab (REQUIRED for /factcheck slash command)\n☐ Resend or SMTP password  →  Email tab\n☐ Real Turnstile keys  →  Security tab (currently TEST keys)\n☐ Revalidate secret  →  Security tab\n☐ Vote salt  →  Security tab\n\nUse the 'Hosting' tab to record where this site is deployed.\nUse the 'Webhooks' tab to fan out events to Slack/Discord/etc.",
      admin: {
        readOnly: true,
        rows: 12,
        description: 'Static reference. The configured state of each item is enforced at runtime.',
      },
    },
  ],
}

// ─── global ─────────────────────────────────────────────────────────────────
export const Integrations: GlobalConfig = {
  slug: 'integrations',
  label: 'Integrations',
  admin: {
    group: 'Admin',
    description:
      'API keys, secrets, webhooks, and SMTP for every external service. Values here override the same-name env vars at runtime.',
  },
  access: {
    // OPEN per current instruction — any authenticated CMS user.
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [aiTab, emailTab, securityTab, hostingTab, webhooksTab, statusTab],
    },
  ],
}
