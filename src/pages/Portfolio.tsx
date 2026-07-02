import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { ArrowRight } from 'lucide-react'

const DISPLAY_PROJECTS = projects.slice(0, 8)

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => setVisible(true)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { show(); obs.disconnect() } },
      { threshold: 0.05, rootMargin: '0px 0px 60px 0px' }
    )
    obs.observe(el)
    // Fire immediately if already in viewport on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show()
      obs.disconnect()
    }
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function ProjectCard({ project, index, delay }: {
  project: typeof projects[0]
  index: number
  delay: number
}) {
  const { ref, visible } = useReveal()
  const [imgLoaded, setImgLoaded] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
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
          borderRadius: 24,
          textDecoration: 'none',
          cursor: 'pointer',
          background: '#e4ddd4',
          aspectRatio: '16 / 10',
        }}
      >
        {/* Skeleton */}
        {!imgLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #e4ddd4 0%, #ede8e1 50%, #e4ddd4 100%)',
            backgroundSize: '200% 100%',
            animation: 'ptfSkel 1.4s ease infinite',
            zIndex: 1,
          }} />
        )}

        {/* Image */}
        <img
          src={project.coverImage}
          alt={project.name}
          className="ptf-img"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)',
            zIndex: 2,
          }}
          loading="lazy"
        />

        {/* Bottom gradient — always visible for title readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,10,6,0) 35%, rgba(6,10,6,0.80) 100%)',
          zIndex: 3,
        }} />

        {/* Hover overlay */}
        <div className="ptf-hover-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,14,8,0.38)',
          opacity: 0,
          transition: 'opacity 0.45s ease',
          zIndex: 4,
        }} />

        {/* Gold accent line */}
        <div className="ptf-accent-line" style={{
          position: 'absolute',
          bottom: 0, left: 22, right: 22,
          height: 2,
          background: 'linear-gradient(90deg, #C9A96E, #e8d5a3 50%, #C9A96E)',
          width: 0,
          transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 10,
        }} />

        {/* Project number */}
        <div style={{
          position: 'absolute', top: 20, left: 22, zIndex: 8,
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400, fontSize: '0.9rem',
          letterSpacing: '0.1em',
          color: 'rgba(201,169,110,0.8)',
        }}>{num}</div>

        {/* Bottom text content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.4rem 1.6rem 1.6rem',
          zIndex: 9,
        }}>
          <h3 className="ptf-title" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
            color: '#f5f0e8',
            lineHeight: 1.15,
            margin: '0 0 6px',
            letterSpacing: '0.01em',
            transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}>{project.name}</h3>

          <p className="ptf-desc" style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 12,
            color: 'rgba(245,240,232,0.68)',
            lineHeight: 1.65,
            margin: 0,
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.4s ease 0.05s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s',
          }}>{project.concept}</p>

          <div className="ptf-arrow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            marginTop: '0.85rem',
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
            <ArrowRight size={10} color="#C9A96E" strokeWidth={1.5} />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function Portfolio() {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      <style>{`
        @keyframes ptfSkel {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .ptf-card:hover .ptf-img {
          transform: scale(1.05) !important;
        }
        .ptf-card:hover .ptf-hover-overlay {
          opacity: 1 !important;
        }
        .ptf-card:hover .ptf-title {
          transform: translateY(-3px);
        }
        .ptf-card:hover .ptf-desc {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .ptf-card:hover .ptf-arrow {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .ptf-card:hover .ptf-accent-line {
          width: calc(100% - 44px) !important;
        }

        .ptf-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          column-gap: 32px;
          row-gap: 40px;
        }
        @media (max-width: 640px) {
          .ptf-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <section style={{
        paddingTop: 140, paddingBottom: 64,
        textAlign: 'center',
        maxWidth: 640, margin: '0 auto',
        padding: '140px 24px 64px',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 10,
            letterSpacing: '0.44em', textTransform: 'uppercase',
            color: '#9B7D4E', marginBottom: '1rem',
          }}
        >Our Work</motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            color: '#1C2818',
            lineHeight: 1.06, margin: '0 0 18px',
            letterSpacing: '-0.01em',
          }}
        >Spaces That Tell Your Story</motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          style={{
            width: 44, height: 1,
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            margin: '0 auto 22px', transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 14,
            color: 'rgba(28,40,24,0.44)', lineHeight: 1.85,
          }}
        >
          Every project is a reflection of the people who live and work there.<br />
          See how thoughtful design transforms spaces into something truly special.
        </motion.p>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 110px' }}>
        <div className="ptf-grid">
          {DISPLAY_PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              delay={Math.floor(i / 2) * 120}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ textAlign: 'center', padding: '0 24px 110px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: 13,
            color: 'rgba(28,40,24,0.38)',
            lineHeight: 1.8, marginBottom: 32,
          }}>
            Ready to create a space that tells your story?
          </p>
          <Link
            to="/quote"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400, fontSize: 10,
              letterSpacing: '0.26em', textTransform: 'uppercase',
              color: '#1C2818',
              border: '1px solid rgba(28,40,24,0.3)',
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
              el.style.borderColor = 'rgba(28,40,24,0.3)'
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
