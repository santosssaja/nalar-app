"use client";

import React from "react";
import { MiniMap } from "@xyflow/react";
import { TopicNodeData } from "./TopicNode";

export function SkillTreeMinimap() {
  const nodeColor = (node: { data?: unknown }) => {
    const data = node.data as TopicNodeData | undefined;
    if (!data) return "#52525b";

    if (data.status === "done") return "#10b981";
    if (data.status === "active") return "#6366f1";
    return "#3f3f46";
  };

  return (
    <MiniMap
      nodeColor={nodeColor}
      nodeStrokeWidth={3}
      nodeBorderRadius={8}
      maskColor="rgba(0, 0, 0, 0.7)"
      className="!bg-neutral-900/90 !border !border-neutral-800 !rounded-2xl !shadow-2xl overflow-hidden !bottom-4 !right-4"
    />
  );
}
