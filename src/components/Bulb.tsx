import Image from 'next/image'

const Bulb = () => {
  return (
    <div className='absolute -left-36 -bottom-12 rotate-12 mix-blend-color-dodge animate-pulse duraion-75 z-10 w-[200px] xl:w-[260px]'>
      <div className='relative aspect-[13/10] w-full'>
        <Image
          src='/bulb.png'
          alt='bulb'
          fill
          className='object-contain'
          sizes='(max-width: 1280px) 200px, 260px'
        />
      </div>
    </div>
  )
}

export default Bulb
