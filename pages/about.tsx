'use client'

// icons
import {
  FaBootstrap,
  FaCss3,
  FaFigma,
  FaGithub,
  FaGitSquare,
  FaHtml5,
  FaJira,
  FaJs,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import { TbApi, TbSql } from 'react-icons/tb'
import { IoLogoVercel } from 'react-icons/io5'
import { BiLogoNetlify } from 'react-icons/bi'
import { GrHeroku } from 'react-icons/gr'

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobexd,
  SiCanva,
  SiCsharp,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiJira,
  SiJirasoftware,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiPug,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'

import { BsFiletypeScss } from 'react-icons/bs'

import { motion } from 'framer-motion'
import { useState } from 'react'
import CountUp from 'react-countup'
import Avatar from '../components/Avatar'
import { fadeIn } from '../utils/variants'
import { IoLogoAndroid } from 'react-icons/io5'

type AboutDataItem = {
  title: string
  info: {
    title: string
    icons?: React.ReactNode[]
    stage?: string
  }[]
}

const aboutData: AboutDataItem[] = [
  {
    title: 'READ FIRST',
    info: [
      {
        title: 'Things only I do for my clients:',
      },
      {
        title:
          '1️⃣ Great effort. I am willing to spend 80% of my day researching problems and solutions to help you get the best product possible',
      },
      {
        title:
          '2️⃣ I am not the type to wait until the end of the shift to shut down the laptop. Working extra hours to help my clients get what they are looking for is my happiness.',
      },
      {
        title:
          '3️⃣ Sincere, attitude and creating good relationships with clients are the top criteria in my work',
      },
      {
        title:
          '4️⃣ And I am willing to give you your money back if you are disappointed with my results. For me, satisfactions are more important than money',
      },
    ],
  },
  {
    title: 'skills',
    info: [
      {
        title: 'Web Development',
        icons: [
          <FaHtml5 key={1} title='HTML5' />,
          <FaCss3 key={2} title='CSS3' />,
          <FaJs key={3} title='JavaScript' />,
          <BsFiletypeScss key={4} title='SCSS' />,
          <FaBootstrap key={5} title='Bootstrap' />,
          <SiTailwindcss key={6} title='Tailwindcss' />,
          <FaNodeJs key={7} title='NodeJS' />,
          <SiExpress key={8} title='ExpressJS' />,
          <SiMongodb key={9} title='MongoDB' />,
          <TbSql key={10} title='SQL' />,
          <SiPug key={11} title='Pug' />,
          <FaReact key={12} title='ReactJS' />,
          <SiRedux key={13} title='Redux' />,
          <SiMui key={14} title='Material UI' />,
          <SiTypescript key={15} title='TypeScript' />,
          <SiNextdotjs key={16} title='NextJS' />,
          <SiFirebase key={17} title='Firebase' />,
          <SiCsharp key={18} title='C#' />,
          <SiDotnet key={19} title='.NET' />,
          <IoLogoAndroid key={20} title='Android' />,
          <TbApi key={21} title='APIs' />,
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [
          <FaFigma key={22} title='Figma' />,
          <SiCanva key={23} title='Canva' />,
          <SiAdobephotoshop key={24} title='Adobe Photoshop' />,
          <SiAdobeillustrator key={25} title='Adobe Illustrator' />,
          <SiAdobepremierepro key={26} title='Adobe Premiere Pro' />,
          <SiAdobexd key={27} title='Adobe XD' />,
        ],
      },
      {
        title: 'Management',
        icons: [
          <FaGitSquare key={28} title='Git' />,
          <FaGithub key={29} title='Github' />,
          <SiJirasoftware key={30} title='Jira' />,
        ],
      },
      {
        title: 'Deployment',
        icons: [
          <SiVercel key={31} title='Vercel' />,
          <BiLogoNetlify key={32} title='Netlify' size={26} />,
          <GrHeroku key={33} title='Heroku' />,
        ],
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'HUFLIT University Student - HUFLIT - ',
        stage: '2022 - Present',
      },
      {
        title: 'Running E-Commerce Businesses - ',
        stage: '2023 - Present',
      },
    ],
  },
  {
    title: 'Certificate',
    info: [
      {
        title: 'HTML - CSS - F8 - ',
        stage: '2022',
      },
      {
        title: 'Responsive Web Design - ',
        stage: '2022',
      },
      {
        title: 'JavaScript Basic - F8 - ',
        stage: '2022',
      },
      {
        title: 'JavaScript Advanced - F8 - ',
        stage: '2022',
      },

      {
        title: 'WPS Certification - Ratatype - ',
        stage: '2023',
      },
    ],
  },
]

const About = () => {
  const [index, setIndex] = useState(0)

  return (
    <div className='min-h-screen xl:pb-0 bg-primary/60 bg-gradient-to-r from-primary/10 py-32 text-center xl:text-left'>
      <div className='opacity-40 scale-150 bg-[55%] bg-cover origin-bottom bg-explosion bg-no-repeat w-screen h-screen fixed top-0' />

      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden max-w-[510px] xl:flex absolute bottom-0 right-[6vw] -z-10'
      >
        <Avatar />
      </motion.div>

      <div className='relative z-10 container mx-auto h-full flex flex-col items-center xl:flex-row xl:items-start gap-x-6 max-w-[1080px]'>
        <div className='w-full xl:w-[55%] flex flex-col justify-center'>
          <motion.h2
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 z-10 mt-8 xl:mt-0'
          >
            Captivating <span className='text-accent'>stories</span> birth magnifcent designs.
          </motion.h2>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-white/80'
          >
            {new Date().getFullYear() - 2019} years ago I discovered my passion for programming when I
            was a high school student and from there I had to sacrifice many things to become a full
            stack developer at the age of 18.
          </motion.p>

          <motion.div
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
          >
            <div className='flex flex-1 xl:gap-x-6'>
              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={5} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Years of experience
                </div>
              </div>

              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={5600} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Hours Of Coding
                </div>
              </div>

              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={38} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Finished projects
                </div>
              </div>

              <div className='relative flex-1'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={6} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Certificates
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col w-full xl:w-[45%] max-w-[500px] overflow-scroll no-scrollbar relative z-10'
        >
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map((item, itemIndex) => (
              <div
                className={`${
                  index === itemIndex &&
                  'text-accent after:w-[100%] after:bg-sky-500 after:transition-all after:duration-300'
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemIndex)}
                key={itemIndex}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {aboutData[index].info.map((item, i) => (
              <div
                className='flex-1 flex flex-col md:flex-row mx-w-max gap-x-2 items-center text-white/90'
                key={i}
              >
                <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                <div className=''>{item.stage}</div>
                <div className='flex gap-x-4 gap-y-2 justify-center flex-wrap max-w-[350px]'>
                  {item.icons?.map((icon, i) => (
                    <div className='text-2xl text-white' key={i}>
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
