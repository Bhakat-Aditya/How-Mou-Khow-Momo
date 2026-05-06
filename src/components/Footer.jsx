import { Link } from 'react-router-dom'
import { SITE_INFO, NAV_LINKS } from '../store/store'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '0.5rem',
                background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', color: 'white',
              }}>H</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700 }}>
                  How Mou <span style={{ color: 'var(--red)' }}>Khow</span> Momo
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Midnapore's Favourite
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 260 }}>
              Handcrafted momos made fresh every day. Come hungry, leave happy.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={`tel:${SITE_INFO.phone}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                {SITE_INFO.phone}
              </a>
              <a href={SITE_INFO.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                WhatsApp
              </a>
              <a href={SITE_INFO.googleMapLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {SITE_INFO.city}, {SITE_INFO.state}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Hours
            </h4>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              {SITE_INFO.openDays}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '1rem' }}>
              {SITE_INFO.openHours}
            </div>
            <a
              href={SITE_INFO.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            &copy; {year} How Mou Khow Momo. All rights reserved.
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            Made with love in Midnapore, West Bengal
          </p>
        </div>
      </div>
    </footer>
  )
}
