import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#2f3c29] border-t border-[#b8966a]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="NIVORA" className="h-12 w-12 object-contain" />
              <div>
                <span className="font-serif text-2xl text-[#b8966a] tracking-wider">nivora</span>
                <span className="block text-[9px] tracking-[0.35em] text-[#b8966a]/60 uppercase">interior studio</span>
              </div>
            </div>
            <p className="text-[#f5f0e8]/50 text-sm leading-relaxed max-w-xs font-light">
              Thoughtful interiors designed for real living. Boutique interior design studio serving Mumbai and Pune.
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="https://instagram.com/NivoraInteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#b8966a]/30 flex items-center justify-center text-[#b8966a]/60 hover:border-[#b8966a] hover:text-[#b8966a] transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#b8966a] mb-6 font-light">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/services', label: 'Services' },
                { to: '/portfolio', label: 'Projects' },
                { to: '/contact', label: 'Contact' },
                { to: '/quote', label: 'Get a Free Quote' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[#f5f0e8]/50 text-sm hover:text-[#b8966a] transition-colors duration-300 font-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#b8966a] mb-6 font-light">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#b8966a] mt-0.5 shrink-0" />
                <span className="text-[#f5f0e8]/50 text-sm font-light">Mumbai | Pune</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#b8966a] shrink-0" />
                <a href="tel:+917276687805" className="text-[#f5f0e8]/50 text-sm hover:text-[#b8966a] transition-colors duration-300 font-light">
                  +91 72766 87805
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#b8966a] shrink-0" />
                <a href="mailto:hello@nivorainteriors.com" className="text-[#f5f0e8]/50 text-sm hover:text-[#b8966a] transition-colors duration-300 font-light">
                  hello@nivorainteriors.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#b8966a]/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#f5f0e8]/30 text-xs tracking-widest">
            © {new Date().getFullYear()} NIVORA Interior Studio. All rights reserved.
          </p>
          <p className="text-[#f5f0e8]/20 text-xs">
            Thoughtful design for refined living.
          </p>
        </div>
      </div>
    </footer>
  )
}
