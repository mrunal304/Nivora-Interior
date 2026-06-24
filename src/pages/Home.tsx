import { Link, useLocation } from 'react-router-dom'
import imgCalista from '@assets/3_(1)_1781792140739.jpg'
import imgNeelaya from '@assets/11_1781792153281.png'
import imgSparsh from '@assets/6_(1)_1781792222998.jpg'
import imgOffice from '@assets/16_1781792239759.jpg'
import imgAurelia from '@assets/2_(2)_1781792402795.jpg'
import imgUrban from '@assets/3_(2)_1781792428831.jpg'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Home as HomeIcon, Building2, Coffee, Layers, Monitor, Gem, Wrench, Clock, Settings, Heart } from 'lucide-react'
import FadeIn from '../components/FadeIn'
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

const transformations = [
  {
    id: 1,
    title: 'Living Room Refresh',
    beforeLabel: 'INITIAL SPACE',
    afterLabel: 'NIVORA DESIGN',
    beforeImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    beforeDesc: 'Dark layout with limited functionality, heavy drapery and dated finishes that reduced natural light.',
    afterDesc: 'Bright, airy interiors with custom joinery, layered lighting and a refined modern aesthetic.',
  },
  {
    id: 2,
    title: 'Master Bedroom Redesign',
    beforeLabel: 'RAW SPACE',
    afterLabel: 'BESPOKE RETREAT',
    beforeImg: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    beforeDesc: 'Generic finishes, sparse furniture and poor spatial planning that felt impersonal and flat.',
    afterDesc: 'Warm textures, bespoke headboard, ambient lighting and a cohesive palette that feels like a boutique retreat.',
  },
  {
    id: 3,
    title: 'Kitchen Transformation',
    beforeLabel: 'ORIGINAL KITCHEN',
    afterLabel: 'REFINED HUB',
    beforeImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    beforeDesc: 'Outdated cabinetry, inefficient workflow and ageing surfaces that lacked storage and style.',
    afterDesc: 'Streamlined handleless cabinetry, stone countertops, integrated appliances and smart lighting throughout.',
  },
  {
    id: 4,
    title: 'Home Office Elevation',
    beforeLabel: 'BARE WORKSPACE',
    afterLabel: 'CORPORATE HUB',
    beforeImg: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    beforeDesc: 'A cluttered, uninspiring workspace with no acoustic treatment, poor ergonomics and no sense of identity.',
    afterDesc: 'Tailored desk setup, concealed storage, warm wood tones and soundproofing for focused, elegant productivity.',
  },
  {
    id: 5,
    title: 'Dining Room Revival',
    beforeLabel: 'EMPTY DINING',
    afterLabel: 'CURATED SETTING',
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
  { value: 2,  from: 0, suffix: '+', label: 'Years Experience',    duration: 1200 },
  { value: 25, from: 0, suffix: '+', label: 'Projects Completed',  duration: 1800 },
  { value: 50, from: 0, suffix: '+', label: 'Clients Served',      duration: 1600 },
  { value: 90, from: 0, suffix: '%', label: 'Client Satisfaction', duration: 1400 },
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
            setCounts(prev => { const n = [...prev]; n[i] = stat.from; return n })
            const startTime = performance.now()
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / stat.duration, 1)
              const eased = 1 - Math.pow(1 - progress, 4)
              const val = Math.floor(stat.from + (stat.value - stat.from) * eased)
              setCounts(prev => { const n = [...prev]; n[i] = val; return n })
              if (progress < 1) {
                requestAnimationFrame(tick)
              } else {
                setCounts(prev => { const n = [...prev]; n[i] = stat.value; return n })

                const cycleInterval = 4200 + i * 1100
                const dip = Math.min(2, stat.value)

                const runCycle = () => {
                  setShimmer(prev => { const n = [...prev]; n[i] = true; return n })
                  const shimmerOff = setTimeout(() => {
                    setShimmer(prev => { const n = [...prev]; n[i] = false; return n })
                  }, 900)
                  cleanups.push(() => clearTimeout(shimmerOff))

                  const totalSteps = 28
                  let s = 0
                  const dipTimer = setInterval(() => {
                    s++
                    const p = s / totalSteps
                    let v: number
                    if (p < 0.35) {
                      const down = p / 0.35
                      v = Math.round(stat.value - dip * (1 - Math.pow(1 - down, 2)))
                    } else {
                      const up = (p - 0.35) / 0.65
                      const easedUp = 1 - Math.pow(1 - up, 3)
                      v = Math.round((stat.value - dip) + dip * easedUp)
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
            }
            requestAnimationFrame(tick)
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
      marginTop: 48,
      padding: '0 1.5rem 56px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#F7F4EF',
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

function CompareSlider({
  beforeImg, afterImg, title,
  beforeLabel = 'Before', afterLabel = 'After',
  autoPlayKey = 0,
  onDragChange,
}: {
  beforeImg: string; afterImg: string; title: string;
  beforeLabel?: string; afterLabel?: string;
  autoPlayKey?: number;
  onDragChange?: (isDragging: boolean) => void;
}) {
  const [pos, setPos] = useState(50)
  const [transitionMs, setTransitionMs] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const mountedRef = useRef(true)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const onDragChangeRef = useRef(onDragChange)
  const [handleScale, setHandleScale] = useState(1)
  const [beforeHover, setBeforeHover] = useState(false)
  const [afterHover, setAfterHover] = useState(false)

  useEffect(() => { onDragChangeRef.current = onDragChange }, [onDragChange])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const cancelAnim = () => {
    clearAllTimeouts()
    isAnimatingRef.current = false
    if (mountedRef.current) setTransitionMs(0)
  }

  const sleep = (ms: number) => new Promise<void>(resolve => {
    const t = setTimeout(resolve, ms)
    timeoutsRef.current.push(t)
  })

  const moveTo = (target: number, duration: number) => new Promise<void>(resolve => {
    if (!mountedRef.current) return resolve()
    setTransitionMs(duration)
    setPos(target)
    const t = setTimeout(resolve, duration)
    timeoutsRef.current.push(t)
  })

  const playReveal = async () => {
    if (isAnimatingRef.current || draggingRef.current) return
    isAnimatingRef.current = true
    await moveTo(98, 900)
    if (draggingRef.current || !mountedRef.current) { isAnimatingRef.current = false; return }
    await sleep(600)
    if (draggingRef.current || !mountedRef.current) { isAnimatingRef.current = false; return }
    await moveTo(2, 900)
    if (draggingRef.current || !mountedRef.current) { isAnimatingRef.current = false; return }
    await sleep(600)
    if (draggingRef.current || !mountedRef.current) { isAnimatingRef.current = false; return }
    await moveTo(50, 600)
    if (mountedRef.current) setTransitionMs(0)
    isAnimatingRef.current = false
  }

  // Carousel-triggered play: when autoPlayKey increments, run the reveal
  const prevAutoPlayKeyRef = useRef(autoPlayKey)
  useEffect(() => {
    if (autoPlayKey === prevAutoPlayKeyRef.current) return
    prevAutoPlayKeyRef.current = autoPlayKey
    cancelAnim()
    const t = setTimeout(() => { if (mountedRef.current) playReveal() }, 30)
    timeoutsRef.current.push(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayKey])

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return
    setTransitionMs(0)
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(2, Math.min(clientX - rect.left, rect.width - 2))
    setPos((x / rect.width) * 100)
  }

  const startDrag = (clientX: number) => {
    draggingRef.current = true
    onDragChangeRef.current?.(true)
    cancelAnim()
    setHandleScale(1.15)
    updatePos(clientX)
  }

  const onMouseDown = (e: React.MouseEvent) => { startDrag(e.clientX); e.preventDefault() }
  const onMouseMove = (e: React.MouseEvent) => { if (draggingRef.current) updatePos(e.clientX) }
  const endDrag = () => {
    draggingRef.current = false
    onDragChangeRef.current?.(false)
    setHandleScale(1)
  }
  const onTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientX)
  const onTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return
    e.stopPropagation()
    updatePos(e.touches[0].clientX)
  }

  // FIX 2: attach a non-passive native touchmove listener so preventDefault works
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleNativeTouch = (e: TouchEvent) => {
      if (draggingRef.current) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    el.addEventListener('touchmove', handleNativeTouch, { passive: false })
    return () => el.removeEventListener('touchmove', handleNativeTouch)
  }, [])

  const onContainerMouseEnter = () => {
    if (!isAnimatingRef.current && !draggingRef.current) playReveal()
  }

  const dividerTransition = transitionMs > 0 ? `left ${transitionMs}ms ease-in-out` : 'none'

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
      className="compare-slider-container"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        touchAction: 'pan-y',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onMouseEnter={onContainerMouseEnter}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={endDrag}
    >
      {/* After image — base layer */}
      <img
        src={afterImg}
        alt={`After — ${title}`}
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />

      {/* Before image — clipped to left of divider */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, pointerEvents: 'none',
        transition: transitionMs > 0 ? `clip-path ${transitionMs}ms ease-in-out` : 'none' }}>
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
        transition: dividerTransition,
      }} />

      {/* Drag handle */}
      <div style={{
        position: 'absolute',
        top: '50%', left: `${pos}%`,
        transform: `translate(-50%, -50%) scale(${handleScale})`,
        width: 46, height: 46,
        borderRadius: '50%',
        background: '#fff',
        border: '2px solid rgba(200,165,106,0.85)',
        boxShadow: '0 2px 18px rgba(0,0,0,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 5,
        transition: dividerTransition ? `left ${transitionMs}ms ease-in-out, transform 120ms ease` : 'transform 120ms ease',
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C8A56A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 5l-4 7 4 7M16 5l4 7-4 7" />
        </svg>
      </div>

      {/* SLIDE TO COMPARE badge — above handle */}
      <div style={{
        position: 'absolute',
        top: 'calc(50% - 38px)',
        left: `${pos}%`,
        transform: 'translateX(-50%)',
        transition: dividerTransition,
        zIndex: 6,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 400,
        fontSize: 8,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.75)',
        background: 'rgba(0,0,0,0.32)',
        backdropFilter: 'blur(4px)',
        padding: '3px 9px',
        borderRadius: 100,
      }}>
        Slide to Compare
      </div>

      {/* BEFORE label — bottom left; hide when slider is fully right */}
      <span
        style={{
          ...labelBase,
          left: 16,
          opacity: pos > 92 ? 0 : (beforeHover ? 1 : 0.72),
          filter: beforeHover ? 'brightness(1.18)' : 'brightness(1)',
          pointerEvents: pos > 92 ? 'none' : 'auto',
        }}
        onMouseEnter={() => setBeforeHover(true)}
        onMouseLeave={() => setBeforeHover(false)}
      >{beforeLabel}</span>

      {/* AFTER label — bottom right; hide when slider is fully left */}
      <span
        style={{
          ...labelBase,
          right: 16,
          opacity: pos < 8 ? 0 : (afterHover ? 1 : 0.72),
          filter: afterHover ? 'brightness(1.18)' : 'brightness(1)',
          pointerEvents: pos < 8 ? 'none' : 'auto',
        }}
        onMouseEnter={() => setAfterHover(true)}
        onMouseLeave={() => setAfterHover(false)}
      >{afterLabel}</span>
    </div>
  )
}

