import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import FadeIn from '../components/FadeIn'
import { Link } from 'react-router-dom'
import { ArrowRight, Lightbulb, Gem, Heart, Wrench, ShieldCheck, Target, Compass } from 'lucide-react'

/* ─── DATA ──────────────────────────────────────────────── */
const values = [
  { title: 'Thoughtful Design',       desc: 'Every decision is intentional. We never add without asking why.',          Icon: Lightbulb   },
  { title: 'Timeless Elegance',       desc: 'We design for years, not seasons. Quality over trend.',                    Icon: Gem         },
  { title: 'Personal Connection',     desc: 'We listen before we design. Your life shapes your space.',                 Icon: Heart       },
  { title: 'Quality & Craftsmanship', desc: 'Refined materials, skilled execution, no shortcuts.',                      Icon: Wrench      },
  { title: 'Trust & Transparency',    desc: 'Clear timelines, honest communication, no surprises.',                     Icon: ShieldCheck },
]

const statsData = [
  { value: 25,  suffix: '+', label: 'Clients Served',         duration: 1800 },
  { value: 2,   suffix: '',  label: 'Years of Experience',    duration: 1200 },
  { value: 2,   suffix: '',  label: 'Cities — Mumbai & Pune', duration: 1200 },
  { value: 100, suffix: '%', label: 'End-to-End Solutions',   duration: 1600 },
]

const offerings = [
  'Home interiors — 1BHK, 2BHK, 3BHK apartments & villas',
  'Office and workspace design',
  'Showrooms and retail spaces',
  'Cafés and hospitality interiors',
]

const founderImg = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
const studioImg  = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80'

/* ─── SHARED STYLES ─────────────────────────────────────── */
const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  color: '#a18661',
  fontSize: 10,
  letterSpacing: '0.42em',
  textTransform: 'uppercase',
  marginBottom: 24,
}

/* ─── ANIMATION VARIANTS ────────────────────────────────── */
const listContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const bulletVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

const valuesContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}
const valueNumVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}
const valueBodyVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

const mvContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const mvBoxVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

