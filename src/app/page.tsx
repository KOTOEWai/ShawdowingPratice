import {
  HeroSection,
  StatsBar,
  HowItWorks,
  FeaturedTopics,
  Benefits,
  Reviews,
  FAQ,
  CallToAction,
} from "@/features/landing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <FeaturedTopics />
      <Benefits />
      <Reviews />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}
