import type Anthropic from '@anthropic-ai/sdk'

/**
 * Tool catalogue for the fact-check agent.
 *
 * - `web_search_20250305` and `web_fetch_20250910` are Anthropic-hosted
 *   server-side tools. They run on Anthropic's infrastructure — we don't
 *   implement them, we just declare them.
 * - `create_article` is our custom tool. The agent calls it once at the
 *   end with the finished article + verdict; we persist to Payload.
 * - `find_stock_image` is a custom tool that resolves topical imagery
 *   via Unsplash (free, attributed) and returns a Media-friendly URL.
 */
export const factCheckTools: Anthropic.MessageCreateParams['tools'] = [
  // ----- Anthropic-hosted server tools -----
  {
    type: 'web_search_20250305',
    name: 'web_search',
    max_uses: 12,
    allowed_domains: undefined,
    user_location: { type: 'approximate', country: 'IN', timezone: 'Asia/Kolkata' },
  } as unknown as Anthropic.Messages.ToolUnion,
  {
    type: 'web_fetch_20250910',
    name: 'web_fetch',
    max_uses: 10,
    citations: { enabled: true },
  } as unknown as Anthropic.Messages.ToolUnion,

  // ----- Custom tools -----
  {
    name: 'find_stock_image',
    description:
      'Finds a free, attributable stock photograph matching a query. Use for hero imagery only when no primary image source exists. Returns a URL + photographer credit. Always prefer official press-release images when fact-checking government claims.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Plain English subject — e.g., "Indian parliament", "Mumbai monsoon flooding", "RBI building".',
        },
        orientation: {
          type: 'string',
          enum: ['landscape', 'portrait', 'squarish'],
          default: 'landscape',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'create_article',
    description:
      "Publish the finished fact-check article to the CMS. CALL THIS EXACTLY ONCE per submission, after all research and verdict reasoning is complete. The article is saved as a draft with reviewStatus=review-pending so an editor can approve before public publish.",
    input_schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          maxLength: 180,
          description: 'Headline — falsifiable statement or sharp question. Max 12 words.',
        },
        kicker: {
          type: 'string',
          maxLength: 60,
          description: 'Short uppercase tag — usually "FACT-CHECK".',
        },
        excerpt: {
          type: 'string',
          maxLength: 320,
          description: 'One-sentence dek that summarises the verdict and what the article shows.',
        },
        bodyMarkdown: {
          type: 'string',
          description:
            'Full article in markdown. Sections: What\'s the claim?, What we found (with inline links), Verdict, Sources.',
        },
        verdict: {
          type: 'string',
          enum: ['true', 'mostly-true', 'mixed', 'misleading', 'false', 'unverifiable'],
          description: 'Overall verdict — most severe verdict applying to a load-bearing claim.',
        },
        credibilityScore: {
          type: 'integer',
          minimum: 0,
          maximum: 10,
          description: '0 = fully misleading, 10 = fully accurate. Shown in the ticker. Map verdict to score: true→10, mostly-true→8, mixed→5, misleading→3, false→1, unverifiable→null (omit).',
        },
        claims: {
          type: 'array',
          minItems: 1,
          description: 'Atomic claims surfaced from the topic and adjudicated individually.',
          items: {
            type: 'object',
            properties: {
              claim: { type: 'string' },
              verdict: {
                type: 'string',
                enum: ['true', 'mostly-true', 'mixed', 'misleading', 'false', 'unverifiable'],
              },
              reasoning: { type: 'string', description: 'Why this verdict — cite the evidence in prose.' },
              confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
              sources: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  properties: {
                    label: { type: 'string', description: 'Outlet or document name.' },
                    url: { type: 'string', description: 'URL you actually fetched.' },
                    quote: { type: 'string', description: 'Optional 1–2 sentence direct quote.' },
                  },
                  required: ['label', 'url'],
                },
              },
            },
            required: ['claim', 'verdict', 'reasoning', 'sources'],
          },
        },
        sources: {
          type: 'array',
          minItems: 4,
          description: 'All sources used across the article (de-duplicated).',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              url: { type: 'string' },
            },
            required: ['label', 'url'],
          },
        },
        heroImageQuery: {
          type: 'string',
          description: 'Optional. Subject for find_stock_image to source hero imagery. Omit if you already have a primary-source image URL.',
        },
        heroImageUrl: {
          type: 'string',
          description: 'Optional. If you already resolved an image (e.g., via find_stock_image), pass the URL here.',
        },
        heroImageCredit: {
          type: 'string',
          description: 'Required if heroImageUrl is set — photographer + outlet attribution.',
        },
        suggestedTags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Lowercase topic tags — e.g., ["economy", "rbi", "gdp"].',
        },

        // ---- Magazine-layout structured sections ----
        claimVsTruth: {
          type: 'array',
          minItems: 1,
          description:
            'Side-by-side claim vs reality pairs. Required for fact-check articles — drives the centrepiece panel. 2–5 entries.',
          items: {
            type: 'object',
            properties: {
              claim: { type: 'string', description: 'Verbatim or near-verbatim claim text.' },
              claimSource: { type: 'string', description: 'Who said it / where (speech, tweet, doc).' },
              truth: { type: 'string', description: 'What evidence actually shows. Short, direct.' },
              truthSources: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    label: { type: 'string' },
                    url: { type: 'string' },
                  },
                  required: ['label', 'url'],
                },
              },
            },
            required: ['claim', 'truth'],
          },
        },
        whatIsRight: {
          type: 'array',
          description:
            'Points where the claim/framing IS supported by evidence. Renders as the green column. Include even for false verdicts — show the kernel of truth.',
          items: {
            type: 'object',
            properties: {
              point: { type: 'string', description: 'Short headline (≤200 chars).' },
              detail: { type: 'string', description: 'One paragraph of evidence.' },
              sources: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    label: { type: 'string' },
                    url: { type: 'string' },
                  },
                  required: ['label', 'url'],
                },
              },
            },
            required: ['point', 'detail'],
          },
        },
        whatIsWrong: {
          type: 'array',
          description:
            'Points that are false, misleading, or unsupported. Renders as the red column.',
          items: {
            type: 'object',
            properties: {
              point: { type: 'string', description: 'Short headline (≤200 chars).' },
              detail: { type: 'string', description: 'One paragraph of evidence.' },
              sources: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    label: { type: 'string' },
                    url: { type: 'string' },
                  },
                  required: ['label', 'url'],
                },
              },
            },
            required: ['point', 'detail'],
          },
        },
        timeline: {
          type: 'array',
          description:
            'Chronological key events that frame the story. 3–8 entries. Renders as the timeline rail.',
          items: {
            type: 'object',
            properties: {
              date: { type: 'string', description: 'e.g., "14 Mar 2026" or "Q3 FY26".' },
              event: { type: 'string', description: 'One-sentence summary (≤240 chars).' },
              sourceLabel: { type: 'string' },
              sourceUrl: { type: 'string' },
            },
            required: ['date', 'event'],
          },
        },
        receipts: {
          type: 'array',
          description:
            'Direct evidence cards — verbatim quotes, official numbers, document excerpts. 2–6 entries. Renders inline as photo-card receipts.',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string', description: 'Short title (≤100 chars).' },
              kind: {
                type: 'string',
                enum: ['quote', 'stat', 'document', 'screenshot'],
                default: 'quote',
              },
              content: { type: 'string', description: 'The quote, number, or excerpt itself.' },
              sourceLabel: { type: 'string' },
              sourceUrl: { type: 'string' },
            },
            required: ['label', 'content'],
          },
        },
        impact: {
          type: 'object',
          description: 'Why this matters — human + policy stakes.',
          properties: {
            summary: { type: 'string', description: 'One-paragraph lede on the stakes.' },
            whoIsAffected: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  group: { type: 'string', description: 'e.g., "Farmers in Punjab".' },
                  how: { type: 'string' },
                },
                required: ['group', 'how'],
              },
            },
            shortTerm: { type: 'string', description: 'Weeks-to-months effect.' },
            longTerm: { type: 'string', description: 'Multi-year / structural effect.' },
          },
        },
        whatCanBeDone: {
          type: 'object',
          description:
            'Actionable closing block. Always include at least one of citizenAction / policyAsk / ourAsk.',
          properties: {
            citizenAction: { type: 'string', description: 'What a reader can do today.' },
            policyAsk: { type: 'string', description: 'What lawmakers / regulators should do.' },
            ourAsk: {
              type: 'string',
              description:
                'The editorial ask — petition to sign, FOI / RTI to file, official to write to.',
            },
            callToActionLabel: { type: 'string', description: 'Button text (≤80 chars).' },
            callToActionUrl: { type: 'string' },
          },
        },
      },
      required: [
        'title',
        'excerpt',
        'bodyMarkdown',
        'verdict',
        'claims',
        'sources',
        'claimVsTruth',
      ],
    },
  },
]
