import { Link } from 'react-router-dom'
import imgCalista from '@assets/3_(1)_1781792140739.jpg'
import imgNeelaya from '@assets/11_1781792153281.png'
import imgSparsh from '@assets/6_(1)_1781792222998.jpg'
import imgOffice from '@assets/16_1781792239759.jpg'
import imgAurelia from '@assets/2_(2)_1781792402795.jpg'
import imgUrban from '@assets/3_(2)_1781792428831.jpg'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Home as HomeIcon, Building2, Coffee, Layers, Monitor, Gem, Wrench } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ProcessSection from '../components/ProcessSection'
import { useState, useRef, useEffect, useCallback } from 'react'
import { projects } from '../data/projects'

const heroImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85'

const portfolioProjects = [
  {
    id: 'calista-residence',
    name: 'Calista Residence',
    location: 'Juhu, Mumbai',
    category: 'Residential',
    serviceHref: '/services/residential',
    desc: 'A warm family home brought to life with marble surfaces, rich walnut joinery and considered lighting that shifts with the day.',
    img: imgCalista,
  },
  {
    id: 'neelaya-villa',
    name: 'Neelaya Villa',
    location: 'Lonavala, Pune',
    category: 'Residential',
    serviceHref: '/services/residential',
    desc: 'Double-height living volumes filled with natural light, statement chandelier and bespoke teal upholstery set against cream walls.',
    img: imgNeelaya,
  },
  {
    id: 'sparsh-living',
    name: 'Sparsh Living',
    location: 'Baner, Pune',
    category: 'Residential',
    serviceHref: '/services/residential',
    desc: 'A playful yet refined modular kitchen in blush rose gloss, framed by an arched passage into a warmly lit living space.',
    img: imgSparsh,
  },
  {
    id: 'modern-industrial-office',
    name: 'Modern Industrial Office',
    location: 'Lower Parel, Mumbai',
    category: 'Commercial',
    serviceHref: '/services/commercial',
    desc: 'A skyline terrace redesigned as an intimate outdoor retreat — stone floors, teak ceilings and lush greenery under city skies.',
    img: imgOffice,
  },
  {
    id: 'aurelia-penthouse',
    name: 'Aurelia Penthouse',
    location: 'Worli, Mumbai',
    category: 'Residential',
    serviceHref: '/services/residential',
    desc: 'Elegant classic-contemporary living with a curved sectional, marble coffee table and layered drapery drawing in abundant daylight.',
    img: imgAurelia,
  },
  {
    id: 'urban-serenity',
    name: 'Urban Serenity',
    location: 'Koregaon Park, Pune',
    category: 'Residential',
    serviceHref: '/services/residential',
    desc: 'Arched niches in warm ivory, backlit fluted panels and a floating walnut console make this media wall a quiet centrepiece.',
    img: imgUrban,
  },
]
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 3.3,
      staggerChildren: 0.18,
    },
  },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] },
  },
}

const heroItalicVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] },
  },
}

const transformations = [
  {
    id: 1,
    title: 'Living Room Refresh',
    beforeImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    beforeDesc: 'Dark layout with limited functionality, heavy drapery and dated finishes that reduced natural light.',
    afterDesc: 'Bright, airy interiors with custom joinery, layered lighting and a refined modern aesthetic.',
  },
  {
    id: 2,
    title: 'Master Bedroom Redesign',
    beforeImg: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    beforeDesc: 'Generic finishes, sparse furniture and poor spatial planning that felt impersonal and flat.',
    afterDesc: 'Warm textures, bespoke headboard, ambient lighting and a cohesive palette that feels like a boutique retreat.',
  },
  {
    id: 3,
    title: 'Kitchen Transformation',
    beforeImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    beforeDesc: 'Outdated cabinetry, inefficient workflow and ageing surfaces that lacked storage and style.',
    afterDesc: 'Streamlined handleless cabinetry, stone countertops, integrated appliances and smart lighting throughout.',
  },
  {
    id: 4,
    title: 'Home Office Elevation',
    beforeImg: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    beforeDesc: 'A cluttered, uninspiring workspace with no acoustic treatment, poor ergonomics and no sense of identity.',
    afterDesc: 'Tailored desk setup, concealed storage, warm wood tones and soundproofing for focused, elegant productivity.',
  },
  {
    id: 5,
    title: 'Dining Room Revival',
    beforeImg: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=800&q=80',
    beforeDesc: 'A dated dining arrangement with mismatched furniture, poor lighting and no focal point.',
    afterDesc: 'Statement dining table, pendant lighting, upholstered chairs and a curated art wall that anchors the room.',
  },
]

const igPosts = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
]

const stats: { value: string; label: string }[] = []

const services = [
  {
    num: '01',
    title: 'Residential Interiors',
    desc: 'Thoughtfully designed homes that reflect personality, lifestyle and everyday comfort.',
    href: '/services/residential',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85',
    icon: HomeIcon,
  },
  {
    num: '02',
    title: 'Commercial Interiors',
    desc: 'Functional workspaces, offices and retail environments designed for performance.',
    href: '/services/commercial',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85',
    icon: Building2,
  },
  {
    num: '03',
    title: 'Hospitality Interiors',
    desc: 'Hotels, cafés and guest experiences crafted to feel memorable and welcoming.',
    href: '/services/hospitality',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85',
    icon: Coffee,
  },
  {
    num: '04',
    title: 'Architecture & Space Planning',
    desc: 'Layouts, planning and built forms that connect aesthetics with purpose.',
    href: '/services/architecture',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85',
    icon: Layers,
  },
  {
    num: '05',
    title: '2D & 3D Visualization',
    desc: 'Concept drawings, renders and visual development before execution begins.',
    href: '/services/visualization',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    icon: Monitor,
  },
  {
    num: '06',
    title: 'Developer Solutions',
    desc: 'Sample flats, amenities and curated experiences that enhance property value.',
    href: '/services/developer',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85',
    icon: Gem,
  },
  {
    num: '07',
    title: 'Renovation & Makeovers',
    desc: 'Transform existing spaces through upgrades, modernization and thoughtful redesign.',
    href: '/services/renovation',
    img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=85',
    icon: Wrench,
  },
]


