import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { projects } from '../data/projects'
import { ArrowRight } from 'lucide-react'

type Cat = 'all' | 'residential' | 'commercial' | 'architecture'

const cats: { id: Cat; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'architecture', label: 'Architecture' },
]

export default function Portfolio() {
  const [active, setActive] = useState<Cat>('all')

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="bg-[#3b4a35] pt-20">
      {/* Header */}
      <section className="py-28 px-6 text-center max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Our Work</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#f5f0e8] font-light mb-6">Portfolio</h1>
          <p className="text-[#f5f0e8]/45 font-light leading-relaxed">
            A curated collection of spaces designed for those who appreciate the quiet power of thoughtful craft.
          </p>
        </FadeIn>
      </section>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 px-6 mb-16">
        {cats.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 ${
              active === c.id
                ? 'bg-[#b8966a] text-[#3b4a35]'
                : 'border border-[#f5f0e8]/20 text-[#f5f0e8]/50 hover:border-[#b8966a] hover:text-[#b8966a]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="break-inside-avoid"
              >
                <Link to={`/portfolio/${p.id}`} className="group relative block overflow-hidden">
                  <img
                    src={p.coverImage}
                    alt={p.name}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#3b4a35]/0 group-hover:bg-[#3b4a35]/70 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[#b8966a] text-[10px] tracking-[0.2em] uppercase mb-2">
                      {p.category}
                    </p>
                    <h3 className="font-serif text-2xl text-[#f5f0e8] font-light mb-1">{p.name}</h3>
                    <p className="text-[#f5f0e8]/50 text-xs tracking-wider mb-4">{p.location}</p>
                    <span className="text-[#b8966a] text-xs tracking-[0.2em] uppercase flex items-center gap-2">
                      View Project <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
