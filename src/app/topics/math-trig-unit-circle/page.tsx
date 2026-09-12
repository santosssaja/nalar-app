import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/math/math-trig-unit-circle/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Lingkaran Satuan Trigonometri | Nalar STEM",
  description:
    "Eksplorasi interaktif fungsi trigonometri sinus, kosinus, dan tangen sebagai proyeksi spasial titik pada lingkaran berjari-jari satu.",
};

export default function TrigTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="math-trig-unit-circle"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