const testimonials = [
  {
    stars: 5,
    text: 'NIVORA completely transformed our apartment in Bandra. What struck us most was how well Shweta understood what we wanted before we could even articulate it ourselves. The final space feels like us — calm, warm, and beautifully considered.',
    name: 'Priya & Rohan Khanna',
    location: 'Bandra West, Mumbai',
    project: 'RESIDENTIAL — 3BHK APARTMENT',
    initials: 'PK',
  },
  {
    stars: 5,
    text: 'Shweta has an extraordinary ability to translate a vague feeling into a very precise space. We came to her with mood boards and half-formed ideas, and she turned them into a home that is exactly what we wanted — and more.',
    name: 'Ananya & Siddharth Mehta',
    location: 'Juhu, Mumbai',
    project: 'RESIDENTIAL — PENTHOUSE',
    initials: 'AM',
  },
  {
    stars: 5,
    text: 'Working with NIVORA on our co-working space was an excellent decision. They understood exactly what a creative workspace should feel like — productive but never sterile, professional but warm.',
    name: 'Nikhil Desai',
    location: 'Winjuvadi, Pune',
    project: 'COMMERCIAL — CO-WORKING SPACE',
    initials: 'ND',
  },
  {
    stars: 5,
    text: 'Our café has become one of the most photographed spots in Pune. Every corner was designed with intention. The team was professional, transparent, and genuinely talented. What they delivered exceeded everything we imagined.',
    name: 'Aditya Shinde',
    location: 'FC Road, Pune',
    project: 'COMMERCIAL — CAFE INTERIOR',
    initials: 'AS',
  },
  {
    stars: 5,
    text: 'Our showroom went from generic to extraordinary. The design draws people in from the street and makes them linger. We have had multiple clients mention how beautiful the space is before they even look at the products.',
    name: 'Kavya Nair',
    location: 'Andheri, Mumbai',
    project: 'COMMERCIAL — LUXURY SHOWROOM',
    initials: 'KN',
  },
  {
    stars: 5,
    text: 'The turnkey process was seamless. We handed over the keys and came back to a completed home that required no corrections, no touch-ups, and no follow-ups. That kind of reliability is rare.',
    name: 'Swati & Arjun Kulkarni',
    location: 'Thane, Mumbai',
    project: 'RESIDENTIAL — STUDIO APARTMENT',
    initials: 'SK',
  },
  {
    stars: 5,
    text: 'Nivora took my vision and refined it into something I never thought possible. Their material selection is impeccable.',
    name: 'Aditi R.',
    location: 'Ambernath',
    project: 'RESIDENTIAL — HOME INTERIOR',
    initials: 'AR',
  },
]

const statsData = [
  { value: 12,  from: 8,   suffix: '+', label: 'Years Experience' },
  { value: 250, from: 180, suffix: '+', label: 'Projects Completed' },
  { value: 200, from: 150, suffix: '+', label: 'Clients Served' },
  { value: 98,  from: 90,  suffix: '%', label: 'Client Satisfaction' },
]

