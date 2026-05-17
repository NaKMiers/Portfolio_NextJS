'use client'

import { useApp } from '@/context/AppContext'
import Image from 'next/image'

const Avatar = () => {
  const { profile } = useApp()
  const avatarSrc = profile?.avatar?.trim()

  if (!avatarSrc) {
    return null
  }

  return (
    <div className='hidden xl:flex '>
      <Image
        className='h-auto w-full'
        src={avatarSrc}
        alt='avatar'
        width={1024}
        height={1024}
        priority={true}
      />
    </div>
  )
}

export default Avatar
