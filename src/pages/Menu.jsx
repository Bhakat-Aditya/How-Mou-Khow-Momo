import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MENU, BURGERS } from '../store/store'

gsap.registerPlugin(ScrollTrigger)

function TagBadge({ tag }) {
  if (!tag) return null
  const labels = { bestseller: 'Bestseller', musttry: 'Must Try', vegonly: 'Veg', new: 'New' }
  return <span className={`tag tag-${tag}`}>{labels[tag]}</span>
}

// Filters for the category pill bar
const FILTERS = [
  { id: 'all',        label: 'All' },
  { id: 'steamed',   label: 'Steamed' },
  { id: 'fried',     label: 'Fried & Crispy' },
  { id: 'saucy',     label: 'Saucy' },
  { id: 'bestseller', label: 'Bestsellers' },
  { id: 'vegonly',   label: 'Veg Only' },
]

function getCategoryFilter(cat) {
  const name = cat.category.toLowerCase()
  if (name.includes('steamed')) return 'steamed'
  if (name.includes('fried') || name.includes('crunchy') || name.includes('kurkure')) return 'fried'
  if (name.includes('chilli') || name.includes('butter') || name.includes('pan')) return 'saucy'
  return 'other'
}

// Single animated category card
function CategoryCard({ category, index }) {
  const cardRef   = useRef(null)
  const imgRef    = useRef(null)
  const contentRef= useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    // Scroll entrance
    gsap.set(el, { opacity: 0, y: 80 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.85,
          ease: 'power3.out',
          delay: (index % 3) * 0.07,
        })
      },
    })

    return () => st.kill()
  }, [index])

  // Parallax effect on image when hovering card
  const onMouseMove = useCallback((e) => {
    if (!imgRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / width
    const y = (e.clientY - top - height / 2) / height
    gsap.to(imgRef.current, { x: x * 8, y: y * 8, duration: 0.6, ease: 'power2.out' })
  }, [])

  const onMouseLeave = useCallback(() => {
    if (imgRef.current)
      gsap.to(imgRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })
  }, [])

  return (
    <article
      ref={cardRef}
      className="menu-cat-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); onMouseLeave() }}
      onMouseMove={onMouseMove}
    >
      {/* Top half: image + title side by side */}
      <div className="menu-cat-header">
        {/* Image */}
        <div className="menu-cat-img-wrap">
          <img
            ref={imgRef}
            src={category.image}
            alt={category.category}
            className="menu-cat-img"
            loading="lazy"
            style={{ willChange: 'transform' }}
          />
          <div className="menu-cat-img-overlay" />
        </div>

        {/* Category info */}
        <div ref={contentRef} className="menu-cat-info">
          <div style={{
            display: 'inline-block',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.5rem',
          }}>
            Category {String(index + 1).padStart(2, '0')}
          </div>

          <h2 className="menu-cat-name font-display"
            style={{
              color: hovered ? 'var(--gold)' : 'var(--text)',
              transition: 'color 0.35s ease',
            }}
          >
            {category.category}
          </h2>

          <p className="menu-cat-desc">{category.description}</p>

          {/* Price hint */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-dim)',
          }}>
            <span>Half (5 pcs)</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span>Full (8 pcs)</span>
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="menu-items-table">
        {/* Column headers */}
        <div className="menu-col-header">
          <div className="menu-col-label">Item</div>
          <div className="menu-col-label" style={{ textAlign: 'center' }}>Half</div>
          <div className="menu-col-label" style={{ textAlign: 'center' }}>Full</div>
        </div>

        {/* Item rows */}
        {category.items.map((item, i) => (
          <div key={item.name} className="menu-item-row">
            <div>
              <div className="menu-item-name">{item.name}</div>
              {item.tag && <TagBadge tag={item.tag} />}
            </div>
            <div className="price-cell">₹{item.half}</div>
            <div className="price-cell">₹{item.full}</div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState('all')
  const headerRef   = useRef(null)
  const filterRef   = useRef(null)
  const burgersRef  = useRef(null)
  const noteRef     = useRef(null)

  // Header animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(headerRef.current.children, { opacity: 0, y: 40, stagger: 0.1, duration: 0.9 })
        .from(filterRef.current.children, { opacity: 0, y: 20, stagger: 0.05, duration: 0.6 }, '-=0.3')
    })
    return () => ctx.revert()
  }, [])

  // Burgers section animation
  useEffect(() => {
    if (!burgersRef.current) return
    gsap.from(burgersRef.current, {
      scrollTrigger: { trigger: burgersRef.current, start: 'top 88%' },
      opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
    })
  }, [activeFilter])

  // Animate note
  useEffect(() => {
    if (!noteRef.current) return
    gsap.from(noteRef.current, {
      scrollTrigger: { trigger: noteRef.current, start: 'top 90%' },
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
    })
  }, [])

  // Filter menu
  const filteredMenu = (() => {
    if (activeFilter === 'all') return MENU
    if (activeFilter === 'bestseller') {
      return MENU.map(cat => ({
        ...cat,
        items: cat.items.filter(i => i.tag === 'bestseller'),
      })).filter(cat => cat.items.length > 0)
    }
    if (activeFilter === 'vegonly') {
      return MENU.map(cat => ({
        ...cat,
        items: cat.items.filter(i => i.tag === 'vegonly'),
      })).filter(cat => cat.items.length > 0)
    }
    // steamed, fried, saucy filters
    return MENU.filter(cat => getCategoryFilter(cat) === activeFilter)
  })()

  // Change filter with stagger-out animation
  const handleFilterChange = (id) => {
    if (id === activeFilter) return
    gsap.to('.menu-cat-card', {
      opacity: 0, y: 30, duration: 0.25, ease: 'power2.in', stagger: 0.03,
      onComplete: () => setActiveFilter(id),
    })
  }

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="menu-page-header">
        <div className="container">
          <div ref={headerRef}>
            <span className="eyebrow">Full Menu</span>
            <h1 className="section-heading font-display" style={{ marginBottom: '0.75rem' }}>
              Everything We <span className="gradient-text">Serve</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', maxWidth: '480px', margin: '0 auto' }}>
              Half plate · 5 pieces &nbsp;|&nbsp; Full plate · 8 pieces.
              Every momo made fresh, never frozen.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        {/* Filter tabs */}
        <div ref={filterRef} className="cat-tabs" style={{ marginBottom: '2.5rem' }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`cat-tab ${activeFilter === f.id ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category cards */}
        <div>
          {filteredMenu.map((cat, i) => (
            <CategoryCard key={cat.category} category={cat} index={i} />
          ))}
        </div>

        {/* Burgers — only show on relevant filters */}
        {(activeFilter === 'all' || activeFilter === 'bestseller') && (
          <div
            ref={burgersRef}
            style={{
              marginTop: '1rem',
              padding: '0',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--bg-card)',
              border: '1px solid rgba(244,185,66,0.15)',
            }}
          >
            {/* Burger header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '340px 1fr',
              minHeight: 180,
            }} className="menu-cat-header">
              <div style={{ overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/images/panfried.png"
                  alt="Momo Burgers"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="menu-cat-img-overlay" />
              </div>
              <div className="menu-cat-info">
                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                  Special
                </div>
                <h2 className="menu-cat-name font-display">Momo Burgers</h2>
                <p className="menu-cat-desc">Midnapore's most unique fusion — momo meets burger.</p>
              </div>
            </div>

            {/* Burger items */}
            <div className="menu-items-table">
              <div className="menu-col-header">
                <div className="menu-col-label">Item</div>
                <div className="menu-col-label" style={{ textAlign: 'center', gridColumn: 'span 2' }}>Price</div>
              </div>
              {BURGERS.map(b => (
                <div key={b.name} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 90px 90px',
                  gap: '1rem',
                  padding: '1rem 2rem',
                  borderTop: '1px solid rgba(255,255,255,0.03)',
                  alignItems: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <div className="menu-item-name">{b.name}</div>
                    {b.tag && <TagBadge tag={b.tag} />}
                  </div>
                  <div style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: '1.15rem', fontWeight: 900, color: 'var(--gold)' }}>
                    ₹{b.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note */}
        <div
          ref={noteRef}
          style={{
            marginTop: '2.5rem',
            padding: '1.25rem 1.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: 'var(--text)' }}>Note:</strong>{' '}
          Prices may change. For the latest menu, call us at{' '}
          <a href="tel:8016304918" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700 }}>
            8016304918
          </a>{' '}
          or visit us at Panchur Chawk, Midnapore.
        </div>
      </div>
    </div>
  )
}
