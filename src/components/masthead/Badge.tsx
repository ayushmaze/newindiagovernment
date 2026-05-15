import Image from 'next/image'

export function Badge() {
  return (
    <div className="flex-shrink-0">
      <Image
        src="/badge.svg?v=5"
        alt="The Citizen's Press — Truth · Transparency · Voice"
        width={110}
        height={110}
        priority
      />
    </div>
  )
}
