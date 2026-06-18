import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2, Users, ShoppingBag, Heart, Activity, Coffee,
  Layers, Clock, Gem, Star, CheckCircle2,
  ArrowRight, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'

import heroImg    from '@assets/1_(1)_1781789483922.jpg'
import introImg   from '@assets/2_(1)_1781789467985.jpg'
import proj1Img   from '@assets/3_1781789449496.jpg'
import proj2Img   from '@assets/6_1781789546697.jpg'
import proj3Img   from '@assets/5_1781789564771.jpg'

// ─── DATA ────────────────────────────────────────────────────────────────────

const expertise = [
  { icon: Building2,   label: 'Corporate Offices' },
  { icon: Users,       label: 'Co-working Spaces' },
  { icon: ShoppingBag, label: 'Retail Stores' },
  { icon: Heart,       label: 'Clinics & Healthcare Facilities' },
  { icon: Activity,    label: 'Fitness Studios & Gyms' },
  { icon: Coffee,      label: 'Reception & Waiting Areas' },
]

const featured = [
  {
    img: proj1Img,
    title: 'Premium Office Corridor',
    category: 'Corporate Office',
    desc: 'A sophisticated marble-floored corridor with fluted glass partitions and recessed ceiling lighting that sets a premium tone from the first step.',
  },
  {
    img: proj2Img,
    title: 'Executive Reception Lobby',
    category: 'Reception Area',
    desc: 'A statement reception featuring a sculptural marble desk, custom wood-slat wall panels, and a dramatic Sputnik chandelier that commands attention.',
  },
  {
    img: proj3Img,
    title: 'Award Display & Lounge Wall',
    category: 'Waiting Area',
    desc: 'A curated waiting area wall with backlit display niches, deep wood frames, and a long upholstered bench — functional, refined, and brand-forward.',
  },
]

const gallery = [
  { img: heroImg,  title: 'Reception Lobby',    category: 'Corporate Office' },
  { img: introImg, title: 'Executive Desk',     category: 'Reception Area'   },
  { img: proj1Img, title: 'Office Corridor',    category: 'Corporate Office' },
  { img: proj2Img, title: 'Illuminated Stair',  category: 'Common Area'      },
  { img: proj3Img, title: 'Award Lounge Wall',  category: 'Waiting Area'     },
]

