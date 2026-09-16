import type { Metadata } from "next";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Getaran Harmonik Sederhana (Bandul & Pegas) | Nalar STEM",
  description:
    "Eksplorasi interaktif getaran harmonik sederhana pada bandul Galilei dan sistem pegas Hooke, frekuensi osilasi, serta jejak kurva gelombang sinusoidal.",
};

export default function HarmonicOscillatorTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="physics-harmonic-oscillator"
      />
    </main>
  );
}
