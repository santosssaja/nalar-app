import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/_legacy/science/physics-dc-circuits_legacy/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Pembangun Rangkaian Listrik DC | Nalar STEM",
  description:
    "Eksplorasi interaktif Hukum Ohm V = IR, hambatan seri & paralel, tegangan jepit, dan disipasi daya Joule.",
};

export default function DCCircuitsTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="physics-dc-circuits"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
