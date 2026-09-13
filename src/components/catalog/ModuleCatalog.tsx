"use client";

import React, { useState, useMemo } from "react";
import {
  getCombinedCurriculum,
  calculateTopicStatus,
  getTopicPrerequisites,
  CurriculumDomain,
  CurriculumStage,
  TopicCurriculumItem,
} from "@/lib/curriculum";
import { useGamification } from "@/context/GamificationContext";
import { TopicDetailModal } from "@/components/skill-tree/TopicDetailModal";
import { SkillTree } from "@/components/skill-tree/SkillTree";
import { CatalogStats } from "./CatalogStats";
import { CatalogFilters } from "./CatalogFilters";
import { ModuleCard } from "./ModuleCard";
import { LayoutGrid, Network, RefreshCw } from "lucide-react";

export interface ModuleCatalogProps {
  defaultDomain?: CurriculumDomain;
  defaultStage?: CurriculumStage;
}

export function ModuleCatalog({
  defaultDomain = "all",
  defaultStage = "all",
}: ModuleCatalogProps) {
  const { progress } = useGamification();
  const [domain, setDomain] = useState<CurriculumDomain>(defaultDomain);
  const [stage, setStage] = useState<CurriculumStage>(defaultStage);
  const [searchQuery, setSearchQuery] = useState("");
  const [availability, setAvailability] = useState<"all" | "available" | "completed" | "locked">("all");
  const [selectedTopic, setSelectedTopic] = useState<TopicCurriculumItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "tree">("grid");

  // Load complete dataset from curriculum
  const allTreeData = useMemo(() => getCombinedCurriculum("all"), []);

  // Compute counts per domain for filter tabs
  const domainCounts = useMemo(() => {
    const counts: Record<CurriculumDomain, number> = {
      all: allTreeData.nodes.length,
      math: 0,
      physics: 0,
      chemistry: 0,
      biology: 0,
      softskill: 0,
    };
    allTreeData.nodes.forEach((n) => {
      if (counts[n.domain] !== undefined) {
        counts[n.domain] += 1;
      }
    });
    return counts;
  }, [allTreeData]);

  // Overall catalog metrics
  const availableCount = useMemo(
    () => allTreeData.nodes.filter((n) => n.isAvailable).length,
    [allTreeData]
  );
  const totalXp = useMemo(
    () => allTreeData.nodes.reduce((acc, n) => acc + n.xp, 0),
    [allTreeData]
  );

  // Filtered topics based on search & filters
  const filteredTopics = useMemo(() => {
    return allTreeData.nodes.filter((node) => {
      // Domain filter
      if (domain !== "all" && node.domain !== domain) return false;

      // Stage filter
      if (stage !== "all" && node.stage !== stage) return false;

      // Status filter
      const status = calculateTopicStatus(node, progress.completedTopics, allTreeData);
      if (availability === "available" && !node.isAvailable) return false;
      if (availability === "completed" && status !== "done") return false;
      if (availability === "locked" && status !== "locked") return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = node.title.toLowerCase().includes(query);
        const matchDesc = node.description.toLowerCase().includes(query);
        const matchDomain = node.domain.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchDomain) return false;
      }

      return true;
    });
  }, [allTreeData, domain, stage, availability, searchQuery, progress.completedTopics]);

  return (
    <div className="w-full space-y-6">
      {/* 1. Metric stats row */}
      <CatalogStats
        totalCount={allTreeData.nodes.length}
        availableCount={availableCount}
        completedCount={progress.completedTopics.length}
        totalXp={totalXp}
      />

      {/* 2. View Mode Switcher: Katalog Grid vs Peta Graf Relasi */}
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === "grid"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Katalog Modul (Grid)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("tree")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === "tree"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Peta Pohon Relasi (Graf)</span>
          </button>
        </div>

        <span className="text-xs text-neutral-400 hidden sm:inline">
          {viewMode === "grid" ? "Tampilan kartu berurutan" : "Kanvas graf prasyarat terhubung"}
        </span>
      </div>

      {/* 3. Main View Render */}
      {viewMode === "grid" ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <CatalogFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDomain={domain}
            onSelectDomain={setDomain}
            selectedStage={stage}
            onSelectStage={setStage}
            selectedAvailability={availability}
            onSelectAvailability={setAvailability}
            domainCounts={domainCounts}
            totalFiltered={filteredTopics.length}
          />

          {/* Cards Grid or Empty State */}
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredTopics.map((topic) => {
                const status = calculateTopicStatus(topic, progress.completedTopics, allTreeData);
                const prereqs = getTopicPrerequisites(topic.id, allTreeData);

                return (
                  <ModuleCard
                    key={topic.id}
                    topic={topic}
                    status={status}
                    prerequisites={prereqs}
                    onOpenDetail={setSelectedTopic}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <p className="text-sm text-neutral-400">
                Tidak ada topik yang cocok dengan filter atau kata kunci pencarian.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setDomain("all");
                  setStage("all");
                  setAvailability("all");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Semua Filter</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <SkillTree domain={domain} stage={stage} />
        </div>
      )}

      {/* 4. Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          status={calculateTopicStatus(selectedTopic, progress.completedTopics, allTreeData)}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </div>
  );
}
