import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Eye, Wrench, Sparkles, Key } from 'lucide-react'

const PHOTO_1 = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85'
const PHOTO_2 = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=85'

const GRID_STEPS = [
  {
    icon: <Compass size={20} strokeWidth={1.5} color="#a18661" />,
    title: 'Discover',
    text: 'A free consultation to understand your lifestyle and budget.',
  },
  {
    icon: <Eye size={20} strokeWidth={1.5} color="#a18661" />,
    title: 'Visualise',
    text: '3D renders and mood boards before a single thing is moved.',
  },
  {
    icon: <Wrench size={20} strokeWidth={1.5} color="#a18661" />,
    title: 'Execute',
    text: 'Master craftsmen, clear timelines, on-site precision.',
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.5} color="#a18661" />,
    title: 'Reveal',
    text: 'A styled, ready-to-move-in space that exceeds expectations.',
  },
]

export default function ProcessSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      style={{ background: '#F5F2ED', width: '100%', padding: '100px 0' }}
    >
      {/* Inner container */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 60px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 80,
        }}
        className="ps-container"
      >
        {/* ── LEFT: Photo Collage — 45% ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ flex: '0 0 45%', position: 'relative', height: 500 }}
          className="ps-left"
        >
          {/* Photo 1 — top-left, dominant */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '65%',
              height: '72%',
              border: '1.5px solid #a18661',
              overflow: 'hidden',
            }}
            className="ps-photo1"
          >
            <img
              src={PHOTO_1}
              alt="NIVORA interior"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
              onError={e => {
                e.currentTarget.style.display = 'none'
                if (e.currentTarget.parentElement)
                  e.currentTarget.parentElement.style.background =
                    'linear-gradient(145deg, #c8b99a 0%, #a18661 100%)'
              }}
            />
          </div>

          {/* Photo 2 — bottom-right, peeks behind */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '58%',
              height: '62%',
              border: '1.5px solid #a18661',
              overflow: 'hidden',
              boxShadow: '-8px 8px 30px rgba(0,0,0,0.12)',
            }}
            className="ps-photo2"
          >
            <img
              src={PHOTO_2}
              alt="NIVORA workspace"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
              onError={e => {
                e.currentTarget.style.display = 'none'
                if (e.currentTarget.parentElement)
                  e.currentTarget.parentElement.style.background =
                    'linear-gradient(145deg, #3b4a35 0%, #3b4a35 100%)'
              }}
            />
          </div>
        </motion.div>

        {/* ── RIGHT: Content — 55% ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          style={{
            flex: '0 0 55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="ps-right"
        >
          {/* Eyebrow */}
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 11,
            letterSpacing: '0.4em',
            color: '#a18661',
            textTransform: 'uppercase',
            margin: '0 0 14px',
          }}>
            HOW WE WORK
          </p>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: 58,
            lineHeight: 1.05,
            color: '#3b4a35',
            margin: '0 0 10px',
          }}
            className="ps-heading"
          >
            Our Process
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 16,
            color: '#6D5A41',
            lineHeight: 1.7,
            margin: '0 0 40px',
          }}>
            From first conversation to final reveal — a seamless, end-to-end journey.
          </p>

          {/* 2×2 Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 40,
            rowGap: 28,
            marginBottom: 28,
          }}>
            {GRID_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
              >
                <div style={{ display: 'block', marginBottom: 10 }}>{step.icon}</div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: 28,
                  color: '#3b4a35',
                  margin: '0 0 8px',
                  lineHeight: 1.1,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 14,
                  color: '#6D5A41',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Handover — full-width row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.57 }}
            style={{
              borderTop: '1px solid rgba(161,134,97,0.3)',
              paddingTop: 24,
              marginBottom: 28,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 14,
            }}
          >
            <Key
              size={20}
              strokeWidth={1.5}
              color="#a18661"
              style={{ flexShrink: 0, marginTop: 6 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 28,
                color: '#3b4a35',
                margin: 0,
                lineHeight: 1.1,
              }}>
                Handover
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: '#6D5A41',
                lineHeight: 1.7,
                margin: 0,
              }}>
                Your space, fully ready. A relationship that continues beyond delivery.
              </p>
            </div>
          </motion.div>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            letterSpacing: '0.35em',
            color: '#6D5A41',
            textTransform: 'uppercase',
            margin: '0 0 18px',
          }}>
            END-TO-END &nbsp;·&nbsp; TRANSPARENT &nbsp;·&nbsp; HASSLE-FREE
          </p>

          {/* CTA Button */}
          <div>
            <Link
              to="/quote"
              className="ps-btn"
              style={{
                display: 'inline-block',
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                background: '#3b4a35',
                color: '#F5F2ED',
                padding: '16px 36px',
                border: 'none',
                borderRadius: 1,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
                width: 'auto',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#a18661'
                e.currentTarget.style.color = '#3b4a35'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#3b4a35'
                e.currentTarget.style.color = '#F5F2ED'
              }}
            >
              BOOK FREE CONSULTATION
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .ps-container {
            flex-direction: column !important;
            padding: 0 24px !important;
            gap: 0 !important;
          }
          .ps-left {
            flex: 0 0 auto !important;
            width: 100% !important;
            height: 320px !important;
          }
          .ps-photo1 {
            width: 60% !important;
            height: 100% !important;
          }
          .ps-photo2 {
            width: 50% !important;
            height: 80% !important;
          }
          .ps-right {
            flex: 0 0 auto !important;
            width: 100% !important;
            padding-top: 40px;
          }
          .ps-heading {
            font-size: 44px !important;
          }
          .ps-btn {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </motion.section>
  )
}
