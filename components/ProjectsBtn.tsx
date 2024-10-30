import Image from 'next/image'
import Link from 'next/link'
import { HiArrowDown, HiArrowRight } from 'react-icons/hi2'

const ProjectsBtn = () => {
  return (
    <div className='mx-auto flex items-center justify-center gap-8 xl:mx-0'>
      <Link
        href='/work'
        className='relative w-[185px] h-[185px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group'
      >
        <Image
          className='animate-spin-slow w-full h-full max-w-[160px] max-h-[160px] z-10'
          src='/rounded-text.png'
          alt='rounded-text'
          width={160}
          height={160}
        />
        <HiArrowRight className='absolute text-4xl group-hover:translate-x-2 transition-all duration-300' />
      </Link>

      <a
        href='/my-cv.pdf'
        target='_blank'
        className='relative w-[185px] h-[185px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group'
      >
        <Image
          className='animate-spin-slow w-full h-full max-w-[160px] max-h-[160px] z-10'
          src='/rounded-text-2.png'
          alt='rounded-text'
          width={160}
          height={160}
        />
        <HiArrowDown className='absolute text-4xl group-hover:translate-y-2 transition-all duration-300' />
      </a>
    </div>
  )
}

export default ProjectsBtn
