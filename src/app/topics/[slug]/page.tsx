import React from "react";
import { notFound } from "next/navigation";
import { getTopicModule } from "@/modules/registry";
import { getComprehensiveLesson } from "@/modules/pedagogy-registry";
import { TopicModuleView } from "@/components/learning/TopicModuleView";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comprehensive = getComprehensiveLesson(slug);
  const moduleData = comprehensive || getTopicModule(slug);
  if (!moduleData) return { title: "Topik Tidak Ditemukan | Nalar" };
  return {
    title: `${moduleData.title} | Nalar STEM`,
    description: moduleData.summary,
  };
}

export default async function TopicOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comprehensive = getComprehensiveLesson(slug);
  const moduleData = comprehensive || getTopicModule(slug);

  if (!moduleData) {
    notFound();
  }

  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      {comprehensive ? (
        <ComprehensiveLessonPlayer topicSlug={slug} />
      ) : (
        <TopicModuleView slug={slug} />
      )}
    </main>
  );
}
