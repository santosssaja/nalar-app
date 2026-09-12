import React from "react";
import { getTopicModule } from "@/modules/registry";
import { LevelPlayerClient } from "@/components/learning/LevelPlayerClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}) {
  const { slug, level } = await params;
  const moduleData = getTopicModule(slug);
  const lvlNum = parseInt(level, 10);
  const targetLevel = moduleData?.levels.find((l) => l.index === lvlNum);

  if (!moduleData || !targetLevel) {
    return { title: "Level Tidak Ditemukan | Nalar" };
  }

  return {
    title: `Level ${lvlNum}: ${targetLevel.title} - ${moduleData.title} | Nalar`,
    description: targetLevel.description,
  };
}

export default async function TopicLevelPlayPage({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}) {
  const { slug, level } = await params;
  const lvlNum = parseInt(level, 10);

  return (
    <div className="w-full min-h-[calc(100vh-60px)]">
      <LevelPlayerClient slug={slug} levelIndex={lvlNum} />
    </div>
  );
}
