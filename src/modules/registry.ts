import { TopicModule } from "@/types/topic";
import { realNumbersModule } from "./math/real-numbers/module";
import { elementaryAlgebraModule } from "./math/elementary-algebra/module";
import { functionsGraphsModule } from "./math/functions-graphs/module";
import { trigonometryModule } from "./math/trigonometry/module";
import { siUnitsModule } from "./science/si-units/module";
import { kinematicsModule } from "./science/kinematics/module";

/**
 * Clean canonical module registry for Nalar STEM
 * Fully decoupled from legacy prototypes as instructed.
 */
export const TOPIC_MODULES_REGISTRY: Record<string, TopicModule> = {
  // 1. Math MVP 1
  "math-real-numbers": realNumbersModule,
  "math-real-numbers-line": realNumbersModule,

  // 2. Math MVP 2
  "math-elementary-algebra": elementaryAlgebraModule,

  // 3. Math MVP 3
  "math-functions-graphs": functionsGraphsModule,

  // 4. Math MVP 4
  "math-trig-unit-circle": trigonometryModule,

  // 5. Science MVP 1
  "science-si-units": siUnitsModule,
  "sci-units-measurements": siUnitsModule,

  // 6. Science MVP 2 (Flagship MVP)
  "science-kinematics": kinematicsModule,
  "sci-kinematics": kinematicsModule,
  "physics-projectile-motion": kinematicsModule,
};

export function getTopicModule(slug: string): TopicModule | undefined {
  return TOPIC_MODULES_REGISTRY[slug];
}

export function getAllTopicModules(): TopicModule[] {
  // Deduplicate by module ID
  const seen = new Set<string>();
  const modules: TopicModule[] = [];

  for (const mod of Object.values(TOPIC_MODULES_REGISTRY)) {
    if (!seen.has(mod.id)) {
      seen.add(mod.id);
      modules.push(mod);
    }
  }

  return modules;
}
