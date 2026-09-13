/**
 * Pure physics engine for Direct Current (DC) Circuits.
 * Computes Ohm's Law (V = IR), equivalent resistance for Series,
 * Parallel, and Mixed configurations, branch currents, voltage drops,
 * and Joule power dissipation (P = VI = I²R).
 */

export type CircuitTopology = "series" | "parallel" | "mixed";

export interface CircuitResistor {
  id: string;
  label: string;
  resistance: number; // in Ohms (Ω)
  voltageDrop: number; // in Volts (V)
  current: number; // in Amperes (A)
  power: number; // in Watts (W)
}

export interface CircuitCalculationResult {
  voltageSource: number; // V
  isSwitchClosed: boolean;
  topology: CircuitTopology;
  equivalentResistance: number; // Ω
  totalCurrent: number; // A
  totalPower: number; // W
  resistors: CircuitResistor[];
}

export interface CircuitParams {
  voltage: number; // V
  r1: number; // Ω
  r2: number; // Ω
  r3?: number; // Ω
  topology: CircuitTopology;
  isSwitchClosed?: boolean;
}

/**
 * Calculates complete electrical properties of a DC circuit.
 */
export function calculateDCCircuit(params: CircuitParams): CircuitCalculationResult {
  const { voltage, topology, isSwitchClosed = true } = params;

  // Defensive clamping: resistances must be > 0.1 Ω
  const r1 = Math.max(0.1, params.r1);
  const r2 = Math.max(0.1, params.r2);
  const r3 = params.r3 !== undefined ? Math.max(0.1, params.r3) : undefined;

  // If switch is open, no current flows
  if (!isSwitchClosed || voltage === 0) {
    let req = r1 + r2 + (r3 ?? 0);
    if (topology === "parallel") {
      const invSum = 1 / r1 + 1 / r2 + (r3 ? 1 / r3 : 0);
      req = 1 / invSum;
    } else if (topology === "mixed") {
      const r23 = (r2 * (r3 ?? r2)) / (r2 + (r3 ?? r2));
      req = r1 + r23;
    }

    const zeroResistors: CircuitResistor[] = [
      { id: "R1", label: "Resistor 1", resistance: r1, voltageDrop: 0, current: 0, power: 0 },
      { id: "R2", label: "Resistor 2", resistance: r2, voltageDrop: 0, current: 0, power: 0 },
    ];
    if (r3 !== undefined) {
      zeroResistors.push({ id: "R3", label: "Resistor 3", resistance: r3, voltageDrop: 0, current: 0, power: 0 });
    }

    return {
      voltageSource: voltage,
      isSwitchClosed,
      topology,
      equivalentResistance: Number(req.toFixed(3)),
      totalCurrent: 0,
      totalPower: 0,
      resistors: zeroResistors,
    };
  }

  // Active circuit calculations
  let req = 0;
  let totalCurrent = 0;
  const resistors: CircuitResistor[] = [];

  if (topology === "series") {
    // Req = R1 + R2 (+ R3)
    req = r1 + r2 + (r3 ?? 0);
    totalCurrent = voltage / req;

    const v1 = totalCurrent * r1;
    resistors.push({
      id: "R1",
      label: "Resistor 1",
      resistance: r1,
      voltageDrop: Number(v1.toFixed(3)),
      current: Number(totalCurrent.toFixed(3)),
      power: Number((totalCurrent * v1).toFixed(3)),
    });

    const v2 = totalCurrent * r2;
    resistors.push({
      id: "R2",
      label: "Resistor 2",
      resistance: r2,
      voltageDrop: Number(v2.toFixed(3)),
      current: Number(totalCurrent.toFixed(3)),
      power: Number((totalCurrent * v2).toFixed(3)),
    });

    if (r3 !== undefined) {
      const v3 = totalCurrent * r3;
      resistors.push({
        id: "R3",
        label: "Resistor 3",
        resistance: r3,
        voltageDrop: Number(v3.toFixed(3)),
        current: Number(totalCurrent.toFixed(3)),
        power: Number((totalCurrent * v3).toFixed(3)),
      });
    }
  } else if (topology === "parallel") {
    // 1/Req = 1/R1 + 1/R2 (+ 1/R3)
    let invReq = 1 / r1 + 1 / r2;
    if (r3 !== undefined) invReq += 1 / r3;
    req = 1 / invReq;

    const i1 = voltage / r1;
    resistors.push({
      id: "R1",
      label: "Resistor 1",
      resistance: r1,
      voltageDrop: voltage,
      current: Number(i1.toFixed(3)),
      power: Number((voltage * i1).toFixed(3)),
    });

    const i2 = voltage / r2;
    resistors.push({
      id: "R2",
      label: "Resistor 2",
      resistance: r2,
      voltageDrop: voltage,
      current: Number(i2.toFixed(3)),
      power: Number((voltage * i2).toFixed(3)),
    });

    if (r3 !== undefined) {
      const i3 = voltage / r3;
      resistors.push({
        id: "R3",
        label: "Resistor 3",
        resistance: r3,
        voltageDrop: voltage,
        current: Number(i3.toFixed(3)),
        power: Number((voltage * i3).toFixed(3)),
      });
      totalCurrent = i1 + i2 + i3;
    } else {
      totalCurrent = i1 + i2;
    }
  } else {
    // Mixed: R1 in series with (R2 || R3)
    const validR3 = r3 ?? r2;
    const r23 = (r2 * validR3) / (r2 + validR3);
    req = r1 + r23;
    totalCurrent = voltage / req;

    const v1 = totalCurrent * r1;
    const v23 = voltage - v1; // voltage drop across parallel pair
    const i2 = v23 / r2;
    const i3 = v23 / validR3;

    resistors.push({
      id: "R1",
      label: "Resistor 1 (Seri)",
      resistance: r1,
      voltageDrop: Number(v1.toFixed(3)),
      current: Number(totalCurrent.toFixed(3)),
      power: Number((totalCurrent * v1).toFixed(3)),
    });

    resistors.push({
      id: "R2",
      label: "Resistor 2 (Paralel)",
      resistance: r2,
      voltageDrop: Number(v23.toFixed(3)),
      current: Number(i2.toFixed(3)),
      power: Number((v23 * i2).toFixed(3)),
    });

    resistors.push({
      id: "R3",
      label: "Resistor 3 (Paralel)",
      resistance: validR3,
      voltageDrop: Number(v23.toFixed(3)),
      current: Number(i3.toFixed(3)),
      power: Number((v23 * i3).toFixed(3)),
    });
  }

  const totalPower = voltage * totalCurrent;

  return {
    voltageSource: voltage,
    isSwitchClosed,
    topology,
    equivalentResistance: Number(req.toFixed(3)),
    totalCurrent: Number(totalCurrent.toFixed(3)),
    totalPower: Number(totalPower.toFixed(3)),
    resistors,
  };
}

/**
 * Calculates Ohm's Law single element helper.
 */
export function calculateOhm(v?: number, i?: number, r?: number): { v: number; i: number; r: number } {
  if (v !== undefined && r !== undefined && r > 0) {
    return { v, r, i: v / r };
  }
  if (i !== undefined && r !== undefined) {
    return { v: i * r, i, r };
  }
  if (v !== undefined && i !== undefined && i > 0) {
    return { v, i, r: v / i };
  }
  return { v: 0, i: 0, r: 0 };
}
