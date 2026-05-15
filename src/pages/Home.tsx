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
]

const stats: { value: string; label: string }[] = []

const services = [
  {
    title: 'Residential Interiors',
    desc: 'Homes that feel deeply personal — designed around how you actually live, not how homes are supposed to look.',
    href: '/services/residential',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    title: 'Commercial Interiors',
    desc: 'Workspaces, cafés, showrooms, and hospitality spaces that make an immediate impression and sustain it.',
    href: '/services/commercial',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    title: 'Architecture',
    desc: 'Complete architectural design services — from concept and planning to structure, façade, and landscape.',
    href: '/services/architecture',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
  },
]


const testimonials = [
  {
    text: 'NIVORA completely transformed our apartment. What struck us most was how well Shweta understood what we wanted before we could even articulate it ourselves.',
    name: 'Priya & Rohan K.',
    location: 'Bandra, Mumbai',
  },
  {
    text: 'Our café has become one of the most photographed spots in Pune. Every corner was designed with intention. The team was professional, transparent, and genuinely talented.',
    name: 'Aditya S.',
    location: 'FC Road, Pune',
  },
  {
    text: 'The process felt effortless from start to finish. We were kept informed at every stage, and the final result exceeded our expectations in every way.',
    name: 'Meera & Vikram P.',
    location: 'Koregaon Park, Pune',
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
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden cursor-col-resize select-none"
      onMouseDown={e => { dragging.current = true; update(e.clientX) }}
      onTouchStart={e => { dragging.current = true; update(e.touches[0].clientX) }}
    >
      <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / pos}%` }} />
      </div>
      <div className="absolute top-0 bottom-0 flex items-center justify-center" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="w-0.5 h-full bg-[#b8966a]" />
        <div className="absolute w-10 h-10 rounded-full bg-[#b8966a] flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-[#3b4a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <svg className="w-5 h-5 text-[#3b4a35] -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <span className="absolute top-4 left-4 text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/80 bg-[#3b4a35]/60 px-3 py-1.5 backdrop-blur-sm">Before</span>
      <span className="absolute top-4 right-4 text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/80 bg-[#3b4a35]/60 px-3 py-1.5 backdrop-blur-sm">After</span>
    </div>
  )
}


function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 })

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

        {/* Location eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}
        >
          <div style={{ width: 40, height: 1, background: 'rgba(184,150,106,0.5)' }} />
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            letterSpacing: '0.45em',
            color: '#b8966a',
            textTransform: 'uppercase',
          }}>
            Mumbai &nbsp;·&nbsp; Pune
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(184,150,106,0.5)' }} />
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
          <em style={{ color: '#b8966a', fontStyle: 'italic' }}>That Feel Effortless</em>
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
          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
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
                background: '#b8966a',
                color: '#3b4a35',
                padding: '17px 40px',
                textDecoration: 'none',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 24px rgba(184,150,106,0.18)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#cda97e'
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(184,150,106,0.3)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#b8966a'
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 24px rgba(184,150,106,0.18)'
              }}
            >
              Book Free Consultation
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
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
                color: 'rgba(245,240,232,0.85)',
                padding: '16px 40px',
                border: '1px solid rgba(245,240,232,0.28)',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(184,150,106,0.7)'
                el.style.color = '#b8966a'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(245,240,232,0.28)'
                el.style.color = 'rgba(245,240,232,0.85)'
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

      {/* Responsive stats hide on small screens */}
      <style>{`
        @media (max-width: 640px) {
          .hero-stats { display: none !important; }
        }
      `}</style>
    </section>
  )
}

export default function Home() {
  const featured = projects.slice(0, 6)

  return (
    <div className="bg-[#3b4a35]">
      {/* Hero */}
      <HeroSection />

      {/* Philosophy */}
      <section style={{ backgroundColor: '#f7f4ef' }} className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Label with flanking rules */}
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div style={{ height: '0.5px', backgroundColor: '#b8966a', flex: 1, maxWidth: 80 }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 10,
                letterSpacing: '0.35em',
                color: '#b8966a',
                textTransform: 'uppercase',
              }}>Our Philosophy</span>
              <div style={{ height: '0.5px', backgroundColor: '#b8966a', flex: 1, maxWidth: 80 }} />
            </div>
          </FadeIn>

          {/* Quote */}
          <FadeIn delay={0.1}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.25,
              color: '#3b2f1e',
              marginBottom: '2rem',
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
              maxWidth: '560px',
              margin: '0 auto 3.5rem',
            }}>
              At NIVORA, every project begins with understanding — how you move through a space, what you need from it, and what makes it feel unmistakably yours. We work with refined materials, considered proportions, and timeless palettes to create interiors that hold their beauty for years, not seasons.
            </p>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.3}>
            <div style={{
              borderTop: '0.5px solid #c9b99a',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {stats.map((s, i) => (
                <div key={s.value} style={{
                  flex: '1 1 120px',
                  maxWidth: 180,
                  padding: '1.75rem 1.5rem 0',
                  textAlign: 'center',
                  borderLeft: i > 0 ? '0.5px solid #c9b99a' : 'none',
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                    color: '#3b2f1e',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 10,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#8b6914',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: '#3b4a35', padding: '5rem 1.5rem' }}>
        <style>{`
          .svc-card-explore-line {
            display: inline-block;
            width: 24px;
            height: 0.5px;
            background: rgba(200,169,110,0.45);
            transition: width 0.35s ease, background 0.35s ease;
            verticalAlign: middle;
          }
          .svc-card:hover .svc-card-explore-line {
            width: 48px;
            background: #c8a96e;
          }
          .svc-card:hover .svc-card-img {
            transform: scale(1.05);
          }
          .svc-card-img {
            transition: transform 0.7s ease;
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
                  height: 420,
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: i > 0 ? '2px solid rgba(200,169,110,0.22)' : 'none',
                  textDecoration: 'none',
                  flexDirection: 'column',
                }}
              >
                {/* Featured pill — middle card only */}
                {i === 1 && (
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 10,
                    border: '0.5px solid #c8a96e',
                    padding: '3px 10px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 9,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#c8a96e',
                    backgroundColor: 'rgba(30,51,32,0.55)',
                    backdropFilter: 'blur(4px)',
                  }}>Featured</div>
                )}

                {/* Image area */}
                <div style={{ position: 'absolute', inset: 0, bottom: 48, overflow: 'hidden' }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    className="svc-card-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  {/* gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(20,40,20,0.1) 30%, rgba(15,30,15,0.88) 100%)',
                  }} />
                  {/* title + descriptor over image */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem 1.25rem 1rem' }}>
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
                </div>

                {/* Footer bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 48,
                  backgroundColor: '#3b4a35',
                  borderTop: '0.5px solid rgba(200,169,110,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1.25rem',
                  gap: 10,
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#c8a96e',
                  }}>Explore</span>
                  <span className="svc-card-explore-line" />
                  <ArrowRight size={11} color="#c8a96e" />
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
      <section className="pt-20 pb-32 bg-[#3b4a35]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Selected Work</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light">Recent Projects</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <Link to={`/portfolio/${p.id}`} className="group relative block overflow-hidden">
                  <div className="overflow-hidden" style={{ height: 380 }}>
                    <img
                      src={p.coverImage}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#3b4a35]/0 group-hover:bg-[#3b4a35]/60 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="font-serif text-xl text-[#f5f0e8] font-light">{p.name}</h3>
                      <p className="text-[#b8966a] text-xs tracking-wider mt-1">{p.location}</p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="text-center mt-14">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 border border-[#b8966a] text-[#b8966a] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#b8966a] hover:text-[#3b4a35] transition-all duration-300"
            >
              View Full Portfolio <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Client Stories</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light">What Clients Say</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="border border-[#b8966a]/15 p-8 hover:border-[#b8966a]/40 transition-all duration-500 h-full flex flex-col">
                <p className="font-serif text-lg text-[#f5f0e8]/80 leading-relaxed font-light mb-8 flex-1">
                  "{t.text}"
                </p>
                <div>
                  <p className="text-[#b8966a] text-sm font-light">{t.name}</p>
                  <p className="text-[#f5f0e8]/30 text-xs tracking-wider mt-1">{t.location}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3} className="text-center mt-12">
          <Link to="/testimonials" className="text-[#b8966a] text-xs tracking-[0.2em] uppercase hover:text-[#d4b896] transition-colors duration-300 flex items-center gap-2 justify-center">
            Read More Stories <ArrowRight size={12} />
          </Link>
        </FadeIn>
      </section>

      {/* Instagram */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-4">
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Follow the Journey</p>
          <h2 className="font-serif text-4xl text-[#f5f0e8] font-light mb-4">@NivoraInteriors</h2>
          <p className="text-[#f5f0e8]/40 text-sm font-light">Daily design inspiration and behind-the-scenes site visits</p>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {igPosts.map((src, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a
                href="https://instagram.com/NivoraInteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-square overflow-hidden"
              >
                <img src={src} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-[#b8966a]/0 group-hover:bg-[#b8966a]/20 transition-all duration-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#3b4a35] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #b8966a 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Limited Spots Available</p>
            <h2 className="font-serif text-4xl md:text-6xl text-[#f5f0e8] font-light leading-tight mb-6">
              Ready to Transform<br />Your Space?
            </h2>
            <p className="text-[#f5f0e8]/50 font-light mb-10 max-w-lg mx-auto leading-relaxed">
              Claim your Free Layout Consultation today and let's start building your dream.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-3 bg-[#b8966a] text-[#3b4a35] text-xs tracking-[0.25em] uppercase px-12 py-5 hover:bg-[#d4b896] transition-all duration-300 font-medium"
            >
              Claim My Free Offer Now <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
