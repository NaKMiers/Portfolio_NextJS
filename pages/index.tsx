'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Avatar from '../components/Avatar'
import ParticlesContainer from '../components/ParticlesContainer'
import ProjectsBtn from '../components/ProjectsBtn'
import { fadeIn } from '../utils/variants'

const Home = () => {
  return (
    <div className='bg-primary/60 bg-gradient-to-r from-primary/10 via-black/30 min-h-screen'>
      <div className='pt-48 md:pt-20'>
        <div className='text-center flex flex-col justify-center xl:pt-12 xl:text-start container mx-auto'>
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h1 z-10'
          >
            <div className='text-white text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-accent to-sky-200'>
                Hello, I&apos;m{' '}
              </span>
              <br />
              <TypeAnimation
                sequence={['Anh Khoa Nguyen', 1500, 'a Fullstack Developer', 1000]}
                speed={50}
                repeat={Infinity}
              />
            </div>
          </motion.h1>

          <motion.p
            variants={fadeIn('down', 0.3)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 z-10'
          >
            I help designers, businesses and startups bring their ideas to life. Powered by passion,
            dream and milo.
          </motion.p>

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

      <div className='w-full h-full absolute right-0 bottom-0'>
        <div className='opacity-50 bg-cover bg-[56%] bg-explosion bg-no-repeat w-screen h-screen absolute' />

        <ParticlesContainer />

        <motion.div
          variants={fadeIn('up', 0.5)}
          initial='hidden'
          animate='show'
          exit='hidden'
          transition={{ duration: 1, ease: 'easeInOut' }}
          className='max-w-[640px] absolute lg:bottom-0 lg:right-[0%] select-none'
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  )
}

export default Home
