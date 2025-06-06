import { motion } from 'framer-motion'

const transitionVariants = {
  initial: {
    width: '100%',
    x: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
}

const Transition = () => {
  return (
    <>
      <motion.div
        className='fixed top-0 bottom-0 right-full h-screen z-40 bg-accent/90'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0, duration: 0.4, ease: 'easeInOut' }}
      />

      <motion.div
        className='fixed top-0 bottom-0 right-full h-screen z-30 bg-accent/60'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.2, duration: 0.4, ease: 'easeInOut' }}
      />
      <motion.div
        className='fixed top-0 bottom-0 right-full h-screen z-20 bg-accent/30'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.4, duration: 0.4, ease: 'easeInOut' }}
      />
    </>
  )
}

export default Transition
