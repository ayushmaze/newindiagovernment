import { generateBaseMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateBaseMetadata('About')

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-black text-[56px] uppercase tracking-[0.02em] text-[var(--ink)] mb-8">
          About Us
        </h1>

        <div className="font-body text-[17px] leading-[1.65] text-[var(--ink-2)] space-y-6">
          <p>
            <strong className="text-[var(--ink)]">The New India Government</strong> is an independent
            citizen journalism platform dedicated to truth, transparency, and voice. We fact-check
            government claims, investigate policy failures, and amplify the voices of ordinary
            Indians.
          </p>
          <p>
            We are not affiliated with any political party or government body. Our editorial team
            is guided by evidence, data, and primary sources.
          </p>

          <h2
            id="privacy"
            className="font-display font-bold text-[28px] text-[var(--ink)] mt-10 pt-6 border-t border-[var(--hairline)]"
          >
            Privacy Policy
          </h2>
          <p>
            We take privacy seriously. When you vote, sign a petition, or submit a voice:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do <strong>not</strong> store raw IP addresses.</li>
            <li>We use a one-way SHA-256 hash of your IP + user agent to prevent duplicate submissions. This hash cannot be reverse-engineered to identify you.</li>
            <li>We derive only the country of origin from your IP for analytics (e.g. &ldquo;India&rdquo;).</li>
            <li>Your email (if you subscribe) is used only for the newsletter and never sold or shared.</li>
            <li>Petition signatures are stored with your name and city only if you choose to display them publicly.</li>
          </ul>
          <p>
            See <code className="bg-[var(--bg-soft)] px-1.5 py-0.5 text-[14px]">PRIVACY.md</code> in
            our public repository for technical details.
          </p>

          <h2
            id="contact"
            className="font-display font-bold text-[28px] text-[var(--ink)] mt-10 pt-6 border-t border-[var(--hairline)]"
          >
            Contact
          </h2>
          <p>
            For tips, corrections, or editorial inquiries, contact us at{' '}
            <a
              href="mailto:editorial@thenewindiagov.test"
              className="text-[var(--lavender-hover)] hover:underline"
            >
              editorial@thenewindiagov.test
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
