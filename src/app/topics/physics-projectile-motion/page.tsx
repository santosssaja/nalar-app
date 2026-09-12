import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/science/physics-projectile-motion/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Kanon Proyektil & Gerak Parabola | Nalar STEM",
  description:
    "Eksplorasi interaktif gerak parabola dua dimensi, dekomposisi kecepatan, jangkauan maksimum 45 derajat, dan gravitasi multi-planet.",
};

export default function ProjectileTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="physics-projectile-motion"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
