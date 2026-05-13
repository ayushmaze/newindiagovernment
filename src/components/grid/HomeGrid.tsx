import React from 'react'

interface HomeGridProps {
  left: React.ReactNode
  center: React.ReactNode
  right: React.ReactNode
}

export function HomeGrid({ left, center, right }: HomeGridProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-12">
      <aside className="xl:col-span-3 xl:border-r xl:border-[var(--hairline)] xl:pr-8 space-y-10">
        {left}
      </aside>
      <main className="xl:col-span-6 xl:px-2 space-y-10">
        {center}
      </main>
      <aside className="xl:col-span-3 xl:border-l xl:border-[var(--hairline)] xl:pl-8 space-y-10">
        {right}
      </aside>
    </div>
  )
}
