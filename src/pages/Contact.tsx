import { useState } from 'react'
import FadeIn from '../components/FadeIn'
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Gift } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    spaceType: '',
    budget: '',
    referral: '',
    callbackTime: '',
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
          transition: border-bottom-color 0.25s ease;
          appearance: none;
          -webkit-appearance: none;
        }
        .form-input:focus, .form-select:focus {
          border-bottom-color: #C9A96E;
        }
        .form-input::placeholder {
          color: #AAAAAA;
        }
        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23AAAAAA' stroke-width='1.2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 2px center;
          padding-right: 20px;
        }
        .form-select option[value=''] {
          color: #AAAAAA;
        }
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
          transition: border-color 0.25s ease;
        }
        .form-textarea:focus {
          border-color: #C9A96E;
        }
        .form-textarea::placeholder {
          color: #AAAAAA;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px 40px;
        }
        .form-field-full {
          grid-column: 1 / -1;
        }
        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-field-full {
            grid-column: 1;
          }
          .contact-form-card {
            padding: 24px;
          }
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
        }
        .contact-wa-btn:hover {
          background: #25D366;
          color: #fff;
        }
      `}</style>

      {/* CTA Banner — dark green, untouched */}
      <div style={{ background: '#2D3B2D', paddingTop: 80 }}>
        <section style={{ padding: '80px 24px 80px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <FadeIn>
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
              Every great project begins with a conversation. Fill in the form below and we'll get back to you within 24 hours.
            </p>
          </FadeIn>
        </section>
      </div>

      {/* Form + Info section — cream palette */}
      <section className="contact-page" style={{ padding: '72px 24px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>

          {/* LEFT — Form card */}
          <FadeIn>
            <div className="contact-form-card">
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888880', marginBottom: 32 }}>
                Send us a message
              </p>

              <form
                onSubmit={e => { e.preventDefault(); window.location.href = '/thank-you' }}
                style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
              >
                <div className="form-grid" style={{ marginBottom: 40 }}>

                  {/* Row 1 */}
                  <div>
                    <label className="form-label">Full Name <span style={{ color: '#C9A96E' }}>*</span></label>
                    <input className="form-input" type="text" required placeholder="Jane Doe" value={form.fullName} onChange={set('fullName')} />
                  </div>
                  <div>
                    <label className="form-label">Phone Number <span style={{ color: '#C9A96E' }}>*</span></label>
                    <input className="form-input" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label className="form-label">Email Address <span style={{ color: '#C9A96E' }}>*</span></label>
                    <input className="form-input" type="email" required placeholder="jane@example.com" value={form.email} onChange={set('email')} />
                  </div>
                  <div>
                    <label className="form-label">City <span style={{ color: '#C9A96E' }}>*</span></label>
                    <input className="form-input" type="text" required placeholder="Mumbai" value={form.city} onChange={set('city')} />
                  </div>

                  {/* Row 3 */}
                  <div>
                    <label className="form-label">Type of Space <span style={{ color: '#C9A96E' }}>*</span></label>
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
                  </div>
                  <div>
                    <label className="form-label">Budget Range <span style={{ color: '#C9A96E' }}>*</span></label>
                    <select className="form-select" required value={form.budget} onChange={set('budget')} style={{ color: form.budget === '' ? '#AAAAAA' : '#2C2C2A' }}>
                      <option value="" disabled>Select your budget</option>
                      <option value="Under ₹10 Lakhs">Under ₹10 Lakhs</option>
                      <option value="₹10 – ₹25 Lakhs">₹10 – ₹25 Lakhs</option>
                      <option value="₹25 – ₹50 Lakhs">₹25 – ₹50 Lakhs</option>
                      <option value="₹50 Lakhs – ₹1 Crore">₹50 Lakhs – ₹1 Crore</option>
                      <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  {/* Row 4 */}
                  <div>
                    <label className="form-label">How Did You Hear About Us? <span style={{ color: '#C9A96E' }}>*</span></label>
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
                  </div>
                  <div>
                    <label className="form-label">Preferred Callback Time <span style={{ color: '#C9A96E' }}>*</span></label>
                    <select className="form-select" required value={form.callbackTime} onChange={set('callbackTime')} style={{ color: form.callbackTime === '' ? '#AAAAAA' : '#2C2C2A' }}>
                      <option value="" disabled>Select a time</option>
                      <option value="Morning (9 AM – 12 PM)">Morning (9 AM – 12 PM)</option>
                      <option value="Afternoon (12 PM – 3 PM)">Afternoon (12 PM – 3 PM)</option>
                      <option value="Evening (3 PM – 6 PM)">Evening (3 PM – 6 PM)</option>
                      <option value="Late Evening (6 PM – 8 PM)">Late Evening (6 PM – 8 PM)</option>
                      <option value="Anytime">Anytime</option>
                    </select>
                  </div>

                  {/* Row 5 — full width */}
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

                <button
                  type="submit"
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
                    transition: 'background 0.25s ease',
                    borderRadius: 2,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#3d4f3d')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#2D3B2D')}
                >
                  Send Enquiry <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </FadeIn>

          {/* RIGHT — Info card */}
          <FadeIn delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Main contact card */}
              <div className="contact-info-card" style={{ padding: '36px 32px' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 26, color: '#21291a', margin: '0 0 4px' }}>
                  Nivora Interiors
                </h2>
                <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 14, color: '#C9A96E', margin: '0 0 32px' }}>
                  From Vision to Execution
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 36, height: 36, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
                      <Phone size={13} style={{ color: '#C9A96E' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', margin: '0 0 4px' }}>Phone</p>
                      <a href="tel:+917276687805" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', textDecoration: 'none' }}>
                        +91 72766 87805
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 36, height: 36, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
                      <Mail size={13} style={{ color: '#C9A96E' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', margin: '0 0 4px' }}>Email</p>
                      <a href="mailto:hello@nivorainteriors.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', textDecoration: 'none' }}>
                        hello@nivorainteriors.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 36, height: 36, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
                      <MapPin size={13} style={{ color: '#C9A96E' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', margin: '0 0 4px' }}>Location</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C2C2A', margin: 0, lineHeight: 1.5 }}>
                        Suite 405, The Design Hub,<br />Bandra West, Mumbai 400050
                      </p>
                    </div>
                  </div>

                </div>

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
          </FadeIn>

        </div>
      </section>
    </div>
  )
}
