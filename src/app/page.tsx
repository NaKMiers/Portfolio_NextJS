'use client'

import Avatar from '@/components/Avatar'
import ParticlesContainer from '@/components/ParticlesContainer'
import ProjectsBtn from '@/components/ProjectsBtn'
import Wrapper from '@/components/Wrapper'
import { fadeIn } from '@/utils/variants'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {
  return (
    <Wrapper>
      <div className='bg-primary/60 h-full'>
        {/* text */}
        <div className='w-full h-full bg-gradient-to-r from-primary/10 via-black/30'>
          <div className='text-center flex flex-col justify-center xl:pt-40 xl:text-start h-full container mx-auto'>
            {/* title */}
            <motion.h1
              variants={fadeIn('down', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h1 z-10'
            >
              <h1 className='lg:max-w-[400px] text-white text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-accent to-sky-200'>
                  Hello, I&apos;m{' '}
                </span>
                <br />
                <TypeAnimation
                  sequence={['Anh Khoa Nguyen', 1500, 'a Fullstack Developer', 1000]}
                  wrapper='span'
                  speed={50}
                  repeat={Infinity}
                />
              </h1>
            </motion.h1>

            {/* subtitle */}
            <motion.p
              variants={fadeIn('down', 0.3)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16'
            >
              I help designers, businesses and startups bring their ideas to life. Powered by
              passion, dream and coffee.
            </motion.p>

            {/* btn */}
            <div className='flex justify-center xl:hidden relative z-10'>
              <ProjectsBtn />
            </div>
            <motion.div
              variants={fadeIn('down', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='hidden xl:flex z-10'
            >
              <ProjectsBtn />
            </motion.div>
          </div>
        </div>

        {/* image */}
        <div className='w-[1200px] h-full absolute right-0 bottom-0'>
          {/* bg img */}
          <div className='bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0' />

          {/* particles */}
          <ParticlesContainer />

          {/* avatar img */}
          <motion.div
            variants={fadeIn('up', 0.5)}
            initial='hidden'
            animate='show'
            exit='hidden'
            transition={{ duration: 1, ease: 'easeInOut' }}
            className='w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]'
          >
            <Avatar />
          </motion.div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
