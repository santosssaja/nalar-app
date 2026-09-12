export * from "@/lib/science-engine/projectile";

export interface ProjectileCanvasState {
  angleDegrees: number;
  v0: number;
  g: number;
  h0: number;
  showTrail: boolean;
  showVectors: boolean;
  targetDistance: number;
  isFiring: boolean;
  animationTime: number;
}

export const INITIAL_PROJECTILE_STATE: ProjectileCanvasState = {
  angleDegrees: 45,
  v0: 20,
  g: 9.8,
  h0: 0,
  showTrail: true,
  showVectors: true,
  targetDistance: 40.8,
  isFiring: false,
  animationTime: 0,
};
