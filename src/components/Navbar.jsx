import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS, SITE_INFO } from '../store/store'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isMobile,  setIsMobile]  = useState(() => window.innerWidth < 768)

  // Close mobile menu on route change / resize
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    const onResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setMenuOpen(false)   // auto-close drawer when going wide
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">

            {/* ── Logo ─────────────────────────────────────────── */}
            <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
              <div className="nav-logo-mark">H</div>
              <div>
                <div className="nav-logo-name">
                  How Mou <span style={{ color: 'var(--red)' }}>Khow</span> Momo
                </div>
                <div className="nav-logo-sub">Midnapore, W.B.</div>
              </div>
            </Link>

            {/* ── Desktop links (hidden on mobile via CSS) ──────── */}
            <div className="nav-desktop-links">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
              <a href={`tel:${SITE_INFO.phone}`} className="nav-call-btn">
                Call Us
              </a>
            </div>

            {/* ── Hamburger (hidden on desktop via CSS) ─────────── */}
            <button
              className="nav-burger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`burger-icon ${menuOpen ? 'open' : ''}`}>
                <span /><span /><span />
              </span>
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nav-drawer-inner">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-drawer-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="btn-primary"
            style={{ marginTop: '0.5rem', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Call Us — {SITE_INFO.phone}
          </a>
        </div>
      </div>

      {/* ── Backdrop (closes drawer when tapped) ─────────────── */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
