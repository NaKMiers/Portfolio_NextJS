import { ServiceItem } from '@/types/profile'
import { RxArrowTopRight } from 'react-icons/rx'
import { resolveIconFromCode } from '@/utils/iconResolver'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ServiceSlider = ({ services }: { services: ServiceItem[] }) => {
  if (!services) return null
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
      {services.map((item, i) => (
        <SwiperSlide key={i}>
          <div className='bg-[rgba(65,49,123,0.4)] min-h-[300px] h-max rounded-lg px-6 py-8 flex flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.4)] transition-all duration-300'>
            {/* icon */}
            <div className='text-4xl text-accent mb-4'>{resolveIconFromCode(item.icon, 36)}</div>

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
