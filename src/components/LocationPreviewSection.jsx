import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_INFO } from '../store/store'

gsap.registerPlugin(ScrollTrigger)

export default function LocationPreviewSection() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const mapRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, x: -50, stagger: 0.12, duration: 0.9, ease: 'power3.out',
      })
      gsap.from(mapRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, x: 50, duration: 0.9, ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-py" id="location-preview" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '4rem',
          alignItems: 'center',
        }} className="loc-grid">
          {/* Left */}
          <div ref={leftRef}>
            <span className="eyebrow">Find Us</span>
            <h2 className="section-heading font-display">
              Come <span className="gradient-text">Visit</span> Us
            </h2>
            <div className="divider-line" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                {
                  label: 'Address',
                  value: SITE_INFO.address,
                  href: SITE_INFO.googleMapLink,
                },
                {
                  label: 'Open Hours',
                  value: `${SITE_INFO.openDays} · ${SITE_INFO.openHours}`,
                },
                {
                  label: 'Phone',
                  value: SITE_INFO.phone,
                  href: `tel:${SITE_INFO.phone}`,
                },
              ].map(info => (
                <div key={info.label} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    minWidth: 72,
                    paddingTop: '0.15rem',
                  }}>
                    {info.label}
                  </div>
                  <div style={{ flex: 1 }}>
                    {info.href ? (
                      <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--text)',
                        textDecoration: 'none',
                        lineHeight: 1.5,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text)'}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.5 }}>
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a href={SITE_INFO.googleMapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Open in Google Maps
            </a>
          </div>

          {/* Right — Map */}
          <div
            ref={mapRef}
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              height: '380px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
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
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .loc-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
