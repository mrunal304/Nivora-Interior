import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import IntroOverlay from './components/IntroOverlay'
import ConsultationPopup from './components/ConsultationPopup'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import About from './pages/About'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import ThankYou from './pages/ThankYou'
import ProjectDetail from './pages/ProjectDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function AppInner() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const alreadySplashed = () => !!sessionStorage.getItem('splashShown')

  const [homeKey, setHomeKey] = useState(0)
  const [splashDone, setSplashDone] = useState(!isHome || alreadySplashed())
  const [showSplash, setShowSplash] = useState(isHome && !alreadySplashed())

  useEffect(() => {
    if (location.pathname === '/') {
      if (alreadySplashed()) {
        setShowSplash(false)
        setSplashDone(true)
      } else {
        setShowSplash(true)
        setSplashDone(false)
        setHomeKey(k => k + 1)
      }
    } else {
      setShowSplash(false)
      setSplashDone(true)
    }
  }, [location.key])

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', '1')
    setSplashDone(true)
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && (
        <IntroOverlay key={homeKey} onExitComplete={handleSplashComplete} />
      )}
      <ConsultationPopup />
      <motion.div
        animate={{ x: showSplash ? '100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        style={{ overflowX: 'hidden', minHeight: '100vh' }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><Home splashDone={splashDone} /></Layout>} />
          <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
          <Route path="/portfolio/:id" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/quote" element={<Layout><Quote /></Layout>} />
          <Route path="/thank-you" element={<Layout><ThankYou /></Layout>} />
        </Routes>
      </motion.div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
