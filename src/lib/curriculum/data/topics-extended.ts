import { CanonicalTopic } from "../types";
import { MATH_EXTENDED_TOPICS } from "./topics-math";
import { SCIENCE_EXTENDED_TOPICS } from "./topics-science";

export { MATH_EXTENDED_TOPICS } from "./topics-math";
export { SCIENCE_EXTENDED_TOPICS } from "./topics-science";

/** Extended roadmap nodes (math + science, order preserved). */
export const EXTENDED_TOPICS = [...MATH_EXTENDED_TOPICS, ...SCIENCE_EXTENDED_TOPICS];
