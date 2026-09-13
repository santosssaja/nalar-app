import { TopicModule } from "@/types/topic";
import { modularClockModule } from "./math/arithmetic-modular-clock/module";
import { determinant2dModule } from "./math/linear-algebra-determinant-2d/module";
import { euclidModule } from "./math/math-euclid/module";
import { trigModule } from "./math/math-trig-unit-circle/module";
import { tangentModule } from "./math/math-calculus-tangent/module";
import { riemannModule } from "./math/math-calculus-riemann/module";
import { realNumbersModule } from "./math/math-real-numbers-line/module";
import { primesCoprimeModule } from "./math/math-primes-coprime/module";
import { projectileModule } from "./science/physics-projectile-motion/module";
import { inclineModule } from "./science/physics-newton-incline/module";
import { rollerCoasterModule } from "./science/physics-roller-coaster/module";
import { harmonicModule } from "./science/physics-harmonic-oscillator/module";
import { waveModule } from "./science/physics-wave-simulator/module";
import { electricFieldModule } from "./science/physics-electric-field/module";
import { dcCircuitModule } from "./science/physics-dc-circuits/module";

export const TOPIC_MODULES_REGISTRY: Record<string, TopicModule> = {
  "math-real-numbers-line": realNumbersModule,
  "math-real-numbers": realNumbersModule,
  "arithmetic-modular-clock": modularClockModule,
  "math-euclid": euclidModule,
  "math-primes-coprime": primesCoprimeModule,
  "math-prime-factorization": primesCoprimeModule,
  "linear-algebra-determinant-2d": determinant2dModule,
  "math-trig-unit-circle": trigModule,
  "math-calculus-tangent": tangentModule,
  "math-differential-calculus": tangentModule,
  "math-calculus-riemann": riemannModule,
  "math-integral-calculus": riemannModule,
  "physics-projectile-motion": projectileModule,
  "sci-kinematics": projectileModule,
  "physics-newton-incline": inclineModule,
  "sci-dynamics-newton": inclineModule,
  "physics-roller-coaster": rollerCoasterModule,
  "sci-work-energy": rollerCoasterModule,
  "physics-harmonic-oscillator": harmonicModule,
  "sci-simple-harmonic": harmonicModule,
  "physics-wave-simulator": waveModule,
  "sci-wave-simulator": waveModule,
  "physics-electric-field": electricFieldModule,
  "sci-electric-field": electricFieldModule,
  "physics-dc-circuits": dcCircuitModule,
  "sci-circuits-electricity": dcCircuitModule,
};

export function getTopicModule(slug: string): TopicModule | undefined {
  return TOPIC_MODULES_REGISTRY[slug];
}

export function getAllTopicModules(): TopicModule[] {
  return Object.values(TOPIC_MODULES_REGISTRY);
}

