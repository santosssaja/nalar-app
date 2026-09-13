import React from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { NaiIntroSection } from "@/components/landing/NaiIntroSection";
import { GuidedDiscoveryShowcase } from "@/components/landing/GuidedDiscoveryShowcase";
import { FeaturedModulesGrid } from "@/components/landing/FeaturedModulesGrid";
import { InclusivityShowcase } from "@/components/landing/InclusivityShowcase";
import { CtaBanner } from "@/components/landing/CtaBanner";

export const metadata = {
  title: "Nalar — Belajar STEM Interaktif & Inklusif Lewat Intuisi Visual",
  description:
    "Platform pembelajaran STEM interaktif dengan simulasi kanvas 60 FPS, metodologi Guided Discovery, AI Tutor ramah difabel, dan tanpa hambatan registrasi.",
};

export default function Home() {
  return (
    <div className="flex-1 w-full bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* 1. Hero Section with Value Proposition & Quick Stats */}
      <HeroSection />

      {/* 2. Interactive Nai Mascot Introduction & Voice Demo */}
      <NaiIntroSection />

      {/* 3. Guided Discovery Learning Workflow (4-Phase Pipeline) */}
      <GuidedDiscoveryShowcase />

      {/* 4. Curated Flagship STEM Modules Grid (Math & Science Filterable) */}
      <FeaturedModulesGrid />

      {/* 5. Four Inclusivity & Accessibility Architecture Pillars */}
      <InclusivityShowcase />

      {/* 6. Closing Call-To-Action Banner */}
      <CtaBanner />
    </div>
  );
}
