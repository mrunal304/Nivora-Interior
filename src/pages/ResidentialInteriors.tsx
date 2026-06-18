import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home, Building2, Star, UtensilsCrossed, Sofa, Archive,
  User, Layers, Gem, Clock, Eye, CheckCircle2,
  ArrowRight, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'

import heroImg    from '@assets/1_1781780178509.jpg'
import diningImg  from '@assets/2_1781780242298.jpg'
import entryImg   from '@assets/4_1781780262821.jpg'
import bedroomImg from '@assets/7_1781780278388.jpg'

// ─── DATA ────────────────────────────────────────────────────────────────────

const expertise = [
  { icon: Home,            label: 'Apartments & Flats' },
  { icon: Building2,       label: 'Villas & Bungalows' },
  { icon: Star,            label: 'Luxury Residences' },
  { icon: UtensilsCrossed, label: 'Modular Kitchens' },
  { icon: Sofa,            label: 'Bedrooms & Living Spaces' },
  { icon: Archive,         label: 'Custom Storage Solutions' },
]

const featured = [
  {
    img: heroImg,
    title: 'Contemporary Living Room',
    category: 'Living Space',
    desc: 'A modern living room with warm tones, custom ceiling details, and a statement swing that blends tradition with contemporary design.',
  },
  {
    img: diningImg,
    title: 'Elegant Dining Area',
    category: 'Dining Room',
    desc: 'A refined dining space with quilted upholstery, a marble-top table, and layered lighting that creates an atmosphere of warmth.',
  },
  {
    img: entryImg,
    title: 'Foyer & Display Unit',
    category: 'Entrance Area',
    desc: 'A welcoming foyer featuring a custom lit display cabinet with arched detailing, balancing elegance and functionality.',
  },
]

// Portfolio: easy to extend — add objects to this array to add more photos
const gallery = [
  { img: heroImg,    title: 'Living Room',   category: 'Living Space' },
  { img: diningImg,  title: 'Dining Room',   category: 'Dining Area' },
  { img: entryImg,   title: 'Foyer',         category: 'Entrance' },
  { img: bedroomImg, title: "Kid's Bedroom", category: 'Bedroom' },
]

const processSteps = [
  { num: '01', title: 'Preliminary Call',                    desc: 'It starts with a preliminary call to understand your lifestyle and design aspirations.' },
  { num: '02', title: 'Ground Plan & Blueprints',            desc: 'Next, we create a ground plan and blueprints to get your buy-in for the creative vision.' },
  { num: '03', title: 'Project Approval & Lock-in',          desc: 'We await your approval next, and move on once we both agree on the initial plan.' },
  { num: '04', title: 'Mood Boards & 3D Design',             desc: 'After finalizing budgets and timelines, we translate ideas into tangible concepts through mood boards and immersive 3D designs.' },
  { num: '05', title: 'Material Sourcing & Selections',      desc: 'With a clear design direction, we meticulously curate materials, finishes, fabrics, and furnishings.' },
  { num: '06', title: 'Site Execution & Vendor Coordination',desc: 'We coordinate with trusted vendors to manage every aspect of the build.' },
  { num: '07', title: 'Routine Site Supervision',            desc: 'Throughout the execution phase, we conduct regular on-site inspections and quality checks.' },
  { num: '08', title: 'Styling & Finishing Touches',         desc: 'Once the core construction is complete, we focus on the finishing touches like artwork and décor.' },
  { num: '09', title: 'Project Delivery & Handover',         desc: 'After a walkthrough, your space is delivered—move-in ready—for you to enjoy.' },
]

const whyNivora = [
  { icon: User,          label: 'Personalized Design',      desc: 'Every space is crafted around your unique story.' },
  { icon: Layers,        label: 'Functional Planning',       desc: 'Smart layouts that work as beautifully as they look.' },
  { icon: Gem,           label: 'Premium Material Selection',desc: 'Hand-picked finishes that age with grace.' },
  { icon: Clock,         label: 'Timeless Interiors',        desc: 'Design that stays relevant long after trends fade.' },
  { icon: Eye,           label: 'Attention to Detail',       desc: 'Every corner considered — no compromise.' },
  { icon: CheckCircle2,  label: 'End-to-End Execution',      desc: 'From first sketch to final reveal, we own it.' },
]

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── EXPERTISE CARD ──────────────────────────────────────────────────────────

