import type { Metadata } from "next";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Algoritma Euclid & Pengubinan FPB | Nalar STEM",
  description:
    "Eksplorasi geometris algoritma pembagian Euclid sebagai pengubinan persegi panjang dengan bujur sangkar terbesar untuk mencari Faktor Persekutuan Terbesar (FPB).",
};

export default function EuclidTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="math-euclid"
      />
    </main>
  );
}
