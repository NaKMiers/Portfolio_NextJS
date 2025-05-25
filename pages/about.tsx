'use client'

// icons
import { BiLogoNetlify } from 'react-icons/bi'
import {
  FaBootstrap,
  FaCss3,
  FaFigma,
  FaGithub,
  FaGitSquare,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import { GrHeroku } from 'react-icons/gr'
import { TbApi, TbBrandReactNative, TbSql } from 'react-icons/tb'

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobexd,
  SiCanva,
  SiCsharp,
  SiDotnet,
  SiExpo,
  SiExpress,
  SiFirebase,
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
import Link from 'next/link'
import { useState } from 'react'
import CountUp from 'react-countup'
import { IoLogoAndroid } from 'react-icons/io5'
import Avatar from '../components/Avatar'
import { fadeIn } from '../utils/variants'

type AboutDataItem = {
  title: string
  info: {
    title: string
    icons?: React.ReactNode[]
    stage?: string
    link?: string
  }[]
}

const aboutData: AboutDataItem[] = [
  {
    title: 'About Me',
    info: [
      {
        title: `
        I'm Anh Khoa Nguyen. My passion for Information Technology began at a young age, and I officially started pursuing the field when I was 14. Since then, I've completed dozens of projects and gained hands-on experience with various frameworks, specializing in web and mobile app development. I'm also passionate about entrepreneurship and enjoy turning my software products into sources of income. Some of my websites and apps are already generating revenue on online platforms and the App Store. For me, IT isn't just a career - it's a part of who I am.`,
      },
      {
        title: `I’m independent, self-motivated, and open-minded, always eager to learn and embrace innovation. I have strong self-learning skills, effective communication, and thrive in team environments. I'm highly responsible and committed to the work I do.`,
      },
      {
        title: `My friends often say, “I love working with Anh Khoa because his projects always feel different - and I never have to worry about the quality.”`,
      },
    ],
  },
  {
    title: 'skills',
    info: [
      {
        title: 'Web Development',
        icons: [
          [<FaNodeJs key={0} title='NodeJS' />, 'NodeJS'],
          [<SiNextdotjs key={0} title='NextJS' />, 'NextJS'],
          [<FaReact key={0} title='ReactJS' />, 'ReactJS'],
          [<SiExpress key={0} title='ExpressJS' />, 'ExpressJS'],
          [<SiMongodb key={0} title='MongoDB' />, 'MongoDB'],
          [<FaHtml5 key={0} title='HTML5' />, 'HTML'],
          [<TbSql key={0} title='SQL' />, 'SQL'],
          [<FaJs key={0} title='JavaScript' />, 'JavaScript'],
          [<SiTypescript key={0} title='TypeScript' />, 'TypeScript'],
          [<FaCss3 key={0} title='CSS3' />, 'CSS3'],
          [<BsFiletypeScss key={0} title='SCSS' />, 'SCSS'],
          [<FaBootstrap key={0} title='Bootstrap' />, 'Bootstrap'],
          [<SiTailwindcss key={0} title='Tailwindcss' />, 'Tailwindcss'],
          [<SiPug key={0} title='Pug' />, 'Pug'],
          [<SiRedux key={0} title='Redux' />, 'Redux'],
          [<SiMui key={0} title='Material UI' />, 'UI'],
          [<SiFirebase key={0} title='Firebase' />, 'Firebase'],
          [<SiCsharp key={0} title='C#' />, 'C#'],
          [<SiDotnet key={0} title='.NET' />, '.NET'],
          [<IoLogoAndroid key={0} title='Android' />, 'Android'],
          [<TbApi key={0} title='APIs' />, 'APIs'],
        ],
      },
      {
        title: 'Mobile Development',
        icons: [
          [<TbBrandReactNative key={0} title='React Native' />, 'React Native'],
          [<SiExpo key={0} title='Expo' />, 'Expo'],
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [
          [<FaFigma key={0} title='Figma' />, 'Figma'],
          [<SiCanva key={0} title='Canva' />, 'Canva'],
          [<SiAdobephotoshop key={0} title='Adobe Photoshop' />, 'Adobe Photoshop'],
          [<SiAdobeillustrator key={0} title='Adobe Illustrator' />, 'Adobe Illustrator'],
          [<SiAdobepremierepro key={0} title='Adobe Premiere Pro' />, 'Adobe Premiere Pro'],
          [<SiAdobexd key={0} title='Adobe XD' />, 'Adobe XD'],
        ],
      },
      {
        title: 'Management',
        icons: [
          [<FaGitSquare key={0} title='Git' />, 'Git'],
          [<FaGithub key={0} title='Github' />, 'Github'],
          [<SiJirasoftware key={0} title='Jira' />, 'Jira'],
        ],
      },
      {
        title: 'Deployment',
        icons: [
          [<SiVercel key={0} title='Vercel' />, 'Vercel'],
          [<BiLogoNetlify key={0} title='Netlify' size={26} />, 'Netlify'],
          [<GrHeroku key={0} title='Heroku' />, 'Heroku'],
        ],
      },
    ],
  },
  {
    title: 'Education',
    info: [
      {
        title: 'Ho Chi Minh City University of Foreign Language And Information Technology (HUFLIT)',
        stage: '2022 - Present',
      },
      {
        title: 'VUS English Center',
        stage: '2022 - 2023',
      },
    ],
  },
  {
    title: 'Certificates',
    info: [
      {
        title: 'TOEIC (780/990) - Issued by IIG Vietnam - ',
        stage: '2025',
      },
      {
        title: 'HTML - CSS - F8 - ',
        stage: '2022',
        link: 'https://fullstack.edu.vn/cert/i9dhj',
      },
      {
        title: 'Responsive Web Design - ',
        stage: '2022',
        link: 'https://fullstack.edu.vn/cert/lrmyc',
      },
      {
        title: 'JavaScript Basic - F8 - ',
        stage: '2022',
        link: 'https://fullstack.edu.vn/cert/wf0v8',
      },
      {
        title: 'JavaScript Advanced - F8 - ',
        stage: '2022',
        link: 'https://fullstack.edu.vn/cert/5hnbq',
      },

      {
        title: 'WPS Certification - Ratatype - ',
        stage: '2023',
        link: 'https://www.ratatype.com/u5710910/certificate-list',
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
                  <CountUp start={0} end={5800} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Hours Of Coding
                </div>
              </div>

              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={42} duration={5} /> +
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
                key={0}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {aboutData[index].info.map((item, i) => (
              <div
                className='flex-1 flex flex-col md:flex-row mx-w-max gap-x-2 items-start text-white/90'
                key={0}
              >
                {!item.link ? (
                  <>
                    <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                    <div className='flex-shrink-0'>{item.stage}</div>
                  </>
                ) : (
                  <Link
                    href={item.link}
                    target='_blank'
                    className='flex text-sky-300 hover:underline underline-offset-2'
                  >
                    <div className='font-light mb-2 md:mb-0'>
                      {item.title} {item.stage}
                    </div>
                  </Link>
                )}
                <div className='flex gap-x-4 gap-y-2 flex-wrap max-w-[350px]'>
                  {item.icons?.map((icon: any, i) => (
                    <div
                      className='text-2xl flex flex-col border p-2 rounded-md shadow-md gap-1 items-center text-white'
                      key={0}
                    >
                      {icon[0]} <span className='text-xs'>{icon[1]}</span>
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
