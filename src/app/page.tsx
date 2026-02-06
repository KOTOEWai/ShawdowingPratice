import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/HeroSection";
import Review from "@/components/Reviews";

export default function Home() {
  return (
      <div>
      <Hero/>
      <Benefits/> 
      <Review/>
      <FAQ/>
      <Footer/>
      </div> 
  );
}
