import { Cta } from "@/components/landing/cta";
import { Destinations } from "@/components/landing/destinations";
import { Facts } from "@/components/landing/facts";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Pipeline } from "@/components/landing/pipeline";
import { Preview } from "@/components/preview/preview";

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
