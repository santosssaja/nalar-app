"use client";

import React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { ContinueLearningCard } from "./ContinueLearningCard";
import { MvpPathwayTracker } from "./MvpPathwayTracker";
import { MasteryRadarCard } from "./MasteryRadarCard";
import { KnowledgeConnectionsSection } from "./KnowledgeConnectionsSection";
import { VirtualLabsSection } from "./VirtualLabsSection";

export function InteractiveDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* 1. Dashboard Header & Learning Mode Switcher */}
      <DashboardHeader />

      {/* 2. Hero Row: Continue Learning & Recommended Next (Prerequisite DAG) */}
      <ContinueLearningCard />

      {/* 3. 6-Step MVP Vertical Slice Progression Tracker */}
      <MvpPathwayTracker />

      {/* 4. Matriks 5 Dimensi Kemahiran STEM (docs/new-module.md Section 11) */}
      <MasteryRadarCard />

      {/* 5. Jembatan Konseptual Matematika -> Sains (docs/new-module.md Section 15) */}
      <KnowledgeConnectionsSection />

      {/* 6. Laboratorium & Eksperimen Virtual (docs/new-module.md Section 14) */}
      <VirtualLabsSection />
    </div>
  );
}
