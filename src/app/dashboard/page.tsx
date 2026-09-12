import React from "react";
import type { Metadata } from "next";
import { Dashboard } from "@/components/gamification/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard Progres Belajar | Nalar STEM",
  description:
    "Pantau akumulasi poin pengalaman (XP), tingkat kemahiran, streak belajar harian, dan koleksi lencana STEM kamu.",
};

export default function DashboardPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <Dashboard />
    </main>
  );
}
