import Image from 'next/image'

/**
 * Badge — the citizen's press masthead mark.
 *
 * Sizes responsively so it doesn't crowd the wordmark on phones:
 *   - <sm (mobile):  48px
 *   - sm (~640px+):  72px
 *   - lg+:           110px
 */
export function Badge() {
  return (
    <div className="flex-shrink-0 w-12 sm:w-[72px] lg:w-[110px]">
      <Image
        src="/badge.svg?v=5"
        alt="The Citizen's Press — Truth · Transparency · Voice"
        width={110}
        height={110}
        priority
        className="w-full h-auto"
      />
    </div>
  )
}
