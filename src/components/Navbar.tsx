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
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          backgroundColor: scrolled ? '#2E4A30' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(185,150,106,0.2)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
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
                className="text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300 relative pb-1"
                style={{
                  color: isActive(l.to) ? '#C9A96E' : 'rgba(245,240,232,0.7)',
                }}
              >
                {l.label}
                {isActive(l.to) && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#C9A96E',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <Link
            to="/quote"
            className="hidden lg:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300"
            style={{
              border: '1px solid #C9A96E',
              color: '#C9A96E',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#C9A96E'
              el.style.color = '#2E4A30'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = 'transparent'
              el.style.color = '#C9A96E'
            }}
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
        className={`fixed inset-0 z-40 bg-[#2E4A30] flex flex-col justify-center items-center gap-8 transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className="font-serif text-3xl transition-colors duration-300"
            style={{ color: isActive(l.to) ? '#C9A96E' : '#f5f0e8' }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/quote"
          className="mt-4 text-[#C9A96E] text-xs tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300"
          style={{ border: '1px solid #C9A96E' }}
        >
          Enquire Now
        </Link>
      </div>
    </>
  )
}
