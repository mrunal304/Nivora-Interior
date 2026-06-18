import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import IntroOverlay from './components/IntroOverlay'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import About from './pages/About'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import ThankYou from './pages/ThankYou'
import ProjectDetail from './pages/ProjectDetail'
import ServiceCategory from './pages/ServiceCategory'
import ResidentialInteriors from './pages/ResidentialInteriors'
import ResidentialEnquiry from './pages/ResidentialEnquiry'
import CommercialInteriors from './pages/CommercialInteriors'

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

export default function App() {
  return (
    <BrowserRouter>
      <IntroOverlay />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/portfolio/:id" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/services/residential/enquiry" element={<Layout><ResidentialEnquiry /></Layout>} />
        <Route path="/services/residential" element={<Layout><ResidentialInteriors /></Layout>} />
        <Route path="/services/commercial" element={<Layout><CommercialInteriors /></Layout>} />
        <Route path="/services/:category" element={<Layout><ServiceCategory /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/quote" element={<Layout><Quote /></Layout>} />
        <Route path="/thank-you" element={<Layout><ThankYou /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
