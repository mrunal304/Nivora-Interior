import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function useTransparentLogo(src: string) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        // Remove neutral bright pixels (white/gray background & shadows).
        // Check color-neutrality (r≈g≈b) so gold logo pixels are never removed.
        const isNeutral = Math.abs(r - g) < 28 && Math.abs(g - b) < 28
        const isBright = r > 170 && g > 160 && b > 150
        if (isNeutral && isBright) {
          data[i + 3] = 0
        }
      }
      ctx.putImageData(imageData, 0, 0)
      setLogoSrc(canvas.toDataURL('image/png'))
    }
    img.src = src
  }, [src])

  return logoSrc
}

export default function IntroOverlay() {
  const isHome = window.location.pathname === '/'
  const [visible, setVisible] = useState(isHome)
  const logoSrc = useTransparentLogo('/nivora-logo.png')

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#21291a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence>
            {logoSrc && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  setTimeout(() => setVisible(false), 1000)
                }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Ambient gold glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: '-40% -30%',
                    background:
                      'radial-gradient(ellipse at center, rgba(180,148,90,0.12) 0%, transparent 65%)',
                    filter: 'blur(24px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Official logo — white pixels removed via canvas */}
                <img
                  src={logoSrc}
                  alt="Nivora Interiors"
                  style={{
                    width: 'clamp(220px, 30vw, 320px)',
                    height: 'auto',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 0 16px rgba(180,148,90,0.20))',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
