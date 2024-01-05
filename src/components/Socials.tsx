import Link from 'next/link'

import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookLine,
  RiDribbbleLine,
  RiBehanceLine,
  RiPinterestLine,
} from 'react-icons/ri'

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-xl'>
      <Link
        target='_blank'
        href='https://www.youtube.com/channel/UCmgkzDkx8EirOSBLLVm8B4Q'
        className='hover:text-accent transition-all duration-300'
      >
        <RiYoutubeLine />
      </Link>
      <Link
        target='_blank'
        href='https://www.instagram.com/pipix149'
        className='hover:text-accent transition-all duration-300'
      >
        <RiInstagramLine />
      </Link>
      <Link
        target='_blank'
        href='https://www.facebook.com/pipix149'
        className='hover:text-accent transition-all duration-300'
      >
        <RiFacebookLine />
      </Link>
      <Link
        target='_blank'
        href='https://dribbble.com/nakmiers'
        className='hover:text-accent transition-all duration-300'
      >
        <RiDribbbleLine />
      </Link>
      <Link
        target='_blank'
        href='https://www.behance.net/bibi13'
        className='hover:text-accent transition-all duration-300'
      >
        <RiBehanceLine />
      </Link>
      <Link
        target='_blank'
        href='https://www.pinterest.com/nakmiers'
        className='hover:text-accent transition-all duration-300'
      >
        <RiPinterestLine />
      </Link>
    </div>
  )
}

export default Socials
