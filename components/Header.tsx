import Link from 'next/link'
import Socials from '@/components/Socials'
import { useApp } from '@/context/AppContext'

const Header = () => {
  const { profile, loading } = useApp()

  return (
    <header className='absolute z-50 w-full flex items-center px-16 xl:px-0 xl:h-[90px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>
          {/* logo */}
          <Link href='/'>
            <h1 className='text-nowrap text-[36px] text-white tracking-tighter'>
              {loading ? (
                <span className='inline-block h-9 w-40 rounded-lg bg-white/10 align-middle' />
              ) : (
                <span className='font-semibold'>{profile?.username || profile?.fullName}</span>
              )}{' '}
              <span className='text-accent font-bold'>.</span>
            </h1>
          </Link>

          {/* socials */}
          {loading ? (
            <div className='flex items-center gap-x-4'>
              <div className='h-6 w-6 rounded-md bg-white/10' />
              <div className='h-6 w-6 rounded-md bg-white/10' />
              <div className='h-6 w-6 rounded-md bg-white/10' />
            </div>
          ) : (
            <Socials />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
