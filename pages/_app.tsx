import AppProvider from '@/context/AppContext'
import '@/styles/globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Layout from '../components/Layout'
import Transition from '../components/Transition'

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const pathname = usePathname()

  return (
    <AppProvider>
      <Layout>
        <AnimatePresence mode='wait'>
          <motion.div key={pathname}>
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </AppProvider>
  )
}

export default App
