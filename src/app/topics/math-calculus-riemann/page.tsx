import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/_legacy/math/math-calculus-riemann_legacy/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Jumlah Riemann & Kalkulus Integral | Nalar STEM",
  description:
    "Eksplorasi interaktif integral tentu sebagai limit akumulasi luas persegi panjang partisi Riemann di bawah kurva fungsi.",
};

export default function RiemannTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="math-calculus-riemann"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
