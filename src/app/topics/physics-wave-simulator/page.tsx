import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/science/physics-wave-simulator/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Simulator Gelombang Mekanik & Interferensi | Nalar STEM",
  description:
    "Eksplorasi interaktif gelombang transversal, gelombang suara longitudinal, hubungan cepat rambat v = λf, serta interferensi superposisi.",
};

export default function WaveSimulatorTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="physics-wave-simulator"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
