import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS, SITE_INFO } from '../store/store'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '0.5rem',
              background: 'var(--red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.1rem',
              color: 'white',
              flexShrink: 0,
            }}>
              H
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.1,
              }}>
                How Mou <span style={{ color: 'var(--red)' }}>Khow</span> Momo
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Midnapore, W.B.
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }} className="hidden md:flex">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textDecoration: 'none',
                  color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(244,185,66,0.08)' : 'transparent',
                  transition: 'all 0.25s',
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={`tel:${SITE_INFO.phone}`}
              style={{
                marginLeft: '0.75rem',
                padding: '0.55rem 1.2rem',
                background: 'linear-gradient(135deg, var(--red), var(--red-dark))',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(230,57,70,0.3)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Call Us
            </a>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: '1rem',
              lineHeight: 1,
            }}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            padding: '1rem 0 1.5rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  padding: '0.85rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? 'var(--gold)' : 'var(--text)',
                  background: isActive ? 'rgba(244,185,66,0.07)' : 'transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="btn-primary"
              style={{ marginTop: '0.75rem' }}
            >
              Call Us — {SITE_INFO.phone}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
