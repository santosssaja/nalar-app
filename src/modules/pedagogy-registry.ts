import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";
import { realNumbersPedagogicalLesson } from "./math/real-numbers/pedagogy";
import { elementaryAlgebraPedagogicalLesson } from "./math/elementary-algebra/pedagogy";
import { functionsGraphsPedagogicalLesson } from "./math/functions-graphs/pedagogy";
import { trigonometryPedagogicalLesson } from "./math/trigonometry/pedagogy";
import { siUnitsPedagogicalLesson } from "./science/si-units/pedagogy";
import { kinematicsPedagogicalLesson } from "./science/kinematics/pedagogy";

export const COMPREHENSIVE_LESSONS: Record<string, ComprehensiveLesson> = {
  // 1. Math MVP 1
  "math-real-numbers": realNumbersPedagogicalLesson,
  "math-real-numbers-line": realNumbersPedagogicalLesson,

  // 2. Math MVP 2
  "math-elementary-algebra": elementaryAlgebraPedagogicalLesson,

  // 3. Math MVP 3
  "math-functions-graphs": functionsGraphsPedagogicalLesson,

  // 4. Math MVP 4
  "math-trig-unit-circle": trigonometryPedagogicalLesson,
  "math-trigonometry": trigonometryPedagogicalLesson,

  // 5. Science MVP 1
  "science-si-units": siUnitsPedagogicalLesson,
  "sci-units-measurements": siUnitsPedagogicalLesson,

  // 6. Science MVP 2 (Flagship MVP)
  "science-kinematics": kinematicsPedagogicalLesson,
  "sci-kinematics": kinematicsPedagogicalLesson,
  "physics-projectile-motion": kinematicsPedagogicalLesson,
};

export function getComprehensiveLesson(slug: string): ComprehensiveLesson | undefined {
  return COMPREHENSIVE_LESSONS[slug];
}

export function getAllComprehensiveLessons(): ComprehensiveLesson[] {
  const seen = new Set<string>();
  const list: ComprehensiveLesson[] = [];

  for (const lesson of Object.values(COMPREHENSIVE_LESSONS)) {
    if (!seen.has(lesson.id)) {
      seen.add(lesson.id);
      list.push(lesson);
    }
  }

  return list;
}
