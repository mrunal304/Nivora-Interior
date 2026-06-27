import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const values = [
  { title: 'Thoughtful Design', desc: 'Every decision is intentional. We never add without asking why.' },
  { title: 'Timeless Elegance', desc: 'We design for years, not seasons. Quality over trend.' },
  { title: 'Personal Connection', desc: 'We listen before we design. Your life shapes your space.' },
  { title: 'Quality & Craftsmanship', desc: 'Refined materials, skilled execution, no shortcuts.' },
  { title: 'Trust & Transparency', desc: 'Clear timelines, honest communication, no surprises.' },
]

const stats = [
  { value: '25+', label: 'Clients Served' },
  { value: '2', label: 'Years of Experience' },
  { value: '2', label: 'Cities — Mumbai & Pune' },
  { value: '100%', label: 'End-to-End Solutions' },
]

const offerings = [
  'Home interiors — 1BHK, 2BHK, 3BHK apartments & villas',
  'Office and workspace design',
  'Showrooms and retail spaces',
  'Cafés and hospitality interiors',
]

const founderImg = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
const studioImg = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80'

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
  visible: { transition: { staggerChildren: 0.11 } },
}
const valueItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}
const dividerVariants = {
  hidden: { width: '0%' },
  visible: { width: '100%', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

const mvContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.17 } },
}
const mvBoxVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

