import { CanonicalTopic, TopicNodeStatus, FiveDimensionMastery } from "./types";
import { CANONICAL_TOPICS, KNOWLEDGE_GRAPH_EDGES } from "./data/topics";
import { CONCEPT_CONNECTIONS } from "./data/connections";

/**
 * Pure functions for Knowledge Graph DAG and Prerequisite Engine.
 * Adheres to AGENTS.md clean code and pure functions standard.
 */

/**
 * Check if all prerequisites of a topic have been completed by the user.
 */
export function isTopicUnlocked(
  topicId: string,
  completedTopicIds: string[],
  topics: CanonicalTopic[] = CANONICAL_TOPICS
): boolean {
  const topic = topics.find((t) => t.id === topicId || t.slug === topicId);
  if (!topic) return false;

  // Root topics (no prerequisites) are always unlocked
  if (topic.prerequisites.length === 0) return true;

  // Check if every prerequisite topic ID or slug is in completedTopicIds
  return topic.prerequisites.every((prereqId) => {
    const prereq = topics.find((t) => t.id === prereqId || t.slug === prereqId);
    if (!prereq) return true; // defensive against missing references
    return (
      completedTopicIds.includes(prereq.id) ||
      completedTopicIds.includes(prereq.slug)
    );
  });
}

/**
 * Get status of a topic node: "completed" | "active" | "locked"
 */
export function getTopicStatus(
  topicId: string,
  completedTopicIds: string[],
  topics: CanonicalTopic[] = CANONICAL_TOPICS
): TopicNodeStatus {
  const topic = topics.find((t) => t.id === topicId || t.slug === topicId);
  if (!topic) return "locked";

  const isCompleted =
    completedTopicIds.includes(topic.id) || completedTopicIds.includes(topic.slug);
  if (isCompleted) return "completed";

  const unlocked = isTopicUnlocked(topic.id, completedTopicIds, topics);
  return unlocked ? "active" : "locked";
}

/**
 * Get all prerequisite topic objects for a given topic ID
 */
export function getTopicPrerequisites(
  topicId: string,
  topics: CanonicalTopic[] = CANONICAL_TOPICS
): CanonicalTopic[] {
  const topic = topics.find((t) => t.id === topicId || t.slug === topicId);
  if (!topic) return [];

  const prereqIds = new Set(topic.prerequisites);
  return topics.filter((t) => prereqIds.has(t.id) || prereqIds.has(t.slug));
}

/**
 * Get all dependent topic objects that unlock after completing this topic
 */
export function getTopicDependents(
  topicId: string,
  topics: CanonicalTopic[] = CANONICAL_TOPICS
): CanonicalTopic[] {
  const topic = topics.find((t) => t.id === topicId || t.slug === topicId);
  if (!topic) return [];

  return topics.filter(
    (t) => t.prerequisites.includes(topic.id) || t.prerequisites.includes(topic.slug)
  );
}

/**
 * Get cross-domain knowledge connections involving this topic
 */
export function getTopicConceptConnections(topicId: string) {
  return CONCEPT_CONNECTIONS.filter(
    (c) => c.mathTopicId === topicId || c.scienceTopicId === topicId
  );
}

/**
 * Calculate recommended next topic to study based on the prerequisite DAG.
 * Prioritizes the MVP vertical slice topics.
 */
export function getRecommendedNextTopic(
  completedTopicIds: string[],
  topics: CanonicalTopic[] = CANONICAL_TOPICS
): CanonicalTopic | null {
  // First priority: available MVP topics that are unlocked and not yet completed
  const mvpUnlockedIncomplete = topics.filter((topic) => {
    const isCompleted =
      completedTopicIds.includes(topic.id) || completedTopicIds.includes(topic.slug);
    if (isCompleted) return false;
    if (!topic.isAvailable) return false;
    return isTopicUnlocked(topic.id, completedTopicIds, topics);
  });

  if (mvpUnlockedIncomplete.length > 0) {
    // Return the first available unlocked topic in order of the canonical syllabus
    return mvpUnlockedIncomplete[0];
  }

  // If all available topics are completed, return the flagship or null
  const flagship = topics.find((t) => t.isMvpFlagship);
  return flagship || topics[0] || null;
}

/**
 * Compute aggregate 5-dimension mastery from all completed topics.
 */
export function calculateOverallMastery(
  topicMasteries: Record<string, FiveDimensionMastery>
): FiveDimensionMastery {
  const entries = Object.values(topicMasteries);
  if (entries.length === 0) {
    return {
      conceptual: 0,
      procedural: 0,
      reasoning: 0,
      problemSolving: 0,
      transfer: 0,
      overall: 0,
    };
  }

  const sum = entries.reduce(
    (acc, m) => ({
      conceptual: acc.conceptual + m.conceptual,
      procedural: acc.procedural + m.procedural,
      reasoning: acc.reasoning + m.reasoning,
      problemSolving: acc.problemSolving + m.problemSolving,
      transfer: acc.transfer + m.transfer,
      overall: acc.overall + m.overall,
    }),
    { conceptual: 0, procedural: 0, reasoning: 0, problemSolving: 0, transfer: 0, overall: 0 }
  );

  const count = entries.length;
  return {
    conceptual: Math.round(sum.conceptual / count),
    procedural: Math.round(sum.procedural / count),
    reasoning: Math.round(sum.reasoning / count),
    problemSolving: Math.round(sum.problemSolving / count),
    transfer: Math.round(sum.transfer / count),
    overall: Math.round(sum.overall / count),
  };
}
