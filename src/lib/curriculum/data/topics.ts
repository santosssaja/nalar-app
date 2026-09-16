import { KnowledgeGraph } from "../types";
import { CONCEPT_CONNECTIONS } from "./connections";
import { MVP_TOPICS } from "./topics-mvp";
import { EXTENDED_TOPICS } from "./topics-extended";
import { KNOWLEDGE_GRAPH_EDGES } from "./topics-edges";

export { MVP_TOPICS } from "./topics-mvp";
export { EXTENDED_TOPICS } from "./topics-extended";
export { KNOWLEDGE_GRAPH_EDGES } from "./topics-edges";

/**
 * Canonical Knowledge Graph Topics (MVP + extended, order preserved).
 * Barrel re-export: import path and export names are unchanged.
 */
export const CANONICAL_TOPICS = [...MVP_TOPICS, ...EXTENDED_TOPICS];

/**
 * Complete Knowledge Graph singleton
 */
export const CANONICAL_KNOWLEDGE_GRAPH: KnowledgeGraph = {
  nodes: CANONICAL_TOPICS,
  edges: KNOWLEDGE_GRAPH_EDGES,
  connections: CONCEPT_CONNECTIONS,
};