function ExpertiseCard({ icon: Icon, label, index }: { icon: React.ElementType; label: string; index: number }) {
  const { ref, visible } = useReveal(0.1)
  return (
    <div
      ref={ref}
      className="res-exp-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 90}ms`,
        background: '#fff',
        borderRadius: 14,
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start',
        gap: '1rem',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        border: '1px solid rgba(201,169,110,0.12)',
        cursor: 'default',
        position: 'relative' as const,
        overflow: 'hidden' as const,
      }}
    >
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        background: 'rgba(201,169,110,0.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} color="#C9A96E" strokeWidth={1.5} />
      </div>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: 14,
        color: '#2A3926',
        letterSpacing: '0.01em',
        lineHeight: 1.4,
      }}>{label}</span>
      <div className="res-exp-line" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        width: 0,
        background: 'linear-gradient(90deg, #C9A96E, #e8d5a3)',
        borderRadius: '0 2px 0 0',
        transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </div>
  )
}

// ─── FEATURED PROJECT CARD ────────────────────────────────────────────────────

function FeaturedCard({ img, title, category, desc, index }: {
  img: string; title: string; category: string; desc: string; index: number
}) {
  const { ref, visible } = useReveal(0.08)
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.65s ease ${index * 120}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      <div className="res-feat-card">
        <div style={{ overflow: 'hidden', borderRadius: '14px 14px 0 0', height: 300 }}>
          <img
            src={img}
            alt={title}
            className="res-feat-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
        </div>
        <div style={{
          padding: '1.6rem 1.5rem 1.75rem',
          background: '#fff',
          borderRadius: '0 0 14px 14px',
          borderTop: '1px solid rgba(201,169,110,0.1)',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '0.5rem',
          }}>{category}</p>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: '1.45rem',
            color: '#1C2818',
            lineHeight: 1.2,
            marginBottom: '0.75rem',
          }}>{title}</h3>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: 'rgba(28,40,24,0.55)',
            lineHeight: 1.75,
          }}>{desc}</p>
        </div>
      </div>
    </div>
  )
}

// ─── GALLERY CARD ─────────────────────────────────────────────────────────────

function GalleryCard({ item, index, onOpen }: {
  item: typeof gallery[0]; index: number; onOpen: (i: number) => void
}) {
  const { ref, visible } = useReveal(0.08)
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: `opacity 0.6s ease ${(index % 3) * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${(index % 3) * 100}ms`,
      }}
    >
      <button
        onClick={() => onOpen(index)}
        className="res-gal-card"
        style={{
          all: 'unset',
          display: 'block',
          cursor: 'pointer',
          width: '100%',
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          aspectRatio: '4/3',
        }}
      >
        <img
          src={item.img}
          alt={item.title}
          className="res-gal-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div className="res-gal-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,14,8,0.82) 100%)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }} />
        <div className="res-gal-info" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.2rem 1.1rem',
          opacity: 0,
          transform: 'translateY(10px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: '#C9A96E', margin: '0 0 4px',
          }}>{item.category}</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
            fontSize: '1.15rem', color: '#f5f0e8', margin: 0,
          }}>{item.title}</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            marginTop: 8, fontFamily: "'Inter', sans-serif",
            fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.7)',
          }}>
            View <ArrowRight size={10} />
          </div>
        </div>
      </button>
    </div>
  )
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

function Lightbox({ items, activeIndex, onClose, onPrev, onNext }: {
  items: typeof gallery; activeIndex: number
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const item = items[activeIndex]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(8,12,8,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24, background: 'none',
          border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,0.6)',
          padding: 8, transition: 'color 0.2s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f5f0e8')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.6)')}
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        style={{
          position: 'absolute', left: 20, background: 'rgba(201,169,110,0.12)',
          border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%',
          width: 48, height: 48, display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer',
          color: 'rgba(245,240,232,0.7)', transition: 'all 0.25s',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.22)'; el.style.color = '#f5f0e8' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.12)'; el.style.color = 'rgba(245,240,232,0.7)' }}
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '85vw', maxHeight: '82vh', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <img
          src={item.img}
          alt={item.title}
          style={{
            maxWidth: '100%', maxHeight: '72vh',
            objectFit: 'contain', borderRadius: 8,
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase',
            color: '#C9A96E', marginBottom: 4,
          }}>{item.category}</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: '1.4rem', color: '#f5f0e8',
          }}>{item.title}</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 11, color: 'rgba(245,240,232,0.35)',
            marginTop: 6,
          }}>{activeIndex + 1} / {items.length}</p>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        style={{
          position: 'absolute', right: 20, background: 'rgba(201,169,110,0.12)',
          border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%',
          width: 48, height: 48, display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer',
          color: 'rgba(245,240,232,0.7)', transition: 'all 0.25s',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.22)'; el.style.color = '#f5f0e8' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.12)'; el.style.color = 'rgba(245,240,232,0.7)' }}
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  )
}

