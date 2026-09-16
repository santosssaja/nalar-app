import React from "react";
import type { Metadata } from "next";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export const metadata: Metadata = {
  title: "Kinematika (Flagship STEM) | Nalar",
  description:
    "Flagship MVP Nalar: Eksplorasi gerak satu dan dua dimensi, GLB, GLBB, jatuh bebas, dan gerak parabola dengan sinkronisasi 4 grafik fisis real-time.",
};

export default function KinematicsPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <ComprehensiveLessonPlayer topicSlug="science-kinematics" />
    </main>
  );
}
