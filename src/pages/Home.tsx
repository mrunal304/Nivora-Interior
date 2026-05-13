import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Compass, Eye, Wrench, Sparkles, Key } from 'lucide-react'
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

const processSteps = [
  {
    step: '01',
    title: 'Discover',
    icon: 'compass',
    desc: 'We begin by listening — understanding how you live, what you value, and what your space needs to do for you.',
  },
  {
    step: '02',
    title: 'Visualise',
    icon: 'eye',
    desc: 'Concepts, mood boards, material palettes, and 3D walkthroughs that make the vision tangible before a single thing is moved.',
  },
  {
    step: '03',
    title: 'Execute',
    icon: 'wrench',
    desc: 'Precise project management with trusted craftspeople, clear timelines, and constant communication.',
  },
  {
    step: '04',
    title: 'Reveal',
    icon: 'sparkles',
    desc: 'The handover. A finished space that surprises — even though you approved every detail.',
  },
  {
    step: '05',
    title: 'Handover',
    icon: 'key',
    desc: 'Deep-cleaned, styled, and truly ready. Your space, exactly as you imagined it.',
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

      {/* Process — Light Editorial */}
      <section style={{ background: '#F5F2ED' }} className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row gap-14 md:gap-16 items-start">

            {/* LEFT — Photo Collage */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full md:w-[40%] shrink-0"
            >
              <div className="relative" style={{ height: 420 }}>
                {/* Photo 1 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 260,
                    height: 320,
                    border: '1px solid #a18661',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                    alt="Interior process"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                {/* Photo 2 — overlapping */}
                <div
                  style={{
                    position: 'absolute',
                    top: 140,
                    left: 80,
                    width: 200,
                    height: 260,
                    border: '1px solid #a18661',
                    borderRadius: 2,
                    overflow: 'hidden',
                    zIndex: 2,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                    alt="Interior workspace"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                {/* Gold accent square at overlap corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: 138,
                    left: 78,
                    width: 10,
                    height: 10,
                    background: '#a18661',
                    zIndex: 3,
                  }}
                />
              </div>
            </motion.div>

            {/* RIGHT — Step List */}
            <div className="w-full md:w-[60%]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  color: '#6D5A41',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}>
                  How We Work
                </p>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 48,
                  color: '#21291a',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  marginBottom: 36,
                }}>
                  Our Process
                </h2>
              </motion.div>

              {/* Steps */}
              <div>
                {processSteps.map((step, i) => {
                  const icons: Record<string, React.ReactNode> = {
                    compass: <Compass size={18} color="#a18661" />,
                    eye: <Eye size={18} color="#a18661" />,
                    wrench: <Wrench size={18} color="#a18661" />,
                    sparkles: <Sparkles size={18} color="#a18661" />,
                    key: <Key size={18} color="#a18661" />,
                  }
                  const isLast = i === processSteps.length - 1
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div style={{
                        paddingLeft: 20,
                        borderLeft: '3px solid #a18661',
                        marginBottom: 32,
                        position: 'relative',
                      }}>
                        {/* Ghost number */}
                        <span style={{
                          position: 'absolute',
                          left: -10,
                          top: -16,
                          fontFamily: "'Playfair Display', serif",
                          fontStyle: 'italic',
                          fontSize: 72,
                          color: 'rgba(161,134,97,0.10)',
                          lineHeight: 1,
                          zIndex: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}>
                          {step.step}
                        </span>
                        {/* Icon + Title row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, position: 'relative', zIndex: 1 }}>
                          {icons[step.icon]}
                          <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 22,
                            color: '#21291a',
                            fontWeight: 400,
                            lineHeight: 1.3,
                          }}>
                            {step.title}
                          </h3>
                        </div>
                        {/* Description */}
                        <p style={{
                          fontFamily: "'Lora', serif",
                          fontSize: 15,
                          color: '#6D5A41',
                          lineHeight: 1.8,
                          position: 'relative',
                          zIndex: 1,
                        }}>
                          {step.desc}
                        </p>
                        {/* Divider */}
                        {!isLast && (
                          <div style={{
                            width: '100%',
                            height: 1,
                            background: 'rgba(161,134,97,0.3)',
                            marginTop: 24,
                          }} />
                        )}
                      </div>
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
              >
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.35em',
                  color: '#6D5A41',
                  textTransform: 'uppercase',
                  marginBottom: 28,
                }}>
                  END-TO-END &nbsp;·&nbsp; TRANSPARENT &nbsp;·&nbsp; HASSLE-FREE
                </p>
                <Link
                  to="/quote"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#21291a',
                    color: '#F5F2ED',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '14px 28px',
                    borderRadius: 2,
                    textDecoration: 'none',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = '#a18661'
                    el.style.color = '#21291a'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = '#21291a'
                    el.style.color = '#F5F2ED'
                  }}
                >
                  Book Free Consultation
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

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
