import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_INFO } from '../store/store'

gsap.registerPlugin(ScrollTrigger)

function animateIn(el, props = {}) {
  if (!el) return
  gsap.set(el, { opacity: 0, ...props.from })
  gsap.to(el, {
    opacity: 1,
    ...(props.to || {}),
    duration: props.duration || 0.85,
    ease: props.ease || 'power3.out',
    delay: props.delay || 0,
    scrollTrigger: props.trigger
      ? { trigger: props.trigger, start: 'top 85%', once: true }
      : undefined,
  })
}

const INFO_CARDS = [
  {
    label: 'Address',
    value: SITE_INFO.address,
    action: { label: 'Open in Maps', href: SITE_INFO.googleMapLink, external: true },
  },
  {
    label: 'Open Hours',
    value: SITE_INFO.openDays,
    highlight: SITE_INFO.openHours,
  },
  {
    label: 'Phone',
    value: SITE_INFO.phone,
    action: { label: 'Call Now', href: `tel:${SITE_INFO.phone}` },
  },
  {
    label: 'WhatsApp',
    value: 'Chat for queries or bulk orders',
    action: { label: 'Message Us', href: SITE_INFO.socialLinks.whatsapp, external: true },
  },
]

export default function Location() {
  const headerRef = useRef(null)
  const cardsRef  = useRef([])
  const mapRef    = useRef(null)
  const dirRef    = useRef(null)
  const bgRef     = useRef(null)

  useEffect(() => {
    // Immediately animate header (it's always in view on load)
    if (headerRef.current) {
      const children = Array.from(headerRef.current.children)
      gsap.set(children, { opacity: 0, y: 30 })
      gsap.to(children, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.2,
      })
    }

    // Cards with scroll trigger
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { opacity: 0, y: 40 })
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.75, delay: i * 0.08, ease: 'power3.out' }),
      })
    })

    // Map
    if (mapRef.current) {
      gsap.set(mapRef.current, { opacity: 0, y: 40 })
      ScrollTrigger.create({
        trigger: mapRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(mapRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
      })
    }

    // Directions bar
    if (dirRef.current) {
      gsap.set(dirRef.current, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: dirRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => gsap.to(dirRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
      })
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>

      {/* ── Hero-style Header ───────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background image */}
        <div
          ref={bgRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero-fallback.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.92) 100%)',
        }} />

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '7rem 1.5rem 5rem', textAlign: 'center' }}>
          <div ref={headerRef}>
            <span className="eyebrow">Location</span>
            <h1 className="section-heading font-display" style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)' }}>
              Come <span className="gradient-text">Find Us</span>
            </h1>
            <div className="divider-line" style={{ margin: '1.2rem auto 1.5rem' }} />
            <p className="section-sub" style={{ margin: '0 auto', color: 'rgba(242,237,230,0.65)' }}>
              Right at Panchur Chawk, Head Post Office Road, Midnapore.
              Easy to find, impossible to forget.
            </p>
          </div>
        </div>
      </div>

      {/* ── Info Cards ──────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}>
          {INFO_CARDS.map((card, i) => (
            <div
              key={card.label}
              ref={el => cardsRef.current[i] = el}
              style={{
                padding: '1.75rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(244,185,66,0.25)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.75rem',
              }}>
                {card.label}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: card.highlight ? '0.35rem' : 0 }}>
                {card.value}
              </div>
              {card.highlight && (
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.35rem',
                  fontWeight: 700, color: 'var(--gold)', marginTop: '0.2rem',
                }}>
                  {card.highlight}
                </div>
              )}
              {card.action && (
                <a
                  href={card.action.href}
                  target={card.action.external ? '_blank' : undefined}
                  rel={card.action.external ? 'noopener noreferrer' : undefined}
                  className="btn-primary"
                  style={{ marginTop: '1.25rem', padding: '0.55rem 1.1rem', fontSize: '0.78rem' }}
                >
                  {card.action.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── Google Map ──────────────────────────────────────── */}
        <div
          ref={mapRef}
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            height: '500px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}
        >
          <iframe
            title="How Mou Khow Momo on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.1!2d87.3194!3d22.4239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d440655555555%3A0x0!2zSG93IE1vdSBLaG93IE1vbW8!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)', display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* ── Directions Banner ──────────────────────────────── */}
        <div
          ref={dirRef}
          style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2rem',
            alignItems: 'center',
            padding: '2rem 2rem',
            background: 'linear-gradient(135deg, rgba(230,57,70,0.07), rgba(244,185,66,0.04))',
            border: '1px solid rgba(230,57,70,0.15)',
            borderRadius: 'var(--radius)',
            flexWrap: 'wrap',
          }}
          className="dir-banner"
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text)' }}>
              Getting Here
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
              Located at <strong style={{ color: 'var(--text)' }}>Panchur Chawk</strong> on{' '}
              <strong style={{ color: 'var(--text)' }}>Head Post Office Road, Dharma, Midnapore – 721101</strong>.
              Ample space for two-wheelers. Landmark: Near Midnapore Head Post Office.
            </p>
          </div>
          <a
            href={SITE_INFO.googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            Get Directions
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .dir-banner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