// ─── TIMELINE CARD ───────────────────────────────────────────────────────────

function TimelineCard({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const { ref, visible } = useReveal(0.12)
  const isRight = index % 2 === 0

  return (
    <div
      ref={ref}
      className="res-tl-row"
      style={{
        display: 'flex',
        justifyContent: isRight ? 'flex-start' : 'flex-end',
        position: 'relative',
        marginBottom: 0,
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : `translateY(40px)`,
        transition: `opacity 0.65s ease ${index * 100}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      }}
    >
      {/* Card */}
      <div
        className="res-tl-card"
        style={{
          width: 'calc(50% - 40px)',
          background: '#fff',
          borderRadius: 16,
          padding: '1.75rem 1.75rem 1.85rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.07), 0 1px 6px rgba(0,0,0,0.04)',
          border: '1px solid rgba(201,169,110,0.10)',
          position: 'relative',
        }}
      >
        {/* Gold step number */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: '1.05rem',
          color: '#C9A96E',
          letterSpacing: '0.06em',
          marginBottom: '0.55rem',
          lineHeight: 1,
        }}>{step.num}</p>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
          color: '#1C2818',
          lineHeight: 1.25,
          marginBottom: '0.65rem',
          letterSpacing: '0.01em',
        }}>{step.title}</h3>

        {/* Gold accent line */}
        <div style={{
          width: 28, height: 1,
          background: 'linear-gradient(90deg, #C9A96E, transparent)',
          marginBottom: '0.8rem',
          opacity: 0.7,
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: 13,
          color: 'rgba(28,40,24,0.55)',
          lineHeight: 1.8,
          margin: 0,
        }}>{step.desc}</p>
      </div>
    </div>
  )
}

// ─── WHY CARD ─────────────────────────────────────────────────────────────────

function WhyCard({ icon: Icon, label, desc, index }: {
  icon: React.ElementType; label: string; desc: string; index: number
}) {
  const { ref, visible } = useReveal(0.1)
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
        padding: '2rem 1.5rem',
        borderRadius: 14,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(201,169,110,0.12)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.85rem',
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: 'rgba(201,169,110,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={19} color="#C9A96E" strokeWidth={1.5} />
      </div>
      <div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
          fontSize: '1.15rem', color: '#f5f0e8', marginBottom: '0.35rem',
        }}>{label}</p>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          fontSize: 12, color: 'rgba(245,240,232,0.45)', lineHeight: 1.7,
        }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ResidentialInteriors() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openLightbox  = useCallback((i: number) => setLightbox(i), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImg = useCallback(() => setLightbox(i => i !== null ? (i - 1 + gallery.length) % gallery.length : null), [])
  const nextImg = useCallback(() => setLightbox(i => i !== null ? (i + 1) % gallery.length : null), [])

  return (
    <div style={{ backgroundColor: '#F7F4EF' }}>
      <style>{`
        /* Expertise cards */
        .res-exp-card { transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1) !important; }
        .res-exp-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.10) !important; transform: translateY(-4px) !important; }
        .res-exp-card:hover .res-exp-line { width: 100% !important; }

        /* Featured cards */
        .res-feat-card {
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .res-feat-card:hover { box-shadow: 0 16px 52px rgba(0,0,0,0.14); transform: translateY(-6px); }
        .res-feat-img { transition: transform 0.65s cubic-bezier(0.16,1,0.3,1) !important; }
        .res-feat-card:hover .res-feat-img { transform: scale(1.06) !important; }

        /* Gallery */
        .res-gal-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease !important; }
        .res-gal-card:hover { transform: translateY(-6px) scale(1.01) !important; box-shadow: 0 14px 44px rgba(0,0,0,0.15) !important; }
        .res-gal-card:hover .res-gal-overlay { opacity: 1 !important; }
        .res-gal-card:hover .res-gal-info { opacity: 1 !important; transform: translateY(0) !important; }
        .res-gal-img { transition: transform 0.65s cubic-bezier(0.16,1,0.3,1) !important; }
        .res-gal-card:hover .res-gal-img { transform: scale(1.07) !important; }

        /* Timeline */
        .res-tl-card {
          transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1) !important;
        }
        .res-tl-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.11), 0 3px 10px rgba(0,0,0,0.05) !important;
          transform: translateY(-4px) !important;
        }
        /* Mobile timeline: single column left-aligned */
        @media (max-width: 768px) {
          .res-tl-row {
            justify-content: flex-end !important;
            padding-left: 36px !important;
          }
          .res-tl-row > div {
            width: 100% !important;
          }
          .res-tl-line {
            left: 12px !important;
            transform: none !important;
          }
          .res-tl-diamonds {
            left: 4px !important;
            transform: none !important;
          }
        }

        /* Responsive grids */
        .res-exp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .res-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .res-gal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .res-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .res-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .res-exp-grid,
          .res-feat-grid,
          .res-gal-grid,
          .res-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .res-intro-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 640px) {
          .res-exp-grid,
          .res-feat-grid,
          .res-gal-grid,
          .res-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── SECTION 1 · HERO ───────────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: '100vh', minHeight: 560, overflow: 'hidden' }}>
        <img
          src={heroImg}
          alt="Residential Interiors"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,30,18,0.42) 0%, rgba(12,20,10,0.72) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 1.5rem',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: 10, letterSpacing: '0.48em', textTransform: 'uppercase',
              color: '#C9A96E', marginBottom: '1.25rem',
            }}>Residential Interiors</p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              color: '#f5f0e8', lineHeight: 1.06,
              marginBottom: '1.5rem', letterSpacing: '-0.01em',
            }}>
              Designing Homes<br />That Feel Like You
            </h1>
            <div style={{
              width: 48, height: 1,
              background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
              margin: '0 auto 1.75rem',
            }} />
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: 14, color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.85, maxWidth: 480,
            }}>
              Spaces that reflect your personality, lifestyle, and aspirations
            </p>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{ position: 'absolute', bottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)' }}>Scroll</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)' }} />
          </motion.div>
        </div>
      </div>

      {/* ── SECTION 2 · INTRODUCTION ─────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F7F4EF', padding: '96px 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="res-intro-grid">
            <FadeIn direction="right">
              <div>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 300,
                  fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
                  color: '#9B7D4E', marginBottom: '1.1rem',
                }}>Our Approach</p>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#1C2818',
                  lineHeight: 1.18, marginBottom: '1.5rem', letterSpacing: '-0.01em',
                }}>Designing Homes<br />That Feel Like You</h2>
                <div style={{ width: 36, height: 1, background: '#C9A96E', marginBottom: '1.6rem', opacity: 0.7 }} />
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 300,
                  fontSize: 15, color: 'rgba(28,40,24,0.58)', lineHeight: 1.9,
                }}>
                  Your home should be more than just a place to live—it should reflect your personality, lifestyle, and aspirations. Whether you're moving into a new apartment, building your dream villa, renovating an existing home, or creating a weekend retreat, we design spaces that are functional, timeless, and uniquely yours.
                </p>
                <Link
                  to="/quote"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    marginTop: '2.25rem',
                    fontFamily: "'Inter', sans-serif", fontWeight: 400,
                    fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: '#C9A96E', textDecoration: 'none',
                    borderBottom: '1px solid rgba(201,169,110,0.35)',
                    paddingBottom: 2,
                    transition: 'color 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#a8833e'; el.style.borderColor = '#a8833e' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#C9A96E'; el.style.borderColor = 'rgba(201,169,110,0.35)' }}
                >
                  Start Your Project <ArrowRight size={11} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.15}>
              <div style={{ borderRadius: 16, overflow: 'hidden', height: 480 }}>
                <img
                  src={entryImg}
                  alt="Residential Interior"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 · OUR EXPERTISE ────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F0EDE6', padding: '88px 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
                color: '#9B7D4E', marginBottom: '0.85rem',
              }}>Specialisations</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)', color: '#1C2818',
                lineHeight: 1.1,
              }}>Our Expertise</h2>
            </div>
          </FadeIn>
          <div className="res-exp-grid">
            {expertise.map((e, i) => (
              <ExpertiseCard key={e.label} icon={e.icon} label={e.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3.5 · HOW WE DO IT ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#F7F4EF', padding: '96px 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
                color: '#9B7D4E', marginBottom: '0.85rem',
              }}>The Process</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)', color: '#1C2818',
                lineHeight: 1.1, marginBottom: '1.1rem',
              }}>How We Do It</h2>
              <div style={{
                width: 40, height: 1,
                background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                margin: '0 auto 1.25rem',
              }} />
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 14, color: 'rgba(28,40,24,0.48)',
                lineHeight: 1.85, maxWidth: 520, margin: '0 auto',
              }}>
                Our refined design journey transforms your vision into a beautifully crafted living space through a seamless and transparent process.
              </p>
            </div>
          </FadeIn>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>

            {/* Vertical centre line */}
            <div
              className="res-tl-line"
              style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 1,
                background: 'linear-gradient(to bottom, transparent, rgba(42,57,38,0.25) 8%, rgba(42,57,38,0.25) 92%, transparent)',
                zIndex: 0,
              }}
            />

            {/* Diamond dots — one per step */}
            <div
              className="res-tl-diamonds"
              style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                pointerEvents: 'none',
              }}
            >
              {processSteps.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Diamond */}
                  <div style={{
                    width: 10, height: 10,
                    background: '#C9A96E',
                    transform: 'rotate(45deg)',
                    flexShrink: 0,
                    boxShadow: '0 0 0 3px #F7F4EF, 0 0 0 4px rgba(201,169,110,0.35)',
                  }} />
                </div>
              ))}
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
              {processSteps.map((step, i) => (
                <TimelineCard key={step.num} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 · FEATURED PROJECTS ────────────────────────────────── */}
      <section style={{ backgroundColor: '#F7F4EF', padding: '96px 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ marginBottom: '3.5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
                color: '#9B7D4E', marginBottom: '0.85rem',
              }}>Highlighted Work</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)', color: '#1C2818',
                lineHeight: 1.1,
              }}>Featured Residential Projects</h2>
            </div>
          </FadeIn>
          <div className="res-feat-grid">
            {featured.map((f, i) => (
              <FeaturedCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 · PORTFOLIO GALLERY ────────────────────────────────── */}
      <section style={{ backgroundColor: '#EAE7E0', padding: '96px 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ marginBottom: '3.5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
                color: '#9B7D4E', marginBottom: '0.85rem',
              }}>Portfolio</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)', color: '#1C2818',
                lineHeight: 1.1, marginBottom: '0.75rem',
              }}>Residential Gallery</h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 13, color: 'rgba(28,40,24,0.45)', lineHeight: 1.75,
                maxWidth: 480,
              }}>
                Click any image to view it in full. More projects will be added here as our portfolio grows.
              </p>
            </div>
          </FadeIn>
          <div className="res-gal-grid">
            {gallery.map((item, i) => (
              <GalleryCard key={i} item={item} index={i} onOpen={openLightbox} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 · WHY NIVORA ───────────────────────────────────────── */}
      <section style={{ backgroundColor: '#2A3926', padding: '96px 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
                color: '#9B7D4E', marginBottom: '0.85rem',
              }}>The Nivora Difference</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)', color: '#f5f0e8',
                lineHeight: 1.1,
              }}>Why Choose Nivora</h2>
            </div>
          </FadeIn>
          <div className="res-why-grid">
            {whyNivora.map((w, i) => (
              <WhyCard key={w.label} icon={w.icon} label={w.label} desc={w.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 · CTA ──────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: '#1C2818', padding: '100px 1.5rem',
        textAlign: 'center',
      }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
            color: '#9B7D4E', marginBottom: '1rem',
          }}>Let's Begin</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)', color: '#f5f0e8',
            fontStyle: 'italic', lineHeight: 1.15, marginBottom: '1.25rem',
          }}>
            Ready to Design<br />Your Dream Home?
          </h2>
          <div style={{ width: 44, height: 1, background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', margin: '0 auto 1.5rem' }} />
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 14, color: 'rgba(245,240,232,0.42)',
            lineHeight: 1.85, maxWidth: 400, margin: '0 auto 2.75rem',
          }}>
            Let's create a home that reflects your personality and lifestyle.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/quote"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                backgroundColor: '#C9A96E', color: '#1C2818',
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
                fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '18px 48px', textDecoration: 'none',
                transition: 'background 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ddb97a'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C9A96E'; el.style.transform = 'translateY(0)' }}
            >
              Book a Consultation <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
            <Link
              to="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                border: '1px solid rgba(201,169,110,0.35)', color: 'rgba(201,169,110,0.75)',
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '18px 36px', textDecoration: 'none',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#C9A96E'; el.style.color = '#C9A96E' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(201,169,110,0.35)'; el.style.color = 'rgba(201,169,110,0.75)' }}
            >
              All Services
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          items={gallery}
          activeIndex={lightbox}
          onClose={closeLightbox}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}
    </div>
  )
}
