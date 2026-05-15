import { useEffect, useRef, useState } from 'react'

export default function IntroOverlay() {
  const isHome = window.location.pathname === '/'
  const [mounted, setMounted] = useState(isHome)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nivoraRef = useRef<HTMLDivElement>(null)
  const interiorsRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isHome) return
    const overlay = overlayRef.current
    const line = lineRef.current
    const nivora = nivoraRef.current
    const interiors = interiorsRef.current
    const bar = barRef.current
    if (!overlay || !line || !nivora || !interiors || !bar) return

    let cancelled = false

    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(() => { if (!cancelled) fn() }, delay)
      return id
    }

    // Step 1 — line expands at 0.3s
    schedule(() => {
      line.style.width = '60%'
    }, 300)

    // Step 2 — text fades in at 0.9s
    schedule(() => {
      nivora.style.opacity = '1'
      nivora.style.transform = 'translateY(0)'
      interiors.style.opacity = '1'
      interiors.style.transform = 'translateY(0)'
    }, 900)

    // Step 3 — progress bar at 1.2s
    schedule(() => {
      bar.style.width = '100%'
    }, 1200)

    // Step 4 — collapse overlay at 3.0s (1.2 + 1.6 + 0.2 pause)
    schedule(() => {
      overlay.style.transform = 'scaleY(0)'
      overlay.addEventListener('transitionend', () => {
        if (!cancelled) setMounted(false)
      }, { once: true })
    }, 3000)

    return () => { cancelled = true }
  }, [isHome])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#1a1a18',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'top',
        transform: 'scaleY(1)',
        transition: 'transform 900ms cubic-bezier(0.77, 0, 0.18, 1)',
      }}
    >
      {/* Brand text */}
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div
          ref={nivoraRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#f5f0e8',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
          }}
        >
          Nivora
        </div>

        {/* Horizontal line */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            width: '0%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            margin: '18px auto',
            transition: 'width 1000ms ease-in-out',
          }}
        />

        <div
          ref={interiorsRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
          }}
        >
          Interiors
        </div>
      </div>

      {/* Progress bar — pinned to bottom */}
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: '0%',
          backgroundColor: '#3b4a35',
          transition: 'width 1600ms ease',
        }}
      />
    </div>
  )
}
