import SEO from '../components/SEO'
import HeroSection from '../components/HeroSection'
import MustTrySection from '../components/MustTrySection'
import WhyUsSection from '../components/WhyUsSection'
import ReviewsSection from '../components/ReviewsSection'
import LocationPreviewSection from '../components/LocationPreviewSection'

export default function Home() {
  return (
    <>
      <SEO
        title="How Mou Khow Momo | Best Momos in Midnapore, West Bengal"
        description="How Mou Khow Momo — Midnapore's favourite momo stall at Panchur Chawk. Steamed, fried, chilli, butter masala, kurkure & cheese momos. Open daily 11 AM–10 PM. Starting ₹55."
        canonical="https://howmoukhowmomo.in/"
        ogImage="https://howmoukhowmomo.in/images/butter.png"
      />
      <HeroSection />
      <MustTrySection />
      <WhyUsSection />
      <ReviewsSection />
      <LocationPreviewSection />
    </>
  )
}
