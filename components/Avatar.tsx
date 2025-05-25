import Image from 'next/image'

const Avatar = () => {
  return (
    <div className='hidden xl:flex '>
      <Image
        className='w-full h-full'
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
