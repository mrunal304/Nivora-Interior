import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const serviceCards = [
  {
    num: '01',
    title: 'Residential Interiors',
    desc: 'Designing elegant homes and living spaces that blend comfort, functionality, and timeless beauty.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
    href: '/services/residential',
  },
  {
    num: '02',
    title: 'Commercial Interiors',
    desc: 'Creating productive offices, clinics, retail stores, and professional workspaces.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    href: '/services/commercial',
  },
  {
    num: '03',
    title: 'Hospitality Interiors',
    desc: 'Crafting memorable guest experiences through hotels, cafés, restaurants, and hospitality environments.',
    img: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=900&q=80',
    href: '/services/commercial',
  },
  {
    num: '04',
    title: 'Architecture & Space Planning',
    desc: 'Planning layouts, elevations, facades, and architectural concepts for optimized spaces.',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80',
    href: '/services/architecture',
  },
  {
    num: '05',
    title: '2D & 3D Visualization',
    desc: 'Creating drawings, renders, and visual presentations that bring ideas to life.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    href: '/services/architecture',
  },
  {
    num: '06',
    title: 'Developer Solutions',
    desc: 'Design support for sample flats, amenities, marketing suites, and property enhancement.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
    href: '/services/commercial',
  },
  {
    num: '07',
    title: 'Renovation & Makeovers',
    desc: 'Transforming existing spaces through upgrades, modernization, and complete redesigns.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
    href: '/services/residential',
  },
]

function ServiceCard({ card, index }: { card: typeof serviceCards[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Link
      ref={ref}
      to={card.href}
      className="svc-premium-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
        textDecoration: 'none',
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        aspectRatio: '4/5',
        cursor: 'pointer',
      }}
    >
      {/* Background image */}
      <img
        src={card.img}
        alt={card.title}
        className="svc-pm-img"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        loading="lazy"
      />

      {/* Base gradient overlay — always visible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,18,10,0.18) 0%, rgba(10,18,10,0.55) 55%, rgba(8,14,8,0.88) 100%)',
        zIndex: 1,
        transition: 'background 0.45s ease',
      }} className="svc-pm-base-overlay" />

      {/* Hover dark overlay */}
      <div className="svc-pm-hover-overlay" style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(6,12,6,0.35)',
        zIndex: 2,
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Gold accent line — bottom, animates on hover */}
      <div className="svc-pm-accent-line" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        width: 0,
        background: 'linear-gradient(90deg, #C9A96E, #e8d5a3)',
        zIndex: 10,
        transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Service number */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 22,
        zIndex: 5,
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: '1rem',
        letterSpacing: '0.06em',
        color: '#C9A96E',
      }}>{card.num}</div>

      {/* Bottom content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 1.4rem 1.4rem',
        zIndex: 6,
      }}>
        {/* Title — always visible */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(1.3rem, 2vw, 1.55rem)',
          color: '#f5f0e8',
          lineHeight: 1.2,
          margin: 0,
          marginBottom: '0.6rem',
          letterSpacing: '0.01em',
        }}>{card.title}</h3>

        {/* Description — fades up on hover */}
        <p className="svc-pm-desc" style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          color: 'rgba(245,240,232,0.75)',
          lineHeight: 1.6,
          margin: 0,
          marginBottom: '1rem',
          opacity: 0,
          transform: 'translateY(10px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>{card.desc}</p>

        {/* CTA — fades up on hover */}
        <div className="svc-pm-cta" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          opacity: 0,
          transform: 'translateY(8px)',
          transition: 'opacity 0.35s ease 0.06s, transform 0.35s ease 0.06s',
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9A96E',
          }}>Explore Service</span>
          <ArrowRight size={11} color="#C9A96E" />
        </div>
      </div>
    </Link>
  )
}

export default function Services() {
  return (
    <div style={{ backgroundColor: '#F7F4EF', minHeight: '100vh' }}>
      <style>{`
        .svc-premium-card:hover .svc-pm-img {
          transform: scale(1.06);
          transition: transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-pm-img {
          transition: transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-premium-card:hover .svc-pm-hover-overlay {
          opacity: 1 !important;
        }
        .svc-premium-card:hover .svc-pm-desc {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .svc-premium-card:hover .svc-pm-cta {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .svc-premium-card:hover .svc-pm-accent-line {
          width: 100% !important;
        }
        .svc-premium-card {
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-premium-card:hover {
          box-shadow: 0 16px 56px rgba(0,0,0,0.18);
          transform: translateY(-4px) !important;
        }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .svc-grid-row2 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        @media (max-width: 1024px) {
          .svc-grid,
          .svc-grid-row2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .svc-grid,
          .svc-grid-row2 {
            grid-template-columns: 1fr !important;
          }
          .svc-pm-desc,
          .svc-pm-cta {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>

      {/* Hero header */}
      <section style={{
        paddingTop: 120,
        paddingBottom: 64,
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        textAlign: 'center',
        maxWidth: 680,
        margin: '0 auto',
      }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: '#9B7D4E',
            marginBottom: '0.85rem',
          }}>What We Offer</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            color: '#1E2A1A',
            lineHeight: 1.05,
            marginBottom: '1.2rem',
            letterSpacing: '-0.01em',
          }}>Our Services</h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: 'rgba(30,42,26,0.5)',
            lineHeight: 1.8,
          }}>
            Complete interior design and architecture services —<br />
            from first conversation to final reveal.
          </p>
        </FadeIn>
      </section>

      {/* Thin gold divider */}
      <FadeIn>
        <div style={{
          width: 48,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          margin: '0 auto 56px',
        }} />
      </FadeIn>

      {/* Cards grid */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem 80px' }}>
        {/* Row 1 — 4 cards */}
        <div className="svc-grid">
          {serviceCards.slice(0, 4).map((card, i) => (
            <ServiceCard key={card.num} card={card} index={i} />
          ))}
        </div>
        {/* Row 2 — 3 cards, centred */}
        <div className="svc-grid-row2">
          {serviceCards.slice(4).map((card, i) => (
            <ServiceCard key={card.num} card={card} index={i + 4} />
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{
        backgroundColor: '#2C3D28',
        padding: '80px 1.5rem',
        textAlign: 'center',
      }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: '#9B7D4E',
            marginBottom: '1rem',
          }}>Ready to Begin?</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            color: '#f5f0e8',
            fontStyle: 'italic',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            Not sure where to start?
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.8,
            maxWidth: 420,
            margin: '0 auto 2.5rem',
          }}>
            Book a free consultation and we'll guide you through the best approach for your project.
          </p>
          <Link
            to="/quote"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#C9A96E',
              color: '#1E2A1A',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '18px 44px',
              textDecoration: 'none',
              transition: 'background 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#e0c08a'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#C9A96E'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            Book Free Consultation <ArrowRight size={13} />
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
