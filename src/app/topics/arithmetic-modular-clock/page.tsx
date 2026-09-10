import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/math/arithmetic-modular-clock/InteractiveLesson";

export const metadata: Metadata = {
  title: "Aritmetika Jam: Modulo & Siklus Bilangan | Nalar STEM",
  description:
    "Eksplorasi visual konsep modulo matematika melalui simulasi jam dinding interaktif, visualisasi kurva kardioid, dan teka-teki bilangan bulat.",
};

export default function ModularClockTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <InteractiveLesson />
    </main>
  );
}
