'use client'

// icons
import { BiLogoNetlify } from 'react-icons/bi'
import {
  FaBootstrap,
  FaCss3,
  FaFigma,
  FaGithub,
  FaGitlab,
  FaGitSquare,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import { GrHeroku } from 'react-icons/gr'
import { TbApi, TbBrandReactNative } from 'react-icons/tb'

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobexd,
  SiCanva,
  SiCsharp,
  SiDocker,
  SiDotnet,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiJirasoftware,
  SiKubernetes,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiPug,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
} from 'react-icons/si'

import { BsCursor, BsFiletypeScss } from 'react-icons/bs'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import CountUp from 'react-countup'
import { IoLogoAndroid } from 'react-icons/io5'
import { RiFlutterFill } from 'react-icons/ri'
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

const ICON_SIZE = 20

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
          [<FaNodeJs size={ICON_SIZE} key={0} title='NodeJS' />, 'NodeJS'],
          [<SiNextdotjs size={ICON_SIZE} key={0} title='NextJS' />, 'NextJS'],
          [<FaReact size={ICON_SIZE} key={0} title='ReactJS' />, 'ReactJS'],
          [
            <SiExpress size={ICON_SIZE} key={0} title='ExpressJS' />,
            'ExpressJS',
          ],
          [<FaHtml5 size={ICON_SIZE} key={0} title='HTML5' />, 'HTML'],
          [<FaJs size={ICON_SIZE} key={0} title='JavaScript' />, 'JavaScript'],
          [
            <SiTypescript size={ICON_SIZE} key={0} title='TypeScript' />,
            'TypeScript',
          ],
          [<FaCss3 size={ICON_SIZE} key={0} title='CSS3' />, 'CSS3'],
          [<BsFiletypeScss size={ICON_SIZE} key={0} title='SCSS' />, 'SCSS'],
          [
            <FaBootstrap size={ICON_SIZE} key={0} title='Bootstrap' />,
            'Bootstrap',
          ],
          [
            <SiTailwindcss size={ICON_SIZE} key={0} title='Tailwindcss' />,
            'Tailwindcss',
          ],
          [<SiPug size={ICON_SIZE} key={0} title='Pug' />, 'Pug'],
          [<SiRedux size={ICON_SIZE} key={0} title='Redux' />, 'Redux'],
          [<SiMui size={ICON_SIZE} key={0} title='Material UI' />, 'UI'],
          [
            <SiFirebase size={ICON_SIZE} key={0} title='Firebase' />,
            'Firebase',
          ],
          [<SiCsharp size={ICON_SIZE} key={0} title='C#' />, 'C#'],
          [<SiDotnet size={ICON_SIZE} key={0} title='.NET' />, '.NET'],
          [<TbApi size={ICON_SIZE} key={0} title='APIs' />, 'APIs'],
        ],
      },
      {
        title: 'Mobile Development',
        icons: [
          [<SiExpo size={ICON_SIZE} key={0} title='Expo' />, 'Expo'],
          [
            <TbBrandReactNative
              size={ICON_SIZE}
              key={0}
              title='React Native'
            />,
            'React Native',
          ],
          [
            <RiFlutterFill size={ICON_SIZE} key={0} title='Flutter' />,
            'Flutter',
          ],
          [
            <IoLogoAndroid size={ICON_SIZE} key={0} title='Android' />,
            'Android',
          ],
        ],
      },
      {
        title: 'Databases',
        icons: [
          [<SiMongodb size={ICON_SIZE} key={0} title='MongoDB' />, 'MongoDB'],
          [
            <SiPostgresql size={ICON_SIZE} key={0} title='PostgreSQL' />,
            'PostgreSQL',
          ],
          [<SiMysql size={ICON_SIZE} key={0} title='MySQL' />, 'MySQL'],
        ],
      },
      {
        title: 'Management',
        icons: [
          [<FaGitSquare size={ICON_SIZE} key={0} title='Git' />, 'Git'],
          [<FaGithub size={ICON_SIZE} key={0} title='Github' />, 'Github'],
          [<FaGitlab size={ICON_SIZE} key={0} title='Gitlab' />, 'Gitlab'],
          [<SiJirasoftware size={ICON_SIZE} key={0} title='Jira' />, 'Jira'],
        ],
      },
      {
        title: 'Deployment',
        icons: [
          [<SiVercel size={ICON_SIZE} key={0} title='Vercel' />, 'Vercel'],
          [
            <BiLogoNetlify size={ICON_SIZE} key={0} title='Netlify' />,
            'Netlify',
          ],
          [<GrHeroku size={ICON_SIZE} key={0} title='Heroku' />, 'Heroku'],
          [<SiDocker size={ICON_SIZE} key={0} title='Docker' />, 'Docker'],
          [
            <SiKubernetes size={ICON_SIZE} key={0} title='Kubernetes' />,
            'Kubernetes',
          ],
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [
          [<FaFigma size={ICON_SIZE} key={0} title='Figma' />, 'Figma'],
          [<SiCanva size={ICON_SIZE} key={0} title='Canva' />, 'Canva'],
          [
            <SiAdobephotoshop
              size={ICON_SIZE}
              key={0}
              title='Adobe Photoshop'
            />,
            'Adobe Photoshop',
          ],
          [
            <SiAdobeillustrator
              size={ICON_SIZE}
              key={0}
              title='Adobe Illustrator'
            />,
            'Adobe Illustrator',
          ],
          [
            <SiAdobepremierepro
              size={ICON_SIZE}
              key={0}
              title='Adobe Premiere Pro'
            />,
            'Adobe Premiere Pro',
          ],
          [<SiAdobexd size={ICON_SIZE} key={0} title='Adobe XD' />, 'Adobe XD'],
        ],
      },
      {
        title: 'Tools',
        icons: [
          [
            <SiVisualstudiocode size={ICON_SIZE} key={0} title='VSCode' />,
            'VSCode',
          ],
          [<SiPostman size={ICON_SIZE} key={0} title='Postman' />, 'Postman'],
          [<BsCursor size={ICON_SIZE} key={0} title='Cursor' />, 'Cursor'],
        ],
      },
    ],
  },
  {
    title: 'Experience',
    info: [
      {
        title: 'Rikkeisoft HCM',
        stage: '2025 - Present',
      },
    ],
  },
  {
    title: 'Education',
    info: [
      {
        title:
          'Ho Chi Minh City University of Foreign Language And Information Technology (HUFLIT)',
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

      <div className='relative z-10 container mx-auto h-full flex flex-col items-center xl:flex-row xl:items-start gap-x-6 max-w-[1200px]'>
        <div className='w-full xl:w-[50%] flex flex-col justify-center'>
          <motion.h2
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 z-10 mt-8 xl:mt-0'
          >
            Captivating <span className='text-accent'>stories</span> birth
            magnifcent designs.
          </motion.h2>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-white/80'
          >
            {new Date().getFullYear() - 2019} years ago I discovered my passion
            for programming when I was a high school student and from there I
            had to sacrifice many things to become a full stack developer at the
            age of 18.
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
                  <CountUp start={0} end={6} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Years of experience
                </div>
              </div>

              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={6000} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Hours Of Coding
                </div>
              </div>

              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={34} duration={5} /> +
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
          className='flex flex-col w-full xl:w-[50%] overflow-scroll no-scrollbar relative z-10'
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
                      className='text-2xl flex justify-center flex-col border p-1.5 rounded-md shadow-md gap-1 items-center text-white'
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
