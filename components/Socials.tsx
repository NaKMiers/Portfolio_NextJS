import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

import {
  RiBehanceLine,
  RiDribbbleLine,
  RiFacebookLine,
  RiInstagramLine,
  RiPinterestLine,
  RiYoutubeLine,
} from 'react-icons/ri'
import { SiNpm, SiZalo } from 'react-icons/si'

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-xl'>
      <Link
        target='_blank'
        href='https://github.com/NaKMiers'
        className='hover:text-accent transition-all duration-300'
      >
        <FaGithub />
      </Link>
      <Link
        target='_blank'
        href='https://www.youtube.com/@nguyenanhkhoa149'
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
        href='https://www.pinterest.com/nakmiers'
        className='hover:text-accent transition-all duration-300'
      >
        <RiPinterestLine />
      </Link>
      <Link
        target='_blank'
        href='https://zalo.me/0899320427'
        className='hover:text-accent text-2xl transition-all duration-300'
      >
        <SiZalo />
      </Link>
    </div>
  )
}

export default Socials
