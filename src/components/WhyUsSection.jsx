import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_INFO } from '../store/store'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2C8 2 4 5 4 9c0 6 8 13 8 13s8-7 8-13c0-4-4-7-8-7z"/>
        <circle cx="12" cy="9" r="3"/>
      </svg>
    ),
    title: 'Handcrafted Daily',
    desc: 'Every momo is made fresh from scratch — never frozen, never compromised.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Bold Flavours',
    desc: 'From mild steamed to fiery chilli — we have a momo for every mood.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
      </svg>
    ),
    title: 'Pocket Friendly',
    desc: 'Premium quality street food starting at just ₹55.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: '8 Varieties',
    desc: 'Steamed, fried, kurkure, cheese, pan-fried, chilli, butter masala, and burgers.',
  },
]

export default function WhyUsSection() {
  const sectionRef  = useRef(null)
  const leftRef     = useRef(null)
  const featuresRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, x: -50, stagger: 0.1, duration: 0.9, ease: 'power3.out',
      })
      featuresRef.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          opacity: 0, y: 40, scale: 0.95, duration: 0.75, delay: i * 0.08, ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-py" id="why-us" style={{
      background: 'linear-gradient(135deg, var(--bg) 0%, rgba(230,57,70,0.04) 50%, var(--bg) 100%)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }} className="why-grid">
          {/* Left */}
          <div ref={leftRef}>
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="section-heading font-display" style={{ marginBottom: '1rem' }}>
              More Than Just <span className="gradient-text">Momos</span>
            </h2>
            <div className="divider-line" />
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
              At How Mou Khow Momo, we believe great food should be accessible to everyone.
              Our recipes are perfected over years, using fresh locally sourced ingredients
              and our signature chutneys that keep customers coming back.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={`tel:${SITE_INFO.phone}`} className="btn-primary">
                Call Us Now
              </a>
              <a href={SITE_INFO.googleMapLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Visit Us
              </a>
            </div>
          </div>

          {/* Right — feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} ref={el => featuresRef.current[i] = el} className="feature-card">
                <div className="feature-icon" style={{ color: 'var(--red)' }}>
                  {f.icon}
                </div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{f.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
