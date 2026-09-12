import React from "react";
import { notFound } from "next/navigation";
import { getTopicModule } from "@/modules/registry";
import { TopicModuleView } from "@/components/learning/TopicModuleView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moduleData = getTopicModule(slug);
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
  const moduleData = getTopicModule(slug);

  if (!moduleData) {
    notFound();
  }

  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <TopicModuleView slug={slug} />
    </main>
  );
}