/* ─── STATS COUNTER ─────────────────────────────────────── */
function AboutStatsSection() {
  const [counts, setCounts]   = useState(statsData.map(() => 0))
  const [shimmer, setShimmer] = useState(statsData.map(() => false))
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cleanups: (() => void)[] = []
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        statsData.forEach((stat, i) => {
          setCounts(prev => { const n = [...prev]; n[i] = 0; return n })
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / stat.duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            const val = Math.floor(stat.value * eased)
            setCounts(prev => { const n = [...prev]; n[i] = val; return n })
            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setCounts(prev => { const n = [...prev]; n[i] = stat.value; return n })
              const cycleInterval = 4200 + i * 1100
              const dip = Math.min(2, stat.value)
              const runCycle = () => {
                setShimmer(prev => { const n = [...prev]; n[i] = true; return n })
                const off = setTimeout(() => { setShimmer(prev => { const n = [...prev]; n[i] = false; return n }) }, 900)
                cleanups.push(() => clearTimeout(off))
                const totalSteps = 28; let s = 0
                const dipTimer = setInterval(() => {
                  s++
                  const p = s / totalSteps
                  let v: number
                  if (p < 0.35) { const d = p / 0.35; v = Math.round(stat.value - dip * (1 - Math.pow(1 - d, 2))) }
                  else { const u = (p - 0.35) / 0.65; v = Math.round((stat.value - dip) + dip * (1 - Math.pow(1 - u, 3))) }
                  v = Math.min(Math.max(v, stat.value - dip), stat.value)
                  setCounts(prev => { const n = [...prev]; n[i] = v; return n })
                  if (s >= totalSteps) { clearInterval(dipTimer); setCounts(prev => { const n = [...prev]; n[i] = stat.value; return n }) }
                }, 38)
                cleanups.push(() => clearInterval(dipTimer))
              }
              const startDelay = setTimeout(() => { runCycle(); const loop = setInterval(runCycle, cycleInterval); cleanups.push(() => clearInterval(loop)) }, 3200 + i * 900)
              cleanups.push(() => clearTimeout(startDelay))
            }
          }
          requestAnimationFrame(tick)
        })
      }
    }, { threshold: 0.35 })
    observer.observe(el)
    return () => { observer.disconnect(); cleanups.forEach(fn => fn()) }
  }, [started])

  return (
    <section ref={sectionRef} style={{ background: '#f5f2ed', borderTop: '1px solid rgba(161,134,97,0.2)', borderBottom: '1px solid rgba(161,134,97,0.2)', padding: '72px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }} className="about-stats-grid">
        <style>{`
          @media (max-width: 640px) { .about-stats-grid { grid-template-columns: repeat(2,1fr) !important; } .about-stats-item + .about-stats-item { border-left: none !important; border-top: 1px solid rgba(161,134,97,0.18) !important; } }
          .about-stats-item + .about-stats-item { border-left: 1px solid rgba(161,134,97,0.18); }
        `}</style>
        {statsData.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1} className="about-stats-item" direction="up">
            <div style={{ textAlign: 'center', padding: '12px 24px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2.4rem, 4.5vw, 3.2rem)', lineHeight: 1, color: shimmer[i] ? '#c8a97e' : '#a18661', transition: 'color 0.3s ease', margin: '0 0 10px' }}>
                {counts[i]}{stat.suffix}
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(33,41,26,0.5)', margin: 0 }}>{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ─── MISSION / VISION BOX ──────────────────────────────── */
interface MvBoxProps {
  type: 'mission' | 'vision'
  text: string
}
function MvBox({ type, text }: MvBoxProps) {
  const [hovered, setHovered] = useState(false)
  const isMission = type === 'mission'
  const Icon = isMission ? Target : Compass
  const label = isMission ? 'Mission' : 'Vision'
  const bgTint = isMission ? 'rgba(161,134,97,0.055)' : 'rgba(95,116,94,0.04)'

  return (
    <motion.div
      variants={mvBoxVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bgTint,
        border: '1px solid rgba(161,134,97,0.22)',
        borderTop: `4px solid ${hovered ? '#c8a97e' : '#a18661'}`,
        borderRadius: 6,
        padding: '32px 36px 36px',
        cursor: 'default',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(33,41,26,0.1)' : '0 2px 8px rgba(33,41,26,0.04)',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-top-color 0.28s ease',
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: 14 }}>
        <Icon size={24} color="#a18661" strokeWidth={1.4} />
      </div>
      {/* Label */}
      <p style={{ ...LABEL_STYLE, fontSize: 11, letterSpacing: '0.5em', fontWeight: 600, marginBottom: 20 }}>{label.toUpperCase()}</p>
      {/* Text */}
      <p className="font-serif font-light leading-relaxed" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', color: '#21291a', margin: 0 }}>
        {text}
      </p>
    </motion.div>
  )
}

/* ─── SINGLE VALUE ITEM ─────────────────────────────────── */
function ValueItem({ v, index }: { v: typeof values[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0 } } }}
      style={{ position: 'relative', paddingBottom: 28 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Large ghost number */}
      <motion.span
        variants={valueNumVariants}
        aria-hidden="true"
        style={{
          position: 'absolute', top: -8, left: -6,
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300, fontSize: 72, lineHeight: 1,
          color: '#a18661',
          opacity: hovered ? 0.14 : 0.08,
          userSelect: 'none', pointerEvents: 'none',
          transition: 'opacity 0.25s ease', zIndex: 0,
        }}
      >{num}</motion.span>

      {/* Content */}
      <motion.div variants={valueBodyVariants} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <v.Icon size={15} color="#a18661" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 1 }} />
          <h4 className="font-serif font-light" style={{ fontSize: '1.15rem', color: hovered ? '#a18661' : '#21291a', transition: 'color 0.25s ease', margin: 0, lineHeight: 1.3 }}>
            {v.title}
          </h4>
        </div>
        <p style={{ color: '#5c5c5c', fontSize: 14, fontWeight: 300, lineHeight: 1.7, marginBottom: 20, paddingLeft: 25 }}>{v.desc}</p>
        {/* Hover divider draw */}
        <div style={{ position: 'relative', height: 1, background: 'rgba(161,134,97,0.18)', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#a18661', borderRadius: 1, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left center', transition: 'transform 0.3s ease' }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────────── */
export default function About() {
  return (
    <div style={{ background: '#f5f2ed' }} className="pt-20">

      {/* HERO — light cream */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#f5f2ed' }}>
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #a18661 0%, transparent 60%)' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <FadeIn>
            <p style={LABEL_STYLE}>Our Story</p>
            <h1 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', color: '#21291a' }}>
              Design With<br /><em style={{ color: '#a18661' }}>Purpose & Craft</em>
            </h1>
            <p style={{ color: '#5c5c5c', fontWeight: 300, lineHeight: 1.75, maxWidth: 560, margin: '0 auto', fontSize: 15 }}>
              NIVORA is a boutique interior design studio creating thoughtful, refined spaces that balance elegance with everyday functionality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24" style={{ background: '#f5f2ed', borderTop: '1px solid rgba(161,134,97,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <div className="overflow-hidden" style={{ borderRadius: 4 }}>
              <img src={studioImg} alt="NIVORA Studio" className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <p style={LABEL_STYLE}>Who We Are</p>
            <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#21291a' }}>
              A Boutique Studio Built on Listening
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#5c5c5c', fontWeight: 300, lineHeight: 1.75, fontSize: 15 }}>
              <p>Over the last two years, we've completed 25+ residential and commercial interior projects across Mumbai and Pune — designing homes and workspaces that feel personal, practical, and built to last.</p>
              <p>Every project begins with listening. We understand how clients live, work, and use their space before designing anything. We provide complete interior design and turnkey solutions with clear timelines and transparent communication.</p>
              <p>We currently design and execute projects across Mumbai and Pune, partnering with homeowners and businesses who value quality, clarity, and a seamless process.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS */}
      <AboutStatsSection />

      {/* WHAT WE DESIGN + OUR VALUES */}
      <section className="py-28" style={{ background: '#f5f2ed' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">

          {/* Left — What We Design */}
          <div>
            <FadeIn>
              <p style={LABEL_STYLE}>What We Design</p>
              <h2 className="font-serif font-light mb-10" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#21291a' }}>
                Spaces That Work for Real Life
              </h2>
            </FadeIn>
            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}
            >
              {offerings.map((o, i) => (
                <motion.li key={i} variants={bulletVariants} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, color: '#5c5c5c', fontWeight: 300, lineHeight: 1.7, fontSize: 15 }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" style={{ flexShrink: 0, marginTop: 8 }} fill="#a18661">
                    <polygon points="4,0 8,4 4,8 0,4" />
                  </svg>
                  {o}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right — Our Values */}
          <div style={{ position: 'relative' }}>
            <svg aria-hidden="true" style={{ position: 'absolute', top: '50%', right: -40, transform: 'translateY(-50%)', width: 340, height: 340, opacity: 0.055, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 340 340">
              <circle cx="170" cy="170" r="160" fill="none" stroke="#a18661" strokeWidth="1.5" />
              <circle cx="170" cy="170" r="120" fill="none" stroke="#a18661" strokeWidth="0.75" />
            </svg>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <FadeIn delay={0.1}>
                <p style={LABEL_STYLE}>Our Values</p>
              </FadeIn>
              <motion.div
                variants={valuesContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {values.map((v, i) => <ValueItem key={i} v={v} index={i} />)}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24" style={{ background: '#f5f2ed', borderTop: '1px solid rgba(161,134,97,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p style={{ ...LABEL_STYLE, textAlign: 'center', marginBottom: 48 }}>Our Purpose</p>
          </FadeIn>
          <motion.div
            variants={mvContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}
          >
            <MvBox type="mission" text="Create interiors that feel effortlessly luxurious and deeply personal." />
            <MvBox type="vision" text="Be a trusted design partner known for thoughtful luxury, timeless design, and interiors that enrich the way people live and work." />
          </motion.div>
        </div>
      </section>

      {/* THE FOUNDER */}
      <section className="py-24" style={{ background: '#f5f2ed', borderTop: '1px solid rgba(161,134,97,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn delay={0.2}>
            <p style={LABEL_STYLE}>The Founder</p>
            <h2 className="font-serif font-light mb-2" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#21291a' }}>Shweta Mahadik</h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(33,41,26,0.45)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>
              Founder & Principal Designer
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#5c5c5c', fontWeight: 300, lineHeight: 1.75, fontSize: 15, marginBottom: 40 }}>
              <p>Shweta brings a rare combination of civil engineering precision and interior design sensibility to every project. Her background in construction gives her an instinctive understanding of how spaces are built — not just how they look — which translates into designs that are both beautiful and structurally sound.</p>
              <p>Her approach is hands-on and deeply personal. She visits every project site herself, works closely with craftspeople, and maintains direct communication with clients throughout the process.</p>
              <p>For Shweta, good design is not about decoration. It is about creating environments that make everyday life calmer, more considered, and more enjoyable.</p>
            </div>
            <blockquote style={{ borderLeft: '2px solid #a18661', background: 'rgba(161,134,97,0.06)', borderRadius: '0 6px 6px 0', padding: '20px 24px' }}>
              <p className="font-serif font-light leading-relaxed" style={{ fontSize: '1.15rem', color: '#2c2c2c', fontStyle: 'italic', marginBottom: 12 }}>
                "For me, design is not about decoration. It is about creating spaces that feel calm, meaningful, and effortless to live in."
              </p>
              <cite style={{ fontFamily: "'Montserrat', sans-serif", color: '#a18661', fontSize: 11, letterSpacing: '0.15em', fontStyle: 'normal' }}>— Shweta Mahadik</cite>
            </blockquote>
          </FadeIn>
          <FadeIn direction="left">
            <div className="overflow-hidden" style={{ borderRadius: 4 }}>
              <img src={founderImg} alt="Shweta Mahadik — Founder, NIVORA Interiors" className="w-full aspect-[3/4] object-cover object-top hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA — dark green */}
      <section className="py-20 px-6 text-center" style={{ background: '#21291a' }}>
        <FadeIn>
          <h2 className="font-serif font-light mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#f5f0e8' }}>
            Let's design something<br />
            <em className="text-[#C9A96E]">meaningful together.</em>
          </h2>
          <p className="font-light mb-10 max-w-md mx-auto" style={{ color: 'rgba(245,240,232,0.45)' }}>
            Book a free consultation and let's start with a conversation.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#d4b896] transition-all duration-300 font-medium"
            style={{ background: '#C9A96E', color: '#21291a' }}
          >
            Book Free Consultation <ArrowRight size={13} />
          </Link>
        </FadeIn>
      </section>

    </div>
  )
}
