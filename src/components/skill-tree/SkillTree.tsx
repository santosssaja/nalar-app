"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import {
  CurriculumDomain,
  CurriculumStage,
  TopicCurriculumItem,
  TopicNodeStatus,
} from "@/lib/curriculum/types";
import {
  getCombinedCurriculum,
  calculateTopicStatus,
} from "@/lib/curriculum";
import { TopicNode, TopicNodeData } from "./TopicNode";
import { PrereqEdge } from "./PrereqEdge";
import { SkillTreeMinimap } from "./SkillTreeMinimap";
import { TopicDetailModal } from "./TopicDetailModal";
import { useGamification } from "@/context/GamificationContext";
import { useNai } from "@/components/nai/NaiContext";

export interface SkillTreeProps {
  domain?: CurriculumDomain;
  stage?: CurriculumStage;
}

const nodeTypes = {
  topicNode: TopicNode,
};

const edgeTypes = {
  prereqEdge: PrereqEdge,
};

export function SkillTree({ domain = "all", stage = "all" }: SkillTreeProps) {
  const { progress } = useGamification();
  const { say } = useNai();
  const [selectedTopic, setSelectedTopic] = useState<TopicCurriculumItem | null>(null);

  const treeData = useMemo(() => getCombinedCurriculum(domain), [domain]);

  // Filter nodes by stage
  const filteredNodes = useMemo(() => {
    if (stage === "all") return treeData.nodes;
    return treeData.nodes.filter((n) => n.stage === stage);
  }, [treeData.nodes, stage]);

  const filteredNodeIds = useMemo(
    () => new Set(filteredNodes.map((n) => n.id)),
    [filteredNodes]
  );

  // Filter edges where both source & target exist in filtered nodes
  const filteredEdges = useMemo(() => {
    return treeData.edges.filter(
      (e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
    );
  }, [treeData.edges, filteredNodeIds]);

  // Convert to React Flow Nodes
  const rfNodes: Node<TopicNodeData>[] = useMemo(() => {
    return filteredNodes.map((item) => {
      const status = calculateTopicStatus(
        item,
        progress.completedTopics,
        treeData
      );

      return {
        id: item.id,
        type: "topicNode",
        position: item.position,
        data: {
          topic: item,
          status,
          onSelectTopic: (topic) => setSelectedTopic(topic),
        },
      };
    });
  }, [filteredNodes, progress.completedTopics, treeData]);

  // Convert to React Flow Edges
  const rfEdges: Edge[] = useMemo(() => {
    return filteredEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: "prereqEdge",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 14,
        height: 14,
        color: "#6366f1",
      },
    }));
  }, [filteredEdges]);

  // Suggest best starting topic via Nai on first render
  useEffect(() => {
    const recommended = filteredNodes.find(
      (n) => n.isAvailable && !progress.completedTopics.includes(n.slug)
    );
    if (recommended) {
      say(`Coba mulai dari topik "${recommended.title}" ini! Visualisasi interaktifnya sudah siap dieksplorasi.`, {
        expression: "hinting",
        actionText: "Buka Topik",
        onAction: () => setSelectedTopic(recommended),
      });
    } else {
      say("Selamat datang di Peta Kurikulum! Pilih modul mana pun untuk melihat peta prasyaratnya.", {
        expression: "happy",
      });
    }
  }, [filteredNodes, progress.completedTopics, say]);

  const selectedTopicStatus: TopicNodeStatus = useMemo(() => {
    if (!selectedTopic) return "locked";
    return calculateTopicStatus(
      selectedTopic,
      progress.completedTopics,
      treeData
    );
  }, [selectedTopic, progress.completedTopics, treeData]);

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#27272a" gap={24} size={1.5} />
        <Controls
          showInteractive={false}
          className="!bg-neutral-900 !border !border-neutral-700 !rounded-2xl !p-1 !shadow-xl !top-4 !left-4"
        />
        <SkillTreeMinimap />
      </ReactFlow>

      {/* Topic Detail Modal */}
      <TopicDetailModal
        topic={selectedTopic}
        status={selectedTopicStatus}
        onClose={() => setSelectedTopic(null)}
      />
    </div>
  );
}
