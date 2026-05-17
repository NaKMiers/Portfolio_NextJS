import Image from 'next/image'

const TopLeftImg = () => {
  return (
    <div className='absolute left-0 top-0 mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] opacity-80 select-none'>
      <div className='relative aspect-square w-full'>
        <Image
          className='animate-pulse object-contain duration-75'
          src='/top-left-img.png'
          alt='top-left-img'
          fill
          sizes='(max-width: 1280px) 200px, 400px'
          priority={true}
        />
      </div>
    </div>
  )
}

export default TopLeftImg
