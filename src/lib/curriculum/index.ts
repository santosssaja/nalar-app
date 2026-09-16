import {
  CurriculumDomain,
  CurriculumTreeData,
  CanonicalTopic,
  TopicNodeStatus,
} from "./types";
import { CANONICAL_TOPICS, KNOWLEDGE_GRAPH_EDGES, CANONICAL_KNOWLEDGE_GRAPH } from "./data/topics";
import { CONCEPT_CONNECTIONS } from "./data/connections";
import {
  isTopicUnlocked,
  getTopicStatus,
  getTopicPrerequisites as getPrereqsFromEngine,
  getTopicDependents,
  getTopicConceptConnections,
  getRecommendedNextTopic,
  calculateOverallMastery,
} from "./prerequisite-engine";

export * from "./types";
export * from "./data/topics";
export * from "./data/connections";
export * from "./prerequisite-engine";

/**
 * Returns tree data for the knowledge graph.
 * Defaults to the canonical knowledge graph containing Math, Science, and their bridges.
 */
export function getCombinedCurriculum(domain: CurriculumDomain = "all"): CurriculumTreeData {
  if (domain === "all") {
    return {
      nodes: CANONICAL_TOPICS,
      edges: KNOWLEDGE_GRAPH_EDGES,
    };
  }

  if (domain === "math") {
    const mathNodes = CANONICAL_TOPICS.filter((n) => n.subject === "math");
    const mathNodeIds = new Set(mathNodes.map((n) => n.id));
    return {
      nodes: mathNodes,
      edges: KNOWLEDGE_GRAPH_EDGES.filter(
        (e) => mathNodeIds.has(e.source) && mathNodeIds.has(e.target)
      ),
    };
  }

  if (domain === "science" || domain === "physics" || domain === "chemistry" || domain === "biology") {
    const scienceNodes = CANONICAL_TOPICS.filter((n) => {
      if (domain === "science") return n.subject === "science";
      return n.domain === domain;
    });
    const sciNodeIds = new Set(scienceNodes.map((n) => n.id));
    return {
      nodes: scienceNodes,
      edges: KNOWLEDGE_GRAPH_EDGES.filter(
        (e) => sciNodeIds.has(e.source) && sciNodeIds.has(e.target)
      ),
    };
  }

  return {
    nodes: CANONICAL_TOPICS,
    edges: KNOWLEDGE_GRAPH_EDGES,
  };
}

/**
 * Compatibility helper for existing catalog components
 */
export function calculateTopicStatus(
  item: CanonicalTopic,
  completedTopicSlugs: string[],
  treeData?: CurriculumTreeData
): TopicNodeStatus {
  const isDone =
    completedTopicSlugs.includes(item.id) || completedTopicSlugs.includes(item.slug);
  if (isDone) return "completed";

  const unlocked = isTopicUnlocked(
    item.id,
    completedTopicSlugs,
    treeData?.nodes || CANONICAL_TOPICS
  );
  return unlocked ? "active" : "locked";
}

/**
 * Compatibility helper for existing topic prerequisite lookup
 */
export function getTopicPrerequisites(
  topicId: string,
  treeData?: CurriculumTreeData
): CanonicalTopic[] {
  return getPrereqsFromEngine(topicId, treeData?.nodes || CANONICAL_TOPICS);
}
