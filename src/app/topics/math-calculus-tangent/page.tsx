import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/math/math-calculus-tangent/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Garis Singgung & Turunan Kalkulus | Nalar STEM",
  description:
    "Eksplorasi interaktif limit kemiringan garis sekan menjadi garis singgung kalkulus sesaat (f'(a)) dengan visualisasi konvergensi dinamis.",
};

export default function TangentTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="math-calculus-tangent"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
