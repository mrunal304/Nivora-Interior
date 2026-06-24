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

export default function About() {
  return (
    <div className="bg-[#3b4a35] pt-20">
      {/* Header */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #b8966a 0%, transparent 60%)' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <FadeIn>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Our Story</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light leading-tight mb-6">
              Design With<br />
              <em className="text-[#b8966a]">Purpose & Craft</em>
            </h1>
            <p className="text-[#f5f0e8]/50 font-light leading-relaxed max-w-2xl mx-auto">
              NIVORA is a boutique interior design studio creating thoughtful, refined spaces that balance elegance with everyday functionality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-[#3b4a35]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <div className="overflow-hidden">
              <img src={studioImg} alt="NIVORA Studio" className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Who We Are</p>
            <h2 className="font-serif text-4xl text-[#f5f0e8] font-light leading-tight mb-8">
              A Boutique Studio Built on Listening
            </h2>
            <div className="space-y-5 text-[#f5f0e8]/50 font-light leading-relaxed">
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

      {/* Stats */}
      <section className="py-24 border-y border-[#b8966a]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="text-center">
              <p className="font-serif text-5xl text-[#b8966a] font-light mb-3">{s.value}</p>
              <p className="text-[#f5f0e8]/40 text-xs tracking-[0.2em] uppercase">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What We Design */}
      <section className="py-24 bg-[#3b4a35]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          <FadeIn>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">What We Design</p>
            <h2 className="font-serif text-4xl text-[#f5f0e8] font-light mb-8">Spaces That Work for Real Life</h2>
            <ul className="space-y-4">
              {offerings.map(o => (
                <li key={o} className="flex items-start gap-4 text-[#f5f0e8]/50 font-light">
                  <span className="w-1.5 h-1.5 bg-[#b8966a] rounded-full mt-2 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Our Values</p>
            <div className="space-y-6">
              {values.map((v, i) => (
                <div key={i} className="border-b border-[#b8966a]/10 pb-6">
                  <h4 className="font-serif text-xl text-[#f5f0e8] font-light mb-2">{v.title}</h4>
                  <p className="text-[#f5f0e8]/40 text-sm font-light leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <FadeIn>
            <div className="border border-[#b8966a]/15 p-10 h-full hover:border-[#b8966a]/40 transition-all duration-500">
              <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Mission</p>
              <p className="font-serif text-2xl text-[#f5f0e8] font-light leading-relaxed">
                Create interiors that feel effortlessly luxurious and deeply personal.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="border border-[#b8966a]/15 p-10 h-full hover:border-[#b8966a]/40 transition-all duration-500">
              <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Vision</p>
              <p className="font-serif text-2xl text-[#f5f0e8] font-light leading-relaxed">
                Be a trusted design partner known for thoughtful luxury, timeless design, and interiors that enrich the way people live and work.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-[#3b4a35]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn delay={0.2}>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">The Founder</p>
            <h2 className="font-serif text-4xl text-[#f5f0e8] font-light mb-2">Shweta Mahadik</h2>
            <p className="text-[#f5f0e8]/35 text-xs tracking-[0.2em] uppercase mb-8">Founder & Principal Designer</p>
            <div className="space-y-5 text-[#f5f0e8]/50 font-light leading-relaxed mb-10">
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
            <blockquote className="border-l-2 border-[#b8966a] pl-6">
              <p className="font-serif text-xl text-[#f5f0e8]/80 italic font-light leading-relaxed">
                "For me, design is not about decoration. It is about creating spaces that feel calm, meaningful, and effortless to live in."
              </p>
              <cite className="text-[#b8966a] text-xs tracking-wider not-italic mt-3 block">— Shweta Mahadik</cite>
            </blockquote>
          </FadeIn>
          <FadeIn direction="left">
            <div className="overflow-hidden">
              <img src={founderImg} alt="Shweta Mahadik — Founder, NIVORA Interiors" className="w-full aspect-[3/4] object-cover object-top hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0e8] font-light mb-5">
            Let's design something<br />
            <em className="text-[#b8966a]">meaningful together.</em>
          </h2>
          <p className="text-[#f5f0e8]/40 font-light mb-10 max-w-md mx-auto">
            Book a free consultation and let's start with a conversation.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-[#b8966a] text-[#3b4a35] text-xs tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#d4b896] transition-all duration-300 font-medium"
          >
            Book Free Consultation <ArrowRight size={13} />
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
