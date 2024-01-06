import Layout from '../components/Layout'
import Transition from '../components/Transition'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const pathname = usePathname()

  return (
    <Layout>
      <AnimatePresence mode='wait'>
        <motion.div key={pathname}>
          <Transition />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}

export default App
