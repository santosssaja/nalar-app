import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";
import { kinematicsCore } from "./pedagogy-core";
import { kinematicsFormalize } from "./pedagogy-formalize";
import { kinematicsPractice } from "./pedagogy-practice";

/**
 * Flagship kinematics lesson, assembled from section parts.
 * Import path unchanged: `@/modules/science/kinematics/pedagogy` resolves here.
 */
export const kinematicsPedagogicalLesson: ComprehensiveLesson = {
  ...kinematicsCore,
  ...kinematicsFormalize,
  ...kinematicsPractice,
};
