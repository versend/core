import { Cta, Destinations, Facts } from "@/components/landing/details";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Pipeline } from "@/components/landing/pipeline";
import { Preview } from "@/components/landing/preview";

const HomePage = () => (
  <div className="flex flex-1 flex-col">
    <Hero />
    <Pipeline />
    <Preview />
    <Destinations />
    <Facts />
    <Cta />
    <Footer />
  </div>
);

export default HomePage;
