import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const wrapRef    = useRef(null)
  const kickerRef  = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const statsRef   = useRef(null)
  const scrollRef  = useRef(null)
  const videoRef   = useRef(null)
  const posterRef  = useRef(null)

  const [videoReady, setVideoReady] = useState(false)

  // ── GSAP entrance animation ────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from(kickerRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
        .from(line1Ref.current.querySelector('.hero-title-inner'), {
          yPercent: 110, opacity: 0, duration: 1.1,
        }, '-=0.3')
        .from(line2Ref.current.querySelector('.hero-title-inner'), {
          yPercent: 110, opacity: 0, duration: 1.1,
        }, '-=0.85')
        .from(subRef.current, { opacity: 0, y: 24, duration: 0.8 }, '-=0.6')
        .from(ctaRef.current.children, { opacity: 0, y: 20, stagger: 0.12, duration: 0.7 }, '-=0.5')
        .from(statsRef.current.children, { opacity: 0, y: 16, stagger: 0.1, duration: 0.6 }, '-=0.4')
        .from(scrollRef.current, { opacity: 0, duration: 0.5 }, '-=0.2')

      // Scroll indicator breathing
      gsap.to(scrollRef.current.querySelector('.hero-scroll-line'), {
        scaleY: 0.4,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  // ── Lazy-load video after page paint ──────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Only start loading after first paint — defer with rAF
    const raf = requestAnimationFrame(() => {
      // Set sources only now (they're empty until this point)
      const webm = video.querySelector('source[data-src-webm]')
      const mp4  = video.querySelector('source[data-src-mp4]')
      if (webm) { webm.src = webm.dataset.srcWebm; webm.removeAttribute('data-src-webm') }
      if (mp4)  { mp4.src  = mp4.dataset.srcMp4;   mp4.removeAttribute('data-src-mp4') }
      video.load()
    })

    const onCanPlay = () => {
      video.play().catch(() => {})
      // Fade in video, fade out poster image
      gsap.to(video,       { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
      gsap.to(posterRef.current, { opacity: 0, duration: 1.2, ease: 'power2.inOut' })
      setVideoReady(true)
    }

    video.addEventListener('canplaythrough', onCanPlay, { once: true })

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('canplaythrough', onCanPlay)
    }
  }, [])

  return (
    <section ref={wrapRef} className="hero-wrap" id="hero">

      {/* ── Static poster image — shows INSTANTLY, zero wait ── */}
      <div
        ref={posterRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'url(/images/hero-fallback.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'none',
        }}
      />

      {/* ── Video — starts at opacity 0, fades in when ready ── */}
      {/*    preload="none" = browser won't touch it until we call load() */}
      <video
        ref={videoRef}
        className="hero-video"
        muted
        loop
        playsInline
        preload="none"
        style={{ opacity: 0 }}
      >
        {/* data-src-* prevents browser from fetching before rAF */}
        <source data-src-webm="/hero.webm" type="video/webm" />
        <source data-src-mp4="/hero-compressed.mp4" type="video/mp4" />
      </video>

      {/* ── Dark gradient overlay ─────────────────────────── */}
      <div className="hero-overlay" />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="hero-content">
        <div ref={kickerRef}>
          <div className="hero-kicker">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="currentColor" />
            </svg>
            Panchur Chawk, Midnapore — Open Daily
          </div>
        </div>

        <h1 style={{ lineHeight: 1.05, marginBottom: '1.5rem' }}>
          <span ref={line1Ref} className="hero-title-line">
            <span
              className="hero-title-inner font-display"
              style={{
                fontSize: 'clamp(3.2rem, 11vw, 8rem)',
                fontWeight: 900,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                display: 'block',
              }}
            >
              How Mou
            </span>
          </span>
          <span ref={line2Ref} className="hero-title-line">
            <span
              className="hero-title-inner font-display"
              style={{
                fontSize: 'clamp(3.2rem, 11vw, 8rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, var(--red) 30%, var(--orange) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
                display: 'block',
                filter: 'drop-shadow(0 0 40px rgba(230,57,70,0.35))',
              }}
            >
              Khow Momo
            </span>
          </span>
        </h1>

        <p ref={subRef} style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: 'rgba(242, 237, 230, 0.65)',
          maxWidth: '520px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          Midnapore's most-loved momo stall. Eight varieties of handcrafted momos —
          steamed, fried, chilli, butter masala and beyond.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/menu" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '0.9rem' }}>
            View Full Menu
          </Link>
          <Link to="/location" className="btn-ghost" style={{ padding: '1rem 2rem', fontSize: '0.9rem' }}>
            Find Us
          </Link>
        </div>

        <div ref={statsRef} className="hero-stat-bar">
          {[
            { num: '8+',  label: 'Varieties' },
            { num: '₹55', label: 'Starting From' },
            { num: '5k+', label: 'Happy Customers' },
          ].map(s => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-num gradient-text-warm">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <div ref={scrollRef} className="hero-scroll">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
