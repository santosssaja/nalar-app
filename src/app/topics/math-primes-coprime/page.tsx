import type { Metadata } from "next";
import { InteractiveLesson } from "@/modules/_legacy/math/math-primes-coprime_legacy/InteractiveLesson";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export const metadata: Metadata = {
  title: "Faktorisasi Prima & Bilangan Koprima | Nalar STEM",
  description:
    "Eksplorasi partikel dasar aritmetika, susunan kisi balok prima, saringan Eratosthenes, relasi koprima garis pandang 2D, dan pilar RSA.",
};

export default function PrimesCoprimePage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView
        slug="math-primes-coprime"
        sandboxContent={<InteractiveLesson />}
      />
    </main>
  );
}
