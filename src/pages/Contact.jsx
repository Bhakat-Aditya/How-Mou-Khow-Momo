import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SITE_INFO } from '../store/store'

export default function Contact() {
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(headerRef.current, { opacity: 0, y: 40, duration: 0.9 })
      .from(formRef.current, { opacity: 0, x: -40, duration: 0.8 }, '-=0.4')
      .from(infoRef.current, { opacity: 0, x: 40, duration: 0.8 }, '-=0.7')
  }, [])

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Compose WhatsApp message
    const msg = encodeURIComponent(
      `Hello! I'm ${formData.name}.\n\n${formData.message}\n\nMy number: ${formData.phone}`
    )
    window.open(`https://wa.me/91${SITE_INFO.phone}?text=${msg}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', phone: '', message: '' })
  }

  const QUICK_CONTACTS = [
    { icon: '📞', label: 'Call Us', value: SITE_INFO.phone, href: `tel:${SITE_INFO.phone}`, desc: 'Mon–Sun, 11 AM to 10 PM' },
    { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: SITE_INFO.socialLinks.whatsapp, desc: 'Quick replies guaranteed!', external: true },
    { icon: '📍', label: 'Visit Us', value: 'Panchur Chawk, Midnapore', href: SITE_INFO.googleMapLink, desc: 'Open every day', external: true },
  ]

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          background: 'linear-gradient(135deg, var(--bg) 0%, rgba(230,57,70,0.06) 100%)',
          padding: '5rem 0 4rem',
          borderBottom: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div className="section-container">
          <span className="section-badge">✉️ Contact</span>
          <h1 className="section-title font-display">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '1rem auto 0' }}>
            Questions, bulk orders, or just craving momos? We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'start' }} className="contact-grid">
          {/* Form */}
          <div ref={formRef}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Send us a Message
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
              Fill this form and we'll reply via WhatsApp instantly.
            </p>

            {submitted && (
              <div style={{
                padding: '1rem 1.25rem',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '0.75rem',
                color: '#4ade80',
                fontWeight: 600,
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
              }}>
                ✅ Message sent via WhatsApp! We'll reply shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Das"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your order enquiry, feedback, or just say hi 👋"
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem', justifyContent: 'center' }}>
                💬 Send via WhatsApp
              </button>
            </form>
          </div>

          {/* Info */}
          <div ref={infoRef}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Other Ways to Reach Us
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
              Prefer calling? Visiting? Here's everything you need.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {QUICK_CONTACTS.map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.875rem',
                    textDecoration: 'none',
                    color: 'var(--text)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(230,57,70,0.3)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '0.75rem',
                    background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.15rem' }}>{c.value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>→</div>
                </a>
              ))}
            </div>

            {/* Hours Box */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(230,57,70,0.08), rgba(255,214,10,0.05))',
              border: '1px solid rgba(230,57,70,0.15)',
              borderRadius: '0.875rem',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                🕐 Opening Hours
              </div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{SITE_INFO.openDays}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold)' }}>{SITE_INFO.openHours}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </div>
  )
}
