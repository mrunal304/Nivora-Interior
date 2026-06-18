import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(42,57,38,0.2)',
  outline: 'none',
  padding: '12px 0',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 300,
  fontSize: 14,
  color: '#1C2818',
  transition: 'border-color 0.25s ease',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  fontSize: 9,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'rgba(28,40,24,0.45)',
  marginBottom: 4,
}

const errorStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 300,
  fontSize: 11,
  color: '#b5533c',
  marginTop: 5,
  letterSpacing: '0.02em',
}

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}
function Field({ label, required, error, children }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: '#C9A96E', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}

interface FocusInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}
function FocusInput({ hasError, style, ...props }: FocusInputProps) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      style={{
        ...inputBase,
        borderBottomColor: hasError
          ? '#b5533c'
          : focused
          ? '#C9A96E'
          : 'rgba(42,57,38,0.2)',
        ...style,
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e) }}
      onBlur={e => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

interface FocusSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
}
function FocusSelect({ hasError, style, children, ...props }: FocusSelectProps) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      {...props}
      style={{
        ...inputBase,
        borderBottomColor: hasError
          ? '#b5533c'
          : focused
          ? '#C9A96E'
          : 'rgba(42,57,38,0.2)',
        appearance: 'none',
        WebkitAppearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A96E' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 4px center',
        cursor: 'pointer',
        ...style,
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e) }}
      onBlur={e => { setFocused(false); props.onBlur?.(e) }}
    >
      {children}
    </select>
  )
}

