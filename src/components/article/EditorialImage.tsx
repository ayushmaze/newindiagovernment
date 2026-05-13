import Image from 'next/image'

interface EditorialImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  className?: string
  blurDataURL?: string
  fill?: boolean
}

export function EditorialImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = '',
  blurDataURL,
  fill = false,
}: EditorialImageProps) {
  const imageProps = fill
    ? { fill: true as const }
    : { width: width ?? 800, height: height ?? 600 }

  return (
    <div className={`overflow-hidden ${fill ? 'relative' : ''} ${className}`}>
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        priority={priority}
        sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
        quality={85}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className="editorial-img w-full h-full object-cover"
      />
    </div>
  )
}
