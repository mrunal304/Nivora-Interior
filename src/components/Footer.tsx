import { Link } from 'react-router-dom'
import { Mail, Phone, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#132818', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12" style={{ paddingTop: '80px', paddingBottom: '40px' }}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">

          {/* Column 1 — Brand */}
          <div className="pr-10 pb-12 lg:pb-0" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="NIVORA" className="h-11 w-11 object-contain brightness-0 invert" />
              <div>
                <span className="font-serif text-xl text-white tracking-wider">nivora</span>
                <span className="block text-[9px] tracking-[0.35em] text-white/50 uppercase">interiors</span>
              </div>
            </div>
            <p className="text-white/40 text-xs leading-relaxed font-light mb-6 max-w-[200px]">
              Thoughtful spaces designed<br />for refined living.
            </p>
            <a
              href="https://wa.me/917276687805"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-light transition-all duration-200 hover:opacity-80"
              style={{ backgroundColor: '#25D366', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat with us
            </a>
          </div>

          {/* Column 2 — Navigate */}
          <div className="px-10 pb-12 lg:pb-0" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#b8966a] mb-6 font-normal">Navigate</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/services', label: 'Services' },
                { to: '/about', label: 'About' },
                { to: '/testimonials', label: 'Testimonials' },
                { to: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white font-light transition-colors duration-200 hover:text-[#b8966a]"
                    style={{ fontSize: '13px' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="px-10 pb-12 lg:pb-0" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#b8966a] mb-6 font-normal">What We Do</h4>
            <ul className="space-y-3">
              {[
                { to: '/services/residential', label: 'Residential Interiors' },
                { to: '/services/commercial', label: 'Commercial Interiors' },
                { to: '/services/architecture', label: 'Architecture' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white font-light transition-colors duration-200 hover:text-[#b8966a]"
                    style={{ fontSize: '13px' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Find Us */}
          <div className="pl-10 pb-12 lg:pb-0">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#b8966a] mb-6 font-normal">Find Us</h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/50 font-light leading-relaxed" style={{ fontSize: '13px' }}>
                  Bandra West,<br />Mumbai 400050
                </p>
              </div>
              <div>
                <p className="text-white/50 font-light leading-relaxed" style={{ fontSize: '13px' }}>
                  Koregaon Park,<br />Pune 411001
                </p>
              </div>
              <div className="pt-1 space-y-2">
                <div>
                  <a
                    href="mailto:hello@nivorainteriors.com"
                    className="transition-colors duration-200 hover:opacity-80 font-light"
                    style={{ fontSize: '13px', color: '#b8966a' }}
                  >
                    hello@nivorainteriors.com
                  </a>
                </div>
                <div>
                  <a
                    href="tel:+917276687805"
                    className="text-white/50 font-light transition-colors duration-200 hover:text-white"
                    style={{ fontSize: '13px' }}
                  >
                    +91 72766 87805
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://instagram.com/NivoraInteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200 inline-block"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-white/50 font-light" style={{ fontSize: '11px' }}>
            © 2025 Nivora Interiors. All rights reserved.
          </p>
          <p className="text-white/50 font-light" style={{ fontSize: '11px' }}>
            Designed with intention. Built in India.
          </p>
        </div>
      </div>
    </footer>
  )
}
