import type { Metadata } from "next";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Kanon Proyektil & Gerak Parabola | Nalar STEM",
  description:
    "Eksplorasi interaktif gerak parabola dua dimensi, dekomposisi kecepatan, jangkauan maksimum 45 derajat, dan gravitasi multi-planet.",
};

export default function ProjectileTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView slug="science-kinematics" />
    </main>
  );
}
