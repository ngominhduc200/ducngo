import FunMarquee from '@/components/ui/FunMarquee'
import PageHero from '@/components/sections/PageHero'

const f = (name: string) => `/images/Fun_Page_Assets/${encodeURIComponent(name)}`

const ALL_ITEMS: { src: string; type: 'image' | 'video' }[] = [
  { src: f('DOPE 1.png'),                                                                          type: 'image' },
  { src: f('IMG_0372.jpg'),                                                                        type: 'image' },
  { src: f('1-2, 12 Cover.jpg'),                                                                   type: 'image' },
  { src: f('Frontend.mov'),                                                                        type: 'video' },
  { src: f('Attack_On_Titan.png'),                                                                 type: 'image' },
  { src: f('photo 1-1-min.jpg'),                                                                   type: 'image' },
  { src: f('LATE NIGHT POSTER.png'),                                                               type: 'image' },
  { src: f('Ngo minh.png'),                                                                        type: 'image' },
  { src: f('Game 1.mov'),                                                                          type: 'video' },
  { src: f('photo 2-1-min.jpg'),                                                                   type: 'image' },
  { src: f('8-9 Feach.jpg'),                                                                       type: 'image' },
  { src: f('Your_Name_Fake.png'),                                                                  type: 'image' },
  { src: f('IMG_0683.jpg'),                                                                        type: 'image' },
  { src: f('10-11 Feach.jpg'),                                                                     type: 'image' },
  { src: f('poster design 1.png'),                                                                 type: 'image' },
  { src: f('1-2, 14 Cover 1.jpg'),                                                                 type: 'image' },
  { src: f('Abstract model (1+2).png'),                                                            type: 'image' },
  { src: f('D.mov'),                                                                               type: 'video' },
  { src: f('photo 3-1-min.jpg'),                                                                   type: 'image' },
  { src: f('11 Trump loses Go-Fish.jpg'),                                                          type: 'image' },
  { src: f('NGO MINH BG.png'),                                                                     type: 'image' },
  { src: f('A4 - 23.png'),                                                                         type: 'image' },
  { src: f('IMG_1409.mov'),                                                                        type: 'video' },
  { src: f('photo 1-2-min.jpg'),                                                                   type: 'image' },
  { src: f('Duc 13a.png'),                                                                         type: 'image' },
  { src: f('1-2, 14 Cover 2.jpg'),                                                                 type: 'image' },
  { src: f('IndigenousSportsIcons.png'),                                                           type: 'image' },
  { src: f('8-9 Feach 1.jpg'),                                                                     type: 'image' },
  { src: f('Test poster 1.png'),                                                                   type: 'image' },
  { src: f('photo 4-1-min.jpg'),                                                                   type: 'image' },
  { src: f('Letter - 2.jpg'),                                                                      type: 'image' },
  { src: f('bunny 4.png'),                                                                         type: 'image' },
  { src: f('IAT 100 Kinetic Typography - ITZY | MAFIA In The Morning (English Ver.).mp4'), type: 'video' },
  { src: f('1-2, 14 Cover 3.jpg'),                                                                 type: 'image' },
  { src: f('HonrandoLaVida.jpg'),                                                                  type: 'image' },
  { src: f('photo 2-2-min.jpg'),                                                                   type: 'image' },
  { src: f('Screenshot 2023-06-29 at 5.34 1.png'),                                                type: 'image' },
  { src: f('photo 3-2-min.jpg'),                                                                   type: 'image' },
  { src: f('Game 2.mov'),                                                                          type: 'video' },
  { src: f('1-2, 14 Cover 4.jpg'),                                                                 type: 'image' },
  { src: f('Donut.jpg'),                                                                           type: 'image' },
  { src: f('IndieRocksWithTheSylviaPlatters.jpg'),                                                 type: 'image' },
  { src: f('1-2, 14 Cover 12.jpg'),                                                                type: 'image' },
  { src: f('3 Simple Games.jpg'),                                                                  type: 'image' },
  { src: f('photo 4-2-min.jpg'),                                                                   type: 'image' },
  { src: f('Untitled-3.mp4'),                                                                      type: 'video' },
  { src: f('TheYearOfTheSnake%20(2).jpg'),                                                         type: 'image' },
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
