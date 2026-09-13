import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/science/physics-roller-coaster/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Roller Coaster & Konservasi Energi | Nalar STEM",
  description:
    "Eksplorasi interaktif hukum kekekalan energi mekanik, pertukaran energi potensial dan kinetik, serta syarat kelajuan kritis loop vertikal.",
};

export default function RollerCoasterTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="physics-roller-coaster"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
