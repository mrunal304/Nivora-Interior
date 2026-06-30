import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { getProjectById } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = getProjectById(id || '')

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFCF7' }}>
        <div className="text-center">
          <p style={{ color: '#D4B483', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>404</p>
          <h1 className="font-serif text-4xl font-light mb-6" style={{ color: '#2E2A26' }}>Project Not Found</h1>
          <Link to="/portfolio" style={{ color: '#D4B483', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            className="hover:opacity-70 transition-opacity">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#FFFCF7' }} className="pt-20">

      {/* Hero — crisp image, gradient only behind text */}
      <div className="relative overflow-hidden" style={{ height: '70vh' }}>
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.07) saturate(1.05)' }}
        />
        {/* Gradient only behind the bottom text area — keeps image vibrant above */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.52) 100%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 p-12" style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <FadeIn>
            <p style={{ color: '#D4B483', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {project.category} · {project.year}
            </p>
            <h1 className="font-serif font-light mb-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#f5f0e8', lineHeight: 1.1 }}>
              {project.name}
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.7)', letterSpacing: '0.08em' }}>{project.location}</p>
          </FadeIn>
        </div>
      </div>

      {/* Back link */}
      <div style={{ background: '#F7F2EA' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ color: '#D4B483', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            <ArrowLeft size={13} /> Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Concept & Intent — white background */}
      <div style={{ background: '#FFFCF7' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-20">
            <FadeIn>
              <p style={{ color: '#D4B483', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                The Concept
              </p>
              <h2 className="font-serif font-light mb-6 leading-snug" style={{ fontSize: '1.875rem', color: '#2E2A26' }}>
                {project.concept}
              </h2>
              <p style={{ color: '#2E2A26', opacity: 0.6, lineHeight: '1.9', fontWeight: 300 }}>{project.description}</p>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              <p style={{ color: '#D4B483', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Design Intent
              </p>
              <p className="font-serif font-light italic mb-10" style={{ fontSize: '1.5rem', color: '#2E2A26', opacity: 0.75, lineHeight: '1.7' }}>
                "{project.designIntent}"
              </p>
              <p style={{ color: '#D4B483', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Materials Used
              </p>
              <ul className="space-y-2">
                {project.materials.map(m => (
                  <li key={m} className="flex items-center gap-3 text-sm font-light" style={{ color: '#2E2A26', opacity: 0.6 }}>
                    <span className="rounded-full shrink-0" style={{ width: 4, height: 4, background: '#D4B483' }} />
                    {m}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Image Gallery — cream background */}
      <div style={{ background: '#F7F2EA' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <FadeIn>
            <p style={{ color: '#D4B483', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center' }}>
              The Gallery
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            {project.images.slice(1).map((img, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: '1px solid #E9DED0',
                  boxShadow: '0 4px 24px rgba(46,42,38,0.07)',
                }}>
                  <img
                    src={img}
                    alt={`${project.name} — view ${i + 2}`}
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/3', display: 'block' }}
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — white background */}
      <div style={{ background: '#FFFCF7' }}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center py-24" style={{ borderTop: '1px solid #E9DED0' }}>
            <p style={{ color: '#D4B483', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Start Your Project
            </p>
            <h2 className="font-serif font-light mb-8" style={{ fontSize: '2.5rem', color: '#2E2A26' }}>
              Ready to design your space?
            </h2>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 transition-all duration-300 font-medium text-xs tracking-[0.2em] uppercase px-10 py-4"
              style={{
                background: '#D4B483',
                color: '#2E2A26',
                borderRadius: 4,
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#c9a470'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 24px rgba(212,180,131,0.35)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#D4B483'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              Book a Free Consultation
            </Link>
          </FadeIn>
        </div>
      </div>

    </div>
  )
}
