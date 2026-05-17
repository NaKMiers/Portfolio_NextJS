import Image from 'next/image'

const Circles = () => {
  return (
    <div className='w-[200px] xl:w-[300px] absolute -right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10'>
      <div className='relative aspect-[13/10] w-full'>
        <Image
          src='/circles.png'
          alt='circles'
          fill
          className='object-contain'
          sizes='(max-width: 1280px) 200px, 300px'
        />
      </div>
    </div>
  )
}

export default Circles
