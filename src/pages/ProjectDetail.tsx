import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { getProjectById } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = getProjectById(id || '')

  if (!project) {
    return (
      <div className="min-h-screen bg-[#3b4a35] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">404</p>
          <h1 className="font-serif text-4xl text-[#f5f0e8] font-light mb-6">Project Not Found</h1>
          <Link to="/portfolio" className="text-[#b8966a] text-xs tracking-[0.2em] uppercase hover:text-[#d4b896] transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#3b4a35] pt-20">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3b4a35]/50" />
        <div className="absolute bottom-0 left-0 right-0 p-12 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-3">{project.category} · {project.year}</p>
            <h1 className="font-serif text-5xl md:text-7xl text-[#f5f0e8] font-light mb-2">{project.name}</h1>
            <p className="text-[#f5f0e8]/50 tracking-wider">{project.location}</p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-[#b8966a] text-xs tracking-[0.2em] uppercase hover:text-[#d4b896] transition-colors mb-16"
        >
          <ArrowLeft size={13} /> Back to Portfolio
        </Link>

        {/* Concept & Intent */}
        <div className="grid lg:grid-cols-2 gap-20 mb-24">
          <FadeIn>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">The Concept</p>
            <h2 className="font-serif text-3xl text-[#f5f0e8] font-light mb-6 leading-snug">{project.concept}</h2>
            <p className="text-[#f5f0e8]/55 leading-relaxed font-light">{project.description}</p>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-6">Design Intent</p>
            <p className="font-serif text-2xl text-[#f5f0e8]/80 font-light italic leading-relaxed mb-10">
              "{project.designIntent}"
            </p>
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Materials Used</p>
            <ul className="space-y-2">
              {project.materials.map(m => (
                <li key={m} className="text-[#f5f0e8]/50 text-sm font-light flex items-center gap-3">
                  <span className="w-1 h-1 bg-[#b8966a] rounded-full shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Image gallery */}
        <div className="grid md:grid-cols-2 gap-4">
          {project.images.slice(1).map((img, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <img src={img} alt={`${project.name} — view ${i + 2}`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn className="text-center mt-24 py-20 border-t border-[#b8966a]/10">
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Start Your Project</p>
          <h2 className="font-serif text-4xl text-[#f5f0e8] font-light mb-6">Ready to design your space?</h2>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-[#b8966a] text-[#3b4a35] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#d4b896] transition-all duration-300 font-medium"
          >
            Book a Free Consultation
          </Link>
        </FadeIn>
      </div>
    </div>
  )
}
