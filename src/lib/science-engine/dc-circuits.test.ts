import { describe, it, expect } from "vitest";
import { calculateDCCircuit, calculateOhm } from "./dc-circuits";

describe("dc-circuits engine", () => {
  it("calculates series circuit Ohm's law and voltage division correctly", () => {
    // V = 12V, R1 = 4Ω, R2 = 8Ω (Series) -> Req = 12Ω, I = 1A
    const result = calculateDCCircuit({
      voltage: 12,
      r1: 4,
      r2: 8,
      topology: "series",
      isSwitchClosed: true,
    });

    expect(result.equivalentResistance).toBe(12);
    expect(result.totalCurrent).toBe(1);
    expect(result.totalPower).toBe(12);

    // Resistor 1: V = 1 * 4 = 4V, P = 4W
    expect(result.resistors[0].voltageDrop).toBe(4);
    expect(result.resistors[0].current).toBe(1);
    expect(result.resistors[0].power).toBe(4);

    // Resistor 2: V = 1 * 8 = 8V, P = 8W
    expect(result.resistors[1].voltageDrop).toBe(8);
    expect(result.resistors[1].current).toBe(1);
    expect(result.resistors[1].power).toBe(8);
  });

  it("calculates parallel circuit Ohm's law and current division correctly", () => {
    // V = 12V, R1 = 6Ω, R2 = 12Ω (Parallel) -> Req = (6*12)/(6+12) = 72/18 = 4Ω
    // I_total = 12 / 4 = 3A. I1 = 12/6 = 2A, I2 = 12/12 = 1A.
    const result = calculateDCCircuit({
      voltage: 12,
      r1: 6,
      r2: 12,
      topology: "parallel",
      isSwitchClosed: true,
    });

    expect(result.equivalentResistance).toBe(4);
    expect(result.totalCurrent).toBe(3);
    expect(result.totalPower).toBe(36);

    expect(result.resistors[0].voltageDrop).toBe(12);
    expect(result.resistors[0].current).toBe(2);
    expect(result.resistors[0].power).toBe(24);

    expect(result.resistors[1].voltageDrop).toBe(12);
    expect(result.resistors[1].current).toBe(1);
    expect(result.resistors[1].power).toBe(12);
  });

  it("calculates mixed (series-parallel) circuit accurately", () => {
    // V = 12V, R1 = 2Ω, R2 = 6Ω, R3 = 3Ω (Mixed)
    // R23 = (6 * 3) / (6 + 3) = 18 / 9 = 2Ω
    // Req = 2 + 2 = 4Ω
    // I_total = 12 / 4 = 3A
    // V1 = 3 * 2 = 6V
    // V23 = 12 - 6 = 6V
    // I2 = 6 / 6 = 1A, I3 = 6 / 3 = 2A
    const result = calculateDCCircuit({
      voltage: 12,
      r1: 2,
      r2: 6,
      r3: 3,
      topology: "mixed",
      isSwitchClosed: true,
    });

    expect(result.equivalentResistance).toBe(4);
    expect(result.totalCurrent).toBe(3);
    expect(result.totalPower).toBe(36);

    expect(result.resistors[0].voltageDrop).toBe(6);
    expect(result.resistors[1].current).toBe(1);
    expect(result.resistors[2].current).toBe(2);
  });

  it("handles open switch and single element Ohm helper correctly", () => {
    const openResult = calculateDCCircuit({
      voltage: 12,
      r1: 5,
      r2: 5,
      topology: "series",
      isSwitchClosed: false,
    });

    expect(openResult.totalCurrent).toBe(0);
    expect(openResult.totalPower).toBe(0);
    expect(openResult.resistors[0].current).toBe(0);

    const ohm = calculateOhm(10, undefined, 5);
    expect(ohm.i).toBe(2);
  });
});
