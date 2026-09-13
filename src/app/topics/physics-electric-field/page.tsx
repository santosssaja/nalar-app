import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/science/physics-electric-field/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Medan & Gaya Listrik | Nalar STEM",
  description:
    "Eksplorasi interaktif Hukum Coulomb, vektor medan elektrostatik, superposisi, dan dipol listrik.",
};

export default function ElectricFieldTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="physics-electric-field"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
