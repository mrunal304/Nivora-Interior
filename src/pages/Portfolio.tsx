import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { ArrowRight } from 'lucide-react'

type Cat = 'all' | 'residential' | 'commercial' | 'architecture'

const cats: { id: Cat; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'architecture', label: 'Architecture' },
]

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      background: 'rgba(255,255,255,0.14)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.22)',
      borderRadius: 40,
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: 9,
      letterSpacing: '0.22em',
      textTransform: 'uppercase' as const,
      color: 'rgba(245,240,232,0.85)',
    }}>
      {label}
    </span>
  )
}

function ProjectCard({
  project,
  index,
  featured = false,
  delay = 0,
}: {
  project: typeof projects[0]
  index: number
  featured?: boolean
  delay?: number
}) {
  const { ref, visible } = useInView(0.08)
  const [imgLoaded, setImgLoaded] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <Link
        to={`/portfolio/${project.id}`}
        className="ptf-card"
        style={{
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 22,
          height: featured ? 540 : 400,
          textDecoration: 'none',
          cursor: 'pointer',
          background: '#e8e2d9',
        }}
      >
        {/* Skeleton */}
        {!imgLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #e4ddd4 0%, #ede8e1 50%, #e4ddd4 100%)',
            backgroundSize: '200% 100%',
            animation: 'ptfSkeleton 1.4s ease infinite',
            zIndex: 1,
          }} />
        )}

        {/* Image */}
        <img
          src={project.coverImage}
          alt={project.name}
          className="ptf-img"
          onLoad={() => setImgLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            zIndex: 2,
          }}
          loading="lazy"
        />

        {/* Permanent bottom gradient for title readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,14,8,0) 40%, rgba(6,10,6,0.75) 100%)',
          zIndex: 3,
          borderRadius: 22,
        }} />

        {/* Hover dark overlay */}
        <div className="ptf-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,16,10,0.55)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          zIndex: 4,
          borderRadius: 22,
        }} />

        {/* Gold accent bottom line */}
        <div className="ptf-accent" style={{
          position: 'absolute',
          bottom: 0, left: 20, right: 20,
          height: 2,
          background: 'linear-gradient(90deg, #C9A96E, #e8d5a3 50%, #C9A96E)',
          borderRadius: '0 0 22px 22px',
          width: 0,
          transition: 'width 0.55s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 10,
        }} />

        {/* Project number — top left */}
        <div style={{
          position: 'absolute', top: 20, left: 22, zIndex: 8,
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400, fontSize: '0.9rem',
          letterSpacing: '0.1em',
          color: 'rgba(201,169,110,0.75)',
        }}>{num}</div>

        {/* Category badge — top right */}
        <div style={{
          position: 'absolute', top: 18, right: 18, zIndex: 8,
        }}>
          <CategoryBadge label={project.category} />
        </div>

        {/* Bottom content — always visible title, hover reveals more */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.5rem 1.6rem 1.6rem',
          zIndex: 9,
        }}>
          {/* Title — always visible */}
          <h3 className="ptf-title" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: featured ? 'clamp(1.5rem, 2.2vw, 2rem)' : 'clamp(1.2rem, 1.8vw, 1.55rem)',
            color: '#f5f0e8',
            lineHeight: 1.15,
            margin: 0,
            marginBottom: '0.4rem',
            letterSpacing: '0.01em',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}>{project.name}</h3>

          {/* Location — always visible, subtle */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 11,
            color: 'rgba(245,240,232,0.5)',
            margin: 0,
            letterSpacing: '0.04em',
            transition: 'opacity 0.3s ease',
          }}>{project.location}</p>

          {/* Concept — revealed on hover */}
          <p className="ptf-concept" style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 12,
            color: 'rgba(245,240,232,0.7)',
            lineHeight: 1.7,
            margin: 0,
            marginTop: '0.8rem',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.4s ease 0.05s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s',
            maxWidth: 320,
          }}>{project.concept}</p>

          {/* Arrow CTA — revealed on hover */}
          <div className="ptf-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: '1rem',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400, fontSize: 9,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}>View Project</span>
            <ArrowRight size={11} color="#C9A96E" strokeWidth={1.5} />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState<Cat>('all')

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)
  const featured = filtered[0]
  const secondary = filtered[1]
  const rest = filtered.slice(2)

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      <style>{`
        @keyframes ptfSkeleton {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        .ptf-card:hover .ptf-img {
          transform: scale(1.06) !important;
        }
        .ptf-card:hover .ptf-overlay {
          opacity: 1 !important;
        }
        .ptf-card:hover .ptf-title {
          transform: translateY(-3px);
        }
        .ptf-card:hover .ptf-concept {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .ptf-card:hover .ptf-cta {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .ptf-card:hover .ptf-accent {
          width: calc(100% - 40px) !important;
        }

        .ptf-filter-btn {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 10px 26px;
          border-radius: 40px;
          border: 1px solid rgba(28,40,24,0.18);
          background: transparent;
          color: rgba(28,40,24,0.45);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ptf-filter-btn:hover {
          border-color: #C9A96E;
          color: #9B7D4E;
        }
        .ptf-filter-btn.active {
          background: #2A3926;
          border-color: #2A3926;
          color: #f5f0e8;
        }

        .ptf-grid-rest {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .ptf-grid-rest {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .ptf-grid-rest {
            grid-template-columns: 1fr !important;
          }
          .ptf-featured-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <section style={{
        paddingTop: 140, paddingBottom: 56,
        textAlign: 'center',
        maxWidth: 680, margin: '0 auto',
        padding: '140px 24px 56px',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 10,
            letterSpacing: '0.44em',
            textTransform: 'uppercase',
            color: '#9B7D4E',
            marginBottom: '1rem',
          }}
        >Our Work</motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            color: '#1C2818',
            lineHeight: 1.05,
            margin: '0 0 18px',
            letterSpacing: '-0.01em',
          }}
        >Spaces That Tell Your Story</motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            width: 44, height: 1,
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            margin: '0 auto 22px',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 14,
            color: 'rgba(28,40,24,0.45)',
            lineHeight: 1.85,
          }}
        >
          Every project is a reflection of the people who live and work there.<br />
          See how thoughtful design transforms spaces into something truly special.
        </motion.p>
      </section>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: 10,
          padding: '0 24px 56px',
        }}
      >
        {cats.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`ptf-filter-btn${active === c.id ? ' active' : ''}`}
          >
            {c.label}
          </button>
        ))}
      </motion.div>

      {/* Portfolio grid */}
      <section style={{ maxWidth: 1360, margin: '0 auto', padding: '0 2rem 100px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured row — large + medium */}
            {filtered.length > 0 && (
              <div
                className="ptf-featured-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: featured && secondary ? '1.45fr 1fr' : '1fr',
                  gap: 24,
                  marginBottom: 24,
                }}
              >
                {featured && (
                  <ProjectCard project={featured} index={0} featured delay={0} />
                )}
                {secondary && (
                  <ProjectCard project={secondary} index={1} featured delay={100} />
                )}
              </div>
            )}

            {/* Rest — 3 column grid */}
            {rest.length > 0 && (
              <div className="ptf-grid-rest">
                {rest.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i + 2} delay={i * 80} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(28,40,24,0.35)' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontStyle: 'italic' }}>
                  No projects in this category yet.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bottom CTA */}
      <section style={{
        textAlign: 'center',
        padding: '0 24px 120px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 13,
            color: 'rgba(28,40,24,0.4)',
            lineHeight: 1.8, marginBottom: 32,
          }}>
            Ready to create a space that tells your story?
          </p>
          <Link
            to="/quote"
            className="ptf-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400, fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: '#1C2818',
              border: '1px solid rgba(28,40,24,0.35)',
              padding: '18px 52px',
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#2A3926'
              el.style.borderColor = '#2A3926'
              el.style.color = '#f5f0e8'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.borderColor = 'rgba(28,40,24,0.35)'
              el.style.color = '#1C2818'
              el.style.transform = 'translateY(0)'
            }}
          >
            Start Your Project <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
