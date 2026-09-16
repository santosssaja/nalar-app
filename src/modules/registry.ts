import { TopicModule } from "@/types/topic";
import { modularClockModule } from "./_legacy/math/arithmetic-modular-clock_legacy/module";
import { determinant2dModule } from "./_legacy/math/linear-algebra-determinant-2d_legacy/module";
import { euclidModule } from "./_legacy/math/math-euclid_legacy/module";
import { trigModule } from "./_legacy/math/math-trig-unit-circle_legacy/module";
import { tangentModule } from "./_legacy/math/math-calculus-tangent_legacy/module";
import { riemannModule } from "./_legacy/math/math-calculus-riemann_legacy/module";
import { realNumbersModule } from "./_legacy/math/math-real-numbers-line_legacy/module";
import { primesCoprimeModule } from "./_legacy/math/math-primes-coprime_legacy/module";
import { projectileModule } from "./_legacy/science/physics-projectile-motion_legacy/module";
import { inclineModule } from "./_legacy/science/physics-newton-incline_legacy/module";
import { rollerCoasterModule } from "./_legacy/science/physics-roller-coaster_legacy/module";
import { harmonicModule } from "./_legacy/science/physics-harmonic-oscillator_legacy/module";
import { waveModule } from "./_legacy/science/physics-wave-simulator_legacy/module";
import { electricFieldModule } from "./_legacy/science/physics-electric-field_legacy/module";
import { dcCircuitModule } from "./_legacy/science/physics-dc-circuits_legacy/module";

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
