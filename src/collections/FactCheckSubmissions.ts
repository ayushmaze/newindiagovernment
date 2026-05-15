import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

/**
 * FactCheckSubmissions — a queue of topics submitted to the Claude
 * fact-check agent. Each row tracks one agent run: input, status, the
 * resulting Article, and a log for debugging / audit.
 */
export const FactCheckSubmissions: CollectionConfig = {
  slug: 'fact-check-submissions',
  labels: { singular: 'Fact-Check Submission', plural: 'Fact-Check Submissions' },
  admin: {
    useAsTitle: 'topic',
    defaultColumns: ['topic', 'status', 'verdict', 'createdAt'],
    description:
      'Submit a topic or news claim. The Claude agent will research it, draft an article with inline verdicts, and queue it for human review before publish.',
  },
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'topic',
      type: 'textarea',
      required: true,
      maxLength: 1000,
      admin: {
        description:
          'A news topic, claim, or quote to fact-check. Be specific. Example: "PM said GDP growth hit 8.4% in Q3 FY26 — verify."',
      },
    },
    {
      name: 'angle',
      type: 'select',
      defaultValue: 'fact-check',
      options: [
        { label: 'Fact-check (default)', value: 'fact-check' },
        { label: 'Investigation', value: 'investigation' },
        { label: 'Policy analysis', value: 'policy' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'queued',
      options: [
        { label: 'Queued', value: 'queued' },
        { label: 'Running', value: 'running' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'verdict',
      type: 'select',
      options: ['true', 'mostly-true', 'mixed', 'misleading', 'false', 'unverifiable'],
      admin: { description: 'Mirror of the final article verdict for quick scanning.' },
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      admin: { description: 'The article produced by the agent run.' },
    },
    {
      name: 'errorMessage',
      type: 'textarea',
      admin: { description: 'Failure reason if status=failed.' },
    },
    {
      name: 'agentLog',
      type: 'json',
      admin: {
        description:
          'Per-step trace of agent tool calls (web_search, web_fetch, create_article, etc.) for audit.',
      },
    },
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create' && req.user) {
          return { ...data, submittedBy: req.user.id }
        }
        return data
      },
    ],
    afterChange: [
      async ({ req, doc, operation, previousDoc }) => {
        // Auto-fire agent when a new submission is created in queued state,
        // OR when status is manually flipped back to "queued" (re-run).
        const justQueued =
          (operation === 'create' && doc.status === 'queued') ||
          (operation === 'update' && doc.status === 'queued' && previousDoc?.status !== 'queued')

        if (!justQueued) return doc

        // Fire-and-forget — don't block the admin save.
        // The hook runs server-side; we import lazily to avoid bundling
        // the agent runner into the Payload admin client.
        ;(async () => {
          try {
            const { runFactCheck } = await import('../lib/factCheck/run.ts')
            // Mark running
            await req.payload.update({
              collection: 'fact-check-submissions',
              id: doc.id,
              data: { status: 'running' } as never,
            })
            const result = await runFactCheck({
              topic: String(doc.topic),
              submissionId: String(doc.id),
              payload: req.payload,
            })
            if (result.status === 'completed') {
              await req.payload.update({
                collection: 'fact-check-submissions',
                id: doc.id,
                data: {
                  status: 'completed',
                  verdict: result.verdict,
                  article: result.articleId,
                  agentLog: result.log,
                } as never,
              })
            } else {
              await req.payload.update({
                collection: 'fact-check-submissions',
                id: doc.id,
                data: {
                  status: 'failed',
                  errorMessage: result.errorMessage,
                  agentLog: result.log,
                } as never,
              })
            }
          } catch (e) {
            req.payload.logger.error(
              { err: e, submissionId: doc.id },
              'fact-check agent failed unexpectedly',
            )
            try {
              await req.payload.update({
                collection: 'fact-check-submissions',
                id: doc.id,
                data: {
                  status: 'failed',
                  errorMessage: e instanceof Error ? e.message : String(e),
                } as never,
              })
            } catch {
              /* swallow */
            }
          }
        })()

        return doc
      },
    ],
  },
}
