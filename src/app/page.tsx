import {
  HeroSection,
  SentenceOfTheDay,
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
    <div className="flex flex-col min-h-screen bg-[#2E2E2E]">
      <HeroSection />
      <SentenceOfTheDay />
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
