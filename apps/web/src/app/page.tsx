import dynamic from "next/dynamic";

import { Footer } from "@/components/core/footer";
import { Hero } from "@/components/core/hero";

const LightRays = dynamic(
  () =>
    import("@/components/ui/light-rays").then((mod) => ({
      default: mod.LightRays,
    })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden p-4">
      <LightRays />
      <Hero />
      <Footer />
    </main>
  );
}
