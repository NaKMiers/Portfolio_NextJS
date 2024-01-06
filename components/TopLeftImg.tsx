import Image from 'next/image'

const TopLeftImg = () => {
  return (
    <div className='absolute left-0 top-0 mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] opacity-80 select-none'>
      <Image
        className='animate-pulse duration-75'
        src='/top-left-img.png'
        alt='top-left-img'
        width={400}
        height={400}
        priority={true}
      />
    </div>
  )
}

export default TopLeftImg
