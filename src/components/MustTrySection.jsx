import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MUST_TRY } from '../store/store'

gsap.registerPlugin(ScrollTrigger)

function TagBadge({ tag }) {
  if (!tag) return null
  const labels = { bestseller: 'Bestseller', musttry: 'Must Try', vegonly: 'Veg Only', new: 'New' }
  return <span className={`tag tag-${tag}`}>{labels[tag]}</span>
}

export default function MustTrySection() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-up
      gsap.from(headerRef.current.children, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
      })

      // Cards — staggered with slight Y + scale
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          opacity: 0,
          y: 70,
          scale: 0.94,
          duration: 0.85,
          delay: i * 0.1,
          ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-py" id="must-try" style={{
      background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(230,57,70,0.05) 0%, transparent 70%)',
    }}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
          <span className="eyebrow">Must Try</span>
          <h2 className="section-heading font-display">
            Our <span className="gradient-text">Signature</span> Picks
          </h2>
          <div className="divider-line" />
          <p className="section-sub">
            First visit? These are the dishes that'll have you coming back again and again.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem',
        }}>
          {MUST_TRY.map((item, i) => (
            <article
              key={item.name}
              ref={el => cardsRef.current[i] = el}
              className="must-try-card"
            >
              {/* Image */}
              <div style={{ overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="must-try-img"
                  loading="lazy"
                />
              </div>

              {/* Badge */}
              <div className="must-try-badge">{item.badge}</div>

              {/* Body */}
              <div className="must-try-body">
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
                  {item.category}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.65rem', lineHeight: 1.2 }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {item.description}
                </p>

                {/* Price */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  {item.price ? (
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--gold)' }}>₹{item.price}</span>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', minWidth: 56 }}>
                        <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Half</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gold)' }}>₹{item.half}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', minWidth: 56 }}>
                        <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gold)' }}>₹{item.full}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/menu" className="btn-primary">
            See Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
