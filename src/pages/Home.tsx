import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Home as HomeIcon, Building2, Coffee, Layers, Monitor, Gem, Wrench } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ProcessSection from '../components/ProcessSection'
import { useState, useRef, useEffect, useCallback } from 'react'
import { projects } from '../data/projects'

const heroImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85'
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
    beforeImg: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    beforeDesc: 'Generic finishes, sparse furniture and poor spatial planning that felt impersonal and flat.',
    afterDesc: 'Warm textures, bespoke headboard, ambient lighting and a cohesive palette that feels like a boutique retreat.',
  },
  {
    id: 3,
    title: 'Kitchen Transformation',
    beforeImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1556909045-9de404c69a78?w=800&q=80',
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
    beforeImg: 'https://images.unsplash.com/photo-1562917994-8f8c50c59bb6?w=800&q=80',
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
    text: 'NIVORA completely transformed our apartment. What struck us most was how well Shweta understood what we wanted before we could even articulate it ourselves.',
    name: 'Priya & Rohan K.',
    location: 'Bandra, Mumbai',
    initials: 'PR',
  },
  {
    text: 'Our café has become one of the most photographed spots in Pune. Every corner was designed with intention. The team was professional, transparent, and genuinely talented.',
    name: 'Aditya S.',
    location: 'FC Road, Pune',
    initials: 'AS',
  },
  {
    text: 'The process felt effortless from start to finish. We were kept informed at every stage, and the final result exceeded our expectations in every way.',
    name: 'Meera & Vikram P.',
    location: 'Koregaon Park, Pune',
    initials: 'MV',
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

function TransformationCarousel() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const count = transformations.length

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + count) % count)
  }, [count])

  const startTimer = useCallback((interval = 4200) => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(p => (p + 1) % count)
    }, interval)
  }, [count])

  useEffect(() => {
    if (!isHovered && !isDragging) startTimer()
    else if (isHovered && !isDragging) startTimer(8000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isHovered, isDragging, startTimer])

  const onDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
    setDragDelta(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }
  const onDragMove = (clientX: number) => {
    if (!isDragging) return
    setDragDelta(clientX - dragStart)
  }
  const onDragEnd = () => {
    if (!isDragging) return
    const threshold = 80
    if (dragDelta < -threshold) goTo(current + 1)
    else if (dragDelta > threshold) goTo(current - 1)
    setIsDragging(false)
    setDragDelta(0)
    startTimer()
  }

  const slideW = trackRef.current ? trackRef.current.offsetWidth : 0
  const translateX = -current * 100 + (slideW > 0 && isDragging ? (dragDelta / slideW) * 100 : 0)

  return (
    <div>
      <style>{`
        .trf-card { border-radius: 28px; background: #fff; box-shadow: 0 8px 48px rgba(38,36,33,0.09), 0 2px 12px rgba(38,36,33,0.05); overflow: hidden; user-select: none; }
        .trf-img { transition: transform 700ms cubic-bezier(0.22,1,0.36,1); display: block; width: 100%; height: 100%; object-fit: cover; }
        .trf-side:hover .trf-img { transform: scale(1.04); }
        .trf-side { flex: 1; position: relative; overflow: hidden; height: 400px; }
        .trf-tag {
          position: absolute; top: 16px; left: 16px; z-index: 4;
          font-family: 'Inter', sans-serif; font-weight: 400; font-size: 9px;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #C8A56A; background: rgba(250,248,244,0.9);
          border: 1px solid rgba(200,165,106,0.6);
          padding: 5px 12px; border-radius: 100px;
          backdrop-filter: blur(4px);
        }
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
        .trf-desc-fade { opacity: 0; transform: translateY(12px); transition: opacity 500ms ease, transform 500ms ease; }
        .trf-card:hover .trf-desc-fade { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Track */}
      <div
        ref={trackRef}
        style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', borderRadius: 28 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); if (isDragging) onDragEnd() }}
        onMouseDown={e => onDragStart(e.clientX)}
        onMouseMove={e => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onTouchStart={e => onDragStart(e.touches[0].clientX)}
        onTouchMove={e => { e.preventDefault(); onDragMove(e.touches[0].clientX) }}
        onTouchEnd={onDragEnd}
      >
        <div style={{
          display: 'flex',
          transition: isDragging ? 'none' : 'transform 900ms cubic-bezier(0.4,0,0.2,1)',
          transform: `translateX(${translateX}%)`,
          willChange: 'transform',
        }}>
          {transformations.map((t) => (
            <div key={t.id} style={{ minWidth: '100%', padding: '0 2px' }}>
              <div className="trf-card">
                {/* Images row */}
                <div style={{ display: 'flex' }}>
                  {/* Before */}
                  <div className="trf-side" style={{ borderRight: '1px solid #F5F1EA' }}>
                    <img src={t.beforeImg} alt={`Before — ${t.title}`} className="trf-img" loading="lazy" draggable={false} />
                    <span className="trf-tag">Before</span>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(10,8,6,0.45) 100%)', pointerEvents: 'none', zIndex: 2 }} />
                  </div>

                  {/* Center divider */}
                  <div style={{
                    width: 64, flexShrink: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', background: '#FAF8F4', gap: 10, zIndex: 3,
                  }}>
                    <div style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, transparent, #E8DED1 30%, #E8DED1 70%, transparent)' }} />
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%', border: '1px solid #C8A56A',
                      background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 12px rgba(200,165,106,0.2)', flexShrink: 0,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A56A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                    <div style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, transparent, #E8DED1 30%, #E8DED1 70%, transparent)' }} />
                  </div>

                  {/* After */}
                  <div className="trf-side" style={{ borderLeft: '1px solid #F5F1EA' }}>
                    <img src={t.afterImg} alt={`After — ${t.title}`} className="trf-img" loading="lazy" draggable={false} />
                    <span className="trf-tag" style={{ left: 'auto', right: 16, color: '#C8A56A' }}>After</span>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(10,8,6,0.45) 100%)', pointerEvents: 'none', zIndex: 2 }} />
                  </div>
                </div>

                {/* Description block */}
                <div style={{ padding: '2rem 2.5rem 2.25rem', borderTop: '1px solid #F5F1EA' }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                    fontSize: 'clamp(1.35rem, 2vw, 1.75rem)', color: '#262421',
                    margin: '0 0 1.25rem', letterSpacing: '-0.01em',
                  }}>{t.title}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }}>
                    {/* Before desc */}
                    <div>
                      <p style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 9,
                        letterSpacing: '0.25em', textTransform: 'uppercase',
                        color: 'rgba(38,36,33,0.35)', margin: '0 0 0.5rem',
                      }}>Before</p>
                      <p style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 13.5,
                        color: 'rgba(38,36,33,0.55)', lineHeight: 1.75, margin: 0,
                      }}>{t.beforeDesc}</p>
                    </div>
                    {/* After desc */}
                    <div>
                      <p style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 9,
                        letterSpacing: '0.25em', textTransform: 'uppercase',
                        color: '#C8A56A', margin: '0 0 0.5rem',
                      }}>After</p>
                      <p style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 13.5,
                        color: 'rgba(38,36,33,0.72)', lineHeight: 1.75, margin: 0,
                      }}>{t.afterDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: '2.25rem' }}>
        {/* Prev */}
        <button className="trf-nav" onClick={() => goTo(current - 1)} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#262421" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {transformations.map((_, i) => (
            <button key={i} className={`trf-dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        {/* Next */}
        <button className="trf-nav" onClick={() => goTo(current + 1)} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#262421" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Slide counter */}
      <p style={{
        textAlign: 'center', marginTop: '1rem',
        fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 11,
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

      {/* Centre content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto', width: '100%' }}>

        {/* Location tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
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

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(46px, 7vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: 32,
          }}
        >
          <span style={{ color: '#f5f0e8' }}>Interiors —&nbsp;</span>
          <em className="hero-italic-reveal" style={{ color: '#b8966a', fontStyle: 'italic' }}>That Feel Effortless</em>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.48, ease: 'easeOut' }}
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

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
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
      </div>

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
          /* ── Service card ── */
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
          /* image zoom */
          .hsvc-img {
            transition: transform 700ms cubic-bezier(0.22,1,0.36,1);
          }
          .hsvc-card:hover .hsvc-img {
            transform: scale(1.08);
          }
          /* overlay darkens on hover */
          .hsvc-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(
              to bottom,
              rgba(15,12,10,0.18) 0%,
              rgba(10,8,6,0.62) 55%,
              rgba(6,5,4,0.90) 100%
            );
            transition: background 500ms cubic-bezier(0.22,1,0.36,1);
          }
          .hsvc-card:hover .hsvc-overlay {
            background: linear-gradient(
              to bottom,
              rgba(15,12,10,0.32) 0%,
              rgba(10,8,6,0.78) 45%,
              rgba(6,5,4,0.96) 100%
            );
          }
          /* title slides up on hover */
          .hsvc-title {
            transition: transform 500ms cubic-bezier(0.22,1,0.36,1);
          }
          .hsvc-card:hover .hsvc-title {
            transform: translateY(-10px);
          }
          /* gold accent line */
          .hsvc-gold-line {
            width: 0;
            height: 1.5px;
            background: #C8A56A;
            border-radius: 2px;
            transition: width 500ms cubic-bezier(0.22,1,0.36,1);
            margin: 0.65rem 0 0.75rem;
          }
          .hsvc-card:hover .hsvc-gold-line {
            width: 36px;
          }
          /* description fades in */
          .hsvc-desc {
            opacity: 0;
            transform: translateY(14px);
            transition: opacity 500ms cubic-bezier(0.22,1,0.36,1),
                        transform 500ms cubic-bezier(0.22,1,0.36,1);
            transition-delay: 40ms;
          }
          .hsvc-card:hover .hsvc-desc {
            opacity: 1;
            transform: translateY(0);
          }
          /* explore link */
          .hsvc-explore {
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 400ms cubic-bezier(0.22,1,0.36,1),
                        transform 400ms cubic-bezier(0.22,1,0.36,1);
            transition-delay: 80ms;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 1rem;
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: 10px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #C8A56A;
          }
          .hsvc-card:hover .hsvc-explore {
            opacity: 1;
            transform: translateY(0);
          }
          /* icon container */
          .hsvc-icon-wrap {
            width: 40px; height: 40px;
            border-radius: 10px;
            background: rgba(200,165,106,0.15);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 0.65rem;
            transition: background 400ms ease;
          }
          .hsvc-card:hover .hsvc-icon-wrap {
            background: rgba(200,165,106,0.25);
          }
          /* grids */
          .hsvc-grid-r1 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .hsvc-grid-r2 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
            max-width: 895px;
            margin-left: auto;
            margin-right: auto;
          }
          @media (max-width: 1100px) {
            .hsvc-grid-r1 { grid-template-columns: repeat(2, 1fr) !important; }
            .hsvc-grid-r2 { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
            .hsvc-card { height: 360px !important; }
          }
          @media (max-width: 639px) {
            .hsvc-grid-r1, .hsvc-grid-r2 {
              grid-template-columns: 1fr !important;
              max-width: 100% !important;
            }
            .hsvc-card { height: 320px !important; }
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
                    {/* Background image */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 24 }}>
                      <img
                        src={s.img}
                        alt={s.title}
                        className="hsvc-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                    {/* Gradient overlay */}
                    <div className="hsvc-overlay" />
                    {/* Content */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      padding: '1.75rem 1.6rem',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      zIndex: 2,
                    }}>
                      {/* Number — top left */}
                      <p style={{
                        position: 'absolute', top: '1.6rem', left: '1.6rem',
                        fontFamily: "'Inter', sans-serif", fontWeight: 300,
                        fontSize: 10, letterSpacing: '0.3em',
                        color: 'rgba(200,165,106,0.7)', margin: 0,
                      }}>{s.num}</p>
                      {/* Icon */}
                      <div className="hsvc-icon-wrap">
                        <Icon size={18} color="#C8A56A" strokeWidth={1.4} />
                      </div>
                      {/* Title */}
                      <h3 className="hsvc-title" style={{
                        fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                        fontSize: 'clamp(1.25rem, 1.8vw, 1.55rem)',
                        color: '#f5f0e8', lineHeight: 1.18,
                        margin: 0, letterSpacing: '-0.005em',
                      }}>{s.title}</h3>
                      {/* Gold line */}
                      <div className="hsvc-gold-line" />
                      {/* Description */}
                      <p className="hsvc-desc" style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 300,
                        fontSize: 12.5, color: 'rgba(245,240,232,0.78)',
                        lineHeight: 1.75, margin: 0,
                      }}>{s.desc}</p>
                      {/* Explore link */}
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
                      <img
                        src={s.img}
                        alt={s.title}
                        className="hsvc-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                    <div className="hsvc-overlay" />
                    <div style={{
                      position: 'absolute', inset: 0,
                      padding: '1.75rem 1.6rem',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      zIndex: 2,
                    }}>
                      <p style={{
                        position: 'absolute', top: '1.6rem', left: '1.6rem',
                        fontFamily: "'Inter', sans-serif", fontWeight: 300,
                        fontSize: 10, letterSpacing: '0.3em',
                        color: 'rgba(200,165,106,0.7)', margin: 0,
                      }}>{s.num}</p>
                      <div className="hsvc-icon-wrap">
                        <Icon size={18} color="#C8A56A" strokeWidth={1.4} />
                      </div>
                      <h3 className="hsvc-title" style={{
                        fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                        fontSize: 'clamp(1.25rem, 1.8vw, 1.55rem)',
                        color: '#f5f0e8', lineHeight: 1.18,
                        margin: 0, letterSpacing: '-0.005em',
                      }}>{s.title}</h3>
                      <div className="hsvc-gold-line" />
                      <p className="hsvc-desc" style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 300,
                        fontSize: 12.5, color: 'rgba(245,240,232,0.78)',
                        lineHeight: 1.75, margin: 0,
                      }}>{s.desc}</p>
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
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
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

      {/* Portfolio Preview */}
      <section className="pt-20 pb-32" style={{ backgroundColor: '#2D3E29' }}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Selected Work</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light">Recent Projects</h2>
          </FadeIn>
          {/* Gold-bordered mosaic grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-3"
            style={{ gap: '1px', backgroundColor: 'rgba(201,169,110,0.35)' }}
          >
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <Link
                  to={`/portfolio/${p.id}`}
                  className="proj-cell group relative block overflow-hidden"
                  style={{ display: 'block', height: 380 }}
                >
                  <img
                    src={p.coverImage}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ display: 'block' }}
                    loading="lazy"
                  />
                  {/* Dark hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                  />
                  {/* Hover text — name + city */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontStyle: 'italic',
                      fontSize: '1.4rem',
                      color: '#f5f0e8',
                      lineHeight: 1.2,
                      textAlign: 'center',
                      margin: 0,
                      padding: '0 1rem',
                    }}>{p.name}</p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      fontSize: 10,
                      letterSpacing: '2.5px',
                      textTransform: 'uppercase',
                      color: '#C9A96E',
                      marginTop: 10,
                    }}>{p.location}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          {/* View All Projects CTA */}
          <FadeIn delay={0.3} className="text-center mt-14">
            <Link
              to="/portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #E0C38A 0%, #C8A46A 50%, #A8854F 100%)',
                color: '#2D3E29',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 20px rgba(168,133,79,0.30)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #EDD09A 0%, #D4B078 50%, #B8904E 100%)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(168,133,79,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #E0C38A 0%, #C8A46A 50%, #A8854F 100%)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(168,133,79,0.30)'
              }}
            >
              View All Projects <ArrowRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <style>{`
          .testi-read-more {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #C9A96E;
            text-decoration: none;
            transition: color 0.25s ease;
          }
          .testi-read-more::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: #C9A96E;
            transition: width 0.25s ease;
          }
          .testi-read-more:hover::after {
            width: 100%;
          }
        `}</style>
        <FadeIn className="text-center mb-16">
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Client Stories</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light">What Clients Say</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{
                border: '1px solid rgba(201,169,110,0.25)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.5s ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)')}
              >
                {/* 5 gold stars */}
                <div style={{ marginBottom: 16, letterSpacing: 2, fontSize: 13, color: '#C9A96E' }}>
                  ★★★★★
                </div>
                {/* Quote */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  fontWeight: 300,
                  color: 'rgba(245,240,232,0.82)',
                  lineHeight: 1.8,
                  flex: 1,
                  marginBottom: '1.75rem',
                }}>
                  "{t.text}"
                </p>
                {/* Name + location + avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* Initials avatar */}
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1px solid #C9A96E',
                    backgroundColor: '#2E4A30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 10,
                    letterSpacing: '0.5px',
                    color: '#C9A96E',
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      color: '#C9A96E',
                      margin: 0,
                    }}>{t.name}</p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      fontSize: 10,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.3)',
                      margin: '3px 0 0',
                    }}>{t.location}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3} className="text-center mt-12">
          <Link to="/testimonials" className="testi-read-more">
            Read More Stories <ArrowRight size={12} />
          </Link>
        </FadeIn>
      </section>

      {/* Instagram */}
      <section className="pt-12 pb-32 px-6 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          {/* Editorial gold rule */}
          <div style={{ width: 60, height: 1, backgroundColor: '#C9A96E', margin: '0 auto 20px' }} />
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#b8966a',
            marginBottom: 16,
          }}>Follow the Journey</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#f5f0e8',
            marginBottom: 12,
            lineHeight: 1.1,
          }}>@NivoraInteriors</h2>
          <p className="text-[#f5f0e8]/40 text-sm font-light">Daily design inspiration and behind-the-scenes site visits</p>
        </FadeIn>

        {/* 3×2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '3px' }}>
          {igPosts.map((src, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <a
                href="https://instagram.com/NivoraInteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden"
                style={{ aspectRatio: '1 / 1' }}
              >
                <img
                  src={src}
                  alt={`@NivoraInteriors post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gold tint overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'rgba(201,169,110,0.15)' }}
                >
                  {/* Instagram icon — white, 24px */}
                  <svg
                    width="24"
                    height="24"
                    fill="white"
                    viewBox="0 0 24 24"
                    style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }}
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Follow CTA */}
        <FadeIn delay={0.3} className="text-center mt-10">
          <a
            href="https://instagram.com/NivoraInteriors"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Follow on Instagram <ArrowRight size={12} />
          </a>
        </FadeIn>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: '#33452F' }}>
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
