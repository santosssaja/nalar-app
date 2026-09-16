import type { Metadata } from "next";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Bidang Miring & Hukum Newton | Nalar STEM",
  description:
    "Eksplorasi interaktif hukum gerak Newton pada bidang miring, dekomposisi gaya berat, gaya normal, friksi, dan percepatan luncur.",
};

export default function NewtonInclineTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="physics-newton-incline"
      />
    </main>
  );
}
