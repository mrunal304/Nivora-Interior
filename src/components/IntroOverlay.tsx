import { useEffect, useRef } from 'react'

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const textEl = textRef.current
    if (!overlay || !textEl) return

    const fullText = 'Nivora Interiors'
    let index = 0
    let cancelled = false
    textEl.textContent = ''

    const type = () => {
      if (cancelled) return
      if (index < fullText.length) {
        textEl.textContent = fullText.slice(0, index + 1)
        index++
        setTimeout(type, 90)
      } else {
        setTimeout(() => {
          if (cancelled) return
          overlay.style.transform = 'translateY(-100%)'
          overlay.addEventListener('transitionend', () => {
            overlay.style.display = 'none'
          }, { once: true })
        }, 600)
      }
    }

    type()

    return () => { cancelled = true }
  }, [])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#3b4a35',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(0)',
        transition: 'transform 800ms ease-in',
      }}
    >
      <span
        ref={textRef}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: '#ffffff',
          letterSpacing: '0.08em',
        }}
      />
    </div>
  )
}
