import Hero from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import HowItWorks from "@/components/HowItWorks";
import FeaturedTopics from "@/components/FeaturedTopics";
import Benefits from "@/components/Benefits";
import Review from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsBar />
      <HowItWorks />
      <FeaturedTopics />
      <Benefits />
      <Review />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}
