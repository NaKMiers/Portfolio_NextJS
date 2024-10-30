import Image from 'next/image'

const Avatar = () => {
  return (
    <div className='hidden xl:flex xl:max-w-none'>
      <Image
        className='translate-z-0 w-full h-full'
        src='/avatar.png'
        alt='avatar'
        width={1024}
        height={1024}
        priority={true}
      />
    </div>
  )
}

export default Avatar
