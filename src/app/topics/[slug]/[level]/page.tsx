import React from "react";
import { getTopicModule } from "@/modules/registry";
import { LevelPlayerClient } from "@/components/learning/LevelPlayerClient";
import { resolveLevelToken } from "@/lib/curriculum/level-token";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}) {
  const { slug, level } = await params;
  const moduleData = getTopicModule(slug);
  const lvlNum = resolveLevelToken(slug, level, moduleData?.levels.length ?? 3);
  const targetLevel = moduleData?.levels.find((l) => l.index === lvlNum);

  if (!moduleData || !targetLevel) {
    return { title: "Tingkat Belajar | Nalar" };
  }

  return {
    title: `Tingkat ${targetLevel.index}: ${targetLevel.title} - ${moduleData.title} | Nalar`,
    description: targetLevel.description,
  };
}

export default async function TopicLevelPlayPage({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}) {
  const { slug, level } = await params;

  return (
    <div className="w-full min-h-[calc(100dvh-64px)] md:h-[calc(100dvh-64px)] md:max-h-[calc(100dvh-64px)] overflow-y-auto md:overflow-hidden flex flex-col bg-neutral-950">
      <LevelPlayerClient slug={slug} levelParam={level} />
    </div>
  );
}