interface FocusTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}
function FocusTextarea({ hasError, style, ...props }: FocusTextareaProps) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      style={{
        ...inputBase,
        borderBottom: `1px solid ${hasError ? '#b5533c' : focused ? '#C9A96E' : 'rgba(42,57,38,0.2)'}`,
        resize: 'vertical',
        minHeight: 90,
        lineHeight: 1.7,
        borderRadius: '0 0 4px 4px',
        ...style,
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e) }}
      onBlur={e => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

interface FormData {
  fullName: string
  email: string
  spaceType: string
  hearAbout: string
  description: string
  phone: string
  city: string
  budget: string
  callbackTime: string
}

interface FormErrors {
  fullName?: string
  email?: string
  spaceType?: string
  phone?: string
  city?: string
  budget?: string
  callbackTime?: string
}

export default function ResidentialEnquiry() {
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', spaceType: '', hearAbout: '',
    description: '', phone: '', city: '', budget: '', callbackTime: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name'
    if (!form.email.trim()) e.email = 'Please enter your email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address'
    if (!form.spaceType) e.spaceType = 'Please select a space type'
    if (!form.phone.trim()) e.phone = 'Please enter your phone number'
    else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(form.phone.trim())) e.phone = 'Please enter a valid phone number'
    if (!form.city.trim()) e.city = 'Please enter your city'
    if (!form.budget) e.budget = 'Please select a budget range'
    if (!form.callbackTime) e.callbackTime = 'Please select a preferred callback time'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ backgroundColor: '#F6F3EE', minHeight: '100vh' }}
    >
      {/* ── HEADER ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 120, paddingBottom: 72, textAlign: 'center', padding: '120px 1.5rem 72px' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase',
            color: '#9B7D4E', marginBottom: '1.1rem',
          }}>Residential Interiors</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', color: '#1C2818',
            lineHeight: 1.1, marginBottom: '1.25rem',
          }}>Let's Start Your Project</h1>
          <div style={{
            width: 44, height: 1,
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            margin: '0 auto 1.5rem',
          }} />
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 15, color: 'rgba(28,40,24,0.52)',
            lineHeight: 1.85, maxWidth: 480, margin: '0 auto',
          }}>
            Tell us about your vision and we'll help transform it into a beautifully designed space.
          </p>
        </motion.div>
      </section>

      {/* ── FORM / SUCCESS ──────────────────────────────────── */}
      <section style={{ padding: '0 1.5rem 100px' }}>
        <div ref={formRef} style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── SUCCESS CARD ─────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: 'clamp(2.5rem, 6vw, 5rem) clamp(2rem, 8vw, 6rem)',
                  textAlign: 'center',
                  boxShadow: '0 8px 48px rgba(28,40,24,0.07)',
                  border: '1px solid rgba(201,169,110,0.18)',
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(201,169,110,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.75rem',
                }}>
                  <CheckCircle size={28} color="#C9A96E" strokeWidth={1.5} />
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#1C2818',
                  lineHeight: 1.2, marginBottom: '1rem',
                }}>Enquiry Received</h2>
                <div style={{
                  width: 36, height: 1,
                  background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                  margin: '0 auto 1.5rem',
                }} />
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 300,
                  fontSize: 15, color: 'rgba(28,40,24,0.55)',
                  lineHeight: 1.9, maxWidth: 480, margin: '0 auto',
                }}>
                  Thank you. We've received your enquiry and our design team will connect with you shortly.
                </p>
              </motion.div>
            ) : (
              /* ── FORM ─────────────────────────────────────── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                noValidate
              >
                <div style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 4rem)',
                  boxShadow: '0 4px 36px rgba(28,40,24,0.06)',
                  border: '1px solid rgba(42,57,38,0.07)',
                }}>

                  {/* 2-column grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.75rem 3.5rem',
                  }}>

                    {/* ── LEFT COLUMN ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                      <Field label="Full Name" required error={errors.fullName}>
                        <FocusInput
                          type="text"
                          value={form.fullName}
                          onChange={e => set('fullName', e.target.value)}
                          placeholder="Your full name"
                          hasError={!!errors.fullName}
                        />
                      </Field>

                      <Field label="Email Address" required error={errors.email}>
                        <FocusInput
                          type="email"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          placeholder="you@example.com"
                          hasError={!!errors.email}
                        />
                      </Field>

                      <Field label="Type of Space" required error={errors.spaceType}>
                        <FocusSelect
                          value={form.spaceType}
                          onChange={e => set('spaceType', e.target.value)}
                          hasError={!!errors.spaceType}
                        >
                          <option value="" disabled>Select space type</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="office">Office</option>
                          <option value="commercial">Commercial</option>
                          <option value="renovation">Renovation</option>
                        </FocusSelect>
                      </Field>

                      <Field label="How Did You Hear About Us?">
                        <FocusSelect
                          value={form.hearAbout}
                          onChange={e => set('hearAbout', e.target.value)}
                        >
                          <option value="" disabled>Select an option</option>
                          <option value="google">Google</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="referral">Referral</option>
                          <option value="existing-client">Existing Client</option>
                          <option value="other">Other</option>
                        </FocusSelect>
                      </Field>

                      <Field label="Project Description">
                        <FocusTextarea
                          value={form.description}
                          onChange={e => set('description', e.target.value)}
                          placeholder="Tell us about your project, style preferences, requirements…"
                          rows={4}
                        />
                      </Field>

                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                      <Field label="Phone Number" required error={errors.phone}>
                        <FocusInput
                          type="tel"
                          value={form.phone}
                          onChange={e => set('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          hasError={!!errors.phone}
                        />
                      </Field>

                      <Field label="City" required error={errors.city}>
                        <FocusInput
                          type="text"
                          value={form.city}
                          onChange={e => set('city', e.target.value)}
                          placeholder="Your city"
                          hasError={!!errors.city}
                        />
                      </Field>

                      <Field label="Budget Range" required error={errors.budget}>
                        <FocusSelect
                          value={form.budget}
                          onChange={e => set('budget', e.target.value)}
                          hasError={!!errors.budget}
                        >
                          <option value="" disabled>Select budget range</option>
                          <option value="under-5l">Under ₹5L</option>
                          <option value="5-15l">₹5L – ₹15L</option>
                          <option value="15-30l">₹15L – ₹30L</option>
                          <option value="30-50l">₹30L – ₹50L</option>
                          <option value="50l-plus">₹50L+</option>
                        </FocusSelect>
                      </Field>

                      <Field label="Preferred Callback Time" required error={errors.callbackTime}>
                        <FocusSelect
                          value={form.callbackTime}
                          onChange={e => set('callbackTime', e.target.value)}
                          hasError={!!errors.callbackTime}
                        >
                          <option value="" disabled>Select time of day</option>
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                        </FocusSelect>
                      </Field>

                    </div>
                  </div>

                  {/* ── DIVIDER ── */}
                  <div style={{
                    width: '100%', height: 1,
                    background: 'rgba(42,57,38,0.08)',
                    margin: '3rem 0',
                  }} />

                  {/* ── SUBMIT ── */}
                  <div style={{ textAlign: 'center' }}>
                    <SubmitButton loading={submitting} />

                    {/* WhatsApp */}
                    <p style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 300,
                      fontSize: 12, color: 'rgba(28,40,24,0.38)',
                      marginTop: '1.75rem', letterSpacing: '0.04em',
                    }}>
                      Or{' '}
                      <a
                        href="https://wa.me/919999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#9B7D4E',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(155,125,78,0.3)',
                          paddingBottom: 1,
                          transition: 'color 0.2s ease, border-color 0.2s ease',
                        }}
                        onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#C9A96E'; el.style.borderColor = '#C9A96E' }}
                        onMouseLeave={e => { const el = e.currentTarget; el.style.color = '#9B7D4E'; el.style.borderColor = 'rgba(155,125,78,0.3)' }}
                      >
                        chat with us on WhatsApp
                      </a>
                    </p>
                  </div>

                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  )
}

function SubmitButton({ loading }: { loading: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="submit"
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        backgroundColor: hovered && !loading ? '#ddb97a' : '#C9A96E',
        color: '#1C2818',
        fontFamily: "'Inter', sans-serif", fontWeight: 500,
        fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
        padding: '18px 52px',
        border: 'none', cursor: loading ? 'wait' : 'pointer',
        transform: hovered && !loading ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered && !loading
          ? '0 8px 24px rgba(201,169,110,0.28)'
          : '0 2px 12px rgba(201,169,110,0.15)',
        transition: 'background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        opacity: loading ? 0.7 : 1,
        minWidth: 220,
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <>
          <span style={{ display: 'inline-block', animation: 'spin 0.9s linear infinite', fontSize: 13 }}>◌</span>
          Sending…
        </>
      ) : (
        <>
          Send Enquiry <ArrowRight size={12} strokeWidth={2} />
        </>
      )}
    </button>
  )
}
