import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Markets from "./components/Markets";
import Pricing from "./components/Pricing";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Markets />
      <Pricing />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
