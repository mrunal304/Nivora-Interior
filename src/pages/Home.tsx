import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ProcessSection from '../components/ProcessSection'
import { useState, useRef, useEffect } from 'react'
import { projects } from '../data/projects'

const heroImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85'
const beforeImg = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80'
const afterImg = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80'

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
    title: 'Residential Interiors',
    desc: 'Homes that feel deeply personal — designed around how you actually live, not how homes are supposed to look.',
    hoverDesc: 'Crafting homes that feel deeply personal and enduringly beautiful.',
    href: '/services/residential',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    title: 'Commercial Interiors',
    desc: 'Workspaces, cafés, showrooms, and hospitality spaces that make an immediate impression and sustain it.',
    hoverDesc: 'Designing spaces that make an immediate impression and sustain it.',
    href: '/services/commercial',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    title: 'Architecture',
    desc: 'Complete architectural design services — from concept and planning to structure, façade, and landscape.',
    hoverDesc: 'From concept to façade — spaces built to endure and inspire.',
    href: '/services/architecture',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
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

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(5, Math.min(95, pct)))
  }

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX
      update(x)
    }
    const up = () => { dragging.current = false }
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move as EventListener)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move as EventListener)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        ref={containerRef}
        style={{ width: '80%', maxWidth: 900, height: 500, position: 'relative', overflow: 'hidden', cursor: 'col-resize', userSelect: 'none', flexShrink: 0 }}
        onMouseDown={e => { dragging.current = true; update(e.clientX) }}
        onTouchStart={e => { dragging.current = true; update(e.touches[0].clientX) }}
      >
        <img src={afterImg} alt="After" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${pos}%` }}>
          <img src={beforeImg} alt="Before" style={{ position: 'absolute', inset: 0, height: '100%', objectFit: 'cover', width: `${10000 / pos}%` }} />
        </div>
        {/* Divider line + handle */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', left: `${pos}%`, transform: 'translateX(-50%)', zIndex: 10 }}>
          <div style={{ width: 2, height: '100%', backgroundColor: '#C9A96E', position: 'absolute' }} />
          <div style={{
            position: 'relative',
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1.5px solid #C9A96E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            gap: 2,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        {/* Before label */}
        <span style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: 10,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#C9A96E',
          backgroundColor: 'rgba(15,25,15,0.75)',
          border: '1px solid #C9A96E',
          padding: '5px 12px',
        }}>Before</span>
        {/* After label */}
        <span style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: 10,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#C9A96E',
          backgroundColor: 'rgba(15,25,15,0.75)',
          border: '1px solid #C9A96E',
          padding: '5px 12px',
        }}>After</span>
      </div>
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
      <section className="philosophy-section" style={{ backgroundColor: '#f7f4ef', padding: '80px 1.5rem' }}>
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
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: '#33452F', padding: '5rem 1.5rem' }}>
        <style>{`
          .svc-card-explore-line {
            display: inline-block;
            width: 24px;
            height: 0.5px;
            background: rgba(200,169,110,0.45);
            transition: width 0.35s ease, background 0.35s ease;
            vertical-align: middle;
          }
          .svc-card:hover .svc-card-explore-line {
            width: 48px;
            background: #C9A96E;
          }
          .svc-card:hover .svc-card-img {
            transform: scale(1.05);
          }
          .svc-card-img {
            transition: transform 0.7s ease;
          }
          .svc-card-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.45);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 2;
            pointer-events: none;
          }
          .svc-card:hover .svc-card-overlay {
            opacity: 1;
          }
          .svc-card-hover-desc {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0 1.25rem 1.25rem;
            z-index: 3;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: none;
          }
          .svc-card:hover .svc-card-hover-desc {
            opacity: 1;
            transform: translateY(0);
          }
          .svc-card-explore-text {
            position: relative;
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(200,169,110,0.7);
            transition: color 0.25s ease;
          }
          .svc-card-explore-text::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 0;
            height: 1px;
            background: #C9A96E;
            transition: width 0.25s ease;
          }
          .svc-card:hover .svc-card-explore-text {
            color: #C9A96E;
          }
          .svc-card:hover .svc-card-explore-text::after {
            width: 100%;
          }
        `}</style>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#c8a96e',
              marginBottom: '0.75rem',
            }}>What We Do</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#f5f0e8',
              lineHeight: 1.1,
            }}>Our Services</h2>
          </div>
        </FadeIn>

        {/* 3-col grid */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          border: '1px solid rgba(200,169,110,0.18)',
        }}>
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.15}>
              <Link
                to={s.href}
                className="svc-card"
                style={{
                  display: 'block',
                  height: 480,
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: i > 0 ? '2px solid rgba(200,169,110,0.22)' : 'none',
                  textDecoration: 'none',
                }}
              >
                {/* Featured pill — middle card only */}
                {i === 1 && (
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 10,
                    border: '1px solid #C9A96E',
                    padding: '4px 12px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 10,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                    backgroundColor: '#1A2E1B',
                  }}>Featured</div>
                )}

                {/* Image + overlays */}
                <div style={{ position: 'absolute', inset: 0, bottom: 52, overflow: 'hidden' }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    className="svc-card-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  {/* permanent gradient */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(20,40,20,0.1) 30%, rgba(15,30,15,0.88) 100%)',
                    zIndex: 1,
                  }} />
                  {/* hover dark overlay */}
                  <div className="svc-card-overlay" />
                  {/* title + short desc — always visible */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem 1.25rem 1rem', zIndex: 4 }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: '1.6rem',
                      color: '#f5f0e8',
                      lineHeight: 1.15,
                      marginBottom: '0.3rem',
                    }}>{s.title}</h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      fontSize: 11,
                      color: 'rgba(245,240,232,0.6)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}>{s.desc.split('—')[0].trim()}</p>
                  </div>
                  {/* hover slide-up description */}
                  <div className="svc-card-hover-desc">
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontStyle: 'italic',
                      fontSize: '1.05rem',
                      color: 'rgba(245,240,232,0.92)',
                      lineHeight: 1.55,
                      margin: 0,
                    }}>{s.hoverDesc}</p>
                  </div>
                </div>

                {/* Footer bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 52,
                  backgroundColor: '#33452F',
                  borderTop: '0.5px solid rgba(200,169,110,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1.25rem',
                  gap: 10,
                }}>
                  <span className="svc-card-explore-text">Explore</span>
                  <span className="svc-card-explore-line" />
                  <ArrowRight size={11} color="#C9A96E" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Process — Light Editorial Rebuild */}
      <ProcessSection />

      {/* Before / After */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">The Transformation</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light mb-4">Before & After</h2>
          <p className="text-[#f5f0e8]/40 text-sm font-light">Drag the slider to see the difference</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <BeforeAfterSlider />
        </FadeIn>
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
