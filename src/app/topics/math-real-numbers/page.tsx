import React from "react";
import type { Metadata } from "next";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export const metadata: Metadata = {
  title: "Operasi Bilangan Riil & Garis Bilangan | Nalar STEM",
  description:
    "Eksplorasi spasial garis bilangan riil kontinu, vektor translasi, dan dilatasi skala.",
};

export default function RealNumbersPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <ComprehensiveLessonPlayer topicSlug="math-real-numbers" />
    </main>
  );
}
