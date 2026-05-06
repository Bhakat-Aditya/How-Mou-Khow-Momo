import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { REVIEWS } from '../store/store'

gsap.registerPlugin(ScrollTrigger)

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < count ? 'var(--gold)' : 'var(--text-dim)' }}>★</span>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const ratingRef  = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        opacity: 0, y: 35, stagger: 0.1, duration: 0.9, ease: 'power3.out',
      })

      gsap.from(ratingRef.current, {
        scrollTrigger: { trigger: ratingRef.current, start: 'top 85%' },
        opacity: 0, scale: 0.96, duration: 0.8, ease: 'power3.out',
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 90%' },
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: (i % 3) * 0.08,
          ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-py" id="reviews" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '3rem' }}>
          <span className="eyebrow">Reviews</span>
          <h2 className="section-heading font-display">
            What <span className="gradient-text">Customers</span> Say
          </h2>
          <div className="divider-line" />
          <p className="section-sub">
            Don't just take our word for it — here's what our regulars have to say.
          </p>
        </div>

        {/* Overall rating bar */}
        <div
          ref={ratingRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '1.75rem 2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-warm)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center', minWidth: 70 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>
              4.9
            </div>
            <Stars count={5} />
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem', letterSpacing: '0.05em' }}>Average</div>
          </div>
          <div style={{ width: 1, height: 56, background: 'var(--border)', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>
              100+ Reviews on Google
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Midnapore's highest-rated momo stall
            </p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://maps.app.goo.gl/A8MEkNGjoE6q2XSC8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
            >
              View on Google
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {REVIEWS.map((review, i) => (
            <div key={review.name} ref={el => cardsRef.current[i] = el} className="review-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div className="avatar">{review.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{review.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {review.location} · {review.date}
                  </div>
                </div>
                <Stars count={review.rating} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.75, fontStyle: 'italic' }}>
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
