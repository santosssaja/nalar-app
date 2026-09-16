import React from "react";
import type { Metadata } from "next";
import { InteractiveDashboard } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard Lingkungan Belajar STEM | Nalar",
  description:
    "Lingkungan belajar interaktif STEM: lanjutkan aktivitas, rekomendasi topik berbasis DAG, visualisasi 5 dimensi kemahiran, eksperimen virtual, dan jembatan konsep sains-matematika.",
};

export default function DashboardPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <InteractiveDashboard />
    </main>
  );
}
