export {
  calculateDCCircuit,
  calculateOhm,
} from "@/lib/science-engine/dc-circuits";

export type {
  CircuitTopology,
  CircuitResistor,
  CircuitCalculationResult,
  CircuitParams,
} from "@/lib/science-engine/dc-circuits";

export interface DCCircuitState {
  voltage: number; // Volts (0 to 30V)
  r1: number; // Ω (1 to 20Ω)
  r2: number; // Ω (1 to 20Ω)
  r3: number; // Ω (1 to 20Ω)
  topology: "series" | "parallel" | "mixed";
  isSwitchClosed: boolean;
}
