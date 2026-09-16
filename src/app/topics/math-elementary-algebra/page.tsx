import React from "react";
import type { Metadata } from "next";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export const metadata: Metadata = {
  title: "Aljabar Elementer | Nalar STEM",
  description:
    "Variabel dinamis, timbangan kesetaraan, dan penyelesaian sistem persamaan linear.",
};

export default function ElementaryAlgebraPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <ComprehensiveLessonPlayer topicSlug="math-elementary-algebra" />
    </main>
  );
}
