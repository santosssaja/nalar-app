"use client";

import React from "react";
import { notFound } from "next/navigation";
import { getTopicModule } from "@/modules/registry";
import { StepRenderer } from "./StepRenderer";
import { LevelLockedView } from "./LevelLockedView";
import { resolveLevelToken, isLevelUnlocked } from "@/lib/curriculum/level-token";
import { useGamification } from "@/context/GamificationContext";

export interface LevelPlayerClientProps {
  slug: string;
  levelParam: string;
}

export function LevelPlayerClient({ slug, levelParam }: LevelPlayerClientProps) {
  const { progress } = useGamification();
  const moduleData = getTopicModule(slug);

  if (!moduleData) {
    notFound();
  }

  // Determine which level indexes are completed by the user
  const completedLevelIndexes = moduleData.levels
    .filter((lvl) => {
      const challengeSteps = lvl.steps.filter((s) => s.type === "challenge" && s.challenge);
      if (challengeSteps.length === 0) return false;
      return challengeSteps.every((cs) =>
        progress.solvedChallenges.includes(cs.challenge!.id)
      );
    })
    .map((lvl) => lvl.index);

  const highestUnlockedLevelIndex = Math.min(
    moduleData.levels.length,
    (completedLevelIndexes[completedLevelIndexes.length - 1] || 0) + 1
  );

  // Resolve obfuscated level token (strictly rejects raw numbers like "2" or "3")
  const resolvedLevelIndex = resolveLevelToken(
    slug,
    levelParam,
    moduleData.levels.length
  );

  // If levelParam is not a valid token (e.g. someone entered "/3" directly)
  if (resolvedLevelIndex === null) {
    return (
      <div className="w-full h-full max-h-full overflow-hidden flex flex-col justify-center">
        <LevelLockedView
          topicSlug={slug}
          topicTitle={moduleData.title}
          highestUnlockedLevelIndex={highestUnlockedLevelIndex}
          reason="invalid_token"
        />
      </div>
    );
  }

  // Validate whether the target level is unlocked for the user
  const isUnlocked = isLevelUnlocked(resolvedLevelIndex, completedLevelIndexes);

  if (!isUnlocked) {
    return (
      <div className="w-full h-full max-h-full overflow-hidden flex flex-col justify-center">
        <LevelLockedView
          topicSlug={slug}
          topicTitle={moduleData.title}
          targetLevelIndex={resolvedLevelIndex}
          highestUnlockedLevelIndex={highestUnlockedLevelIndex}
          reason="locked"
        />
      </div>
    );
  }

  const targetLevel = moduleData.levels.find((l) => l.index === resolvedLevelIndex);
  if (!targetLevel) {
    notFound();
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-auto md:overflow-hidden flex flex-col">
      <StepRenderer
        topicSlug={slug}
        level={targetLevel}
        totalLevels={moduleData.levels.length}
      />
    </div>
  );
}
