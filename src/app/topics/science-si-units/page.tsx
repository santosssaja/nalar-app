import React from "react";
import type { Metadata } from "next";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export const metadata: Metadata = {
  title: "Besaran, Satuan SI & Analisis Dimensi | Nalar STEM",
  description:
    "Bahasa formal pengukuran ilmiah, sistem satuan internasional SI, dan analisis dimensi.",
};

export default function SiUnitsPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <ComprehensiveLessonPlayer topicSlug="science-si-units" />
    </main>
  );
}
