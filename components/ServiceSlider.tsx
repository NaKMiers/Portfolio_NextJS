import { BsCartCheck } from 'react-icons/bs'
import { IoCode, IoCodeSlash } from 'react-icons/io5'
import { LuBrainCircuit } from 'react-icons/lu'
import { RxArrowTopRight, RxReader } from 'react-icons/rx'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// data
const serviceData = [
  {
    icon: <IoCode />,
    title: 'Front-end',
    description: 'Front-end expert creating intuitive interfaces for optimal user experiences.',
  },
  {
    icon: <IoCodeSlash />,
    title: 'Back-end',
    description:
      'Back-end architect for robust, scalable server solutions and seamless functionality.',
  },
  {
    icon: <BsCartCheck />,
    title: 'E-Commerce',
    description:
      'E-Commerce expert crafting secure, efficient online platforms for seamless transactions.',
  },
  {
    icon: <RxReader />,
    title: 'Portfolio',
    description: 'Portfolio specialist showcasing skills, experience, and achievements concisely.',
  },
  {
    icon: <LuBrainCircuit />,
    title: 'AI Intergration',
    description: 'AI Integration for smarter systems and improved efficiency.',
  },
]

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className='h-[240px] sm:h-[340px]'
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className='bg-[rgba(65,49,123,0.15)] min-h-[300px] h-max rounded-lg px-6 py-8 flex flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300'>
            {/* icon */}
            <div className='text-4xl text-accent mb-4'>{item.icon}</div>

            {/* title & description */}
            <div className='mb-8 flex-1'>
              <div className='mb-2 text-lg'>{item.title}</div>
              <p className='max-w-[350px] leading-normal text-sm'>{item.description}</p>
            </div>

            {/* arrow */}
            <div className='text-3xl'>
              <RxArrowTopRight className='group-hover:rotate-45 group-hover:text-accent transition-all duration-300' />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ServiceSlider
