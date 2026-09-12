import { describe, it, expect } from "vitest";
import { requestProgressiveHint } from "./hint-engine";
import { getStaticHint } from "./hint-static";
import { getMockHint } from "./hint-mock";

describe("Hint Progressive Escalation Engine", () => {
  const baseRequest = {
    topicSlug: "arithmetic-modular-clock",
    levelIndex: 1,
    challengeId: "mod-clock-l1-c1",
    challengeQuestion: "Atur jam ke angka 2 pada modulo 12",
    userAttempts: [
      { attemptNumber: 1, canvasSnapshot: { clockHour: 5, modBase: 12 } },
    ],
    hint2Static: "Ingat bahwa jam 14 sama dengan jam 2 pada sistem 12 jam.",
    solutionVariables: { clockHour: 2, modBase: 12 },
    solutionExplanation: "Posisikan jarum jam pada angka 2.",
  };

  it("produces static encouraging response for Hint 1 (0 tokens)", () => {
    const hint1 = getStaticHint({ ...baseRequest, hintLevel: 1 });
    expect(hint1.hintLevel).toBe(1);
    expect(hint1.naiMood).toBe("encouraging");
    expect(hint1.text).toBeTruthy();
    expect(hint1.source).toBe("static");
  });

  it("produces directional response for Hint 2 (0 tokens)", () => {
    const hint2 = getStaticHint({ ...baseRequest, hintLevel: 2 }, baseRequest.hint2Static);
    expect(hint2.hintLevel).toBe(2);
    expect(hint2.naiMood).toBe("thinking");
    expect(hint2.text).toContain("sistem 12 jam");
    expect(hint2.source).toBe("static");
  });

  it("produces conceptual explanation for Hint 3 (mock/fallback)", () => {
    const hint3 = getMockHint({ ...baseRequest, hintLevel: 3 });
    expect(hint3.hintLevel).toBe(3);
    expect(hint3.naiMood).toBe("hinting");
    expect(hint3.text).toBeTruthy();
    expect(hint3.source).toBe("mock");
  });

  it("produces full solution and variables for Hint 4", () => {
    const hint4 = getMockHint(
      { ...baseRequest, hintLevel: 4 },
      baseRequest.solutionVariables,
      baseRequest.solutionExplanation
    );
    expect(hint4.hintLevel).toBe(4);
    expect(hint4.naiMood).toBe("teaching");
    expect(hint4.targetVariables).toEqual({ clockHour: 2, modBase: 12 });
    expect(hint4.isAutoSolved).toBe(true);
  });

  it("requests hint progressive dispatcher returns valid response for all 4 levels", async () => {
    const res1 = await requestProgressiveHint({ ...baseRequest, hintLevel: 1 });
    expect(res1.hintLevel).toBe(1);
    expect(res1.source).toBe("static");

    const res2 = await requestProgressiveHint({ ...baseRequest, hintLevel: 2 });
    expect(res2.hintLevel).toBe(2);
    expect(res2.source).toBe("static");

    const res3 = await requestProgressiveHint({ ...baseRequest, hintLevel: 3 });
    expect(res3.hintLevel).toBe(3);

    const res4 = await requestProgressiveHint({ ...baseRequest, hintLevel: 4 });
    expect(res4.hintLevel).toBe(4);
    expect(res4.targetVariables).toEqual({ clockHour: 2, modBase: 12 });
  });
});
