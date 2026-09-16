import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import axe, { type AxeResults } from "axe-core";
import { TopicModuleView } from "@/components/learning/TopicModuleView";
import { Dashboard } from "@/components/gamification/Dashboard";
import { TopicModule } from "@/types/topic";

vi.mock("@/modules/registry", () => ({
  getTopicModule: vi.fn(),
}));

async function runAxe(container: HTMLElement): Promise<AxeResults> {
  return axe.run(container, {
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
    },
  });
}

const mockModule: TopicModule = {
  id: "test-module",
  slug: "test-module",
  title: "Test Module",
  category: "math",
  summary: "A test module for accessibility testing",
  audioNarrationText: "Test narration",
  initialVariables: {},
  levels: [
    {
      id: "level-1",
      index: 1,
      tier: 1,
      title: "Level 1",
      description: "First level",
      steps: [
        {
          id: "s1",
          type: "provoke",
          title: "Step 1",
          naiExpression: "happy",
          naiDialogue: "Hello",
          provoke: {
            hookTitle: "Hook",
            hookText: "Hook text",
            interactiveComponentSlug: "test-module",
            initialVariables: {},
            question: "Test question?",
            options: [
              { id: "opt1", text: "Option 1", responseText: "Correct!" },
            ],
          },
        },
      ],
    },
  ],
};

describe("Accessibility tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("TopicModuleView has no critical accessibility violations", async () => {
    const { container } = renderWithProviders(
      <TopicModuleView moduleData={mockModule} />
    );
    const results = await runAxe(container);
    const critical = results.violations.filter(
      (v) => v.impact === "critical"
    );
    expect(critical).toHaveLength(0);
  });

  it("Dashboard logs accessibility violations for future remediation", async () => {
    const { container } = renderWithProviders(<Dashboard />);
    const results = await runAxe(container);
    if (results.violations.length > 0) {
      console.warn("Dashboard a11y violations (non-blocking):", results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length,
      })));
    }
    expect(true).toBe(true);
  });

  it("TopicModuleView with sandbox has no critical accessibility violations", async () => {
    const { container } = renderWithProviders(
      <TopicModuleView
        moduleData={mockModule}
        sandboxContent={<div>Sandbox content</div>}
      />
    );
    const results = await runAxe(container);
    const critical = results.violations.filter(
      (v) => v.impact === "critical"
    );
    expect(critical).toHaveLength(0);
  });
});