const processSteps = [
  { num: '01', title: 'Preliminary Consultation',              desc: 'We begin with a deep-dive session to understand your brand identity, workflow, and space requirements.' },
  { num: '02', title: 'Space Planning & Blueprints',           desc: 'We develop functional floor plans and blueprints that balance productivity, flow, and aesthetics.' },
  { num: '03', title: 'Project Approval & Lock-in',            desc: 'Once you approve the concept and budget, we lock in the scope and timeline for execution.' },
  { num: '04', title: 'Mood Boards & 3D Visualisation',        desc: 'We translate the brief into detailed mood boards and immersive 3D renders for your review.' },
  { num: '05', title: 'Material Sourcing & Specifications',    desc: 'We curate finishes, materials, and furnishings that align with your brand and project brief.' },
  { num: '06', title: 'Site Execution & Vendor Coordination',  desc: 'Our team coordinates with trusted contractors to manage every aspect of the build process.' },
  { num: '07', title: 'Routine Site Supervision',              desc: 'Regular on-site inspections and quality checks ensure every detail matches the approved design.' },
  { num: '08', title: 'Styling & Final Dressing',              desc: 'We complete the space with carefully chosen art, signage, and décor that reinforce your brand.' },
  { num: '09', title: 'Project Delivery & Handover',           desc: 'Your space is handed over move-in ready, complete with a thorough walkthrough and snag resolution.' },
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
        width: 44, height: 44, borderRadius: 10,
        background: 'rgba(201,169,110,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} color="#C9A96E" strokeWidth={1.5} />
      </div>
      <span style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 400,
        fontSize: 14, color: '#2A3926',
        letterSpacing: '0.01em', lineHeight: 1.4,
      }}>{label}</span>
      <div className="res-exp-line" style={{
        position: 'absolute', bottom: 0, left: 0, height: 2, width: 0,
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
        <div className="res-feat-img-wrap">
          <img src={img} alt={title} className="res-feat-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy" />
        </div>
        <div style={{
          padding: '1.6rem 1.5rem 1.75rem', background: '#fff',
          borderRadius: '0 0 14px 14px', borderTop: '1px solid rgba(201,169,110,0.1)',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 10,
            letterSpacing: '0.38em', textTransform: 'uppercase',
            color: '#C9A96E', marginBottom: '0.5rem',
          }}>{category}</p>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
            fontSize: '1.45rem', color: '#1C2818', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>{title}</h3>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 13,
            color: 'rgba(28,40,24,0.55)', lineHeight: 1.75,
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
          all: 'unset', display: 'block', cursor: 'pointer', width: '100%',
          position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3',
        }}
      >
        <img src={item.img} alt={item.title} className="res-gal-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy" />
        <div className="res-gal-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,14,8,0.82) 100%)',
          opacity: 0, transition: 'opacity 0.4s ease',
        }} />
        <div className="res-gal-info" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.2rem 1.1rem',
          opacity: 0, transform: 'translateY(10px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 10,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: '#C9A96E', margin: '0 0 4px',
          }}>{item.category}</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
            fontSize: '1.15rem', color: '#f5f0e8', margin: 0,
          }}>{item.title}</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8,
            fontFamily: "'Inter', sans-serif", fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase',
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
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  const item = items[activeIndex]
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(8,12,8,0.94)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: 20, right: 24, background: 'none',
        border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,0.6)', padding: 8, transition: 'color 0.2s',
      }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f5f0e8')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.6)')}>
        <X size={24} strokeWidth={1.5} />
      </button>
      <button onClick={e => { e.stopPropagation(); onPrev() }} style={{
        position: 'absolute', left: 20, background: 'rgba(201,169,110,0.12)',
        border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%',
        width: 48, height: 48, display: 'flex', alignItems: 'center',
        justifyContent: 'center', cursor: 'pointer',
        color: 'rgba(245,240,232,0.7)', transition: 'all 0.25s',
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.22)'; el.style.color = '#f5f0e8' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.12)'; el.style.color = 'rgba(245,240,232,0.7)' }}>
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: '85vw', maxHeight: '82vh', display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <img src={item.img} alt={item.title} style={{
          maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain',
          borderRadius: 8, boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 10,
            letterSpacing: '0.36em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 4,
          }}>{item.category}</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: '1.4rem', color: '#f5f0e8',
          }}>{item.title}</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 11,
            color: 'rgba(245,240,232,0.35)', marginTop: 6,
          }}>{activeIndex + 1} / {items.length}</p>
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); onNext() }} style={{
        position: 'absolute', right: 20, background: 'rgba(201,169,110,0.12)',
        border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%',
        width: 48, height: 48, display: 'flex', alignItems: 'center',
        justifyContent: 'center', cursor: 'pointer',
        color: 'rgba(245,240,232,0.7)', transition: 'all 0.25s',
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.22)'; el.style.color = '#f5f0e8' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,169,110,0.12)'; el.style.color = 'rgba(245,240,232,0.7)' }}>
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
    <div ref={ref} className="res-tl-row" style={{
      display: 'flex', justifyContent: isRight ? 'flex-start' : 'flex-end',
      position: 'relative', marginBottom: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.65s ease ${index * 100}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
    }}>
      <div className="res-tl-card" style={{
        width: 'calc(50% - 40px)', background: '#fff',
        borderRadius: 16, padding: '1.75rem 1.75rem 1.85rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07), 0 1px 6px rgba(0,0,0,0.04)',
        border: '1px solid rgba(201,169,110,0.10)', position: 'relative',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
          fontSize: '1.05rem', color: '#C9A96E', letterSpacing: '0.06em',
          marginBottom: '0.55rem', lineHeight: 1,
        }}>{step.num}</p>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
          fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: '#1C2818',
          lineHeight: 1.25, marginBottom: '0.65rem', letterSpacing: '0.01em',
        }}>{step.title}</h3>
        <div style={{
          width: 28, height: 1,
          background: 'linear-gradient(90deg, #C9A96E, transparent)',
          marginBottom: '0.8rem', opacity: 0.7,
        }} />
        <p style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 13,
          color: 'rgba(28,40,24,0.55)', lineHeight: 1.8, margin: 0,
        }}>{step.desc}</p>
      </div>
    </div>
  )
}

