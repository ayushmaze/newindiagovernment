import type { Metadata } from 'next'
import { GoodNewsWorld } from '@/components/home/GoodNewsWorld'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...generateBaseMetadata('Good News from Around the World'),
  description:
    'Proof that things can get better: verified, sourced global progress — from healing the ozone layer and malaria vaccines to record renewables and India’s tiger recovery.',
}

export default function GoodNewsPage() {
  return (
    <main>
      <GoodNewsWorld />
    </main>
  )
}
