import { TopicModule } from "@/types/topic";
import { modularClockModule } from "./math/arithmetic-modular-clock/module";
import { determinant2dModule } from "./math/linear-algebra-determinant-2d/module";
import { euclidModule } from "./math/math-euclid/module";
import { trigModule } from "./math/math-trig-unit-circle/module";
import { tangentModule } from "./math/math-calculus-tangent/module";
import { riemannModule } from "./math/math-calculus-riemann/module";
import { projectileModule } from "./science/physics-projectile-motion/module";

export const TOPIC_MODULES_REGISTRY: Record<string, TopicModule> = {
  "arithmetic-modular-clock": modularClockModule,
  "linear-algebra-determinant-2d": determinant2dModule,
  "math-euclid": euclidModule,
  "math-trig-unit-circle": trigModule,
  "math-calculus-tangent": tangentModule,
  "math-differential-calculus": tangentModule,
  "math-calculus-riemann": riemannModule,
  "math-integral-calculus": riemannModule,
  "physics-projectile-motion": projectileModule,
  "sci-kinematics": projectileModule,
};

export function getTopicModule(slug: string): TopicModule | undefined {
  return TOPIC_MODULES_REGISTRY[slug];
}

export function getAllTopicModules(): TopicModule[] {
  return Object.values(TOPIC_MODULES_REGISTRY);
}
