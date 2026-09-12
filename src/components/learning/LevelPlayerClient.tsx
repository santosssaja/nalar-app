"use client";

import React from "react";
import { notFound } from "next/navigation";
import { getTopicModule } from "@/modules/registry";
import { StepRenderer } from "./StepRenderer";

export interface LevelPlayerClientProps {
  slug: string;
  levelIndex: number;
}

export function LevelPlayerClient({ slug, levelIndex }: LevelPlayerClientProps) {
  const moduleData = getTopicModule(slug);
  if (!moduleData) {
    notFound();
  }

  const targetLevel = moduleData.levels.find((l) => l.index === levelIndex);
  if (!targetLevel) {
    notFound();
  }

  return (
    <div className="w-full min-h-[calc(100vh-60px)]">
      <StepRenderer topicSlug={slug} level={targetLevel} />
    </div>
  );
}
