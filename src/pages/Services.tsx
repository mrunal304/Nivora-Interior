import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    subtitle: 'For how you live',
    desc: 'Homes designed around your life — not around a showroom floor. We create 1BHK apartments, 3BHK family homes, and villas that feel deeply personal and endure gracefully over time.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    services: ['Apartment Interiors', 'Villa & Bungalow Design', 'Turnkey Interior Solutions', 'Space Planning', 'Material & Finish Selection', 'Furniture Design'],
  },
  {
    id: 'commercial',
    title: 'Commercial Interiors',
    subtitle: 'For how you work',
    desc: 'Offices, cafés, showrooms, and hospitality spaces that create strong first impressions and hold them. We understand that commercial interiors must be both beautiful and functional.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    services: ['Office & Workspace Design', 'Café & Restaurant Design', 'Retail & Showroom Design', 'Hospitality Interiors', 'Brand-Integrated Design', 'Turnkey Execution'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    subtitle: 'From the ground up',
    desc: 'Complete architectural services from concept to completion. We design buildings that belong to their setting — structurally rigorous, materially honest, and beautiful for years to come.',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80',
    services: ['Residential Architecture', 'Commercial Architecture', 'Site Analysis & Planning', 'Structural Coordination', 'Façade Design', 'Landscape Integration'],
  },
]

export default function Services() {
  return (
    <div className="bg-[#3b4a35] pt-20">
      <section className="py-28 px-6 text-center max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">What We Offer</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#f5f0e8] font-light mb-6">Services</h1>
          <p className="text-[#f5f0e8]/45 font-light leading-relaxed">
            Complete interior design and architecture services — from first conversation to final reveal.
          </p>
        </FadeIn>
      </section>

      {categories.map((cat, i) => (
        <section
          key={cat.id}
          className={`py-20 ${i % 2 === 1 ? 'bg-[#2f3c29]' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <FadeIn direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className="overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} direction={i % 2 === 0 ? 'left' : 'right'} className={i % 2 === 1 ? 'lg:order-first' : ''}>
                <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">{cat.subtitle}</p>
                <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light mb-6 leading-tight">{cat.title}</h2>
                <p className="text-[#f5f0e8]/50 font-light leading-relaxed mb-8">{cat.desc}</p>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 mb-10">
                  {cat.services.map(s => (
                    <li key={s} className="text-[#f5f0e8]/40 text-sm font-light flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#b8966a] rounded-full shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${cat.id}`}
                  className="inline-flex items-center gap-2 border border-[#b8966a] text-[#b8966a] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#b8966a] hover:text-[#3b4a35] transition-all duration-300"
                >
                  Explore {cat.title} <ArrowRight size={13} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8] font-light mb-6">
            Not sure where to start?
          </h2>
          <p className="text-[#f5f0e8]/40 font-light mb-10 max-w-md mx-auto leading-relaxed">
            Book a free consultation and we'll guide you through the best approach for your project.
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
