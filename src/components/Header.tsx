import Link from 'next/link'
import Socials from './Socials'

const Header = () => {
  return (
    <header className='absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>
          {/* logo */}
          <Link href='/'>
            <h1 className='text-nowrap text-[36px] text-white tracking-tighter'>
              <span className='font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent from-0% to-white to-85%'>
                Anh
              </span>{' '}
              <span className='font-normal bg-clip-text text-transparent bg-gradient-to-r from-white from-20% to-sky-300'>
                Khoa
              </span>{' '}
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
