import { Helmet } from 'react-helmet-async'

/**
 * useSEO — drop this into any page component.
 * @param {Object} opts
 * @param {string} opts.title       Full page title (60 chars max)
 * @param {string} opts.description Meta description (155 chars max)
 * @param {string} opts.canonical   Absolute canonical URL for this page
 * @param {string} [opts.ogImage]   Absolute OG image URL (optional, defaults to site image)
 */
export default function SEO({ title, description, canonical, ogImage }) {
  const image = ogImage || 'https://howmoukhowmomo.in/images/og-image.png'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
