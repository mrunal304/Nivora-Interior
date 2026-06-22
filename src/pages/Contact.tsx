import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Gift, Clock } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

function ScrollReveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, amount: 0.15 }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function AnimatedInput({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  const [focused, setFocused] = useState(false)
  return (
    <div onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <label className="form-label">
        {label} {required && <span style={{ color: '#C9A96E' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        {children}
        <motion.div
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1.5,
            background: '#C9A96E',
            transformOrigin: 'center',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}

function IconRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={hovered ? { rotate: [0, -8, 8, -4, 4, 0] } : { rotate: 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          width: 36,
          height: 36,
          border: '1px solid rgba(201,169,110,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderRadius: 2,
        }}
      >
        {icon}
      </motion.div>
      <div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', margin: '0 0 4px' }}>{label}</p>
        {children}
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    spaceType: '',
    referral: '',
    description: '',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  return (
    <div>
      <style>{`
        .contact-page { background-color: #F5F0E8; }
        .contact-form-card {
          background-color: #FFFFFF;
          border: 1px solid #E8E0D0;
          border-radius: 4px;
          padding: 40px;
        }
        .contact-info-card {
          background-color: #FFFFFF;
          border: 1px solid #E8E0D0;
          border-radius: 4px;
        }
        .form-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #888880;
          text-transform: uppercase;
          font-weight: 400;
          margin-bottom: 8px;
        }
        .form-input, .form-select {
          border: none;
          border-bottom: 1px solid #C8C0B0;
          border-radius: 0;
          background: transparent;
          padding: 8px 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #2C2C2A;
          width: 100%;
          outline: none;
          transition: border-bottom-color 0.28s ease;
          appearance: none;
          -webkit-appearance: none;
        }
        .form-input:focus, .form-select:focus {
          border-bottom-color: #C9A96E;
        }
        .form-input::placeholder { color: #AAAAAA; }
        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23AAAAAA' stroke-width='1.2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 2px center;
          padding-right: 20px;
        }
        .form-select option[value=''] { color: #AAAAAA; }
        .form-textarea {
          border: 1px solid #C8C0B0;
          border-radius: 2px;
          padding: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #2C2C2A;
          width: 100%;
          min-height: 120px;
          outline: none;
          background: transparent;
          resize: vertical;
          transition: border-color 0.28s ease;
        }
        .form-textarea:focus { border-color: #C9A96E; }
        .form-textarea::placeholder { color: #AAAAAA; }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px 40px;
        }
        .form-field-full { grid-column: 1 / -1; }
        @media (max-width: 768px) {
          .contact-two-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-field-full { grid-column: 1; }
          .contact-form-card { padding: 24px; }
        }
        @keyframes waPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.35); }
          60%  { box-shadow: 0 0 0 7px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        .contact-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1.5px solid #25D366;
          color: #25D366;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 11px 20px;
          text-decoration: none;
          transition: background 0.25s ease, color 0.25s ease;
          border-radius: 2px;
          animation: waPulse 2.6s ease-out infinite;
        }
        .contact-wa-btn:hover {
          background: #25D366;
          color: #fff;
        }
      `}</style>

      {/* ── SECTION 1: Form + Sidebar ── */}
      <section className="contact-page" style={{ padding: '80px 24px 96px' }}>
        <div
          className="contact-two-col"
          style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}
        >

          {/* LEFT — Form card */}
          <ScrollReveal delay={0}>
            <div className="contact-form-card">
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888880', marginBottom: 32 }}>
                Send Us a Message
              </p>

              <form
                onSubmit={e => { e.preventDefault(); window.location.href = '/thank-you' }}
                style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
              >
                <div className="form-grid" style={{ marginBottom: 40 }}>

                  <AnimatedInput label="Full Name" required>
                    <input className="form-input" type="text" required placeholder="Jane Doe" value={form.fullName} onChange={set('fullName')} />
                  </AnimatedInput>

                  <AnimatedInput label="Phone Number" required>
                    <input className="form-input" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                  </AnimatedInput>

                  <AnimatedInput label="Email Address" required>
                    <input className="form-input" type="email" required placeholder="jane@example.com" value={form.email} onChange={set('email')} />
                  </AnimatedInput>

                  <AnimatedInput label="City" required>
                    <input className="form-input" type="text" required placeholder="Mumbai" value={form.city} onChange={set('city')} />
                  </AnimatedInput>

                  <AnimatedInput label="Type of Space" required>
                    <select className="form-select" required value={form.spaceType} onChange={set('spaceType')} style={{ color: form.spaceType === '' ? '#AAAAAA' : '#2C2C2A' }}>
                      <option value="" disabled>Select a space type</option>
                      <option value="Residential — Apartment">Residential — Apartment</option>
                      <option value="Residential — Villa / Bungalow">Residential — Villa / Bungalow</option>
                      <option value="Residential — Penthouse">Residential — Penthouse</option>
                      <option value="Commercial — Office">Commercial — Office</option>
                      <option value="Commercial — Retail Store">Commercial — Retail Store</option>
                      <option value="Commercial — Restaurant / Café">Commercial — Restaurant / Café</option>
                      <option value="Commercial — Hospitality">Commercial — Hospitality</option>
                      <option value="Other">Other</option>
                    </select>
                  </AnimatedInput>

                  <AnimatedInput label="How Did You Hear About Us?" required>
                    <select className="form-select" required value={form.referral} onChange={set('referral')} style={{ color: form.referral === '' ? '#AAAAAA' : '#2C2C2A' }}>
                      <option value="" disabled>Select an option</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Word of Mouth / Referral">Word of Mouth / Referral</option>
                      <option value="Houzz">Houzz</option>
                      <option value="Pinterest">Pinterest</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="A Previous Client">A Previous Client</option>
                      <option value="Other">Other</option>
                    </select>
                  </AnimatedInput>

                  <div className="form-field-full">
                    <label className="form-label">Project Description</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell us about your project, style preferences, timeline..."
                      value={form.description}
                      onChange={set('description')}
                    />
                  </div>

                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(45,59,45,0.22)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    background: '#2D3B2D',
                    color: '#C9A96E',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 13,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    padding: '18px 24px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    borderRadius: 2,
                  }}
                >
                  Send Message <ArrowRight size={14} />
                </motion.button>
              </form>
            </div>
          </ScrollReveal>

          {/* RIGHT — Info card */}
          <ScrollReveal delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              <div className="contact-info-card" style={{ padding: '36px 32px' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 26, color: '#21291a', margin: '0 0 4px' }}>
                  Nivora Interiors
                </h2>
                <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 14, color: '#C9A96E', margin: '0 0 32px' }}>
                  From Vision to Execution
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  <IconRow icon={<MapPin size={13} style={{ color: '#C9A96E' }} />} label="Location">
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', margin: 0, lineHeight: 1.5 }}>
                      Ambernath,<br />Maharashtra 421505
                    </p>
                  </IconRow>

                  <IconRow icon={<Phone size={13} style={{ color: '#C9A96E' }} />} label="Phone">
                    <a href="tel:+917276687805" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', textDecoration: 'none' }}>
                      +91 72766 87805
                    </a>
                  </IconRow>

                  <IconRow icon={<Mail size={13} style={{ color: '#C9A96E' }} />} label="Email">
                    <a href="mailto:hello@nivorainteriors.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', textDecoration: 'none' }}>
                      hello@nivorainteriors.com
                    </a>
                  </IconRow>

                </div>

                {/* WhatsApp CTA */}
                <div style={{ borderTop: '1px solid #E8E0D0', marginTop: 28, paddingTop: 28 }}>
                  <a
                    href="https://wa.me/917276687805?text=Hello%2C%20I%20am%20interested%20in%20your%20interior%20design%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-wa-btn"
                  >
                    <MessageCircle size={13} />
                    Chat on WhatsApp <ArrowRight size={11} />
                  </a>
                </div>

                {/* Studio Hours */}
                <div style={{ borderTop: '1px solid #E8E0D0', marginTop: 28, paddingTop: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 36, height: 36, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
                      <Clock size={13} style={{ color: '#C9A96E' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', margin: '0 0 8px' }}>
                        Studio Hours
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', margin: '0 0 4px', lineHeight: 1.6 }}>
                        Monday – Saturday: 10:00 AM – 7:00 PM
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', margin: 0, lineHeight: 1.6 }}>
                        Sunday: By appointment only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Privacy quote */}
                <div style={{
                  marginTop: 24,
                  border: '1px solid #E0D8C8',
                  borderRadius: 3,
                  padding: '12px 16px',
                  background: 'rgba(245,240,232,0.6)',
                }}>
                  <p style={{
                    fontFamily: "'Lora', serif",
                    fontStyle: 'italic',
                    fontSize: 12.5,
                    color: '#888880',
                    margin: 0,
                    lineHeight: 1.65,
                    textAlign: 'center',
                  }}>
                    "We respect your privacy. No spam, just great design."
                  </p>
                </div>

              </div>

              {/* Free consultation card */}
              <div className="contact-info-card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 36, height: 36, background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Gift size={14} style={{ color: '#C9A96E' }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600, color: '#21291a', letterSpacing: '0.04em', margin: '0 0 4px' }}>
                    Free Initial Consultation
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#888880', margin: 0, lineHeight: 1.5 }}>
                    No charges for the first meeting
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── SECTION 2: "Ready to Begin?" CTA banner ── */}
      <ScrollReveal>
        <div style={{ background: '#2D3B2D' }}>
          <section style={{ padding: '80px 24px 80px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#b8966a', marginBottom: 16 }}>
              Reach Out
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#f5f0e8', margin: '0 0 12px', lineHeight: 1.1 }}>
              Ready to Begin?
            </h1>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 17, color: '#C9A96E', margin: '0 0 20px' }}>
              Not sure where to start?
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(245,240,232,0.5)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>
              Every great project begins with a conversation. Fill in the form above and we'll get back to you within 24 hours.
            </p>
          </section>
        </div>
      </ScrollReveal>

    </div>
  )
}
