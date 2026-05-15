import type { CollectionConfig } from 'payload'
import { publicRead } from '../access/publicRead.ts'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'
import { revalidateAfterChange } from '../hooks/revalidateAfterChange.ts'
import { autoPublishOnApproval } from '../hooks/autoPublishOnApproval.ts'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'factCheckVerdict', 'reviewStatus', 'status', 'publishedAt'],
    description:
      'Articles published on The New India Government. Use the tabs below to switch between Content, Fact-Check structure, and AI/workflow metadata.',
    listSearchableFields: ['title', 'excerpt', 'slug'],
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  versions: {
    drafts: { autosave: true },
  },
  hooks: {
    beforeChange: [autoPublishOnApproval],
    afterChange: [revalidateAfterChange('article')],
  },
  fields: [
    // ============================================================
    // TABS — these are unnamed tabs, so the underlying data shape
    // stays flat (no breaking schema change for existing articles).
    // ============================================================
    {
      type: 'tabs',
      tabs: [
        // ---------------- 1. CONTENT ----------------
        {
          label: 'Content',
          description: 'Headline, hero image, body, byline. The shell every article needs.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              maxLength: 180,
              localized: true,
              admin: {
                description:
                  'Headline. Max 12 words. Make it falsifiable or a sharp question — not a slogan.',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: { description: 'kebab-case URL slug. Auto-generated from title if blank.' },
            },
            {
              name: 'kicker',
              type: 'text',
              maxLength: 60,
              localized: true,
              admin: {
                description:
                  'Short uppercase tag shown above the headline (e.g. FACT-CHECK · FALSE, INVESTIGATION, EXPLAINER).',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              maxLength: 320,
              localized: true,
              admin: {
                description:
                  'One-sentence dek that captures the verdict and the why. Shown on cards and as the page dek.',
              },
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media', required: false },
            {
              name: 'body',
              type: 'richText',
              localized: true,
              admin: {
                description:
                  'Long-form narrative. For fact-check articles this is the editor narrative — the structured columns live in the Fact-Check Layout tab.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'categories',
                  required: true,
                  admin: { width: '34%' },
                },
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'authors',
                  required: true,
                  admin: { width: '33%' },
                },
                {
                  name: 'tags',
                  type: 'relationship',
                  relationTo: 'tags',
                  hasMany: true,
                  admin: { width: '33%' },
                },
              ],
            },
            {
              name: 'sources',
              type: 'array',
              labels: { singular: 'Source', plural: 'Sources' },
              admin: {
                description:
                  'Every URL used across the article (de-duplicated). Shown publicly at the end of the page.',
                initCollapsed: true,
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'placement',
                  type: 'select',
                  defaultValue: 'feed',
                  options: ['feed', 'homepage-left', 'homepage-right', 'homepage-hero'],
                  admin: { width: '34%' },
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    width: '33%',
                    description: 'Pin to homepage hero band.',
                  },
                },
                {
                  name: 'publishedAt',
                  type: 'date',
                  admin: { width: '33%' },
                },
              ],
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: ['draft', 'published', 'archived'],
              admin: {
                description:
                  'PUBLIC visibility gate. Only "published" articles appear on the site. AI drafts stay "draft" until the Review status (next tab) is set to "Reviewed — approved" — that flips this to published automatically.',
                position: 'sidebar',
              },
            },
          ],
        },

        // ---------------- 2. FACT-CHECK LAYOUT ----------------
        {
          label: 'Fact-Check Layout',
          description:
            'Structured columns that render as the magazine layout: claim-vs-truth, what is right / wrong, timeline, receipts, impact, what can be done. Optional for non-fact-check articles.',
          fields: [
            {
              name: 'factCheckVerdict',
              type: 'select',
              options: [
                { label: 'True', value: 'true' },
                { label: 'Mostly True', value: 'mostly-true' },
                { label: 'Mixed', value: 'mixed' },
                { label: 'Misleading', value: 'misleading' },
                { label: 'False', value: 'false' },
                { label: 'Unverifiable', value: 'unverifiable' },
              ],
              admin: {
                description:
                  'Overall verdict on the topic. Drives the colour-coded verdict hero at the top of the article.',
              },
            },
            {
              name: 'credibilityScore',
              type: 'number',
              min: 0,
              max: 10,
              admin: {
                description:
                  '0 = fully misleading, 10 = fully accurate. Shows in the ticker. true→10, mostly-true→8, mixed→5, misleading→3, false→1.',
              },
            },
            {
              name: 'claimVsTruth',
              type: 'array',
              labels: { singular: 'Claim vs Truth', plural: 'Claim vs Truth pairs' },
              admin: {
                description:
                  'Side-by-side: the original claim vs what the evidence actually shows. Renders as the centrepiece "Claim vs Reality" panel.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'claim',
                  type: 'textarea',
                  required: true,
                  admin: { description: 'Verbatim or near-verbatim quote of the claim being checked.' },
                },
                {
                  name: 'claimSource',
                  type: 'text',
                  admin: { description: 'Who said it / where (e.g., "PM speech, 14 Mar 2026").' },
                },
                {
                  name: 'truth',
                  type: 'textarea',
                  required: true,
                  admin: { description: 'What the evidence shows. Plain, direct, one short paragraph.' },
                },
                {
                  name: 'truthSources',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'whatIsRight',
                  type: 'array',
                  labels: { singular: 'Right point', plural: 'What is right' },
                  admin: {
                    width: '50%',
                    description:
                      'Points where the claim or framing is actually supported by evidence. Renders as the green column.',
                    initCollapsed: true,
                  },
                  fields: [
                    { name: 'point', type: 'text', required: true, maxLength: 200 },
                    { name: 'detail', type: 'textarea', required: true },
                    {
                      name: 'sources',
                      type: 'array',
                      fields: [
                        { name: 'label', type: 'text', required: true },
                        { name: 'url', type: 'text', required: true },
                      ],
                    },
                  ],
                },
                {
                  name: 'whatIsWrong',
                  type: 'array',
                  labels: { singular: 'Wrong point', plural: 'What is wrong' },
                  admin: {
                    width: '50%',
                    description:
                      'Points that are false, misleading, or unsupported. Renders as the red column.',
                    initCollapsed: true,
                  },
                  fields: [
                    { name: 'point', type: 'text', required: true, maxLength: 200 },
                    { name: 'detail', type: 'textarea', required: true },
                    {
                      name: 'sources',
                      type: 'array',
                      fields: [
                        { name: 'label', type: 'text', required: true },
                        { name: 'url', type: 'text', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'timeline',
              type: 'array',
              labels: { singular: 'Timeline entry', plural: 'Timeline' },
              admin: {
                description:
                  'Chronological events that frame the story. Renders as a vertical timeline rail.',
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'date',
                      type: 'text',
                      required: true,
                      admin: { width: '30%', description: 'e.g., "14 Mar 2026" or "Q3 FY26".' },
                    },
                    {
                      name: 'event',
                      type: 'text',
                      required: true,
                      maxLength: 240,
                      admin: { width: '70%' },
                    },
                  ],
                },
                { name: 'sourceLabel', type: 'text' },
                { name: 'sourceUrl', type: 'text' },
              ],
            },
            {
              name: 'receipts',
              type: 'array',
              labels: { singular: 'Receipt', plural: 'Receipts' },
              admin: {
                description:
                  'Direct evidence cards — a screenshot, a quote, an official number. Rendered as photo-card receipts inline.',
                initCollapsed: true,
              },
              fields: [
                { name: 'label', type: 'text', required: true, maxLength: 100 },
                {
                  name: 'kind',
                  type: 'select',
                  defaultValue: 'quote',
                  options: [
                    { label: 'Direct quote', value: 'quote' },
                    { label: 'Statistic / number', value: 'stat' },
                    { label: 'Document excerpt', value: 'document' },
                    { label: 'Screenshot / image', value: 'screenshot' },
                  ],
                },
                {
                  name: 'content',
                  type: 'textarea',
                  required: true,
                  admin: { description: 'The quote, number, or excerpt itself.' },
                },
                { name: 'sourceLabel', type: 'text' },
                { name: 'sourceUrl', type: 'text' },
              ],
            },
            {
              name: 'impact',
              type: 'group',
              admin: {
                description: 'Why this matters — the human and policy stakes.',
              },
              fields: [
                {
                  name: 'summary',
                  type: 'textarea',
                  admin: { description: 'One-paragraph lede on the stakes.' },
                },
                {
                  name: 'whoIsAffected',
                  type: 'array',
                  fields: [
                    { name: 'group', type: 'text', required: true, maxLength: 80 },
                    { name: 'how', type: 'textarea', required: true },
                  ],
                },
                {
                  name: 'shortTerm',
                  type: 'textarea',
                  admin: { description: 'What happens in the next weeks / months.' },
                },
                {
                  name: 'longTerm',
                  type: 'textarea',
                  admin: { description: 'Structural / multi-year consequences.' },
                },
              ],
            },
            {
              name: 'whatCanBeDone',
              type: 'group',
              admin: {
                description:
                  'Actionable closing block. The "what now" the reader walks away with.',
              },
              fields: [
                {
                  name: 'citizenAction',
                  type: 'textarea',
                  admin: { description: 'What an ordinary citizen / reader can do today.' },
                },
                {
                  name: 'policyAsk',
                  type: 'textarea',
                  admin: { description: 'What lawmakers / regulators should do.' },
                },
                {
                  name: 'ourAsk',
                  type: 'textarea',
                  admin: {
                    description:
                      'The site\'s editorial ask — petition, FOI / RTI to file, official to write to.',
                  },
                },
                {
                  name: 'callToActionLabel',
                  type: 'text',
                  maxLength: 80,
                  admin: { description: 'Button text (e.g., "Sign the RTI petition").' },
                },
                {
                  name: 'callToActionUrl',
                  type: 'text',
                  admin: { description: 'Where the button points.' },
                },
              ],
            },
            {
              name: 'factCheckClaims',
              type: 'array',
              labels: { singular: 'Atomic claim', plural: 'Atomic claims (full reasoning)' },
              admin: {
                description:
                  'Per-claim verdicts and reasoning — the full audit trail. Rendered as the "Claim ledger" appendix at the foot of the article.',
                initCollapsed: true,
              },
              fields: [
                { name: 'claim', type: 'textarea', required: true },
                {
                  name: 'verdict',
                  type: 'select',
                  required: true,
                  options: ['true', 'mostly-true', 'mixed', 'misleading', 'false', 'unverifiable'],
                },
                { name: 'reasoning', type: 'textarea' },
                {
                  name: 'confidence',
                  type: 'select',
                  options: ['low', 'medium', 'high'],
                },
                {
                  name: 'sources',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                    { name: 'quote', type: 'textarea' },
                  ],
                },
              ],
            },
          ],
        },

        // ---------------- 3. AI / WORKFLOW ----------------
        {
          label: 'AI & Workflow',
          description: 'Origin of the article and editorial review state.',
          fields: [
            {
              name: 'generatedBy',
              type: 'select',
              defaultValue: 'human',
              options: [
                { label: 'Human author', value: 'human' },
                { label: 'Claude fact-check agent', value: 'claude-fact-check' },
              ],
              admin: {
                description:
                  'Origin of the article. AI articles need human review before they can go live.',
              },
            },
            {
              name: 'reviewStatus',
              type: 'select',
              defaultValue: 'not-required',
              options: [
                { label: 'Not required (human-authored)', value: 'not-required' },
                { label: 'Review pending (AI draft)', value: 'review-pending' },
                { label: 'Reviewed — approved (auto-publishes)', value: 'reviewed-approved' },
                { label: 'Reviewed — rejected', value: 'reviewed-rejected' },
              ],
              admin: {
                description:
                  'Editorial gate for AI drafts. Setting this to "Reviewed — approved" automatically flips the Status (Content tab) to "published" and stamps publishedAt — no second click needed.',
              },
            },
            {
              name: 'factCheckRunMeta',
              type: 'group',
              admin: {
                description: 'Diagnostic metadata from the AI fact-check run. Read-only for editors.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'submissionId', type: 'text', admin: { width: '50%' } },
                    { name: 'model', type: 'text', admin: { width: '50%' } },
                  ],
                },
                { name: 'inputTopic', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'completedAt', type: 'date', admin: { width: '33%' } },
                    { name: 'durationMs', type: 'number', admin: { width: '33%' } },
                    { name: 'toolCallCount', type: 'number', admin: { width: '34%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'inputTokens', type: 'number', admin: { width: '33%' } },
                    { name: 'outputTokens', type: 'number', admin: { width: '33%' } },
                    { name: 'cacheReadTokens', type: 'number', admin: { width: '34%' } },
                  ],
                },
              ],
            },
          ],
        },

        // ---------------- 4. SEO ----------------
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                { name: 'metaTitle', type: 'text', localized: true },
                { name: 'metaDescription', type: 'textarea', localized: true },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
