import FunMarquee from '@/components/ui/FunMarquee'
import PageHero from '@/components/sections/PageHero'

const f = (name: string) => `/images/fun/${name}`

const ALL_ITEMS: { src: string; type: 'image' | 'video' }[] = [
  { src: f('dope-1.png'),                  type: 'image' },
  { src: f('img-0372.jpg'),                type: 'image' },
  { src: f('attack-on-titan.png'),         type: 'image' },
  { src: f('photo-1-1.jpg'),               type: 'image' },
  { src: f('late-night-poster.png'),       type: 'image' },
  { src: f('ngo-minh.png'),                type: 'image' },
  { src: f('game-1.mp4'),                  type: 'video' },
  { src: f('photo-2-1.jpg'),               type: 'image' },
  { src: f('your-name-fake.png'),          type: 'image' },
  { src: f('img-0683.jpg'),                type: 'image' },
  { src: f('poster-design-1.png'),         type: 'image' },
  { src: f('abstract-model.png'),          type: 'image' },
  { src: f('d.mp4'),                       type: 'video' },
  { src: f('photo-3-1.jpg'),               type: 'image' },
  { src: f('ngo-minh-bg.png'),             type: 'image' },
  { src: f('a4-23.png'),                   type: 'image' },
  { src: f('img-1409.mp4'),                type: 'video' },
  { src: f('photo-1-2.jpg'),               type: 'image' },
  { src: f('duc-13a.png'),                 type: 'image' },
  { src: f('test-poster-1.png'),           type: 'image' },
  { src: f('photo-4-1.jpg'),               type: 'image' },
  { src: f('letter-2.jpg'),                type: 'image' },
  { src: f('bunny-4.png'),                 type: 'image' },
  { src: f('kinetic-typography.mp4'),      type: 'video' },
  { src: f('photo-2-2.jpg'),               type: 'image' },
  { src: f('screenshot-2023.png'),         type: 'image' },
  { src: f('photo-3-2.jpg'),               type: 'image' },
  { src: f('game-2.mp4'),                  type: 'video' },
  { src: f('donut.jpg'),                   type: 'image' },
  { src: f('photo-4-2.jpg'),               type: 'image' },
  { src: f('untitled-3.mp4'),              type: 'video' },
]

export default function FunPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <PageHero tagline="This is what keeps me sharp.">
        I draw, code, animate, photograph.{' '}
        <br />
        For the{' '}
        <em className="italic text-pink-500">love</em>
        {' '}of the game.
      </PageHero>

      <section aria-label="Fun work" className="w-full mt-16 md:mt-[150px] pb-16 md:pb-[165px]">
        <FunMarquee items={ALL_ITEMS} />
      </section>
    </main>
  )
}