export default function About() {
  return (
    <div style={{ background: '#f5f2ed' }} className="pt-20">

      {/* ── HERO — keep dark green ── */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: '#21291a' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9A96E 0%, transparent 60%)' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <FadeIn>
            <p className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase mb-6">Our Story</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light leading-tight mb-6">
              Design With<br />
              <em className="text-[#C9A96E]">Purpose & Craft</em>
            </h1>
            <p className="text-[#f5f0e8]/50 font-light leading-relaxed max-w-2xl mx-auto">
              NIVORA is a boutique interior design studio creating thoughtful, refined spaces that balance elegance with everyday functionality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── WHO WE ARE — light cream ── */}
      <section className="py-24" style={{ background: '#f5f2ed' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <div className="overflow-hidden" style={{ borderRadius: 4 }}>
              <img
                src={studioImg}
                alt="NIVORA Studio"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <p style={{ color: '#a18661', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>Who We Are</p>
            <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#21291a' }}>
              A Boutique Studio Built on Listening
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#4a4a4a', fontWeight: 300, lineHeight: 1.75, fontSize: 15 }}>
              <p>
                Over the last two years, we've completed 25+ residential and commercial interior projects across Mumbai and Pune — designing homes and workspaces that feel personal, practical, and built to last.
              </p>
              <p>
                Every project begins with listening. We understand how clients live, work, and use their space before designing anything. We provide complete interior design and turnkey solutions with clear timelines and transparent communication.
              </p>
              <p>
                We currently design and execute projects across Mumbai and Pune, partnering with homeowners and businesses who value quality, clarity, and a seamless process.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STATS — light cream ── */}
      <section
        className="py-24"
        style={{
          background: '#f5f2ed',
          borderTop: '1px solid rgba(161,134,97,0.2)',
          borderBottom: '1px solid rgba(161,134,97,0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="text-center">
              <p className="font-serif font-light mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#a18661' }}>{s.value}</p>
              <p style={{ color: 'rgba(33,41,26,0.5)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── WHAT WE DESIGN + OUR VALUES — light cream ── */}
      <section className="py-24" style={{ background: '#f5f2ed' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

          {/* What We Design — bullets slide in from left */}
          <div>
            <FadeIn>
              <p style={{ color: '#a18661', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>What We Design</p>
              <h2 className="font-serif font-light mb-8" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#21291a' }}>
                Spaces That Work for Real Life
              </h2>
            </FadeIn>
            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {offerings.map((o, i) => (
                <motion.li
                  key={i}
                  variants={bulletVariants}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 16, color: '#4a4a4a', fontWeight: 300, lineHeight: 1.7, fontSize: 15 }}
                >
                  <span style={{ width: 6, height: 6, background: '#a18661', borderRadius: '50%', marginTop: 9, flexShrink: 0 }} />
                  {o}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Our Values — staggered fade up + divider draw */}
          <div>
            <FadeIn delay={0.1}>
              <p style={{ color: '#a18661', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>Our Values</p>
            </FadeIn>
            <motion.div
              variants={valuesContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              {values.map((v, i) => (
                <motion.div key={i} variants={valueItemVariants} style={{ paddingBottom: 24, marginBottom: 0 }}>
                  <h4 className="font-serif font-light mb-2" style={{ fontSize: '1.2rem', color: '#21291a' }}>{v.title}</h4>
                  <p style={{ color: '#4a4a4a', fontSize: 14, fontWeight: 300, lineHeight: 1.7, marginBottom: 20 }}>{v.desc}</p>
                  <motion.div
                    variants={dividerVariants}
                    style={{ height: 1, background: 'rgba(161,134,97,0.3)', borderRadius: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── MISSION & VISION — light cream ── */}
      <section className="py-24" style={{ background: '#f5f2ed', borderTop: '1px solid rgba(161,134,97,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={mvContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}
          >
            {/* Mission */}
            <motion.div
              variants={mvBoxVariants}
              whileHover={{ borderColor: '#a18661' }}
              style={{
                border: '1px solid rgba(161,134,97,0.25)',
                padding: '40px',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                borderRadius: 4,
                cursor: 'default',
              }}
            >
              <p style={{ color: '#a18661', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>Mission</p>
              <p className="font-serif font-light leading-relaxed" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', color: '#21291a' }}>
                Create interiors that feel effortlessly luxurious and deeply personal.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={mvBoxVariants}
              whileHover={{ borderColor: '#a18661' }}
              style={{
                border: '1px solid rgba(161,134,97,0.25)',
                padding: '40px',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                borderRadius: 4,
                cursor: 'default',
              }}
            >
              <p style={{ color: '#a18661', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>Vision</p>
              <p className="font-serif font-light leading-relaxed" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', color: '#21291a' }}>
                Be a trusted design partner known for thoughtful luxury, timeless design, and interiors that enrich the way people live and work.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE FOUNDER — light cream ── */}
      <section className="py-24" style={{ background: '#f5f2ed', borderTop: '1px solid rgba(161,134,97,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn delay={0.2}>
            <p style={{ color: '#a18661', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>The Founder</p>
            <h2 className="font-serif font-light mb-2" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#21291a' }}>Shweta Mahadik</h2>
            <p style={{ color: 'rgba(33,41,26,0.45)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32, fontFamily: "'Montserrat', sans-serif" }}>
              Founder & Principal Designer
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#4a4a4a', fontWeight: 300, lineHeight: 1.75, fontSize: 15, marginBottom: 40 }}>
              <p>
                Shweta brings a rare combination of civil engineering precision and interior design sensibility to every project. Her background in construction gives her an instinctive understanding of how spaces are built — not just how they look — which translates into designs that are both beautiful and structurally sound.
              </p>
              <p>
                Her approach is hands-on and deeply personal. She visits every project site herself, works closely with craftspeople, and maintains direct communication with clients throughout the process.
              </p>
              <p>
                For Shweta, good design is not about decoration. It is about creating environments that make everyday life calmer, more considered, and more enjoyable.
              </p>
            </div>
            <blockquote
              style={{
                borderLeft: '2px solid #a18661',
                paddingLeft: 24,
                background: 'rgba(161,134,97,0.06)',
                borderRadius: '0 6px 6px 0',
                padding: '20px 24px',
              }}
            >
              <p className="font-serif font-light leading-relaxed" style={{ fontSize: '1.15rem', color: '#2c2c2c', fontStyle: 'italic', marginBottom: 12 }}>
                "For me, design is not about decoration. It is about creating spaces that feel calm, meaningful, and effortless to live in."
              </p>
              <cite style={{ color: '#a18661', fontSize: 11, letterSpacing: '0.15em', fontStyle: 'normal', fontFamily: "'Montserrat', sans-serif" }}>— Shweta Mahadik</cite>
            </blockquote>
          </FadeIn>
          <FadeIn direction="left">
            <div className="overflow-hidden" style={{ borderRadius: 4 }}>
              <img
                src={founderImg}
                alt="Shweta Mahadik — Founder, NIVORA Interiors"
                className="w-full aspect-[3/4] object-cover object-top hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA — keep dark green ── */}
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
