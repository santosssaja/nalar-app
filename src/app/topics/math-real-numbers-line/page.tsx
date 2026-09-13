import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/math/math-real-numbers-line/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Operasi Bilangan Riil & Garis Bilangan | Nalar STEM",
  description:
    "Eksplorasi spasial garis bilangan riil kontinu, vektor translasi, dilatasi skala, kerapatan pecahan, dan penemuan bilangan irasional.",
};

export default function RealNumbersPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="math-real-numbers-line"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
