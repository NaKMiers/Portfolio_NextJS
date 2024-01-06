import { Swiper, SwiperSlide } from 'swiper/react'
import { BsArrowRight } from 'react-icons/bs'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

// data
const workSlides = {
  slides: [
    {
      projects: [
        {
          title: 'Dream Vacations',
          path: '/dream-vacations.png',
          link: 'https://dream-vacations-01.netlify.app',
        },
        {
          title: 'Sonic Fiesta',
          path: '/sonic-fiesta.png',
          link: 'https://sonic-fiesta.netlify.app',
        },
        {
          title: 'Exposio',
          path: '/exposio.png',
          link: 'https://exposio.netlify.app',
        },
        {
          title: 'Digital Flow',
          path: '/digital-flow.png',
          link: 'https://digital-flow-01.netlify.app',
        },
      ],
    },
    {
      projects: [
        {
          title: 'Street Slicer',
          path: '/street-slicer.png',
          link: 'https://street-slicer.netlify.app',
        },
        {
          title: 'Pixel Chip Portfolio',
          path: '/pixel-chip.png',
          link: 'https://pixel-chic.netlify.app',
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
              <Link
                href={project.link}
                target='_blank'
                className='relative rounded-lg overflow-hidden flex items-center justify-center group '
                key={i}
              >
                <div className='flex items-center justify-center relative overflow-hidden group'>
                  {/* project */}
                  <Image src={project.path} alt='slide image' width={500} height={300} />

                  {/* gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-l from-transparent via-accent to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700' />

                  {/* title */}
                  <div className='absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300'>
                    <div className='flex items-center gap-x-2 text-[13px] tracking-[0.2em]'>
                      <div className='delay-100'>LIVE</div>

                      <div className='translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150'>
                        {project.title}
                      </div>

                      <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200'>
                        <BsArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default WorkSlider
