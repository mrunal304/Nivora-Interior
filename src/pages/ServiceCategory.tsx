import { useParams, Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import { getProjectsByCategory, Project } from '../data/projects'
import { ArrowRight } from 'lucide-react'

type Category = Project['category']

const info: Record<Category, { title: string; desc: string; hero: string }> = {
  residential: {
    title: 'Residential Interiors',
    desc: 'Homes designed around how you actually live — refined, personal, and built to last.',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85',
  },
  commercial: {
    title: 'Commercial Interiors',
    desc: 'Workspaces and hospitality interiors that make an impression and sustain it.',
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85',
  },
  architecture: {
    title: 'Architecture',
    desc: 'Buildings designed to belong to their setting — structurally rigorous and enduringly beautiful.',
    hero: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=85',
  },
}

export default function ServiceCategory() {
  const { category } = useParams<{ category: string }>()
  const cat = (category || '') as Category
  const meta = info[cat]
  const projects = getProjectsByCategory(cat)

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#1c2b1a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#f5f0e8] font-light mb-6">Category Not Found</h1>
          <Link to="/services" className="text-[#b8966a] text-xs tracking-[0.2em] uppercase hover:text-[#d4b896]">
            ← Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1c2b1a] pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={meta.hero} alt={meta.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1c2b1a]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <FadeIn>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Services</p>
            <h1 className="font-serif text-5xl md:text-6xl text-[#f5f0e8] font-light mb-4">{meta.title}</h1>
            <p className="text-[#f5f0e8]/50 font-light max-w-xl">{meta.desc}</p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn className="mb-16">
          <Link to="/services" className="text-[#b8966a] text-xs tracking-[0.2em] uppercase hover:text-[#d4b896] transition-colors">
            ← All Services
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <Link to={`/portfolio/${p.id}`} className="group block">
                <div className="overflow-hidden mb-5">
                  <img
                    src={p.coverImage}
                    alt={p.name}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-[#b8966a] text-[10px] tracking-[0.2em] uppercase mb-2">{p.location}</p>
                <h3 className="font-serif text-2xl text-[#f5f0e8] font-light mb-2">{p.name}</h3>
                <p className="text-[#f5f0e8]/40 text-sm font-light leading-relaxed mb-4">{p.concept}</p>
                <span className="text-[#b8966a] text-xs tracking-[0.2em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  View Project <ArrowRight size={11} />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-24">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-[#b8966a] text-[#1c2b1a] text-xs tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#d4b896] transition-all duration-300 font-medium"
          >
            Start Your Project <ArrowRight size={13} />
          </Link>
        </FadeIn>
      </div>
    </div>
  )
}
