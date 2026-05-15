import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PHOTO_1 = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85'
const PHOTO_2 = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=85'

const IconDiscover = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.5" cy="8.5" r="5.5" stroke="#C9A96E" strokeWidth="1.1"/>
    <line x1="12.9" y1="12.9" x2="17" y2="17" stroke="#C9A96E" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="8.5" y1="5.5" x2="8.5" y2="11.5" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
    <line x1="5.5" y1="8.5" x2="11.5" y2="8.5" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
  </svg>
)

const IconVisualise = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10C2 10 5.5 4.5 10 4.5S18 10 18 10s-3.5 5.5-8 5.5S2 10 2 10z" stroke="#C9A96E" strokeWidth="1.1" strokeLinejoin="round"/>
    <circle cx="10" cy="10" r="2.2" stroke="#C9A96E" strokeWidth="1"/>
  </svg>
)

const IconExecute = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 2.5a4.5 4.5 0 0 1 1.2 7.2L6.2 18.2a1.8 1.8 0 0 1-2.5-2.5l8.5-8.5A4.5 4.5 0 0 1 13.5 2.5z" stroke="#C9A96E" strokeWidth="1.1" strokeLinejoin="round"/>
    <line x1="11" y1="5" x2="15" y2="9" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round"/>
  </svg>
)

const IconReveal = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2L11.8 8.2L18 10L11.8 11.8L10 18L8.2 11.8L2 10L8.2 8.2Z" stroke="#C9A96E" strokeWidth="1.1" strokeLinejoin="round"/>
  </svg>
)

const IconHandover = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.5" cy="7.5" r="4" stroke="#C9A96E" strokeWidth="1.1"/>
    <line x1="10.4" y1="10.4" x2="18" y2="18" stroke="#C9A96E" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="14" y1="14" x2="16.5" y2="11.5" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round"/>
    <line x1="16" y1="16" x2="18" y2="13.5" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round"/>
  </svg>
)

const GRID_STEPS = [
  {
    num: '01',
    icon: <IconDiscover />,
    title: 'Discover',
    text: 'A free consultation to understand your lifestyle and budget.',
  },
  {
    num: '02',
    icon: <IconVisualise />,
    title: 'Visualise',
    text: '3D renders and mood boards before a single thing is moved.',
  },
  {
    num: '03',
    icon: <IconExecute />,
    title: 'Execute',
    text: 'Master craftsmen, clear timelines, on-site precision.',
  },
  {
    num: '04',
    icon: <IconReveal />,
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
                style={{ position: 'relative' }}
              >
                {/* Faint editorial step number */}
                <span style={{
                  position: 'absolute',
                  top: -10,
                  right: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 72,
                  lineHeight: 1,
                  color: '#2E4A30',
                  opacity: 0.06,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 0,
                }}>
                  {step.num}
                </span>
                <div style={{ position: 'relative', zIndex: 1 }}>
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
                </div>
              </motion.div>
            ))}
          </div>

          {/* Handover — full-width premium step */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.57 }}
            style={{
              paddingTop: 24,
              marginBottom: 28,
              position: 'relative',
            }}
          >
            {/* Full-width gold rule */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: 'rgba(201,169,110,0.3)',
            }} />
            {/* Step 05 background number */}
            <span style={{
              position: 'absolute',
              top: 4,
              right: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 72,
              lineHeight: 1,
              color: '#2E4A30',
              opacity: 0.06,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}>
              05
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 14, position: 'relative', zIndex: 1 }}>
              <IconHandover />
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
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                background: '#2E4A30',
                color: '#ffffff',
                padding: '16px 36px',
                border: 'none',
                borderRadius: 1,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                width: 'auto',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#3a5e3c'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#2E4A30'
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
