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
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" className="w-full h-auto block" />
      )}
    </div>
  )
}
