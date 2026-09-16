import React from "react";
import type { Metadata } from "next";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export const metadata: Metadata = {
  title: "Fungsi & Grafik | Nalar STEM",
  description:
    "Pemetaan deterministik, transformasi grafik translasi dan dilatasi, serta laju perubahan rata-rata.",
};

export default function FunctionsGraphsPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <ComprehensiveLessonPlayer topicSlug="math-functions-graphs" />
    </main>
  );
}
