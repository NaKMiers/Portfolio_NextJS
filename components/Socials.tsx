import { useApp } from '@/context/AppContext'
import Link from 'next/link'
import { resolveIconFromCode } from '@/utils/iconResolver'

const Socials = () => {
  const { profile } = useApp()

  return (
    <div className='flex items-center gap-x-5 text-xl'>
      {profile?.socials.map(social => (
        <Link
          key={social.link}
          target='_blank'
          href={social.link}
          className='hover:text-accent transition-all duration-300'
        >
          {social.icon ? resolveIconFromCode(social.icon, 24) : null}
        </Link>
      ))}
    </div>
  )
}

export default Socials
