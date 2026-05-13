/**
 * Idempotent seed script.
 * Run: pnpm seed
 * Creates demo content if it doesn't exist.
 */

import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

// Load env vars before importing payload config
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.env.DATABASE_URI ??= 'postgres://payload:payload@localhost:5432/payload'
process.env.PAYLOAD_SECRET ??= 'seed-secret-change-this-in-production-please'
process.env.PAYLOAD_PUBLIC_SERVER_URL ??= 'http://localhost:3000'

import { getPayload } from 'payload'
import config from '../payload.config.ts'

const log = (msg: string) => console.log(`[seed] ${msg}`)

async function seed() {
  const payload = await getPayload({ config })

  log('Starting idempotent seed...')

  // ─── Users ─────────────────────────────────────────────────────────────────
  log('Seeding users...')

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@thenewindiagov.test'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe!2026'
  const coworkEmail = process.env.SEED_COWORK_EMAIL ?? 'cowork@thenewindiagov.test'

  let adminUser
  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (existingAdmin.docs.length === 0) {
    adminUser = await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      },
    })
    log(`Created admin: ${adminEmail}`)
  } else {
    adminUser = existingAdmin.docs[0]
    log(`Admin exists: ${adminEmail}`)
  }

  let coworkUser
  const existingCowork = await payload.find({
    collection: 'users',
    where: { email: { equals: coworkEmail } },
    limit: 1,
  })
  if (existingCowork.docs.length === 0) {
    coworkUser = await payload.create({
      collection: 'users',
      data: {
        email: coworkEmail,
        password: 'Cowork!2026SecurePassword',
        role: 'cowork',
      },
    })
    log(`Created cowork user: ${coworkEmail}`)
  } else {
    coworkUser = existingCowork.docs[0]
    log(`Cowork user exists: ${coworkEmail}`)
  }

  // Create editor and moderator
  for (const u of [
    { email: 'editor@thenewindiagov.test', role: 'editor' as const },
    { email: 'moderator@thenewindiagov.test', role: 'moderator' as const },
  ]) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: u.email } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: { email: u.email, password: 'ChangeMe!2026', role: u.role },
      })
      log(`Created ${u.role}: ${u.email}`)
    }
  }

  // ─── Categories ────────────────────────────────────────────────────────────
  log('Seeding categories...')
  const categoryDefs = [
    { name: 'Fact-Check', slug: 'fact-check', description: 'Debunking government claims with evidence.' },
    { name: 'Policy', slug: 'policy', description: 'Analysis of government policy and its impact.' },
    { name: 'Elections', slug: 'elections', description: 'Coverage of electoral process and data.' },
    { name: 'Leaders', slug: 'leaders', description: 'Profiles and track records of political leaders.' },
    { name: 'Investigations', slug: 'investigations', description: 'In-depth investigative journalism.' },
    { name: 'Opinion', slug: 'opinion', description: 'Informed citizen perspectives.' },
  ]

  const categoryIds: Record<string, string> = {}
  for (const cat of categoryDefs) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'categories', data: cat })
      categoryIds[cat.slug] = created.id as string
      log(`Created category: ${cat.name}`)
    } else {
      categoryIds[cat.slug] = existing.docs[0].id as string
    }
  }

  // ─── Authors ───────────────────────────────────────────────────────────────
  log('Seeding authors...')
  const authorDefs = [
    { name: 'Priya Sharma', slug: 'priya-sharma', bio: 'Senior investigative journalist. 12 years covering Indian politics.', email: 'priya@thenewindiagov.test', twitter: '@priyasharma' },
    { name: 'Rahul Menon', slug: 'rahul-menon', bio: 'Data journalist specializing in economic fact-checking.', email: 'rahul@thenewindiagov.test', twitter: '@rahulmenon' },
    { name: 'Ananya Krishnan', slug: 'ananya-krishnan', bio: 'Policy analyst and former civil servant.', email: 'ananya@thenewindiagov.test' },
    { name: 'Vikram Joshi', slug: 'vikram-joshi', bio: 'Electoral data specialist. Covers elections across India.', email: 'vikram@thenewindiagov.test' },
  ]

  const authorIds: Record<string, string> = {}
  for (const a of authorDefs) {
    const existing = await payload.find({
      collection: 'authors',
      where: { slug: { equals: a.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'authors', data: a })
      authorIds[a.slug] = created.id as string
      log(`Created author: ${a.name}`)
    } else {
      authorIds[a.slug] = existing.docs[0].id as string
    }
  }

  // ─── Tags ──────────────────────────────────────────────────────────────────
  log('Seeding tags...')
  const tagDefs = [
    { name: 'GDP', slug: 'gdp' },
    { name: 'Modi', slug: 'modi' },
    { name: 'Economy', slug: 'economy' },
    { name: 'Education', slug: 'education' },
    { name: 'Health', slug: 'health' },
    { name: 'Environment', slug: 'environment' },
  ]
  const tagIds: Record<string, string> = {}
  for (const t of tagDefs) {
    const existing = await payload.find({
      collection: 'tags',
      where: { slug: { equals: t.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'tags', data: t })
      tagIds[t.slug] = created.id as string
    } else {
      tagIds[t.slug] = existing.docs[0].id as string
    }
  }

  // ─── Ticker Items ──────────────────────────────────────────────────────────
  log('Seeding ticker items...')
  const tickerDefs = [
    { claim: 'India is the fastest growing major economy', verdict: 'mixed', credibilityScore: 5.2, active: true, order: 1 },
    { claim: 'GDP growth rate of 8.4% in Q3 2024', verdict: 'misleading', credibilityScore: 3.1, active: true, order: 2 },
    { claim: '140 million jobs created in 3 years', verdict: 'false', credibilityScore: 1.4, active: true, order: 3 },
    { claim: 'India now a $3.7 trillion economy', verdict: 'true', credibilityScore: 8.6, active: true, order: 4 },
    { claim: 'Unemployment at lowest in 45 years', verdict: 'mostly-false', credibilityScore: 2.8, active: true, order: 5 },
    { claim: 'Inflation controlled at 4.9%', verdict: 'mixed', credibilityScore: 5.5, active: true, order: 6 },
    { claim: 'Health budget increased by 200%', verdict: 'false', credibilityScore: 1.9, active: true, order: 7 },
    { claim: 'Swachh Bharat: 600M toilets built', verdict: 'mixed', credibilityScore: 6.1, active: true, order: 8 },
    { claim: 'MGNREGA wages increased above inflation', verdict: 'false', credibilityScore: 2.3, active: true, order: 9 },
    { claim: '100% rural electrification achieved', verdict: 'misleading', credibilityScore: 3.7, active: true, order: 10 },
    { claim: 'Education budget at all-time high', verdict: 'mostly-false', credibilityScore: 4.1, active: true, order: 11 },
    { claim: 'MSP doubled for farmers since 2014', verdict: 'mixed', credibilityScore: 5.8, active: true, order: 12 },
  ]
  for (const t of tickerDefs) {
    const existing = await payload.find({
      collection: 'ticker-items',
      where: { claim: { equals: t.claim } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'ticker-items', data: t as Parameters<typeof payload.create>[0]['data'] })
    }
  }
  log(`Seeded ${tickerDefs.length} ticker items`)

  // ─── Site Settings ─────────────────────────────────────────────────────────
  log('Seeding site settings...')
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'The New India Government',
        tagline: 'Truth · Transparency · Voice',
        badgeText: "THE CITIZEN'S PRESS",
        cityLine: 'NEW DELHI · MUMBAI · BENGALURU',
        voteQuestion: 'Is it time for a new India government?',
        voteOptions: [
          { key: 'yes-time-for-change', label: 'YES, time for change' },
          { key: 'no-current-fine', label: 'NO, current is fine' },
          { key: 'undecided', label: 'UNDECIDED' },
        ],
        footer: {
          aboutText: 'Independent fact-checking and citizen journalism for a better India. Truth · Transparency · Voice.',
          links: [
            { label: 'About', url: '/about' },
            { label: 'Privacy', url: '/about#privacy' },
            { label: 'Contact', url: '/about#contact' },
          ],
        },
      },
    })
    log('Site settings updated')
  } catch (e) {
    log(`Site settings: ${e}`)
  }

  // ─── Articles ──────────────────────────────────────────────────────────────
  log('Seeding articles...')

  // We need at least a placeholder media ID — create a placeholder
  let placeholderMedia: string | null = null
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Placeholder editorial image' } },
    limit: 1,
  })
  if (existingMedia.docs.length > 0) {
    placeholderMedia = existingMedia.docs[0].id as string
  }

  const articleDefs: Array<{
    title: string
    slug: string
    kicker: string
    excerpt: string
    category: string
    author: string
    credibilityScore: number
    featured: boolean
    placement: string
    status: string
    publishedAt: string
    tags: string[]
    sources: Array<{ label: string; url: string }>
  }> = [
    {
      title: "Government's GDP Growth Claim — Independent Data Tells Another Story",
      slug: 'government-gdp-growth-claim',
      kicker: 'FACT-CHECK',
      excerpt: 'The government claims 8.4% GDP growth, but independent economists and NSO data revisions paint a different picture. We dig into the numbers.',
      category: 'fact-check',
      author: 'rahul-menon',
      credibilityScore: 2.8,
      featured: true,
      placement: 'homepage-hero',
      status: 'published',
      publishedAt: '2026-05-01T09:00:00.000Z',
      tags: ['gdp', 'economy'],
      sources: [
        { label: 'NSO GDP Data Release 2024', url: 'https://mospi.gov.in' },
        { label: 'World Bank India Economic Update', url: 'https://worldbank.org' },
      ],
    },
    {
      title: 'The Unemployment Crisis the Government Refuses to Acknowledge',
      slug: 'unemployment-crisis-india-2026',
      kicker: 'INVESTIGATION',
      excerpt: 'CMIE data shows youth unemployment at 45% in urban areas, while the government claims record job creation. A data investigation.',
      category: 'investigations',
      author: 'priya-sharma',
      credibilityScore: 1.4,
      featured: false,
      placement: 'homepage-left',
      status: 'published',
      publishedAt: '2026-04-28T08:00:00.000Z',
      tags: ['economy'],
      sources: [
        { label: 'CMIE Unemployment Data', url: 'https://cmie.com' },
      ],
    },
    {
      title: 'Education Budget Cut by 15% in Real Terms — Ministry Data',
      slug: 'education-budget-cut-real-terms',
      kicker: 'FACT-CHECK',
      excerpt: 'Ministry of Finance documents reveal the education budget has fallen 15% in real (inflation-adjusted) terms over five years.',
      category: 'fact-check',
      author: 'ananya-krishnan',
      credibilityScore: 3.2,
      featured: false,
      placement: 'homepage-left',
      status: 'published',
      publishedAt: '2026-04-25T07:00:00.000Z',
      tags: ['education'],
      sources: [
        { label: 'Union Budget Documents 2024-25', url: 'https://indiabudget.gov.in' },
      ],
    },
    {
      title: 'Who Really Benefits from the New Tax Regime?',
      slug: 'new-tax-regime-who-benefits',
      kicker: 'POLICY',
      excerpt: 'Analysis of income tax data shows the new regime disproportionately benefits the top 5% of earners while increasing burden on the middle class.',
      category: 'policy',
      author: 'rahul-menon',
      credibilityScore: 6.2,
      featured: false,
      placement: 'homepage-right',
      status: 'published',
      publishedAt: '2026-04-22T10:00:00.000Z',
      tags: ['economy'],
      sources: [],
    },
    {
      title: "PM's Harvard Economics Claims: What He Actually Said vs. What the Data Shows",
      slug: 'pm-economics-claims-fact-check',
      kicker: 'FACT-CHECK',
      excerpt: 'A comprehensive fact-check of 12 economic claims made by the Prime Minister in recent speeches, rated for accuracy.',
      category: 'fact-check',
      author: 'vikram-joshi',
      credibilityScore: 2.1,
      featured: false,
      placement: 'homepage-right',
      status: 'published',
      publishedAt: '2026-04-19T06:00:00.000Z',
      tags: ['modi', 'economy'],
      sources: [],
    },
    {
      title: 'EVM Controversy: What the Supreme Court Actually Found',
      slug: 'evm-controversy-supreme-court',
      kicker: 'ELECTIONS',
      excerpt: 'Separating fact from fiction in the ongoing EVM debate. We reviewed all 47 Supreme Court judgments related to electronic voting.',
      category: 'elections',
      author: 'vikram-joshi',
      credibilityScore: 7.8,
      featured: false,
      placement: 'homepage-right',
      status: 'published',
      publishedAt: '2026-04-15T11:00:00.000Z',
      tags: [],
      sources: [],
    },
    {
      title: 'Adani Ports and the Missing Defence Contract Disclosure',
      slug: 'adani-ports-defence-contract',
      kicker: 'INVESTIGATION',
      excerpt: 'RTI documents reveal a ₹4,800 crore defence contract awarded without standard competitive bidding. What happened?',
      category: 'investigations',
      author: 'priya-sharma',
      credibilityScore: 4.5,
      featured: false,
      placement: 'feed',
      status: 'published',
      publishedAt: '2026-04-10T08:00:00.000Z',
      tags: [],
      sources: [],
    },
    {
      title: 'Why India\'s Environmental Commitments at COP28 Don\'t Add Up',
      slug: 'india-cop28-environmental-commitments',
      kicker: 'FACT-CHECK',
      excerpt: 'India pledged net zero by 2070, but current coal plant approvals and forest clearing data make that target mathematically impossible.',
      category: 'fact-check',
      author: 'ananya-krishnan',
      credibilityScore: 3.8,
      featured: false,
      placement: 'feed',
      status: 'published',
      publishedAt: '2026-04-05T07:00:00.000Z',
      tags: ['environment'],
      sources: [],
    },
  ]

  const articleIds: Record<string, string> = {}
  for (const a of articleDefs) {
    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: a.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      articleIds[a.slug] = existing.docs[0].id as string
      continue
    }

    if (!placeholderMedia) {
      log('Note: No placeholder media — articles created without hero images. Upload images in admin.')
    }

    const tagIds_arr = a.tags
      .map((t) => tagIds[t])
      .filter(Boolean)

    const created = await payload.create({
      collection: 'articles',
      data: {
        title: a.title,
        slug: a.slug,
        kicker: a.kicker,
        excerpt: a.excerpt,
        heroImage: placeholderMedia!,
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: a.excerpt, version: 1 }],
                version: 1,
              },
              {
                type: 'paragraph',
                children: [{ type: 'text', text: 'This is demo content created by the seed script. Replace with actual journalism.', version: 1 }],
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: categoryIds[a.category]!,
        author: authorIds[a.author]!,
        tags: tagIds_arr,
        credibilityScore: a.credibilityScore,
        featured: a.featured,
        placement: a.placement as 'feed' | 'homepage-left' | 'homepage-right' | 'homepage-hero',
        status: a.status as 'draft' | 'published' | 'archived',
        publishedAt: a.publishedAt,
        sources: a.sources,
      } as Parameters<typeof payload.create>[0]['data'],
    })
    articleIds[a.slug] = created.id as string
    log(`Created article: ${a.title}`)
  }

  // ─── Petitions ─────────────────────────────────────────────────────────────
  log('Seeding petitions...')
  const petitionDefs = [
    {
      title: 'Demand Transparent GDP Methodology',
      slug: 'demand-transparent-gdp-methodology',
      summary: 'We demand the Ministry of Statistics adopt internationally-accepted GDP measurement standards and make all base data public.',
      target: "Prime Minister's Office",
      goalSignatures: 100000,
      currentSignatures: 1247,
      status: 'active',
    },
    {
      title: 'Restore Full MGNREGA Funding',
      slug: 'restore-mgnrega-funding',
      summary: 'Petition to restore MGNREGA to pre-2019 funding levels adjusted for inflation, benefiting 52 million rural families.',
      target: 'Ministry of Rural Development',
      goalSignatures: 50000,
      currentSignatures: 8340,
      status: 'active',
    },
    {
      title: 'Right to Information for Defence Contracts',
      slug: 'rti-defence-contracts',
      summary: 'All defence contracts above ₹500 crore should be subject to full RTI disclosure within 90 days of signing.',
      target: 'Ministry of Defence',
      goalSignatures: 25000,
      currentSignatures: 3122,
      status: 'active',
    },
  ]

  const petitionIds: Record<string, string> = {}
  for (const p of petitionDefs) {
    const existing = await payload.find({
      collection: 'petitions',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      petitionIds[p.slug] = existing.docs[0].id as string
      continue
    }
    const created = await payload.create({
      collection: 'petitions',
      data: {
        ...p,
        status: p.status as 'active' | 'closed' | 'draft',
        createdBy: adminUser.id as string,
      } as Parameters<typeof payload.create>[0]['data'],
    })
    petitionIds[p.slug] = created.id as string
    log(`Created petition: ${p.title}`)
  }

  // ─── Voices ────────────────────────────────────────────────────────────────
  log('Seeding voices...')
  const voiceDefs = [
    { text: 'The government needs to be honest about economic data. Citizens deserve transparency.', displayName: 'Ravi Kumar', voteOption: 'yes-time-for-change', status: 'approved' },
    { text: 'I have never seen such unemployment among my children\'s generation. Something must change.', displayName: 'Sunita Devi', voteOption: 'yes-time-for-change', status: 'approved' },
    { text: 'India has made real progress. The roads, the digital infrastructure — I see it every day.', displayName: 'Prakash Nair', voteOption: 'no-current-fine', status: 'approved' },
    { text: 'Data doesn\'t lie. When 3 out of 4 of my batch cannot find stable employment, something is wrong.', displayName: 'Anonymous', voteOption: 'yes-time-for-change', status: 'approved' },
    { text: 'The economy has improved for businesses. But the middle class is squeezed from both sides.', displayName: 'Meena Shah', voteOption: 'undecided', status: 'approved' },
    { text: 'Fact-checking is patriotism. Holding government accountable is how democracies survive.', displayName: 'Dr. A. Krishnan', voteOption: 'yes-time-for-change', status: 'approved' },
    { text: 'I vote for continuity — dramatic changes bring instability.', displayName: 'Ramesh Gupta', voteOption: 'no-current-fine', status: 'approved' },
    { text: 'We need fresh leadership that understands the real India — not just the urban elite.', displayName: 'Fatima Begum', voteOption: 'yes-time-for-change', status: 'approved' },
    { text: 'The farm laws repeal showed that citizen power works. Let us keep pushing.', displayName: 'Harvinder Singh', voteOption: 'yes-time-for-change', status: 'approved' },
    { text: 'My pension has not kept pace with inflation in 8 years. I am worried about retirement.', displayName: 'Shyam Lal', voteOption: 'yes-time-for-change', status: 'approved' },
    { text: 'Infrastructure has genuinely improved in my district. Credit where due.', displayName: 'Sanjay Patil', voteOption: 'no-current-fine', status: 'approved' },
    { text: 'Transparency and truth are non-negotiable pillars of democracy.', displayName: 'Prof. R. Iyer', voteOption: 'yes-time-for-change', status: 'approved' },
    // Pending
    { text: 'I am still thinking about who to support. All options have weaknesses.', displayName: 'Anonymous', voteOption: 'undecided', status: 'pending' },
    { text: 'Why does every government promise and fail to deliver on unemployment?', displayName: 'Young Voter', voteOption: 'yes-time-for-change', status: 'pending' },
    { text: 'Digital India has been a real success story in my town.', displayName: 'Preethi Venkat', voteOption: 'no-current-fine', status: 'pending' },
    { text: 'The media should be more independent. Sites like this are important.', displayName: 'Anonymous', voteOption: 'yes-time-for-change', status: 'pending' },
    { text: 'Education and health should be priorities. I don\'t see that reflected in budgets.', displayName: 'Dr. S. Rao', voteOption: 'yes-time-for-change', status: 'pending' },
    { text: 'Both sides have failed farmers in the long run.', displayName: 'Ashok Yadav', voteOption: 'undecided', status: 'pending' },
    { text: 'Who else should run? I see no viable alternative.', displayName: 'Vijay Mishra', voteOption: 'no-current-fine', status: 'pending' },
    { text: 'The GDP numbers are cooked. Any honest economist will tell you that.', displayName: 'Prof. K. Bose', voteOption: 'yes-time-for-change', status: 'pending' },
    { text: 'Our rivers are dying. Our air is toxic. And nobody is being held accountable.', displayName: 'Kaveri Nair', voteOption: 'yes-time-for-change', status: 'pending' },
    { text: 'I appreciate that this platform lets ordinary citizens be heard.', displayName: 'Deepa Singh', voteOption: 'yes-time-for-change', status: 'pending' },
    { text: 'Change for change\'s sake is dangerous. Let\'s be careful what we wish for.', displayName: 'Kishore Rao', voteOption: 'no-current-fine', status: 'pending' },
    { text: 'Every election cycle the same promises. Time for something new.', displayName: 'Young India', voteOption: 'yes-time-for-change', status: 'pending' },
  ]

  for (const v of voiceDefs) {
    const existing = await payload.find({
      collection: 'voices',
      where: {
        text: { equals: v.text },
        displayName: { equals: v.displayName ?? '' },
      },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'voices',
        data: {
          text: v.text,
          displayName: v.displayName,
          voteOption: v.voteOption as 'yes-time-for-change' | 'no-current-fine' | 'undecided',
          status: v.status as 'pending' | 'approved' | 'rejected',
        },
      })
    }
  }
  log(`Seeded ${voiceDefs.length} voices`)

  // ─── Cowork API key ─────────────────────────────────────────────────────────
  log('Retrieving Cowork API key...')
  const coworkData = await payload.find({
    collection: 'users',
    where: { email: { equals: coworkEmail } },
    limit: 1,
  })
  const coworkDoc = coworkData.docs[0] as { apiKey?: string } | undefined

  const coworkApiKey = coworkDoc?.apiKey

  // Write to .cowork.key
  const { writeFileSync } = await import('fs')
  if (coworkApiKey) {
    writeFileSync('.cowork.key', coworkApiKey)
    log(`Cowork API key written to .cowork.key`)
  }

  // ─── Summary ───────────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60))
  console.log('SEED COMPLETE')
  console.log('='.repeat(60))
  console.log(`Admin URL:      ${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin`)
  console.log(`Admin email:    ${adminEmail}`)
  console.log(`Admin password: ${adminPassword}`)
  console.log('')
  console.log(`Cowork email:   ${coworkEmail}`)
  if (coworkApiKey) {
    console.log(`Cowork API key: ${coworkApiKey}`)
    console.log('')
    console.log('Add to Cowork → Settings → Connectors → Add custom MCP server:')
    console.log(JSON.stringify({
      mcpServers: {
        'new-india-gov': {
          url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/mcp`,
          headers: { Authorization: `Bearer ${coworkApiKey}` },
        },
      },
    }, null, 2))
  }
  console.log('='.repeat(60))

  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] Fatal error:', err)
  process.exit(1)
})
