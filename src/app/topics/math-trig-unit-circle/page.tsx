import React from "react";
import type { Metadata } from "next";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export const metadata: Metadata = {
  title: "Trigonometri & Lingkaran Satuan | Nalar STEM",
  description:
    "Lingkaran satuan r = 1, rasio sinus dan kosinus, koordinat polar, dan identitas Pythagoras.",
};

export default function TrigUnitCirclePage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <ComprehensiveLessonPlayer topicSlug="math-trig-unit-circle" />
    </main>
  );
}