function TransformationCarousel() {
  const TOTAL = transformations.length
  // Reveal sequence: moveTo(98,900) + sleep(600) + moveTo(2,900) + sleep(600) + moveTo(50,600) = 3600ms
  const REVEAL_MS = 3600
  const STAGGER_MS = 1200
  const PAUSE_AFTER_MS = 1500

  const [cardsPerPage, setCardsPerPage] = useState(2)
  const [currentPage, setCurrentPage] = useState(0)
  const [playKeys, setPlayKeys] = useState<number[]>(() => new Array(TOTAL).fill(0))
  const [sliding, setSliding] = useState(false)

  const cardsPerPageRef = useRef(cardsPerPage)
  const currentPageRef = useRef(currentPage)
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const draggingSetRef = useRef<Set<number>>(new Set())
  const mountedRef = useRef(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasEnteredRef = useRef(false)

  useEffect(() => { cardsPerPageRef.current = cardsPerPage }, [cardsPerPage])
  useEffect(() => { currentPageRef.current = currentPage }, [currentPage])
  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false } }, [])

  const pageCount = Math.ceil(TOTAL / cardsPerPage)

  const clearAutoTimer = () => {
    if (autoTimerRef.current) { clearTimeout(autoTimerRef.current); autoTimerRef.current = null }
  }

  const scheduleAdvance = useCallback((fromPage: number, pageSize: number) => {
    clearAutoTimer()
    const delay = (pageSize - 1) * STAGGER_MS + REVEAL_MS + PAUSE_AFTER_MS
    autoTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return
      if (draggingSetRef.current.size > 0) {
        scheduleAdvance(fromPage, pageSize)
        return
      }
      const cpp = cardsPerPageRef.current
      const pc = Math.ceil(TOTAL / cpp)
      const nextPage = (fromPage + 1) % pc
      setSliding(true)
      setTimeout(() => {
        if (!mountedRef.current) return
        setCurrentPage(nextPage)
        currentPageRef.current = nextPage
        const start = nextPage * cpp
        const end = Math.min(start + cpp, TOTAL)
        setPlayKeys(prev => {
          const next = [...prev]
          for (let i = start; i < end; i++) next[i]++
          return next
        })
        setTimeout(() => {
          if (mountedRef.current) setSliding(false)
          scheduleAdvance(nextPage, end - start)
        }, 520)
      }, 0)
    }, delay)
  }, [])

  const goToPage = useCallback((page: number) => {
    clearAutoTimer()
    const cpp = cardsPerPageRef.current
    const pc = Math.ceil(TOTAL / cpp)
    const target = ((page % pc) + pc) % pc
    draggingSetRef.current.clear()
    setSliding(true)
    setTimeout(() => {
      if (!mountedRef.current) return
      setCurrentPage(target)
      currentPageRef.current = target
      const start = target * cpp
      const end = Math.min(start + cpp, TOTAL)
      setPlayKeys(prev => {
        const next = [...prev]
        for (let i = start; i < end; i++) next[i]++
        return next
      })
      setTimeout(() => {
        if (mountedRef.current) setSliding(false)
        scheduleAdvance(target, end - start)
      }, 520)
    }, 0)
  }, [scheduleAdvance])

  // Responsive cardsPerPage
  useEffect(() => {
    const update = () => {
      const cpp = window.innerWidth < 641 ? 1 : 2
      if (cpp !== cardsPerPageRef.current) {
        cardsPerPageRef.current = cpp
        setCardsPerPage(cpp)
        clearAutoTimer()
        setCurrentPage(0)
        currentPageRef.current = 0
        setPlayKeys(new Array(TOTAL).fill(0))
        draggingSetRef.current.clear()
        setSliding(false)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Trigger page 0 when section enters viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasEnteredRef.current) {
        hasEnteredRef.current = true
        observer.disconnect()
        const cpp = cardsPerPageRef.current
        const end = Math.min(cpp, TOTAL)
        setPlayKeys(prev => {
          const next = [...prev]
          for (let i = 0; i < end; i++) next[i]++
          return next
        })
        scheduleAdvance(0, end)
      }
    }, { threshold: 0.25 })
    observer.observe(el)
    return () => { observer.disconnect(); clearAutoTimer() }
  }, [scheduleAdvance])

  const handleDragChange = (globalIndex: number, dragging: boolean) => {
    if (dragging) draggingSetRef.current.add(globalIndex)
    else draggingSetRef.current.delete(globalIndex)
  }

  // Responsive: re-trigger page 0 when cardsPerPage resets
  const prevCppRef = useRef(cardsPerPage)
  useEffect(() => {
    if (!hasEnteredRef.current || cardsPerPage === prevCppRef.current) { prevCppRef.current = cardsPerPage; return }
    prevCppRef.current = cardsPerPage
    const end = Math.min(cardsPerPage, TOTAL)
    setPlayKeys(prev => {
      const next = [...prev]
      for (let i = 0; i < end; i++) next[i]++
      return next
    })
    scheduleAdvance(0, end)
  }, [cardsPerPage, scheduleAdvance])

  const STAGGER_OFFSET = 72

  const cardBlock = (globalIndex: number, pageIdx: number = 0) => {
    const t = transformations[globalIndex]
    const verticalShift = cardsPerPage === 2 && pageIdx === 1 ? STAGGER_OFFSET : 0
    return (
      <div key={t.id} className="trf-card" style={{
        flex: cardsPerPage === 1 ? '0 0 100%' : '0 0 calc(50% - 12px)',
        marginTop: verticalShift,
      }}>
        <CompareSlider
          beforeImg={t.beforeImg}
          afterImg={t.afterImg}
          title={t.title}
          beforeLabel={t.beforeLabel}
          afterLabel={t.afterLabel}
          autoPlayKey={playKeys[globalIndex]}
          onDragChange={(d) => handleDragChange(globalIndex, d)}
        />
        <div style={{ padding: '1.5rem 1.75rem 1.75rem', borderTop: '1px solid #F5F1EA' }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 400,
            fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: '#262421',
            margin: '0 0 0.9rem', letterSpacing: '-0.01em',
          }}>{t.title}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem' }}>
            <div>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 9,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(38,36,33,0.35)', margin: '0 0 0.4rem',
              }}>Before</p>
              <p style={{
                fontFamily: "'Lora', serif", fontWeight: 300, fontSize: 14,
                color: 'rgba(38,36,33,0.55)', lineHeight: 1.75, margin: 0,
              }}>{t.beforeDesc}</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 9,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: '#C8A56A', margin: '0 0 0.4rem',
              }}>After</p>
              <p style={{
                fontFamily: "'Lora', serif", fontWeight: 300, fontSize: 14,
                color: 'rgba(38,36,33,0.72)', lineHeight: 1.75, margin: 0,
              }}>{t.afterDesc}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
      <style>{`
        .trf-card {
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 8px 48px rgba(38,36,33,0.09), 0 2px 12px rgba(38,36,33,0.05);
          overflow: hidden;
        }
        .trf-carousel-viewport { overflow: hidden; }
        .trf-carousel-track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .trf-carousel-page {
          flex: 0 0 100%;
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        .trf-nav-btn {
          width: 46px; height: 46px; border-radius: 50%;
          border: 1px solid #E8DED1; background: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 250ms ease, background 250ms ease, opacity 250ms ease;
          flex-shrink: 0;
        }
        .trf-nav-btn:hover { border-color: #C8A56A; background: #FAF8F4; }
        .trf-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #E8DED1; border: none; cursor: pointer; padding: 0;
          transition: background 300ms ease, transform 300ms ease;
        }
        .trf-dot.active { background: #C8A56A; transform: scale(1.35); }
      `}</style>

      {/* Viewport + track */}
      <div className="trf-carousel-viewport">
        <div
          className="trf-carousel-track"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: pageCount }, (_, p) => {
            const start = p * cardsPerPage
            const end = Math.min(start + cardsPerPage, TOTAL)
            const indices = Array.from({ length: end - start }, (_, i) => start + i)
            return (
              <div key={p} className="trf-carousel-page">
                {indices.map((i, pageIdx) => cardBlock(i, pageIdx))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: '2.25rem' }}>
        <button
          className="trf-nav-btn"
          onClick={() => goToPage(currentPage - 1)}
          aria-label="Previous page"
          style={{ opacity: sliding ? 0.45 : 1, pointerEvents: sliding ? 'none' : 'auto' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#262421" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {Array.from({ length: pageCount }, (_, p) => (
            <button
              key={p}
              className={`trf-dot${p === currentPage ? ' active' : ''}`}
              onClick={() => goToPage(p)}
              aria-label={`Page ${p + 1}`}
            />
          ))}
        </div>

        <button
          className="trf-nav-btn"
          onClick={() => goToPage(currentPage + 1)}
          aria-label="Next page"
          style={{ opacity: sliding ? 0.45 : 1, pointerEvents: sliding ? 'none' : 'auto' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#262421" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Page counter */}
      <p style={{
        textAlign: 'center', marginTop: '1rem',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 11,
        letterSpacing: '0.2em', color: 'rgba(38,36,33,0.3)',
      }}>
        {String(currentPage + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}
      </p>
    </div>
  )
}


function HeroSection({ splashDone }: { splashDone: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 })
  const [activeCity, setActiveCity] = useState<'Mumbai' | 'Pune'>('Mumbai')

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0,
        staggerChildren: 0.38,
      },
    },
  }
  const heroItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] } },
  }
  const heroItalicVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] } },
  }

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', clipPath: 'inset(0)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
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
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0 }}
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
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0 }}
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
        animate={splashDone ? 'visible' : 'hidden'}
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
            fontSize: 'clamp(36px, 5vw, 68px)',
            lineHeight: 1.05,
            color: '#f5f0e8',
            letterSpacing: '-0.01em',
            marginBottom: 6,
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
            fontSize: 'clamp(36px, 5vw, 68px)',
            lineHeight: 1.05,
            color: '#f5f0e8',
            letterSpacing: '-0.01em',
            marginBottom: 10,
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
            fontSize: 'clamp(36px, 5vw, 68px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: 28,
          }}
        >
          <em style={{ color: '#b8966a', fontStyle: 'italic' }}>That Feel Effortless</em>
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
        transition={{ duration: 0.9, delay: 0 }}
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
        transition={{ delay: 0, duration: 0.72 }}
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

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [slideKey, setSlideKey] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = testimonials.length

  const advance = () => {
    setCurrent(c => (c + 1) % count)
    setSlideKey(k => k + 1)
  }

  const retreat = () => {
    setCurrent(c => (c - 1 + count) % count)
    setSlideKey(k => k + 1)
  }

  const startAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    autoScrollRef.current = setInterval(advance, 4500)
  }

  useEffect(() => {
    startAutoScroll()
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prev = () => { retreat(); startAutoScroll() }
  const next = () => { advance(); startAutoScroll() }

  const t = testimonials[current]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: '#f5f2ed', padding: '80px 0' }}
    >
      <style>{`
        @keyframes tCardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .t-nav-btn {
          flex-shrink: 0;
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1.5px solid rgba(95,116,94,0.4);
          background: transparent;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #a18661;
          transition: border-color 0.22s ease, background 0.22s ease;
        }
        .t-nav-btn:hover {
          border-color: #5f745e;
          background: rgba(95,116,94,0.08);
        }
        @media (max-width: 700px) {
          .t-card-inner { flex-direction: column !important; }
          .t-card-left  { border-right: none !important; border-bottom: 1px solid rgba(95,116,94,0.25) !important; padding-bottom: 24px !important; margin-bottom: 0 !important; }
          .t-card-right { padding-left: 0 !important; padding-top: 24px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Section label */}
        <FadeIn>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 400,
            fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase',
            color: '#a18661', marginBottom: 40, textAlign: 'center',
          }}>The Word on the Street</p>
        </FadeIn>

        {/* Arrow + Card + Arrow */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 20 }}
          onMouseEnter={() => { setIsPaused(true); if (autoScrollRef.current) clearInterval(autoScrollRef.current) }}
          onMouseLeave={() => { setIsPaused(false); startAutoScroll() }}
        >

          {/* Left arrow */}
          <button className="t-nav-btn" onClick={prev} aria-label="Previous testimonial">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>

          {/* Card */}
          <div
            key={slideKey}
            style={{
              flex: 1,
              position: 'relative',
              background: '#ffffff',
              border: '1.5px solid #5f745e',
              borderRadius: 8,
              padding: '44px 48px',
              animation: 'tCardIn 380ms ease-out both',
              overflow: 'hidden',
            }}
          >
            {/* Decorative closing quote — top right */}
            <span aria-hidden="true" style={{
              position: 'absolute', top: 12, right: 28,
              fontFamily: "'Playfair Display', serif",
              fontSize: 100, lineHeight: 1,
              color: '#a18661', opacity: 0.18,
              pointerEvents: 'none', userSelect: 'none',
            }}>"</span>

            {/* Two-column inner layout */}
            <div className="t-card-inner" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>

              {/* LEFT — heading block */}
              <div className="t-card-left" style={{
                flex: '0 0 300px',
                borderRight: '1px solid rgba(95,116,94,0.25)',
                paddingRight: 48,
              }}>
                <p style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 400,
                  fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase',
                  color: '#a18661', marginBottom: 20, margin: '0 0 20px',
                }}>The Word on the Street</p>

                <h2 style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 400,
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                  color: '#21291a', lineHeight: 1.2,
                  margin: '0 0 24px', letterSpacing: '-0.01em',
                }}>Hear what our clients have said about us!</h2>

                {/* Gold divider */}
                <div style={{ width: 48, height: 1.5, background: '#a18661' }} />
              </div>

              {/* RIGHT — quote + name */}
              <div className="t-card-right" style={{ flex: 1, paddingTop: 4 }}>
                <p style={{
                  fontFamily: "'Lora', serif", fontStyle: 'italic',
                  fontSize: 16, lineHeight: 1.75,
                  color: '#2c2c2c', margin: '0 0 28px',
                }}>"{t.text}"</p>

                <p style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                  fontSize: 12, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#21291a',
                  margin: '0 0 4px',
                }}>{t.name}</p>
                <p style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
                  fontSize: 10, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#a18661', margin: 0,
                }}>{t.location}</p>
              </div>

            </div>
          </div>

          {/* Right arrow */}
          <button className="t-nav-btn" onClick={next} aria-label="Next testimonial">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setSlideKey(k => k + 1); startAutoScroll() }}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === current ? 22 : 7,
                height: 7, borderRadius: 4,
                background: i === current ? '#5f745e' : 'rgba(95,116,94,0.28)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

      </div>
    </motion.section>
  )
}

export default function Home({ splashDone }: { splashDone: boolean }) {
  const featured = projects.slice(0, 6)
  const location = useLocation()
  const [animKey, setAnimKey] = useState(0)
  const philosophySectionRef = useRef<HTMLElement>(null)
  const philosophyImgRef = useRef<HTMLImageElement>(null)
  const [philosophyInView, setPhilosophyInView] = useState(false)

  const philEl = (delay: number): React.CSSProperties => ({
    opacity: philosophyInView ? 1 : 0,
    transform: philosophyInView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
  })

  useEffect(() => {
    const section = philosophySectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPhilosophyInView(true); observer.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = philosophySectionRef.current
    const img = philosophyImgRef.current
    if (!img || !section) return
    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = -rect.top / window.innerHeight
      img.style.transform = `translateY(${progress * 30}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (location.pathname === '/') {
      setAnimKey(k => k + 1)
      window.scrollTo(0, 0)
    }
  }, [location.key])

  return (
    <div style={{ backgroundColor: '#2D3E29' }}>
      {/* Hero */}
      <HeroSection key={animKey} splashDone={splashDone} />

      {/* Philosophy */}
      <section ref={philosophySectionRef} className="philosophy-section" style={{ backgroundColor: '#f7f4ef', padding: '60px 1.5rem 60px' }}>
        <div className="philosophy-flex" style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>

          {/* Left — text block (55%) */}
          <div
            className="philosophy-text-block"
            style={{
              flex: '0 0 55%',
              minWidth: 280,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          >

            {/* Label with flanking rules */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem', ...philEl(0) }}>
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

            {/* Quote */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 3.2vw, 2.75rem)',
              fontWeight: 300,
              lineHeight: 1.25,
              color: '#3b2f1e',
              marginBottom: '1.75rem',
              ...philEl(120),
            }}>
              "Design is not just seen —{' '}
              <em style={{ color: '#8b6914', fontStyle: 'italic' }}>it is experienced.</em>"
            </p>

            {/* Body */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '0.9375rem',
              lineHeight: 1.85,
              color: '#6b5240',
              marginBottom: '2.5rem',
              ...philEl(240),
            }}>
              At NIVORA, every project begins with understanding — how you move through a space, what you need from it, and what makes it feel unmistakably yours. We work with refined materials, considered proportions, and timeless palettes to create interiors that hold their beauty for years, not seasons.
            </p>

            {/* Divider + brand values */}
            <div style={{ ...philEl(360) }}>
              {/* Animated divider draw */}
              <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{
                  height: '0.5px',
                  backgroundColor: '#c9b99a',
                  width: philosophyInView ? '100%' : '0%',
                  transition: 'width 800ms ease-out 400ms',
                }} />
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: '3px',
                color: '#C9A96E',
                textAlign: 'center',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                margin: 0,
              }}>
                <Clock size={14} color="#C9A96E" strokeWidth={1.5} />
                Timeless
                <span style={{ fontSize: 8, opacity: 0.5 }}>◆</span>
                <Settings size={14} color="#C9A96E" strokeWidth={1.5} />
                Functional
                <span style={{ fontSize: 8, opacity: 0.5 }}>◆</span>
                <Heart size={14} color="#C9A96E" strokeWidth={1.5} />
                Personal
              </p>
            </div>

            {/* Discover Our Story link */}
            <div style={{ marginTop: 28, ...philEl(480) }}>
              <Link
                to="/about"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                  color: '#C9A96E',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  display: 'inline-block',
                  borderBottom: '1px solid #C9A96E',
                  paddingBottom: 3,
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#A07840'
                  e.currentTarget.style.borderBottomColor = '#A07840'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#C9A96E'
                  e.currentTarget.style.borderBottomColor = '#C9A96E'
                }}
              >
                Discover Our Story →
              </Link>
            </div>

          </div>

          {/* Right — editorial photo (45%) */}
          <div
            className="philosophy-image-col"
            style={{
              flex: 1,
              minWidth: 240,
              alignSelf: 'stretch',
              opacity: philosophyInView ? 1 : 0,
              transform: philosophyInView ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms',
            }}
          >
            <div className="philosophy-image-wrap" style={{ position: 'relative', display: 'block', width: '100%', height: '100%' }}>
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
              <div className="philosophy-photo-inner" style={{ position: 'relative', zIndex: 1, overflow: 'hidden', height: '100%' }}>
                <img
                  ref={philosophyImgRef}
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=85"
                  alt="NIVORA Studio — editorial"
                  className="philosophy-photo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Floating quote card — stamp pop-in */}
              <div
                className="philosophy-quote-card"
                style={{
                  position: 'absolute',
                  bottom: -32,
                  left: -28,
                  zIndex: 6,
                  width: 212,
                  padding: '24px 24px 22px',
                  background: 'linear-gradient(135deg, #E0C38A 0%, #C8A46A 50%, #A8854F 100%)',
                  borderRadius: 11,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  cursor: 'default',
                  opacity: philosophyInView ? 1 : 0,
                  transform: philosophyInView ? 'scale(1)' : 'scale(0.9)',
                  transition: philosophyInView
                    ? 'opacity 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 900ms, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 900ms'
                    : 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease'
                  el.style.transform = 'translateY(-5px) scale(1)'
                  el.style.boxShadow = '0 20px 52px rgba(0,0,0,0.38)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease'
                  el.style.transform = 'scale(1)'
                  el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)'
                }}
              >
                {/* Large decorative quotation mark */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 52,
                  lineHeight: 0.75,
                  color: '#21291a',
                  marginBottom: 10,
                  fontWeight: 300,
                  userSelect: 'none',
                }}>"</div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16.5,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#21291a',
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  We don't just design spaces, we create legacies.
                </p>
                {/* Founder signature */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 12,
                  fontStyle: 'italic',
                  color: '#4a3520',
                  marginTop: 12,
                  marginBottom: 0,
                  lineHeight: 1.4,
                }}>— Shweta, Founder</p>
              </div>
            </div>
          </div>

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


      {/* Before / After — Transformation Carousel */}
      <section style={{ backgroundColor: '#FAF8F4', padding: '8px 1.5rem' }}>
        <style>{`
          .compare-slider-container {
            aspect-ratio: 16 / 10;
          }
          @media (max-width: 640px) {
            .compare-slider-container {
              aspect-ratio: 16 / 10;
            }
          }
        `}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <FadeIn>
            <style>{`
              .trf-header-row {
                position: relative;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                margin-bottom: 4rem;
              }
              .trf-header-left {
                text-align: center;
              }
              .trf-header-right {
                position: absolute;
                top: 0;
                right: 0;
                width: 320px;
                padding-top: 0.35rem;
                text-align: right;
              }
              @media (max-width: 700px) {
                .trf-header-row { flex-direction: column; align-items: center; }
                .trf-header-left { text-align: center; }
                .trf-header-right { position: static; width: auto; text-align: center; padding-top: 0; }
              }
            `}</style>
            <div className="trf-header-row">
              <div className="trf-header-left">
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
              <div className="trf-header-right">
                <p style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 400,
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(38,36,33,0.38)', lineHeight: 1.9, margin: 0,
                }}>
                  Slide to discover how we transform raw spaces into refined living experiences.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Carousel */}
          <FadeIn delay={0.18}>
            <TransformationCarousel />
          </FadeIn>
        </div>
      </section>

      {/* Editorial Portfolio — Featured Spaces */}
      <section style={{ backgroundColor: '#FAF8F4', padding: '96px 0' }}>
        <style>{`
          .ep-block {
            display: flex;
            align-items: center;
            gap: clamp(48px, 7vw, 100px);
          }
          .ep-block.ep-reverse { flex-direction: row-reverse; }

          .ep-img-col {
            flex: 0 0 55%;
            min-width: 0;
          }
          .ep-img-wrap {
            position: relative;
            border-radius: 28px;
            overflow: hidden;
            aspect-ratio: 4 / 3;
            box-shadow: 0 8px 40px rgba(20,18,14,0.10);
          }
          .ep-img {
            width: 100%; height: 100%;
            object-fit: cover; display: block;
            transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
          }
          .ep-block:hover .ep-img { transform: scale(1.03); }

          .ep-content-col {
            flex: 0 0 45%;
            min-width: 0;
            transition: transform 0.5s ease;
          }
          .ep-block:hover .ep-content-col { transform: translateY(-4px); }

          .ep-num {
            font-family: 'Inter', sans-serif;
            font-weight: 300; font-size: 11px;
            letter-spacing: 0.32em; text-transform: uppercase;
            color: rgba(155,125,78,0.65);
            margin: 0 0 18px; display: block;
          }
          .ep-title {
            font-family: 'Playfair Display', serif;
            font-weight: 400;
            font-size: clamp(1.4rem, 2.2vw, 2.1rem);
            color: #1a1612;
            line-height: 1.12;
            margin: 0 0 16px;
            letter-spacing: -0.01em;
          }
          .ep-divider-line {
            width: 36px; height: 1px;
            background: #C9A96E;
            margin: 0 0 18px;
            display: block;
          }
          .ep-desc {
            font-family: 'Inter', sans-serif;
            font-weight: 300; font-size: 14.5px;
            color: rgba(26,22,18,0.52);
            line-height: 1.82; margin: 0 0 28px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .ep-arrow-btn {
            display: inline-flex; align-items: center; justify-content: center;
            width: 48px; height: 48px; border-radius: 50%;
            border: 1px solid rgba(201,169,110,0.55);
            text-decoration: none;
            transition: background 0.4s ease, border-color 0.4s ease;
          }
          .ep-arrow-btn svg {
            transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s ease;
            color: #C9A96E;
          }
          .ep-arrow-btn:hover {
            background: rgba(201,169,110,0.12);
            border-color: #C9A96E;
          }
          .ep-arrow-btn:hover svg { transform: rotate(20deg); }

          @media (max-width: 900px) {
            .ep-block, .ep-block.ep-reverse {
              flex-direction: column !important;
              gap: 32px;
            }
            .ep-img-col, .ep-content-col { flex: 0 0 100% !important; }
          }
        `}</style>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 2rem' }}>

          {/* Section header */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 10,
                letterSpacing: '0.48em', textTransform: 'uppercase',
                color: '#9B7D4E', marginBottom: '16px',
              }}>Our Portfolio</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 400,
                fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)',
                color: '#1a1612', lineHeight: 1.08,
                margin: '0 0 24px', letterSpacing: '-0.015em',
              }}>Designed to Inspire<br />Modern Living</h2>
              <div style={{
                width: 56, height: 1,
                background: 'linear-gradient(90deg, transparent, #C9A96E 40%, transparent)',
                margin: '0 auto 22px',
              }} />
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 15,
                color: 'rgba(26,22,18,0.46)', lineHeight: 1.8,
                maxWidth: 520, margin: '0 auto',
              }}>
                Thoughtfully crafted interiors that blend elegance,<br />comfort, and timeless design.
              </p>
            </div>
          </FadeIn>

          {/* Alternating editorial blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 7vw, 88px)' }}>
            {portfolioProjects.map((p, i) => (
              <FadeIn key={p.id} delay={0.05}>
                <div className={`ep-block${i % 2 === 1 ? ' ep-reverse' : ''}`}>

                  {/* Image */}
                  <div className="ep-img-col">
                    <div className="ep-img-wrap">
                      <img src={p.img} alt={p.name} className="ep-img" loading="lazy" draggable={false} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ep-content-col">
                    <span className="ep-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="ep-title">{p.name}</h3>
                    <span className="ep-divider-line" />
                    <p className="ep-desc">{p.desc}</p>
                    <Link to="/portfolio" className="ep-arrow-btn" aria-label={`View ${p.name}`}>
                      <ArrowRight size={18} strokeWidth={1.4} />
                    </Link>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>

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
          .ig-thumb { display: block; position: relative; overflow: hidden; aspect-ratio: 1 / 1; cursor: pointer; }
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
                href="https://www.instagram.com/nivora.interiors/"
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
              href="https://www.instagram.com/nivora.interiors/"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-cta"
              style={{ cursor: 'pointer' }}
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