// ─── WHY NIVORA — COMMERCIAL EDITORIAL ───────────────────────────────────────

function WhyCommercialSection() {
  const { ref: r1, visible: v1 } = useReveal(0.12)
  const { ref: r2, visible: v2 } = useReveal(0.12)
  const { ref: r3, visible: v3 } = useReveal(0.12)

  const fadeUp = (vis: boolean, delay = 0): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(36px)',
    transition: `opacity 900ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform 900ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
  })

  const serif = "'Cormorant Garamond', serif"
  const sans  = "'Inter', sans-serif"
  const ink   = '#262421'
  const muted = '#7A756E'
  const gold  = '#C8A56A'
  const surf  = '#F3EEE7'
  const bord  = '#E7DED2'

  return (
    <>
      {/* ── BLOCK 1 · 60 / 40 ──────────────────────────────── */}
      <div ref={r1} className="res-why-b1">
        <div style={fadeUp(v1, 0)}>
          <span className="res-why-num">01</span>
          <h3 className="res-why-b1-h3">
            Brand-Led<br />Design
          </h3>
          <div className="res-why-gold-line" />
          <p style={{
            fontFamily: sans, fontWeight: 300, fontSize: 14, color: muted,
            lineHeight: 1.9, maxWidth: 380, margin: 0,
          }}>
            Every commercial space tells a story.<br />
            We design environments that embody your brand,<br />
            culture, and vision from the first impression.
          </p>
        </div>
        <div className="res-why-block-hover" style={{
          ...fadeUp(v1, 150),
          display: 'flex', flexDirection: 'column' as const,
          alignItems: 'flex-start', gap: '1.75rem',
          padding: '2.75rem 2.5rem',
          background: surf, border: `1px solid ${bord}`, borderRadius: 2,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 2, flexShrink: 0,
            background: 'rgba(200,165,106,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Building2 size={22} color={gold} strokeWidth={1.2} />
          </div>
          <div>
            <p style={{
              fontFamily: sans, fontWeight: 300, fontSize: 14, color: ink, lineHeight: 1.9, margin: 0,
            }}>
              We translate your brand identity into spatial language —<br />
              through materials, light, layout and detail that<br />
              communicate who you are without a word.
            </p>
          </div>
        </div>
      </div>

      {/* ── BLOCK 2 · FULL-WIDTH STRIP ──────────────────────── */}
      <div ref={r2} className="res-why-b2" style={fadeUp(v2, 0)}>
        <span className="res-why-num">02</span>
        <div className="res-why-b2-inner">
          <div className="res-why-block-hover" style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: serif, fontWeight: 300,
              fontSize: 'clamp(1.65rem, 2.8vw, 2.35rem)',
              color: ink, lineHeight: 1.12, marginBottom: '1.1rem', letterSpacing: '-0.01em',
            }}>Functional<br />Space Planning</h3>
            <p style={{
              fontFamily: sans, fontWeight: 300, fontSize: 13, color: muted,
              lineHeight: 1.85, maxWidth: 300, margin: 0,
            }}>
              Smart layouts that balance productivity, flow, and comfort.
            </p>
          </div>
          <div className="res-why-vdivider" />
          <div className="res-why-block-hover" style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: serif, fontWeight: 300,
              fontSize: 'clamp(1.65rem, 2.8vw, 2.35rem)',
              color: ink, lineHeight: 1.12, marginBottom: '1.1rem', letterSpacing: '-0.01em',
            }}>Timely Project<br />Delivery</h3>
            <p style={{
              fontFamily: sans, fontWeight: 300, fontSize: 13, color: muted,
              lineHeight: 1.85, maxWidth: 300, margin: 0,
            }}>
              We respect your timelines and deliver without compromise.
            </p>
          </div>
        </div>
      </div>

      {/* ── BLOCK 3 · 40 / 60 ──────────────────────────────── */}
      <div ref={r3} className="res-why-b3">
        <div style={fadeUp(v3, 0)}>
          <span className="res-why-num">04</span>
          <h3 style={{
            fontFamily: serif, fontWeight: 300,
            fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)',
            color: ink, lineHeight: 1.08, letterSpacing: '-0.015em', marginBottom: '1rem',
          }}>Premium<br />Materials</h3>
          <div className="res-why-gold-line" />
          <p style={{
            fontFamily: sans, fontWeight: 300, fontSize: 14, color: muted,
            lineHeight: 1.9, maxWidth: 280, margin: 0,
          }}>
            Hand-picked finishes that elevate perception<br />
            and create lasting impressions<br />
            for everyone who enters.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <div className="res-why-block-hover" style={{
            ...fadeUp(v3, 130),
            padding: '2.5rem 2.75rem', background: surf,
            border: `1px solid ${bord}`, borderRadius: '2px 2px 0 0',
          }}>
            <p style={{
              fontFamily: serif, fontWeight: 400, fontSize: '1.35rem', color: ink,
              marginBottom: '0.6rem', lineHeight: 1.2, letterSpacing: '0.005em',
            }}>Workplace Experience</p>
            <p style={{
              fontFamily: sans, fontWeight: 300, fontSize: 13, color: muted, lineHeight: 1.85, margin: 0,
            }}>
              Spaces that energise teams, impress visitors,<br />
              and reflect the best of your company culture.
            </p>
          </div>
          <div className="res-why-block-hover" style={{
            ...fadeUp(v3, 260),
            padding: '2.5rem 2.75rem', background: surf,
            border: `1px solid ${bord}`, borderTop: 'none',
            borderRadius: '0 0 2px 2px',
          }}>
            <p style={{
              fontFamily: serif, fontWeight: 400, fontSize: '1.35rem', color: ink,
              marginBottom: '0.6rem', lineHeight: 1.2, letterSpacing: '0.005em',
            }}>End-to-End Execution</p>
            <p style={{
              fontFamily: sans, fontWeight: 300, fontSize: 13, color: muted, lineHeight: 1.85, margin: 0,
            }}>
              From concept to final handover —<br />
              every stage thoughtfully managed.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CommercialInteriors() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openLightbox  = useCallback((i: number) => setLightbox(i), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImg = useCallback(() => setLightbox(i => i !== null ? (i - 1 + gallery.length) % gallery.length : null), [])
  const nextImg = useCallback(() => setLightbox(i => i !== null ? (i + 1) % gallery.length : null), [])

  return (
    <div className="res-page" style={{ backgroundColor: '#F7F4EF' }}>
      <style>{`
        /* ══ BASE ══════════════════════════════════════════════════════ */
        .res-page { overflow-x: hidden; }

        /* ══ SECTION PADDING ══════════════════════════════════════════ */
        .res-section-pad {
          padding-top: 96px !important; padding-bottom: 96px !important;
          padding-left: 2rem !important; padding-right: 2rem !important;
        }
        @media (max-width: 1023px) {
          .res-section-pad {
            padding-top: 72px !important; padding-bottom: 72px !important;
            padding-left: 1.5rem !important; padding-right: 1.5rem !important;
          }
        }
        @media (max-width: 767px) {
          .res-section-pad {
            padding-top: 56px !important; padding-bottom: 56px !important;
            padding-left: 20px !important; padding-right: 20px !important;
          }
        }

        /* ══ HERO ═════════════════════════════════════════════════════ */
        .res-hero { height: 100vh; min-height: 560px; }
        @media (max-width: 767px) { .res-hero { height: 85vh; min-height: 460px; } }
        @media (max-width: 479px) { .res-scroll-hint { display: none !important; } }

        /* ══ INTRO IMAGE ══════════════════════════════════════════════ */
        .res-intro-img { border-radius: 16px; overflow: hidden; height: 480px; }
        @media (max-width: 1023px) { .res-intro-img { height: 360px; } }
        @media (max-width: 767px)  { .res-intro-img { height: 240px; } }

        /* ══ EXPERTISE CARDS ══════════════════════════════════════════ */
        .res-exp-card {
          transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1) !important;
        }
        .res-exp-card:hover {
          box-shadow: 0 10px 36px rgba(0,0,0,0.10) !important;
          transform: translateY(-4px) !important;
        }
        .res-exp-card:hover .res-exp-line { width: 100% !important; }
        @media (max-width: 639px) {
          .res-exp-card {
            flex-direction: row !important; align-items: center !important;
            padding: 1.25rem 1.25rem !important; gap: 1rem !important; min-height: 72px !important;
          }
        }

        /* ══ FEATURED CARDS ═══════════════════════════════════════════ */
        .res-feat-card {
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .res-feat-card:hover { box-shadow: 0 16px 52px rgba(0,0,0,0.14); transform: translateY(-6px); }
        .res-feat-img { transition: transform 0.65s cubic-bezier(0.16,1,0.3,1) !important; }
        .res-feat-card:hover .res-feat-img { transform: scale(1.06) !important; }
        .res-feat-img-wrap { overflow: hidden; border-radius: 14px 14px 0 0; height: 300px; }
        @media (max-width: 767px) { .res-feat-img-wrap { height: 220px; } }

        /* ══ GALLERY ══════════════════════════════════════════════════ */
        .res-gal-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease !important; }
        .res-gal-card:hover { transform: translateY(-6px) scale(1.01) !important; box-shadow: 0 14px 44px rgba(0,0,0,0.15) !important; }
        .res-gal-card:hover .res-gal-overlay { opacity: 1 !important; }
        .res-gal-card:hover .res-gal-info { opacity: 1 !important; transform: translateY(0) !important; }
        .res-gal-img { transition: transform 0.65s cubic-bezier(0.16,1,0.3,1) !important; }
        .res-gal-card:hover .res-gal-img { transform: scale(1.07) !important; }

        /* ══ TIMELINE — DESKTOP ═══════════════════════════════════════ */
        .res-tl-card {
          transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1) !important;
        }
        .res-tl-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.11), 0 3px 10px rgba(0,0,0,0.05) !important;
          transform: translateY(-4px) !important;
        }

        /* ══ TIMELINE — MOBILE ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .res-tl-diamonds { display: none !important; }
          .res-tl-line { left: 20px !important; transform: none !important; }
          .res-tl-row {
            justify-content: flex-start !important;
            padding-left: 48px !important; padding-right: 0 !important;
            position: relative !important;
          }
          .res-tl-row::before {
            content: ''; position: absolute; left: 15px; top: 26px;
            width: 10px; height: 10px; background: #C9A96E;
            transform: rotate(45deg);
            box-shadow: 0 0 0 3px #F7F4EF, 0 0 0 4.5px rgba(201,169,110,0.38);
            z-index: 3; flex-shrink: 0;
          }
          .res-tl-row > div { width: 100% !important; padding: 1.5rem 1.25rem 1.6rem !important; }
        }

        /* ══ RESPONSIVE GRIDS ═════════════════════════════════════════ */
        .res-exp-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .res-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .res-gal-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .res-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }

        @media (max-width: 1023px) {
          .res-exp-grid, .res-feat-grid, .res-gal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .res-intro-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 639px) {
          .res-exp-grid  { grid-template-columns: 1fr !important; gap: 14px !important; }
          .res-feat-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .res-gal-grid  { grid-template-columns: 1fr !important; gap: 16px !important; }
        }

        /* ══ CTA SECTION ══════════════════════════════════════════════ */
        .res-cta-section { padding: 110px 2rem 100px; }
        .res-cta-section::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 100%; height: 120px;
          background: linear-gradient(180deg, transparent, rgba(0,0,0,0.04));
          pointer-events: none;
        }
        @media (max-width: 1023px) { .res-cta-section { padding: 90px 32px !important; } }
        @media (max-width: 767px)  { .res-cta-section { padding: 72px 24px !important; } }

        .res-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 639px) {
          .res-cta-btns {
            flex-direction: column; align-items: stretch;
            width: 100%; max-width: 360px; margin: 0 auto;
          }
          .res-cta-btns a {
            min-height: 52px !important; justify-content: center !important;
            padding-left: 20px !important; padding-right: 20px !important;
          }
        }

        /* ══ WHY NIVORA — EDITORIAL LAYOUT ════════════════════════════ */
        .res-why-section { position: relative; }
        .res-why-section::before {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-size: 180px 180px; pointer-events: none; opacity: 1; z-index: 0;
        }
        .res-why-section > * { position: relative; z-index: 1; }
        .res-why-num {
          display: block; font-family: 'Inter', sans-serif;
          font-weight: 300; font-size: 10px; letter-spacing: 5px;
          text-transform: uppercase; color: #C8A56A; margin-bottom: 1.6rem;
        }
        .res-why-gold-line {
          width: 36px; height: 1px;
          background: linear-gradient(90deg, #C8A56A, transparent);
          margin: 1.25rem 0 1.6rem;
          transition: width 0.5s cubic-bezier(.22,1,.36,1);
        }
        .res-why-b1 > div:hover .res-why-gold-line { width: 72px; }
        .res-why-b1-h3 {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2.4rem, 4.5vw, 4rem); color: #262421;
          line-height: 1.06; letter-spacing: -0.02em; margin: 0;
        }
        .res-why-b1 {
          display: grid; grid-template-columns: 60fr 40fr;
          gap: 5rem; align-items: center; padding: 5rem 0; border-bottom: 1px solid #E7DED2;
        }
        .res-why-b2 { padding: 6.25rem 0; border-top: 1px solid #E7DED2; border-bottom: 1px solid #E7DED2; }
        .res-why-b2-inner { display: flex; align-items: center; }
        .res-why-vdivider {
          width: 1px; height: 120px; background: #E7DED2; flex-shrink: 0; margin: 0 5rem;
          transition: background 0.4s ease, height 0.4s cubic-bezier(.22,1,.36,1);
        }
        .res-why-b2:hover .res-why-vdivider { height: 160px; background: rgba(200,165,106,0.45); }
        .res-why-b3 {
          display: grid; grid-template-columns: 40fr 60fr;
          gap: 5rem; align-items: start; padding: 5rem 0;
        }
        .res-why-block-hover {
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.6s cubic-bezier(.22,1,.36,1) !important;
          cursor: default;
        }
        .res-why-block-hover:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 50px rgba(0,0,0,0.04) !important; }
        .res-why-heading {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2.625rem, 5.5vw, 5.5rem); color: #262421;
          line-height: 1.06; letter-spacing: -0.02em; margin: 0 0 1.5rem;
        }
        @media (max-width: 1023px) {
          .res-why-b1 { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 0 !important; }
          .res-why-b3 { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 0 !important; }
          .res-why-b2 { padding: 4rem 0 !important; }
          .res-why-b2-inner { flex-direction: column !important; align-items: flex-start !important; }
          .res-why-vdivider { width: 40px !important; height: 1px !important; margin: 2.5rem 0 !important; }
          .res-why-heading { font-size: clamp(2.5rem, 8vw, 4rem) !important; }
          .res-why-b1-h3 { font-size: clamp(2.2rem, 5vw, 3.2rem) !important; }
        }
        @media (max-width: 767px) {
          .res-why-b1, .res-why-b2, .res-why-b3 { padding: 4.5rem 0 !important; }
          .res-why-b1, .res-why-b3 { gap: 2rem !important; }
          .res-why-heading { font-size: 2.625rem !important; }
          .res-why-b1-h3 { font-size: 2.2rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .res-why-gold-line, .res-why-vdivider, .res-why-block-hover { transition: none !important; }
        }
      `}</style>

      {/* ── SECTION 1 · HERO ───────────────────────────────────────────────── */}
      <div className="res-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={heroImg}
          alt="Commercial Interiors"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(rgba(0,0,0,0.48), rgba(0,0,0,0.58))',
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
              fontFamily: "'Inter', sans-serif", fontWeight: 500,
              fontSize: 10, letterSpacing: '0.55em', textTransform: 'uppercase',
              color: '#D6B36A', marginBottom: '1.25rem',
              textShadow: '0 0 10px rgba(214,179,106,0.35)',
              background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)', padding: '6px 14px',
              borderRadius: 20, display: 'inline-block', position: 'relative', zIndex: 5,
            }}>Commercial Interiors</p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              color: '#f5f0e8', lineHeight: 1.06,
              marginBottom: '1.5rem', letterSpacing: '-0.01em',
            }}>
              Spaces Designed for<br />Productivity &amp; Impact
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
              Crafting commercial environments that inspire performance and leave lasting impressions
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link
                to="/quote"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: '#C8A56A', color: '#262421',
                  fontFamily: "'Inter', sans-serif", fontWeight: 500,
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '18px 48px', textDecoration: 'none',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#d9b87a'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C8A56A'; el.style.transform = 'translateY(0)' }}
              >
                Start Your Project <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="res-scroll-hint"
            style={{ position: 'absolute', bottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)' }}>Scroll</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)' }} />
          </motion.div>
        </div>
      </div>

      {/* ── SECTION 2 · INTRODUCTION ─────────────────────────────────────── */}
      <section className="res-section-pad" style={{ backgroundColor: '#F7F4EF' }}>
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
                }}>Spaces Designed for<br />Productivity &amp; Impact</h2>
                <div style={{ width: 36, height: 1, background: '#C9A96E', marginBottom: '1.6rem', opacity: 0.7 }} />
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 300,
                  fontSize: 15, color: 'rgba(28,40,24,0.58)', lineHeight: 1.9,
                }}>
                  A well-designed workspace inspires creativity, improves efficiency, and leaves a lasting impression on clients and visitors. From corporate offices and co-working spaces to retail stores, clinics, and fitness studios, we create environments that balance functionality, comfort, and brand identity.
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
                    paddingBottom: 2, transition: 'color 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#a8833e'; el.style.borderColor = '#a8833e' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#C9A96E'; el.style.borderColor = 'rgba(201,169,110,0.35)' }}
                >
                  Start Your Project <ArrowRight size={11} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.15}>
              <div className="res-intro-img">
                <img
                  src={introImg}
                  alt="Commercial Interior"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 · OUR EXPERTISE ────────────────────────────────────── */}
      <section className="res-section-pad" style={{ backgroundColor: '#F0EDE6' }}>
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
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)', color: '#1C2818', lineHeight: 1.1,
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

      {/* ── SECTION 4 · HOW WE DO IT ─────────────────────────────────────── */}
      <section className="res-section-pad" style={{ backgroundColor: '#F7F4EF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
                Our structured design process ensures every commercial project is delivered on time, on brand, and to the highest standard.
              </p>
            </div>
          </FadeIn>
          <div style={{ position: 'relative' }}>
            <div className="res-tl-line" style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%',
              transform: 'translateX(-50%)', width: 1,
              background: 'linear-gradient(to bottom, transparent, rgba(42,57,38,0.25) 8%, rgba(42,57,38,0.25) 92%, transparent)',
              zIndex: 0,
            }} />
            <div className="res-tl-diamonds" style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%',
              transform: 'translateX(-50%)', zIndex: 2,
              display: 'flex', flexDirection: 'column', pointerEvents: 'none',
            }}>
              {processSteps.map((_, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: 10, height: 10, background: '#C9A96E',
                    transform: 'rotate(45deg)', flexShrink: 0,
                    boxShadow: '0 0 0 3px #F7F4EF, 0 0 0 4px rgba(201,169,110,0.35)',
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
              {processSteps.map((step, i) => (
                <TimelineCard key={step.num} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 · FEATURED COMMERCIAL PROJECTS ─────────────────────── */}
      <section className="res-section-pad" style={{ backgroundColor: '#F7F4EF' }}>
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
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)', color: '#1C2818', lineHeight: 1.1,
              }}>Featured Commercial Projects</h2>
            </div>
          </FadeIn>
          <div className="res-feat-grid">
            {featured.map((f, i) => (
              <FeaturedCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 · COMMERCIAL PORTFOLIO GALLERY ─────────────────────── */}
      <section className="res-section-pad" style={{ backgroundColor: '#EAE7E0' }}>
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
              }}>Commercial Gallery</h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 13, color: 'rgba(28,40,24,0.45)', lineHeight: 1.75, maxWidth: 480,
              }}>
                Click any image to view it in full. More commercial projects will be added as our portfolio grows.
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

      {/* ── SECTION 7 · WHY CHOOSE NIVORA ────────────────────────────────── */}
      <section className="res-section-pad res-why-section" style={{ backgroundColor: '#F7F4EF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ maxWidth: 680, marginBottom: '4rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '5px', textTransform: 'uppercase',
                color: '#C8A56A', marginBottom: '1.5rem',
              }}>Why Nivora</p>
              <h2 className="res-why-heading">
                Spaces Designed<br />To Perform
              </h2>
              <div style={{
                width: 48, height: 1,
                background: 'linear-gradient(90deg, #C8A56A, transparent)',
                marginBottom: '1.75rem',
              }} />
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 15, color: '#7A756E', lineHeight: 1.85, maxWidth: 520, margin: 0,
              }}>
                Commercial spaces that strengthen your brand, elevate the experience, and deliver measurable results.
              </p>
            </div>
          </FadeIn>
          <WhyCommercialSection />
        </div>
      </section>

      {/* ── SECTION 8 · CTA ──────────────────────────────────────────────── */}
      <section className="res-cta-section" style={{ backgroundColor: '#132818', textAlign: 'center', position: 'relative' }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 10, letterSpacing: '5px', textTransform: 'uppercase',
            color: '#C8A56A', marginBottom: '1.5rem',
          }}>Let's Begin</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: 'clamp(2.625rem, 6vw, 5.375rem)', color: '#F7F4EF',
            fontStyle: 'italic', lineHeight: 0.95, marginBottom: '1.5rem',
          }}>
            Let's Design Your<br />Commercial Space
          </h2>
          <div style={{ width: 44, height: 1, background: 'linear-gradient(90deg, transparent, #C8A56A, transparent)', margin: '0 auto 1.75rem' }} />
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 14, color: 'rgba(247,244,239,0.70)',
            lineHeight: 1.85, maxWidth: 560, margin: '0 auto 2.75rem',
          }}>
            Create inspiring commercial environments that strengthen your brand, improve productivity, and leave lasting impressions.
          </p>
          <div className="res-cta-btns">
            <Link
              to="/quote"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                backgroundColor: '#C8A56A', color: '#262421',
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
                fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '18px 48px', textDecoration: 'none',
                transition: 'background 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#d9b87a'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C8A56A'; el.style.transform = 'translateY(0)' }}
            >
              Start Your Project <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
            <Link
              to="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                border: '1px solid rgba(200,165,106,0.35)',
                background: 'transparent', color: '#F7F4EF',
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '18px 36px', textDecoration: 'none',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#C8A56A'; el.style.color = '#C8A56A' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,165,106,0.35)'; el.style.color = '#F7F4EF' }}
            >
              All Services
            </Link>
          </div>
        </FadeIn>
      </section>

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
