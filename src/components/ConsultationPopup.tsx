import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [spaceType, setSpaceType] = useState('')
  const navigate = useNavigate()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasSetupRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('popupShown')) return
    if (hasSetupRef.current) return
    hasSetupRef.current = true

    const onScroll = () => {
      window.removeEventListener('scroll', onScroll)
      timerRef.current = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('popupShown', 'true')
      }, 6000)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const close = () => setIsOpen(false)

  const handleBook = () => {
    close()
    navigate('/contact')
  }

  if (!isOpen) return null

  return (
    <>
      <style>{`
        .cpopup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: cpopup-fade-in 0.3s ease;
        }
        @keyframes cpopup-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .cpopup-card {
          background: #f5f0e8;
          border-radius: 4px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.35), 0 4px 20px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 480px;
          padding: 48px 40px 40px;
          position: relative;
          animation: cpopup-slide-up 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes cpopup-slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cpopup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: #5a5a5a;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
          border-radius: 2px;
        }
        .cpopup-close:hover { color: #21291a; }
        .cpopup-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a18661;
          text-align: center;
          margin-bottom: 12px;
        }
        .cpopup-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          font-size: clamp(1.5rem, 4vw, 2rem);
          color: #21291a;
          text-align: center;
          margin: 0 0 32px;
          line-height: 1.25;
        }
        .cpopup-field {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(33,41,26,0.25);
          background: transparent;
          padding: 10px 0;
          font-family: 'Lora', serif;
          font-size: 14px;
          color: #21291a;
          outline: none;
          margin-bottom: 24px;
          transition: border-color 0.25s ease;
          display: block;
        }
        .cpopup-field::placeholder {
          color: rgba(33,41,26,0.4);
          font-family: 'Lora', serif;
          font-size: 14px;
        }
        .cpopup-field:focus {
          border-bottom-color: #a18661;
        }
        .cpopup-btn {
          width: 100%;
          background: #a18661;
          color: #f5f0e8;
          border: none;
          padding: 16px 24px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          margin-top: 8px;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .cpopup-btn:hover {
          background: #8d7250;
          transform: translateY(-1px);
        }
        @media (max-width: 480px) {
          .cpopup-card { padding: 40px 24px 32px; }
        }
      `}</style>

      <div className="cpopup-overlay" onClick={e => { if (e.target === e.currentTarget) close() }}>
        <div className="cpopup-card">
          <button className="cpopup-close" onClick={close} aria-label="Close">
            <X size={18} />
          </button>

          <p className="cpopup-sub">Get a Free 30-Min Design Consultation</p>
          <h2 className="cpopup-heading">Planning your dream home?</h2>

          <input
            className="cpopup-field"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="cpopup-field"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <input
            className="cpopup-field"
            type="text"
            placeholder="Type of Space"
            value={spaceType}
            onChange={e => setSpaceType(e.target.value)}
          />

          <button className="cpopup-btn" onClick={handleBook}>
            Book My Free Consultation
          </button>
        </div>
      </div>
    </>
  )
}
