import { mathTreeData } from "./math-tree";
import { scienceTreeData } from "./science-tree";
import { softskillsTreeData } from "./softskills-tree";
import {
  CurriculumDomain,
  CurriculumTreeData,
  TopicCurriculumItem,
  TopicNodeStatus,
} from "./types";

export * from "./types";
export * from "./math-tree";
export * from "./science-tree";
export * from "./softskills-tree";

export function getCombinedCurriculum(domain: CurriculumDomain = "all"): CurriculumTreeData {
  if (domain === "math") return mathTreeData;
  if (domain === "physics" || domain === "chemistry" || domain === "biology") {
    return {
      nodes: scienceTreeData.nodes.filter((n) => n.domain === domain),
      edges: scienceTreeData.edges,
    };
  }
  if (domain === "softskill") return softskillsTreeData;

  // Domain === "all": combine all
  // Adjust positions so domains sit on neat side-by-side or stacked lanes
  const mathNodes = mathTreeData.nodes.map((n) => ({
    ...n,
    position: { x: n.position.x, y: n.position.y },
  }));

  const scienceNodes = scienceTreeData.nodes.map((n) => ({
    ...n,
    position: { x: n.position.x + 1300, y: n.position.y },
  }));

  const softskillNodes = softskillsTreeData.nodes.map((n) => ({
    ...n,
    position: { x: n.position.x + 2300, y: n.position.y },
  }));

  return {
    nodes: [...mathNodes, ...scienceNodes, ...softskillNodes],
    edges: [
      ...mathTreeData.edges,
      ...scienceTreeData.edges,
      ...softskillsTreeData.edges,
    ],
  };
}

export function calculateTopicStatus(
  item: TopicCurriculumItem,
  completedTopicSlugs: string[],
  treeData: CurriculumTreeData
): TopicNodeStatus {
  // If user completed this topic
  if (completedTopicSlugs.includes(item.slug)) {
    return "done";
  }

  // Find all edges pointing to this node (prerequisites)
  const incomingEdges = treeData.edges.filter((e) => e.target === item.id);

  // If node has no incoming edges, it is active by default
  if (incomingEdges.length === 0) {
    return "active";
  }

  // Check if every incoming prerequisite node is done
  const allPrereqsMet = incomingEdges.every((edge) => {
    const parentNode = treeData.nodes.find((n) => n.id === edge.source);
    if (!parentNode) return true;
    return completedTopicSlugs.includes(parentNode.slug);
  });

  return allPrereqsMet ? "active" : "locked";
}
