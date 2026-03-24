import { useApp } from '@/context/AppContext'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiPinterestLine,
  RiUserLine,
  RiYoutubeLine,
} from 'react-icons/ri'
import {
  SiBehance,
  SiDevdotto,
  SiDribbble,
  SiMastodon,
  SiMedium,
  SiReddit,
  SiSlack,
  SiSnapchat,
  SiTelegram,
  SiThreads,
  SiTiktok,
  SiX,
  SiZalo,
} from 'react-icons/si'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'

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
          {(() => {
            switch (social.type?.toLowerCase()) {
              case 'github':
              case 'gh':
              case 'git':
                return <FaGithub size={24} />
              case 'linkedin':
              case 'in':
                return <RiLinkedinBoxFill size={24} />
              case 'youtube':
              case 'yt':
                return <RiYoutubeLine size={24} />
              case 'instagram':
              case 'ig':
                return <RiInstagramLine size={24} />
              case 'facebook':
              case 'fb':
                return <RiFacebookLine size={24} />
              case 'pinterest':
                return <RiPinterestLine size={24} />
              case 'zalo':
                return <SiZalo size={24} />
              case 'twitter':
              case 'x':
                return <SiX size={24} />
              case 'dribbble':
                return <SiDribbble size={24} />
              case 'behance':
                return <SiBehance size={24} />
              case 'telegram':
                return <SiTelegram size={24} />
              case 'slack':
                return <SiSlack size={24} />
              case 'medium':
                return <SiMedium size={24} />
              case 'reddit':
                return <SiReddit size={24} />
              case 'snapchat':
                return <SiSnapchat size={24} />
              case 'tiktok':
                return <SiTiktok size={24} />
              case 'threads':
              case 'thread':
                return <SiThreads size={24} />
              case 'mastodon':
                return <SiMastodon size={24} />
              case 'devto':
              case 'dev':
                return <SiDevdotto size={24} />
              case 'email':
              case 'mail':
                return <MdOutlineAlternateEmail size={24} />
              case 'website':
              case 'web':
              case 'site':
                return <TbWorld size={24} />
              default:
                return (
                  <RiUserLine size={24} className='text-zinc-400' title={social.type || 'profile'} />
                )
            }
          })()}
        </Link>
      ))}
    </div>
  )
}

export default Socials
