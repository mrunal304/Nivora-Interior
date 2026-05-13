import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Compass, Eye, Wrench, Sparkles, KeyRound } from 'lucide-react'
import FadeIn from '../components/FadeIn'
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

const stats = [
  { value: '25+', label: 'Projects Completed' },
  { value: '2+', label: 'Years of Experience' },
  { value: '2', label: 'Cities — Mumbai & Pune' },
  { value: '100%', label: 'End-to-End Solutions' },
]

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
          <svg className="w-5 h-5 text-[#1c2b1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <svg className="w-5 h-5 text-[#1c2b1a] -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <span className="absolute top-4 left-4 text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/80 bg-[#1c2b1a]/60 px-3 py-1.5 backdrop-blur-sm">Before</span>
      <span className="absolute top-4 right-4 text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/80 bg-[#1c2b1a]/60 px-3 py-1.5 backdrop-blur-sm">After</span>
    </div>
  )
}

const PROCESS_STEPS = [
  {
    icon: <Compass size={18} color="#a18661" />,
    title: 'Discover',
    text: 'A free consultation to understand your lifestyle, your budget, and what your space truly needs to do for you.',
  },
  {
    icon: <Eye size={18} color="#a18661" />,
    title: 'Visualise',
    text: 'Detailed 3D renders, mood boards, and material palettes — so you see your home clearly before we build a single thing.',
  },
  {
    icon: <Wrench size={18} color="#a18661" />,
    title: 'Execute',
    text: 'Our master craftsmen bring the design to life with precision, managed on-site with meticulous care and clear timelines.',
  },
  {
    icon: <Sparkles size={18} color="#a18661" />,
    title: 'Reveal',
    text: 'The handover. A deep-cleaned, styled, and ready-to-move-in space that surprises — even though you approved every detail.',
  },
  {
    icon: <KeyRound size={18} color="#a18661" />,
    title: 'Handover',
    text: 'Your space, fully ready. A finished interior built for real living — and a relationship we hope continues well beyond delivery.',
  },
]

function ProcessSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      style={{
        background: '#F5F2ED',
        paddingTop: 120,
        paddingBottom: 120,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        {/* Two-column grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          {/* ── LEFT: Photo Collage ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              flex: '0 0 42%',
              position: 'relative',
              minHeight: 580,
            }}
            className="process-left-col"
          >
            {/* Photo 1 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 320,
                height: 400,
                border: '1.5px solid #a18661',
                borderRadius: 0,
                overflow: 'hidden',
              }}
              className="process-photo1"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=85"
                alt="NIVORA interior — living space"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>

            {/* Photo 2 — overlapping */}
            <div
              style={{
                position: 'absolute',
                top: 200,
                left: 140,
                width: 240,
                height: 300,
                border: '1.5px solid #a18661',
                borderRadius: 0,
                overflow: 'hidden',
                boxShadow: '-8px 8px 40px rgba(33,41,26,0.15)',
                zIndex: 2,
              }}
              className="process-photo2"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85"
                alt="NIVORA interior — workspace"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>

            {/* Gold accent square */}
            <div
              style={{
                position: 'absolute',
                top: 198,
                left: 138,
                width: 12,
                height: 12,
                background: '#a18661',
                zIndex: 10,
              }}
            />

            {/* Studio label */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                fontFamily: "'Cinzel', serif",
                fontSize: 8,
                letterSpacing: '0.3em',
                color: '#6D5A41',
                textTransform: 'uppercase',
              }}
            >
              NIVORA INTERIORS &nbsp;·&nbsp; MUMBAI &amp; PUNE
            </div>
          </motion.div>

          {/* ── RIGHT: Steps ── */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            {/* Eyebrow + Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: '0.4em',
                color: '#a18661',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                HOW WE WORK
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 64,
                lineHeight: 1.0,
                color: '#21291a',
                marginBottom: 52,
              }}
                className="process-heading"
              >
                Our Process
              </h2>
            </motion.div>

            {/* Steps */}
            <div>
              {PROCESS_STEPS.map((step, i) => {
                const isLast = i === PROCESS_STEPS.length - 1
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="process-step"
                    style={{
                      paddingTop: 28,
                      paddingBottom: 28,
                      paddingLeft: 28,
                      borderLeft: '2px solid rgba(161,134,97,0.35)',
                      position: 'relative',
                      transition: 'border-left-color 0.4s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#a18661'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'rgba(161,134,97,0.35)'
                    }}
                  >
                    {/* Header row: icon + title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                      {step.icon}
                      <h3
                        className="process-step-title"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontStyle: 'italic',
                          fontWeight: 500,
                          fontSize: 32,
                          color: '#21291a',
                          lineHeight: 1.2,
                          transition: 'color 0.3s',
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.9,
                      color: '#6D5A41',
                      maxWidth: 560,
                      marginTop: 0,
                    }}>
                      {step.text}
                    </p>

                    {/* Divider (not on last step) */}
                    {!isLast && (
                      <div style={{
                        height: 1,
                        background: 'rgba(161,134,97,0.2)',
                        width: 'calc(100% + 28px)',
                        marginLeft: -28,
                      } as React.CSSProperties} />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ marginTop: 40 }}
            >
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9,
                letterSpacing: '0.35em',
                color: '#6D5A41',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}>
                END-TO-END &nbsp;·&nbsp; TRANSPARENT &nbsp;·&nbsp; HASSLE-FREE
              </p>

              {/* CTA Button */}
              <Link
                to="/quote"
                className="process-cta-btn"
                style={{
                  display: 'inline-block',
                  fontFamily: "'Cinzel', serif",
                  fontSize: 9,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  background: '#21291a',
                  color: '#F5F2ED',
                  padding: '16px 36px',
                  border: 'none',
                  borderRadius: 1,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s, color 0.3s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = '#a18661'
                  el.style.color = '#21291a'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = '#21291a'
                  el.style.color = '#F5F2ED'
                }}
              >
                BOOK FREE CONSULTATION
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .process-left-col {
            flex: 0 0 100% !important;
            min-height: 280px !important;
            min-width: 100% !important;
            margin-bottom: 48px;
          }
          .process-photo1 {
            width: 100% !important;
            height: 260px !important;
            position: relative !important;
            top: auto !important;
            left: auto !important;
          }
          .process-photo2 {
            display: none !important;
          }
          .process-heading {
            font-size: 44px !important;
          }
          .process-step-title {
            font-size: 26px !important;
          }
          .process-cta-btn {
            display: block !important;
            text-align: center !important;
          }
        }
      `}</style>
    </motion.section>
  )
}

export default function Home() {
  const featured = projects.slice(0, 6)

  return (
    <div className="bg-[#1c2b1a]">
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="NIVORA Interiors"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[#1c2b1a]/65" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-8"
          >
            Mumbai &nbsp;|&nbsp; Pune
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-5xl md:text-7xl text-[#f5f0e8] leading-[1.1] mb-8 font-light"
          >
            Thoughtfully Designed Interiors
            <br />
            <em className="text-[#b8966a] not-italic">That Feel Effortless</em> to Live In
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[#f5f0e8]/60 text-base md:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed"
          >
            We design homes and workspaces that are beautiful, functional, and built for everyday living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 bg-[#b8966a] text-[#1c2b1a] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#d4b896] transition-all duration-300 font-medium"
            >
              Book Free Consultation
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 border border-[#f5f0e8]/40 text-[#f5f0e8] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-[#b8966a] hover:text-[#b8966a] transition-all duration-300"
            >
              View Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#b8966a]/60"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light leading-tight mb-8">
            "Design is not just seen —<br />
            <em className="text-[#b8966a]">it is experienced.</em>"
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[#f5f0e8]/50 leading-relaxed font-light max-w-2xl mx-auto">
            At NIVORA, every project begins with understanding — how you move through a space, what you need from it, and what makes it feel unmistakably yours. We work with refined materials, considered proportions, and timeless palettes to create interiors that hold their beauty for years, not seasons.
          </p>
        </FadeIn>
      </section>

      {/* Services Preview */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">What We Do</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light">Our Services</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.15}>
              <Link to={s.href} className="group block relative overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#1c2b1a]/50 group-hover:bg-[#1c2b1a]/30 transition-all duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-serif text-2xl text-[#f5f0e8] mb-3 font-light">{s.title}</h3>
                  <p className="text-[#f5f0e8]/60 text-sm leading-relaxed font-light mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {s.desc}
                  </p>
                  <span className="text-[#b8966a] text-xs tracking-[0.2em] uppercase flex items-center gap-2">
                    Explore <ArrowRight size={12} />
                  </span>
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
      <section className="py-32 bg-[#131f12]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Selected Work</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light">Recent Projects</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <Link to={`/portfolio/${p.id}`} className="group relative block overflow-hidden">
                  <div className={`overflow-hidden ${i === 0 || i === 5 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                    <img
                      src={p.coverImage}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1c2b1a]/0 group-hover:bg-[#1c2b1a]/60 transition-all duration-500" />
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
              className="inline-flex items-center gap-3 border border-[#b8966a] text-[#b8966a] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#b8966a] hover:text-[#1c2b1a] transition-all duration-300"
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

      {/* Stats */}
      <section className="py-24 bg-[#131f12] border-y border-[#b8966a]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="text-center">
              <p className="font-serif text-5xl text-[#b8966a] font-light mb-3">{s.value}</p>
              <p className="text-[#f5f0e8]/40 text-xs tracking-[0.2em] uppercase">{s.label}</p>
            </FadeIn>
          ))}
        </div>
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
      <section className="py-32 bg-[#243522] relative overflow-hidden">
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
              className="inline-flex items-center gap-3 bg-[#b8966a] text-[#1c2b1a] text-xs tracking-[0.25em] uppercase px-12 py-5 hover:bg-[#d4b896] transition-all duration-300 font-medium"
            >
              Claim My Free Offer Now <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
