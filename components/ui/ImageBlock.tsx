import Image from 'next/image'

export default function ImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="(max-width: 768px) 100vw, 800px"
      style={{ width: '100%', height: 'auto' }}
    />
  )
}
