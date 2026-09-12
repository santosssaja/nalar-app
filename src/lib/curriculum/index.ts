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
    const domainNodes = scienceTreeData.nodes.filter((n) => n.domain === domain);
    if (domainNodes.length === 0) return scienceTreeData;

    const domainNodeIds = new Set(domainNodes.map((n) => n.id));
    const minX = Math.min(...domainNodes.map((n) => n.position.x));
    const normalizedNodes = domainNodes.map((n) => ({
      ...n,
      position: { x: n.position.x - minX + 120, y: n.position.y },
    }));

    return {
      nodes: normalizedNodes,
      edges: scienceTreeData.edges.filter(
        (e) => domainNodeIds.has(e.source) && domainNodeIds.has(e.target)
      ),
    };
  }

  if (domain === "softskill") return softskillsTreeData;

  // Domain === "all": combine all with generous lane spacing
  const mathNodes = mathTreeData.nodes.map((n) => ({
    ...n,
    position: { x: n.position.x, y: n.position.y },
  }));

  const scienceNodes = scienceTreeData.nodes.map((n) => ({
    ...n,
    position: { x: n.position.x + 1800, y: n.position.y },
  }));

  const softskillNodes = softskillsTreeData.nodes.map((n) => ({
    ...n,
    position: { x: n.position.x + 3100, y: n.position.y },
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
