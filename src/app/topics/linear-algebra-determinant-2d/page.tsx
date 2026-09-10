import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/math/linear-algebra-determinant-2d/InteractiveLesson";

export const metadata: Metadata = {
  title: "Determinan Matriks 2D: Transformasi Luas Ruang | Nalar",
  description:
    "Eksplorasi intuitif determinan aljabar linear sebagai transformasi luas wilayah jajaran genjang 2D dengan kanvas interaktif Mafs dan kalkulasi KaTeX real-time.",
};

export default function TopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <InteractiveLesson />
    </main>
  );
}