function StatsSection() {
  const [counts, setCounts] = useState(statsData.map(s => s.value))
  const [shimmer, setShimmer] = useState(statsData.map(() => false))
  const [started, setStarted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const cleanups: (() => void)[] = []

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          statsData.forEach((stat, i) => {
            const duration = 1800
            const steps = 60
            let step = 0
            const range = stat.value - stat.from
            setCounts(prev => { const n = [...prev]; n[i] = stat.from; return n })
            const countUp = setInterval(() => {
              step++
              const eased = 1 - Math.pow(1 - step / steps, 3)
              const val = Math.min(Math.round(stat.from + eased * range), stat.value)
              setCounts(prev => { const n = [...prev]; n[i] = val; return n })
              if (step >= steps) {
                clearInterval(countUp)

                const cycleInterval = 4200 + i * 1100

                const runCycle = () => {
                  // Trigger shimmer sweep
                  setShimmer(prev => { const n = [...prev]; n[i] = true; return n })
                  const shimmerOff = setTimeout(() => {
                    setShimmer(prev => { const n = [...prev]; n[i] = false; return n })
                  }, 900)
                  cleanups.push(() => clearTimeout(shimmerOff))

                  // Dip down 2 then ease back to target
                  const dip = 2
                  const totalSteps = 28
                  let s = 0
                  const dipTimer = setInterval(() => {
                    s++
                    const p = s / totalSteps
                    let v: number
                    if (p < 0.35) {
                      // ease down
                      const down = p / 0.35
                      v = Math.round(stat.value - dip * (1 - Math.pow(1 - down, 2)))
                    } else {
                      // ease back up
                      const up = (p - 0.35) / 0.65
                      const eased = 1 - Math.pow(1 - up, 3)
                      v = Math.round((stat.value - dip) + dip * eased)
                    }
                    v = Math.min(Math.max(v, stat.value - dip), stat.value)
                    setCounts(prev => { const n = [...prev]; n[i] = v; return n })
                    if (s >= totalSteps) {
                      clearInterval(dipTimer)
                      setCounts(prev => { const n = [...prev]; n[i] = stat.value; return n })
                    }
                  }, 38)
                  cleanups.push(() => clearInterval(dipTimer))
                }

                const startDelay = setTimeout(() => {
                  runCycle()
                  const loop = setInterval(runCycle, cycleInterval)
                  cleanups.push(() => clearInterval(loop))
                }, 3200 + i * 900)
                cleanups.push(() => clearTimeout(startDelay))
              }
            }, duration / steps)
            cleanups.push(() => clearInterval(countUp))
          })
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cleanups.forEach(fn => fn())
    }
  }, [started])

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      marginTop: -68,
      padding: '0 1.5rem 56px',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <style>{`
        .stat-float-card {
          max-width: 1100px;
          width: 100%;
          background: linear-gradient(135deg, #384F2E 0%, #49613B 50%, #384F2E 100%);
          border-radius: 24px;
          box-shadow: 0 28px 80px rgba(0,0,0,0.30), 0 6px 22px rgba(0,0,0,0.14);
          display: flex;
          align-items: stretch;
          overflow: hidden;
        }
        .stat-float-item {
          flex: 1;
          text-align: center;
          padding: 48px 28px 44px;
          position: relative;
          cursor: default;
          transition: background 0.35s ease;
        }
        .stat-float-item + .stat-float-item {
          border-left: 1px solid rgba(201,169,110,0.13);
        }
        .stat-float-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A96E 50%, transparent);
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
          border-radius: 2px;
        }
        .stat-float-item:hover {
          background: rgba(255,255,255,0.04);
        }
        .stat-float-item:hover::after {
          width: 52%;
        }
        @keyframes stat-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .stat-float-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.75rem, 4.2vw, 4.25rem);
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          transition: color 0.25s ease;
          position: relative;
          display: inline-block;
        }
        .stat-float-num.shimmer-active {
          background: linear-gradient(
            105deg,
            #f5f0e8 0%,
            #f5f0e8 35%,
            rgba(255,255,255,0.92) 48%,
            #e8d5b0 52%,
            #f5f0e8 65%,
            #f5f0e8 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: stat-shimmer 0.85s ease-in-out forwards;
        }
        .stat-float-item:hover .stat-float-num {
          color: #ffffff;
        }
        .stat-float-label {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 4.5px;
          text-transform: uppercase;
          color: rgba(201,169,110,0.60);
          transition: color 0.25s ease;
        }
        .stat-float-item:hover .stat-float-label {
          color: rgba(201,169,110,0.90);
        }
        @media (max-width: 640px) {
          .stat-float-card {
            flex-wrap: wrap;
            border-radius: 18px;
          }
          .stat-float-item {
            flex: 0 0 50%;
            padding: 36px 16px 32px;
          }
          .stat-float-item + .stat-float-item {
            border-left: none;
          }
          .stat-float-item:nth-child(2n) {
            border-left: 1px solid rgba(201,169,110,0.13);
          }
          .stat-float-item:nth-child(n+3) {
            border-top: 1px solid rgba(201,169,110,0.13);
          }
        }
      `}</style>
      <div ref={cardRef} className="stat-float-card">
        {statsData.map((stat, i) => (
          <div key={stat.label} className="stat-float-item">
            <div className={`stat-float-num${shimmer[i] ? ' shimmer-active' : ''}`}>
              {counts[i]}{stat.suffix}
            </div>
            <div className="stat-float-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompareSlider({ beforeImg, afterImg, title }: { beforeImg: string; afterImg: string; title: string }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const wigglePlayedRef = useRef(false)
  const wiggleCancelledRef = useRef(false)
  const wiggleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [wiggleX, setWiggleX] = useState(0)
  const [handleScale, setHandleScale] = useState(1)
  const [beforeHover, setBeforeHover] = useState(false)
  const [afterHover, setAfterHover] = useState(false)

  const cancelWiggle = () => {
    wigglePlayedRef.current = true
    wiggleCancelledRef.current = true
    if (wiggleTimerRef.current) clearTimeout(wiggleTimerRef.current)
    setWiggleX(0)
  }

  useEffect(() => {
    wiggleCancelledRef.current = false
    wiggleTimerRef.current = setTimeout(async () => {
      if (draggingRef.current || wigglePlayedRef.current) return
      wigglePlayedRef.current = true
      const frames = [15, -15, 13, -13, 8, -8, 3, -3, 0]
      for (const x of frames) {
        if (wiggleCancelledRef.current) { setWiggleX(0); return }
        setWiggleX(x)
        await new Promise(r => setTimeout(r, 130))
      }
      setWiggleX(0)
    }, 1500)
    return () => {
      if (wiggleTimerRef.current) clearTimeout(wiggleTimerRef.current)
      wiggleCancelledRef.current = true
    }
  }, [])

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(2, Math.min(clientX - rect.left, rect.width - 2))
    setPos((x / rect.width) * 100)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    cancelWiggle()
    draggingRef.current = true
    setHandleScale(1.15)
    updatePos(e.clientX)
    e.preventDefault()
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return
    updatePos(e.clientX)
  }
  const onMouseUp = () => {
    draggingRef.current = false
    setHandleScale(1)
  }
  const onTouchStart = (e: React.TouchEvent) => {
    cancelWiggle()
    draggingRef.current = true
    setHandleScale(1.15)
    updatePos(e.touches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return
    e.stopPropagation()
    updatePos(e.touches[0].clientX)
  }
  const onTouchEnd = () => {
    draggingRef.current = false
    setHandleScale(1)
  }

  const labelBase: React.CSSProperties = {
    position: 'absolute',
    bottom: 16,
    zIndex: 6,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    fontSize: 9,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: '#C8A56A',
    background: 'rgba(250,248,244,0.92)',
    border: '1px solid rgba(200,165,106,0.55)',
    padding: '5px 12px',
    borderRadius: 100,
    backdropFilter: 'blur(4px)',
    pointerEvents: 'auto',
    cursor: 'default',
    transition: 'opacity 0.2s ease, filter 0.2s ease',
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        touchAction: 'pan-y',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* After image — base layer */}
      <img
        src={afterImg}
        alt={`After — ${title}`}
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />

      {/* Before image — clipped to left of divider */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, pointerEvents: 'none' }}>
        <img
          src={beforeImg}
          alt={`Before — ${title}`}
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Bottom gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(10,8,6,0.38) 100%)', pointerEvents: 'none', zIndex: 3 }} />

      {/* Divider line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: `${pos}%`, transform: 'translateX(-50%)',
        width: 2,
        background: 'rgba(255,255,255,0.88)',
        pointerEvents: 'none',
        zIndex: 4,
        boxShadow: '0 0 8px rgba(0,0,0,0.25)',
      }} />

      {/* Drag handle — wiggle + scale animations via inline transform */}
      <div style={{
        position: 'absolute',
        top: '50%', left: `${pos}%`,
        transform: `translate(-50%, -50%) translateX(${wiggleX}px) scale(${handleScale})`,
        width: 46, height: 46,
        borderRadius: '50%',
        background: '#fff',
        border: '2px solid rgba(200,165,106,0.85)',
        boxShadow: '0 2px 18px rgba(0,0,0,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 5,
        transition: 'transform 120ms ease',
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C8A56A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 5l-4 7 4 7M16 5l4 7-4 7" />
        </svg>
      </div>

      {/* BEFORE label — bottom left */}
      <span
        style={{ ...labelBase, left: 16, opacity: beforeHover ? 1 : 0.72, filter: beforeHover ? 'brightness(1.18)' : 'brightness(1)' }}
        onMouseEnter={() => setBeforeHover(true)}
        onMouseLeave={() => setBeforeHover(false)}
      >Before</span>

      {/* AFTER label — bottom right */}
      <span
        style={{ ...labelBase, right: 16, opacity: afterHover ? 1 : 0.72, filter: afterHover ? 'brightness(1.18)' : 'brightness(1)' }}
        onMouseEnter={() => setAfterHover(true)}
        onMouseLeave={() => setAfterHover(false)}
      >After</span>
    </div>
  )
}

function TransformationCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = transformations.length

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + count) % count)
  }, [count])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(p => (p + 1) % count)
    }, 7000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [count])

  const t = transformations[current]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
      <style>{`
        .trf-card { border-radius: 20px; background: #fff; box-shadow: 0 8px 48px rgba(38,36,33,0.09), 0 2px 12px rgba(38,36,33,0.05); overflow: hidden; }
        .trf-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #E8DED1; border: none; cursor: pointer; padding: 0;
          transition: background 300ms ease, transform 300ms ease;
        }
        .trf-dot.active { background: #C8A56A; transform: scale(1.3); }
        .trf-nav {
          width: 44px; height: 44px; border-radius: 50%; border: 1px solid #E8DED1;
          background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: border-color 250ms ease, background 250ms ease;
        }
        .trf-nav:hover { border-color: #C8A56A; background: #FAF8F4; }
      `}</style>

      {/* Fade-transition card */}
      <div className="trf-card" style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Drag-to-reveal comparison slider */}
            <CompareSlider beforeImg={t.beforeImg} afterImg={t.afterImg} title={t.title} />

            {/* Description block */}
            <div style={{ padding: '1.75rem 2.25rem 2rem', borderTop: '1px solid #F5F1EA' }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 400,
                fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', color: '#262421',
                margin: '0 0 1.1rem', letterSpacing: '-0.01em',
              }}>{t.title}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 2rem' }}>
                <div>
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 9,
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: 'rgba(38,36,33,0.35)', margin: '0 0 0.5rem',
                  }}>Before</p>
                  <p style={{
                    fontFamily: "'Lora', serif", fontWeight: 300, fontSize: 15.5,
                    color: 'rgba(38,36,33,0.55)', lineHeight: 1.8, margin: 0,
                  }}>{t.beforeDesc}</p>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 9,
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: '#C8A56A', margin: '0 0 0.5rem',
                  }}>After</p>
                  <p style={{
                    fontFamily: "'Lora', serif", fontWeight: 300, fontSize: 15.5,
                    color: 'rgba(38,36,33,0.72)', lineHeight: 1.8, margin: 0,
                  }}>{t.afterDesc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: '2.25rem' }}>
        <button className="trf-nav" onClick={() => goTo(current - 1)} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#262421" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {transformations.map((_, i) => (
            <button key={i} className={`trf-dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <button className="trf-nav" onClick={() => goTo(current + 1)} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#262421" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Slide counter */}
      <p style={{
        textAlign: 'center', marginTop: '1rem',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 11,
        letterSpacing: '0.2em', color: 'rgba(38,36,33,0.3)',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </p>
    </div>
  )
}


function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 })
  const [activeCity, setActiveCity] = useState<'Mumbai' | 'Pune'>('Mumbai')

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: parallaxY, position: 'absolute', inset: '-12% 0', zIndex: 0 }}
      >
        <img
          src={heroImg}
          alt="NIVORA Interiors"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
          loading="eager"
        />
      </motion.div>

      {/* Layered gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(20,32,18,0.35) 0%, rgba(20,32,18,0.55) 40%, rgba(20,32,18,0.78) 75%, rgba(20,32,18,0.92) 100%)',
      }} />

      {/* Subtle vignette — edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,18,9,0.45) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Vertical studio label — left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        style={{
          position: 'absolute', left: 36, top: '50%', zIndex: 10,
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          fontFamily: "'Cinzel', serif",
          fontSize: 9,
          letterSpacing: '0.35em',
          color: 'rgba(184,150,106,0.45)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
        className="hidden lg:block"
      >
        Boutique Interior Studio
      </motion.div>

      {/* Vertical year label — right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        style={{
          position: 'absolute', right: 36, top: '50%', zIndex: 10,
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center center',
          fontFamily: "'Cinzel', serif",
          fontSize: 9,
          letterSpacing: '0.35em',
          color: 'rgba(184,150,106,0.45)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
        className="hidden lg:block"
      >
        Mumbai &nbsp;&amp;&nbsp; Pune
      </motion.div>

      {/* Centre content — staggered entrance, starts after intro overlay is fully gone */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto', width: '100%' }}
      >

        {/* 1. Location tabs */}
        <motion.div
          variants={heroItemVariants}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 32 }}
        >
          {(['Mumbai', 'Pune'] as const).map(city => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeCity === city ? '2px solid #C9A96E' : '2px solid transparent',
                paddingBottom: 6,
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: activeCity === city ? '#ffffff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              {city}
            </button>
          ))}
        </motion.div>

        {/* 2. "Thoughtfully Designed" */}
        <motion.h1
          variants={heroItemVariants}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(46px, 7vw, 88px)',
            lineHeight: 1.05,
            color: '#f5f0e8',
            letterSpacing: '-0.01em',
            marginBottom: 8,
          }}
        >
          Thoughtfully Designed
        </motion.h1>

        {/* 3. "Interiors —" */}
        <motion.h1
          variants={heroItemVariants}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(46px, 7vw, 88px)',
            lineHeight: 1.05,
            color: '#f5f0e8',
            letterSpacing: '-0.01em',
            marginBottom: 12,
          }}
        >
          Interiors —
        </motion.h1>

        {/* 4. "That Feel Effortless" — fade + slide + scale 0.95→1 */}
        <motion.h1
          variants={heroItalicVariants}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(46px, 7vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: 32,
          }}
        >
          <em className="hero-italic-reveal" style={{ color: '#b8966a', fontStyle: 'italic' }}>That Feel Effortless</em>
        </motion.h1>

        {/* 5. Supporting copy */}
        <motion.p
          variants={heroItemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'rgba(245,240,232,0.58)',
            lineHeight: 1.8,
            maxWidth: 520,
            margin: '0 auto 48px',
          }}
        >
          We design homes and workspaces that are beautiful, functional, and built for everyday living.
        </motion.p>

        {/* 6. CTA buttons */}
        <motion.div
          variants={heroItemVariants}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.25 }}>
            <Link
              to="/quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #E0C38A 0%, #C8A46A 50%, #A8854F 100%)',
                color: '#2D3E29',
                fontWeight: 600,
                padding: '17px 40px',
                textDecoration: 'none',
                transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease',
                boxShadow: '0 4px 24px rgba(168,133,79,0.35)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'linear-gradient(135deg, #EDD09A 0%, #D4B078 50%, #B8904E 100%)'
                el.style.boxShadow = '0 8px 32px rgba(168,133,79,0.50)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'linear-gradient(135deg, #E0C38A 0%, #C8A46A 50%, #A8854F 100%)'
                el.style.boxShadow = '0 4px 24px rgba(168,133,79,0.35)'
              }}
            >
              Book Free Consultation
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.25 }}>
            <Link
              to="/portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: '#D4C0A1',
                padding: '16px 40px',
                border: '1px solid rgba(212,192,161,0.45)',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = '#C8A46A'
                el.style.color = '#C8A46A'
                el.style.boxShadow = '0 0 18px rgba(200,164,106,0.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(212,192,161,0.45)'
                el.style.color = '#D4C0A1'
                el.style.boxShadow = 'none'
              }}
            >
              View Projects <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.0 }}
        style={{
          position: 'absolute',
          bottom: 64,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: 0,
          width: '100%',
          maxWidth: 680,
          padding: '0 24px',
          justifyContent: 'center',
        }}
        className="hero-stats"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: 'center',
              flex: '1 1 0',
              padding: '0 16px',
              borderLeft: i > 0 ? '1px solid rgba(184,150,106,0.2)' : 'none',
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 300,
              color: '#b8966a',
              lineHeight: 1,
              marginBottom: 6,
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: 'rgba(245,240,232,0.38)',
              textTransform: 'uppercase',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator — animated line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="scroll-indicator-bounce"
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 8,
          letterSpacing: '0.4em',
          color: 'rgba(184,150,106,0.5)',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <div style={{ position: 'relative', width: 1, height: 40, background: 'rgba(184,150,106,0.15)', overflow: 'hidden' }}>
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: 'rgba(184,150,106,0.7)' }}
          />
        </div>
      </motion.div>

      {/* Responsive stats hide on small screens + hero keyframes */}
      <style>{`
        @media (max-width: 640px) {
          .hero-stats { display: none !important; }
        }
        @keyframes heroItalicReveal {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-italic-reveal {
          display: inline-block;
          opacity: 0;
          animation: heroItalicReveal 0.6s ease-out 0.3s forwards;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
        .scroll-indicator-bounce {
          animation: scrollBounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

function CarouselCard({ t, isCenter, slideKey, visibleCount }: { t: typeof testimonials[0]; isCenter?: boolean; slideKey?: number; visibleCount?: number }) {
  const showHighlight = visibleCount === 3
  return (
    <div style={{
      background: '#f5f2ed',
      border: '1.5px solid #21291a',
      borderRadius: 6,
      padding: '24px 28px',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 300ms ease, opacity 300ms ease',
      transform: showHighlight && isCenter ? 'scale(1.02)' : 'scale(1.0)',
      opacity: showHighlight && !isCenter ? 0.85 : 1,
    }}>
      {/* Linen texture overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, borderRadius: 6,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '160px 160px', opacity: 0.04, pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Decorative quote mark */}
      <span key={slideKey} style={{
        position: 'absolute', top: 12, right: 18, fontSize: 72, lineHeight: 1,
        color: '#21291a', fontFamily: "'Playfair Display', serif",
        opacity: 0.1, pointerEvents: 'none', userSelect: 'none', zIndex: 1,
        animation: 'quoteEntrance 350ms ease-out 200ms both',
      }}>"</span>
      {/* Content above texture */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Stars */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
          {Array.from({ length: t.stars }).map((_, i) => (
            <span key={i} style={{ fontSize: 14, color: '#a18661', lineHeight: 1 }}>★</span>
          ))}
        </div>
        {/* Quote */}
        <p style={{
          fontFamily: "'Lora', serif", fontStyle: 'italic',
          fontSize: 15, lineHeight: 1.6, color: '#2c2c2c',
          margin: '0 0 20px', flex: 1,
        }}>"{t.text}"</p>
        {/* Divider */}
        <div style={{ width: 36, height: 1, background: '#a18661', marginBottom: 18, flexShrink: 0 }} />
        {/* Client info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: '#a18661', color: '#21291a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 12, flexShrink: 0,
          }}>{t.initials}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: 13, color: '#21291a', margin: 0 }}>{t.name}</p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                fontFamily: "'Montserrat', sans-serif", fontSize: 8, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#a18661',
                background: 'rgba(161,134,97,0.1)', border: '1px solid rgba(161,134,97,0.35)',
                borderRadius: 3, padding: '2px 5px', lineHeight: 1,
              }}>
                <svg width="7" height="7" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="6" cy="6" r="5.25" stroke="#a18661" strokeWidth="1.2"/>
                  <path d="M3.8 6.1L5.4 7.8L8.4 4.2" stroke="#a18661" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verified Client
              </span>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6d5a41', margin: '3px 0 0' }}>{t.location}</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(109,90,65,0.6)', margin: '2px 0 0' }}>{t.project}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [slideKey, setSlideKey] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const maxIndexRef = useRef(0)

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) setContainerWidth(viewportRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [])

  const GAP = 20
  const visibleCount = containerWidth > 0 && containerWidth < 640 ? 1 : 3
  const cardWidth = containerWidth > 0 ? (containerWidth - GAP * (visibleCount - 1)) / visibleCount : 0
  const count = testimonials.length
  const maxIndex = Math.max(0, count - visibleCount)
  maxIndexRef.current = maxIndex

  const advance = () => {
    setCurrent(c => (c >= maxIndexRef.current ? 0 : c + 1))
    setSlideKey(k => k + 1)
  }

  const retreat = () => {
    setCurrent(c => (c <= 0 ? maxIndexRef.current : c - 1))
    setSlideKey(k => k + 1)
  }

  const startAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    autoScrollRef.current = setInterval(advance, 4000)
  }

  useEffect(() => {
    startAutoScroll()
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    }
  }, [])

  const prev = () => {
    retreat()
    startAutoScroll()
  }

  const next = () => {
    advance()
    startAutoScroll()
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    startAutoScroll()
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: '#283b22', padding: '80px 0' }}
    >
      <style>{`
        .htc-read-more {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f5f2ed;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .htc-read-more::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #f5f2ed;
          transition: width 0.3s ease;
        }
        .htc-read-more:hover::after { width: 100%; }
        .htc-arrow {
          display: inline-flex;
          align-items: center;
          transition: transform 0.25s ease;
        }
        .htc-read-more:hover .htc-arrow { transform: translateX(4px); }
        .htc-nav {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(161,134,97,0.35);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a18661;
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .htc-nav:hover {
          border-color: #a18661;
          background: rgba(161,134,97,0.1);
          color: #c8a96e;
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes quoteEntrance {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Heading */}
        <FadeIn className="text-center" style={{ marginBottom: 56 }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#a18661', marginBottom: 14,
          }}>Client Stories</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 400,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#f5f2ed', margin: '0 0 16px',
          }}>What Clients Say</h2>
          <p style={{
            fontFamily: "'Lora', serif", fontWeight: 300, fontSize: 15,
            color: 'rgba(245,242,237,0.75)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75,
          }}>
            Every project is a relationship. These are the words of people who trusted us with their spaces.
          </p>
        </FadeIn>

        {/* Carousel: arrow + viewport + arrow */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'flex', alignItems: 'stretch', gap: 16 }}
        >

          <button className="htc-nav" onClick={prev} aria-label="Previous testimonial" style={{ alignSelf: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>

          <div ref={viewportRef} style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{
              display: 'flex',
              gap: GAP,
              transform: `translateX(${cardWidth > 0 ? -(current * (cardWidth + GAP)) : 0}px)`,
              transition: 'transform 500ms ease-in-out',
              willChange: 'transform',
              alignItems: 'stretch',
            }}>
              {testimonials.map((t, i) => {
                const posInView = i - current
                const isCenter = visibleCount === 3 && posInView === 1
                const isVisible = posInView >= 0 && posInView < visibleCount
                const animDelay = isVisible ? posInView * 100 : 0
                return (
                  <div
                    key={`${slideKey}-${i}`}
                    style={{
                      width: cardWidth > 0 ? cardWidth : undefined,
                      minWidth: cardWidth > 0 ? cardWidth : undefined,
                      flexShrink: 0,
                      animation: isVisible ? `cardEntrance 400ms ease-out ${animDelay}ms both` : undefined,
                    }}
                  >
                    <CarouselCard t={t} isCenter={isCenter} slideKey={slideKey} visibleCount={visibleCount} />
                  </div>
                )
              })}
            </div>
          </div>

          <button className="htc-nav" onClick={next} aria-label="Next testimonial" style={{ alignSelf: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
          <div style={{ width: 200, height: 2, background: 'rgba(245,242,237,0.15)', borderRadius: 2, overflow: 'hidden' }}>
            <div
              key={slideKey}
              style={{
                height: '100%',
                background: '#a18661',
                borderRadius: 2,
                animation: `progressFill 4000ms linear forwards`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            />
          </div>
        </div>

        {/* Read all link */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/testimonials" className="htc-read-more">
            Read All Client Stories <span className="htc-arrow"><ArrowRight size={12} /></span>
          </Link>
        </div>

      </div>
    </motion.section>
  )
}

export default function Home() {
  const featured = projects.slice(0, 6)

  return (
    <div style={{ backgroundColor: '#2D3E29' }}>
      {/* Hero */}
      <HeroSection />

      {/* Philosophy */}
      <section className="philosophy-section" style={{ backgroundColor: '#f7f4ef', padding: '80px 1.5rem 110px' }}>
        <div className="philosophy-flex" style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>

          {/* Left — text block (55%) */}
          <div className="philosophy-text-block" style={{ flex: '0 0 55%', minWidth: 280 }}>

            {/* Label with flanking rules */}
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem' }}>
                <div style={{ height: '0.5px', backgroundColor: '#b8966a', width: 60 }} />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: 10,
                  letterSpacing: '0.35em',
                  color: '#b8966a',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>Our Philosophy</span>
                <div style={{ height: '0.5px', backgroundColor: '#b8966a', width: 60 }} />
              </div>
            </FadeIn>

            {/* Quote */}
            <FadeIn delay={0.1}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.8rem, 3.2vw, 2.75rem)',
                fontWeight: 300,
                lineHeight: 1.25,
                color: '#3b2f1e',
                marginBottom: '1.75rem',
              }}>
                "Design is not just seen —{' '}
                <em style={{ color: '#8b6914', fontStyle: 'italic' }}>it is experienced.</em>"
              </p>
            </FadeIn>

            {/* Body */}
            <FadeIn delay={0.2}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: '0.9375rem',
                lineHeight: 1.85,
                color: '#6b5240',
                marginBottom: '2.5rem',
              }}>
                At NIVORA, every project begins with understanding — how you move through a space, what you need from it, and what makes it feel unmistakably yours. We work with refined materials, considered proportions, and timeless palettes to create interiors that hold their beauty for years, not seasons.
              </p>
            </FadeIn>

            {/* Divider + brand values */}
            <FadeIn delay={0.3}>
              <div style={{ borderTop: '0.5px solid #c9b99a', paddingTop: '1.5rem' }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: 11,
                  letterSpacing: '3px',
                  color: '#C9A96E',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}>
                  Timeless &nbsp;<span style={{ fontSize: 8 }}>◆</span>&nbsp; Functional &nbsp;<span style={{ fontSize: 8 }}>◆</span>&nbsp; Personal
                </p>
              </div>
            </FadeIn>

          </div>

          {/* Right — editorial photo (45%) */}
          <FadeIn delay={0.2} direction="left" className="philosophy-image-col flex-1" style={{ minWidth: 240 }}>
            <div className="philosophy-image-wrap" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              {/* Offset gold frame */}
              <div className="philosophy-frame" style={{
                position: 'absolute',
                top: 8,
                left: 8,
                right: -8,
                bottom: -8,
                border: '1px solid #C9A96E',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              {/* Photo */}
              <div className="philosophy-photo-inner" style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=85"
                  alt="NIVORA Studio — editorial"
                  className="philosophy-photo"
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Floating quote card — bottom-left overlap */}
              <style>{`
                @keyframes quoteCardIn {
                  from { opacity: 0; transform: translateY(18px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
                .philosophy-quote-card {
                  animation: quoteCardIn 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s both;
                }
                .philosophy-quote-card:hover {
                  transform: translateY(-5px) !important;
                  box-shadow: 0 18px 50px rgba(0,0,0,0.30) !important;
                }
              `}</style>
              <div
                className="philosophy-quote-card"
                style={{
                  position: 'absolute',
                  bottom: -32,
                  left: -28,
                  zIndex: 6,
                  width: 172,
                  padding: '22px 20px 20px',
                  backgroundColor: '#C9A227',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.22)',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  cursor: 'default',
                }}
              >
                {/* Large decorative quotation mark */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 52,
                  lineHeight: 0.75,
                  color: 'rgba(255,255,255,0.38)',
                  marginBottom: 10,
                  fontWeight: 300,
                  userSelect: 'none',
                }}>"</div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13.5,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#ffffff',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  We don't just design spaces, we create legacies.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Stats strip */}
      <StatsSection />

      {/* Services */}
      <section style={{ backgroundColor: '#F7F4EF', padding: '7rem 1.5rem' }}>
        <style>{`
          /* ── Service card shell ── */
          .hsvc-card {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            height: 380px;
            border: 1px solid #E8DED1;
            text-decoration: none;
            display: block;
            cursor: pointer;
            background: #F3EEE7;
            transition: transform 500ms cubic-bezier(0.22,1,0.36,1),
                        box-shadow 500ms cubic-bezier(0.22,1,0.36,1);
          }
          .hsvc-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 28px 64px rgba(38,36,33,0.13), 0 4px 16px rgba(38,36,33,0.07);
          }

          /* Image zoom */
          .hsvc-img {
            transition: transform 700ms cubic-bezier(0.22,1,0.36,1);
          }
          .hsvc-card:hover .hsvc-img { transform: scale(1.08); }

          /* Gradient overlay */
          .hsvc-overlay {
            position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(
              to bottom,
              rgba(15,12,10,0.16) 0%,
              rgba(10,8,6,0.60) 52%,
              rgba(6,5,4,0.92) 100%
            );
            transition: background 500ms ease;
          }
          .hsvc-card:hover .hsvc-overlay {
            background: linear-gradient(
              to bottom,
              rgba(15,12,10,0.30) 0%,
              rgba(10,8,6,0.80) 42%,
              rgba(6,5,4,0.97) 100%
            );
          }

          /* ── TOP LAYER: number badge ── */
          .hsvc-num {
            position: absolute; top: 1.5rem; left: 1.6rem; z-index: 4;
            font-family: 'Inter', sans-serif; font-weight: 300;
            font-size: 10px; letter-spacing: 0.3em;
            color: rgba(200,165,106,0.7); margin: 0;
          }

          /* ── MIDDLE LAYER: icon + title — always visible, never moves into detail area ── */
          .hsvc-mid-layer {
            position: absolute;
            left: 1.6rem; right: 1.6rem; bottom: 168px;
            z-index: 3;
            transition: transform 500ms cubic-bezier(0.22,1,0.36,1);
          }
          .hsvc-card:hover .hsvc-mid-layer { transform: translateY(-16px); }

          .hsvc-icon-wrap {
            width: 40px; height: 40px; border-radius: 10px;
            background: rgba(200,165,106,0.15);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 0.6rem;
            transition: background 400ms ease;
          }
          .hsvc-card:hover .hsvc-icon-wrap { background: rgba(200,165,106,0.28); }

          .hsvc-title {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 300;
            font-size: clamp(1.25rem, 1.8vw, 1.55rem);
            color: #f5f0e8;
            line-height: 1.2;
            margin: 0;
            letter-spacing: -0.005em;
          }

          /* ── BOTTOM LAYER: gold line + desc + explore — hidden at rest ── */
          /* Occupies bottom 25px → ~165px. Never overlaps mid-layer (bottom: 168px). */
          .hsvc-detail-layer {
            position: absolute;
            left: 1.6rem; right: 1.6rem; bottom: 1.5rem;
            z-index: 3;
            opacity: 0;
            transform: translateY(18px);
            pointer-events: none;
            transition: opacity 420ms cubic-bezier(0.22,1,0.36,1) 55ms,
                        transform 420ms cubic-bezier(0.22,1,0.36,1) 55ms;
          }
          .hsvc-card:hover .hsvc-detail-layer {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          /* Gold accent line */
          .hsvc-gold-line {
            width: 0; height: 1.5px;
            background: #C8A56A; border-radius: 2px;
            transition: width 500ms cubic-bezier(0.22,1,0.36,1);
            margin: 0 0 0.75rem;
          }
          .hsvc-card:hover .hsvc-gold-line { width: 36px; }

          /* Description — capped at 3 lines to guarantee no overflow */
          .hsvc-desc {
            font-family: 'Inter', sans-serif; font-weight: 300;
            font-size: 12.5px; color: rgba(245,240,232,0.78);
            line-height: 1.72; margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Explore CTA */
          .hsvc-explore {
            display: inline-flex; align-items: center; gap: 6px;
            margin-top: 0.85rem;
            font-family: 'Inter', sans-serif; font-weight: 300;
            font-size: 10px; letter-spacing: 0.22em;
            text-transform: uppercase; color: #C8A56A;
          }

          /* Grids */
          .hsvc-grid-r1 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
          .hsvc-grid-r2 {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
            margin: 20px auto 0; max-width: 895px;
          }

          @media (max-width: 1100px) {
            .hsvc-grid-r1 { grid-template-columns: repeat(2, 1fr) !important; }
            .hsvc-grid-r2 { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
            .hsvc-card { height: 360px !important; }
            .hsvc-mid-layer { bottom: 160px !important; }
          }
          @media (max-width: 639px) {
            .hsvc-grid-r1, .hsvc-grid-r2 { grid-template-columns: 1fr !important; max-width: 100% !important; }
            .hsvc-card { height: 320px !important; }
            .hsvc-mid-layer { bottom: 152px !important; }
          }
        `}</style>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem', maxWidth: 640, margin: '0 auto 4.5rem' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#C8A56A',
              marginBottom: '1rem',
            }}>Our Services</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              color: '#262421',
              lineHeight: 1.1,
              marginBottom: '1.1rem',
              letterSpacing: '-0.01em',
            }}>Spaces Designed Across<br />Every Experience</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 14,
              color: 'rgba(38,36,33,0.5)',
              lineHeight: 1.85,
              margin: 0,
            }}>
              From private residences to large-scale environments, we design spaces that balance beauty, function and identity.
            </p>
          </div>
        </FadeIn>

        {/* Cards */}
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Row 1 — 4 cards */}
          <div className="hsvc-grid-r1">
            {services.slice(0, 4).map((s, i) => {
              const Icon = s.icon
              return (
                <FadeIn key={s.title} delay={i * 0.09}>
                  <Link to={s.href} className="hsvc-card">
                    {/* Image */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 24 }}>
                      <img src={s.img} alt={s.title} className="hsvc-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy" />
                    </div>
                    {/* Overlay */}
                    <div className="hsvc-overlay" />
                    {/* Number — top-left, independent layer */}
                    <p className="hsvc-num">{s.num}</p>
                    {/* Mid layer: icon + title — always visible, fixed position */}
                    <div className="hsvc-mid-layer">
                      <div className="hsvc-icon-wrap">
                        <Icon size={18} color="#C8A56A" strokeWidth={1.4} />
                      </div>
                      <h3 className="hsvc-title">{s.title}</h3>
                    </div>
                    {/* Detail layer: fades in on hover, positioned below mid-layer */}
                    <div className="hsvc-detail-layer">
                      <div className="hsvc-gold-line" />
                      <p className="hsvc-desc">{s.desc}</p>
                      <span className="hsvc-explore">
                        Explore <ArrowRight size={10} strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>

          {/* Row 2 — 3 cards centered */}
          <div className="hsvc-grid-r2">
            {services.slice(4).map((s, i) => {
              const Icon = s.icon
              return (
                <FadeIn key={s.title} delay={i * 0.09}>
                  <Link to={s.href} className="hsvc-card">
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 24 }}>
                      <img src={s.img} alt={s.title} className="hsvc-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy" />
                    </div>
                    <div className="hsvc-overlay" />
                    <p className="hsvc-num">{s.num}</p>
                    <div className="hsvc-mid-layer">
                      <div className="hsvc-icon-wrap">
                        <Icon size={18} color="#C8A56A" strokeWidth={1.4} />
                      </div>
                      <h3 className="hsvc-title">{s.title}</h3>
                    </div>
                    <div className="hsvc-detail-layer">
                      <div className="hsvc-gold-line" />
                      <p className="hsvc-desc">{s.desc}</p>
                      <span className="hsvc-explore">
                        Explore <ArrowRight size={10} strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process — Light Editorial Rebuild */}
      <ProcessSection />

      {/* Before / After — Transformation Carousel */}
      <section style={{ backgroundColor: '#FAF8F4', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 10,
                letterSpacing: '0.45em', textTransform: 'uppercase',
                color: '#C8A56A', marginBottom: '1rem',
              }}>Transformations</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                color: '#262421', lineHeight: 1.1, marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>Before &amp; After</h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 14,
                color: 'rgba(38,36,33,0.5)', lineHeight: 1.85, margin: 0,
              }}>
                See how thoughtful design transforms spaces into refined living experiences.
              </p>
            </div>
          </FadeIn>

          {/* Carousel */}
          <FadeIn delay={0.18}>
            <TransformationCarousel />
          </FadeIn>
        </div>
      </section>

      {/* Portfolio — Our Masterpieces */}
      <section style={{ backgroundColor: '#F5F1EA', padding: '7rem 1.5rem' }}>
        <style>{`
          /* ── Masterpiece card ── */
          .mp-card {
            position: relative;
            border-radius: 18px;
            overflow: hidden;
            height: 440px;
            display: block;
            text-decoration: none;
            background: #E8DED1;
            box-shadow: 0 4px 24px rgba(38,36,33,0.07), 0 1px 4px rgba(38,36,33,0.04);
            transition: box-shadow 450ms cubic-bezier(0.22,1,0.36,1),
                        transform 450ms cubic-bezier(0.22,1,0.36,1);
          }
          .mp-card:hover {
            box-shadow: 0 20px 56px rgba(38,36,33,0.15), 0 4px 16px rgba(38,36,33,0.08);
            transform: translateY(-4px);
          }
          /* image subtle zoom */
          .mp-img {
            width: 100%; height: 100%; object-fit: cover; display: block;
            transition: transform 700ms cubic-bezier(0.22,1,0.36,1);
          }
          .mp-card:hover .mp-img { transform: scale(1.06); }

          /* Always-on gradient overlay */
          .mp-baseline {
            position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(
              to bottom,
              transparent 30%,
              rgba(12,10,8,0.50) 65%,
              rgba(8,7,5,0.88) 100%
            );
            transition: background 450ms ease;
          }
          .mp-card:hover .mp-baseline {
            background: linear-gradient(
              to bottom,
              rgba(12,10,8,0.10) 0%,
              rgba(12,10,8,0.62) 42%,
              rgba(8,7,5,0.96) 100%
            );
          }

          /* ── DEFAULT LAYER: location + name — always visible, fixed position ──
             Sits at bottom: 160px. Detail layer max-height is ~155px (badge 24px +
             desc 3×22px + cta 50px) anchored at bottom: 1.5rem (24px).
             Gap between layers = 160 − (24+155) = ~−19 → safe because detail is
             opacity-0 by default and overlapping area is ~19px; on hover name lifts
             18px further up, giving comfortable clearance. */
          .mp-default-layer {
            position: absolute;
            left: 1.6rem; right: 1.6rem; bottom: 160px;
            z-index: 3;
            transition: transform 450ms cubic-bezier(0.22,1,0.36,1);
          }
          .mp-card:hover .mp-default-layer { transform: translateY(-18px); }

          /* ── HOVER LAYER: badge + description + CTA — hidden at rest ──
             Anchored at bottom: 1.5rem, grows upward. Never shares position
             with .mp-default-layer because they are at different bottom values. */
          .mp-hover-layer {
            position: absolute;
            left: 1.6rem; right: 1.6rem; bottom: 1.5rem;
            z-index: 4;
            opacity: 0;
            transform: translateY(18px);
            pointer-events: none;
            transition: opacity 400ms cubic-bezier(0.22,1,0.36,1) 55ms,
                        transform 400ms cubic-bezier(0.22,1,0.36,1) 55ms;
          }
          .mp-card:hover .mp-hover-layer {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          /* Category badge */
          .mp-badge {
            display: inline-block;
            font-family: 'Inter', sans-serif; font-weight: 400; font-size: 9px;
            letter-spacing: 0.25em; text-transform: uppercase;
            color: #C8A56A;
            background: rgba(200,165,106,0.12);
            border: 1px solid rgba(200,165,106,0.45);
            padding: 4px 10px; border-radius: 100px;
            margin-bottom: 0.65rem;
          }

          /* Description — capped at 3 lines */
          .mp-desc {
            font-family: 'Inter', sans-serif; font-weight: 300; font-size: 12.5px;
            color: rgba(245,240,232,0.82); line-height: 1.72; margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* CTA */
          .mp-cta {
            display: inline-flex; align-items: center; gap: 7px;
            font-family: 'Inter', sans-serif; font-weight: 400; font-size: 10px;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: #262421; background: #C8A56A;
            border: none; border-radius: 100px;
            padding: 9px 20px; margin-top: 0.85rem;
            text-decoration: none;
            transition: background 250ms ease;
          }
          .mp-cta:hover { background: #D4B478; }

          /* Grid */
          .mp-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          @media (max-width: 1024px) {
            .mp-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .mp-card { height: 400px !important; }
            .mp-default-layer { bottom: 148px !important; }
          }
          @media (max-width: 600px) {
            .mp-grid { grid-template-columns: 1fr !important; }
            .mp-card { height: 360px !important; }
            .mp-default-layer { bottom: 140px !important; }
          }
        `}</style>

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 10,
                letterSpacing: '0.45em', textTransform: 'uppercase',
                color: '#C8A56A', marginBottom: '1rem',
              }}>Our Masterpieces</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                color: '#262421', lineHeight: 1.1,
                marginBottom: '1.1rem', letterSpacing: '-0.01em',
              }}>Spaces That Tell Your Story</h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 14,
                color: 'rgba(38,36,33,0.5)', lineHeight: 1.85,
                maxWidth: 560, margin: '0 auto',
              }}>
                Every project reflects a unique vision, thoughtfully transformed into spaces that inspire, function beautifully and stand the test of time.
              </p>
            </div>
          </FadeIn>

          {/* 3-column grid */}
          <div className="mp-grid">
            {portfolioProjects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.09}>
                <Link to={p.serviceHref} className="mp-card">
                  {/* Image */}
                  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 18 }}>
                    <img src={p.img} alt={p.name} className="mp-img" loading="lazy" draggable={false} />
                  </div>

                  {/* Always-on gradient */}
                  <div className="mp-baseline" />

                  {/* DEFAULT LAYER — location + name, always visible at fixed position */}
                  <div className="mp-default-layer">
                    <p style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 9,
                      letterSpacing: '0.28em', textTransform: 'uppercase',
                      color: 'rgba(200,165,106,0.8)', margin: '0 0 0.45rem',
                    }}>{p.location}</p>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                      fontSize: 'clamp(1.3rem, 1.8vw, 1.65rem)',
                      color: '#f5f0e8', lineHeight: 1.15,
                      margin: 0, letterSpacing: '-0.005em',
                    }}>{p.name}</h3>
                  </div>

                  {/* HOVER LAYER — badge + description + CTA, fades in at different position */}
                  <div className="mp-hover-layer">
                    <span className="mp-badge">{p.category}</span>
                    <p className="mp-desc">{p.desc}</p>
                    <span className="mp-cta">
                      View Project <ArrowRight size={10} strokeWidth={1.8} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <Link
                to="/portfolio"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 11,
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: '#262421', textDecoration: 'none',
                  border: '1px solid #C8A56A',
                  padding: '14px 36px', borderRadius: 100,
                  transition: 'background 300ms ease, color 300ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#C8A56A'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#262421'
                }}
              >
                View All Projects <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Instagram */}
      <section style={{ background: '#FAF8F4', padding: '5rem 0' }}>
        <style>{`
          .ig-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 3px;
          }
          @media (max-width: 768px) {
            .ig-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (max-width: 480px) {
            .ig-grid { grid-template-columns: repeat(2, 1fr); }
          }
          .ig-thumb { display: block; position: relative; overflow: hidden; aspect-ratio: 1 / 1; }
          .ig-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); display: block; }
          .ig-thumb:hover img { transform: scale(1.07); }
          .ig-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(201,169,110,0.18); opacity: 0; transition: opacity 0.3s ease; }
          .ig-thumb:hover .ig-overlay { opacity: 1; }
          .ig-cta {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #a18661;
            text-decoration: none;
          }
          .ig-cta::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: #a18661;
            transition: width 0.3s ease;
          }
          .ig-cta:hover::after { width: 100%; }
          .ig-cta-arrow { display: inline-flex; align-items: center; transition: transform 0.25s ease; }
          .ig-cta:hover .ig-cta-arrow { transform: translateX(4px); }
        `}</style>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

          {/* Heading */}
          <FadeIn className="text-center" style={{ marginBottom: 40 }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#a18661',
              marginBottom: 14,
            }}>@NivoraInteriors</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#262421',
              marginBottom: 10,
              lineHeight: 1.1,
            }}>Follow Our Journey</h2>
            <p style={{
              fontFamily: "'Lora', serif",
              fontWeight: 300,
              fontSize: 14,
              color: 'rgba(38,36,33,0.5)',
              margin: 0,
            }}>Daily design inspiration and behind-the-scenes site visits</p>
          </FadeIn>

          {/* Single-row 6-image grid */}
          <div className="ig-grid">
            {igPosts.map((src, i) => (
              <a
                key={i}
                href="https://instagram.com/NivoraInteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="ig-thumb"
              >
                <img src={src} alt={`@NivoraInteriors post ${i + 1}`} loading="lazy" />
                <div className="ig-overlay">
                  <svg width="22" height="22" fill="white" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a
              href="https://instagram.com/NivoraInteriors"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-cta"
            >
              See More On Instagram <span className="ig-cta-arrow"><ArrowRight size={12} /></span>
            </a>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#33452F', paddingTop: 70, paddingBottom: 70 }}>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #b8966a 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div style={{ width: 80, height: 1, backgroundColor: '#C9A96E', margin: '0 auto 24px' }} />
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Currently Accepting Projects</p>
            <h2 className="font-serif text-4xl md:text-6xl text-[#f5f0e8] font-light leading-tight mb-6">
              Ready to Transform<br />Your Space?
            </h2>
            <p className="text-[#f5f0e8]/50 font-light mb-10 max-w-lg mx-auto leading-relaxed">
              A complimentary consultation. No pressure, just possibilities.
            </p>
            <Link
              to="/quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'linear-gradient(135deg, #E0C38A 0%, #C8A46A 50%, #A8854F 100%)',
                color: '#2D3E29',
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '20px 52px',
                textDecoration: 'none',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 6px 30px rgba(168,133,79,0.40)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #EDD09A 0%, #D4B078 50%, #B8904E 100%)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(168,133,79,0.55)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #E0C38A 0%, #C8A46A 50%, #A8854F 100%)'
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(168,133,79,0.40)'
              }}
            >
              Begin Your Project <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
