'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from 'react-icons/hi2'

// One-page public nav: canonical links use `/?section=` (legacy paths still redirect to these).
const navData = [
  { name: 'home', href: '/', icon: <HiHome /> },
  { name: 'about', href: '/?section=about', icon: <HiUser /> },
  { name: 'services', href: '/?section=services', icon: <HiRectangleGroup /> },
  { name: 'work', href: '/?section=work', icon: <HiViewColumns /> },
  {
    name: 'testimonials',
    href: '/?section=testimonials',
    icon: <HiChatBubbleBottomCenterText />,
  },
  {
    name: 'contact',
    href: '/?section=contact',
    icon: <HiEnvelope />,
  },
]

const Nav = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function isNavActive(segment: string) {
    const section = searchParams.get('section')
    if (segment === 'home') return pathname === '/' && section == null
    return pathname === '/' && section === segment
  }

  return (
    <nav className='flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen'>
      {/* inner */}
      <div className='flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[60px] xl:h-max py-8 bg-white/10 backdrop-blur-sm text-2xl xl:text-xl xl:rounded-full'>
        {navData.map((link, index) => (
          <Link
            className={`${
              isNavActive(link.name) ? 'text-yellow-400' : ''
            } relative flex items-center group hover:text-yellow-200 transition-all duration-300`}
            key={index}
            href={link.href}
          >
            {/* tooltip */}
            <div className='absolute pr-14 right-0 hidden xl:group-hover:flex'>
              <div className='bg-white relative flex text-primary items-center p-[6px] rounded-[3px]'>
                <div className='text-[12px] leading-none font-semibold capitalize'>{link.name}</div>
                <div className='border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2'></div>
              </div>
            </div>

            {/* icon */}
            <div>{link.icon}</div>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Nav
