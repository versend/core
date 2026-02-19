"use client";

import dynamic from "next/dynamic";

const LightRays = dynamic(
  () =>
    import("@/components/ui/light-rays").then((mod) => ({
      default: mod.LightRays,
    })),
  { ssr: false }
);

export function LightRaysDynamic() {
  return <LightRays />;
}
