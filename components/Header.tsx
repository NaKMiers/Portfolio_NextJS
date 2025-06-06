import Link from 'next/link'
import Socials from '@/components/Socials'

const Header = () => {
  return (
    <header className='absolute z-50 w-full flex items-center px-16 xl:px-0 xl:h-[90px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>
          {/* logo */}
          <Link href='/'>
            <h1 className='text-nowrap text-[36px] text-white tracking-tighter'>
              <span className='font-semibold'>Anh Khoa</span>{' '}
              <span className='text-accent font-bold'>.</span>
            </h1>
          </Link>

          {/* socials */}
          <Socials />
        </div>
      </div>
    </header>
  )
}

export default Header
