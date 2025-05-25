import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiPinterestLine,
  RiYoutubeLine,
} from 'react-icons/ri'
import { SiZalo } from 'react-icons/si'

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-xl'>
      <Link
        target='_blank'
        href='https://github.com/NaKMiers'
        className='hover:text-accent transition-all duration-300'
        title='GitHub'
      >
        <FaGithub size={24} />
      </Link>
      <Link
        target='_blank'
        href='https://www.linkedin.com/in/anh-khoa-nguyen-9539381a9'
        className='hover:text-accent transition-all duration-300'
        title='LinkedIn'
      >
        <RiLinkedinBoxFill size={24} />
      </Link>
      <Link
        target='_blank'
        href='https://www.youtube.com/@nguyenanhkhoa149'
        className='hover:text-accent transition-all duration-300'
        title='YouTube'
      >
        <RiYoutubeLine size={24} />
      </Link>
      <Link
        target='_blank'
        href='https://www.instagram.com/pipix149'
        className='hover:text-accent transition-all duration-300'
        title='Instagram'
      >
        <RiInstagramLine size={24} />
      </Link>
      <Link
        target='_blank'
        href='https://www.facebook.com/pipix149'
        className='hover:text-accent transition-all duration-300'
        title='Facebook'
      >
        <RiFacebookLine size={24} />
      </Link>
      <Link
        target='_blank'
        href='https://www.pinterest.com/nakmiers'
        className='hover:text-accent transition-all duration-300'
        title='Pinterest'
      >
        <RiPinterestLine size={24} />
      </Link>
      <Link
        target='_blank'
        href='https://zalo.me/0899320427'
        className='hover:text-accent text-2xl transition-all duration-300'
        title='Zalo'
      >
        <SiZalo size={28} />
      </Link>
    </div>
  )
}

export default Socials
