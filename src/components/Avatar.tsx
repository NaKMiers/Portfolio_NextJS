import Image from 'next/image'

const Avatar = () => {
  return (
    <div className='hidden xl:flex xl:max-w-none'>
      <Image
        className='translate-z-0 w-full h-full'
        src='/avatar.png'
        alt='avatar'
        width={200}
        height={200}
      />
    </div>
  )
}

export default Avatar
