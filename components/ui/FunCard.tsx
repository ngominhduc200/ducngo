import Image from 'next/image'

interface FunCardProps {
  src: string
  type: 'image' | 'video'
}

export default function FunCard({ src, type }: FunCardProps) {
  return (
    <div className="w-full">
      {type === 'video' ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-auto block"
        />
      ) : (
        <Image src={src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', display: 'block' }} />
      )}
    </div>
  )
}
