import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// data
const workSlides = {
  slides: [
    {
      projects: [
        {
          title: 'Deewas - iOS',
          path: '/deewas.png',
          link: 'https://apps.apple.com/app/deewas/id6745058784',
          title2: 'Deewas - Android',
          link2: 'https://play.google.com/store/apps/details?id=com.nakmiers.deewas',
        },
        {
          title: 'Mona Edu',
          path: '/monaedu.jpg',
          link: 'https://monaedu.com',
        },
        {
          title: 'Digital Flow',
          path: '/digital-flow.jpg',
          link: 'https://digital-flow-01.netlify.app',
        },
        {
          title: 'Dream Vacations',
          path: '/dream-vacations.jpg',
          link: 'https://dream-vacations-01.netlify.app',
        },
      ],
    },
    {
      projects: [
        {
          title: 'Anpha Shop',
          path: '/anpha-shop.jpg',
          link: 'http://anpha.shop',
        },
        {
          title: 'Educational Resources',
          path: '/ere.jpg',
          link: 'https://ere-eta.vercel.app',
        },
        {
          title: 'Street Slicer',
          path: '/street-slicer.jpg',
          link: 'https://street-slicer.netlify.app',
        },
        {
          title: 'Pixel Chip Portfolio',
          path: '/pixel-chip.jpg',
          link: 'https://pixel-chic.netlify.app',
        },
      ],
    },
    {
      projects: [
        {
          title: 'Sonic Fiesta',
          path: '/sonic-fiesta.jpg',
          link: 'https://sonic-fiesta.netlify.app',
        },
        {
          title: 'Exposio',
          path: '/exposio.jpg',
          link: 'https://exposio.netlify.app',
        },
      ],
    },
  ],
}

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className='h-[280px] sm:h-[480px]'
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className='grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer'>
            {slide.projects.map((project, i) => (
              <div
                className='aspect-video relative rounded-lg overflow-hidden flex items-center justify-center group '
                key={i}
              >
                <div className='flex items-center justify-center relative overflow-hidden group'>
                  {/* project */}
                  <Image src={project.path} alt='slide image' width={500} height={300} />

                  {/* gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-l from-transparent via-accent to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700' />

                  {/* title */}
                  <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-5  translate-y-full group-hover:-translate-y-1/2 group-hover:top-1/2 transition-all duration-300'>
                    <Link
                      href={project.link}
                      target='_blank'
                      className='flex items-center gap-x-2 text-[13px] tracking-[0.2em]'
                    >
                      <div className='delay-100'>LIVE</div>

                      <div className='translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150'>
                        {project.title}
                      </div>

                      <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200'>
                        <BsArrowRight />
                      </div>
                    </Link>
                    {project.link2 && (
                      <Link
                        href={project.link2}
                        target='_blank'
                        className='flex items-center gap-x-2 text-[13px] tracking-[0.2em]'
                      >
                        <div className='delay-100'>LIVE</div>

                        <div className='translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150'>
                          {project.title2 || project.title}
                        </div>

                        <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200'>
                          <BsArrowRight />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default WorkSlider
