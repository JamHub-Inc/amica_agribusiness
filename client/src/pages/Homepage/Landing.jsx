import { ChatWidget } from '../../components/sections/ChatWidget'
import CTASection from '../../components/sections/CTASection'
import FeaturesPreview from '../../components/sections/FeaturesSection'
import Footer from '../../components/sections/Footer'
import HeroSection from '../../components/sections/HeroSection'
import Navigation from '../../components/sections/Navigation'
import HowItWorks from '../../components/sections/HowItWorks'
import WhoWeServe from '../../components/sections/WhoWeServe'
import PriceAwareness from '../../components/sections/PriceAwareness'
import { ScrollToTop } from '../../components/sections/ScrollToTop'

export default function WebsiteHome() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navigation />
            <HeroSection />
            <FeaturesPreview />
            <HowItWorks />
            <WhoWeServe />
            <PriceAwareness />
            <CTASection />
            <Footer />
            <ScrollToTop />
            <ChatWidget />
        </main>
    )
}
