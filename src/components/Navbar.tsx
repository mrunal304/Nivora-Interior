import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#1c2b1a]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="NIVORA Interiors" className="h-10 w-10 object-contain" />
            <div>
              <span className="font-serif text-xl text-[#b8966a] tracking-wider">nivora</span>
              <span className="block text-[8px] tracking-[0.35em] text-[#b8966a]/60 uppercase font-light">interiors</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
                  location.pathname === l.to
                    ? 'text-[#b8966a]'
                    : 'text-[#f5f0e8]/70 hover:text-[#b8966a]'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/quote"
            className="hidden lg:inline-flex items-center gap-2 border border-[#b8966a] text-[#b8966a] text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#b8966a] hover:text-[#1c2b1a] transition-all duration-300"
          >
            Enquire Now
          </Link>

          <button
            className="lg:hidden text-[#f5f0e8] p-2"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#1c2b1a] flex flex-col justify-center items-center gap-8 transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className="font-serif text-3xl text-[#f5f0e8] hover:text-[#b8966a] transition-colors duration-300"
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/quote"
          className="mt-4 border border-[#b8966a] text-[#b8966a] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#b8966a] hover:text-[#1c2b1a] transition-all duration-300"
        >
          Enquire Now
        </Link>
      </div>
    </>
  )
}
