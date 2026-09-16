import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, mockGamificationContext } from "@/test/test-utils";
import { TopicModuleView } from "@/components/learning/TopicModuleView";
import { TopicModule } from "@/types/topic";

vi.mock("@/modules/registry", () => ({
  getTopicModule: vi.fn(),
}));

const mockModule: TopicModule = {
  id: "test-module",
  slug: "test-module",
  title: "Test Module",
  category: "math",
  summary: "A test module",
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
        {
          id: "s2",
          type: "challenge",
          title: "Challenge",
          naiExpression: "neutral",
          naiDialogue: "Challenge time",
          challenge: {
            id: "challenge-1",
            title: "Test Challenge",
            question: "Solve this",
            targetCondition: (vars) => vars.x === 5,
            hint1Static: "Hint 1",
            hint2Static: "Hint 2",
            solutionVariables: { x: 5 },
            solutionExplanation: "Because 5",
            xpReward: 10,
          },
        },
      ],
    },
  ],
};

describe("TopicModuleView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders module title when moduleData is provided", () => {
    const { getByText } = renderWithProviders(
      <TopicModuleView moduleData={mockModule} />
    );
    expect(getByText("Test Module")).toBeTruthy();
  });

  it("shows not found message when no module is provided", () => {
    const { getByText } = renderWithProviders(
      <TopicModuleView slug="nonexistent" />
    );
    expect(getByText("Modul topik tidak ditemukan.")).toBeTruthy();
  });

  it("renders level map with levels", () => {
    const { getByText } = renderWithProviders(
      <TopicModuleView moduleData={mockModule} />
    );
    expect(getByText("Level 1")).toBeTruthy();
  });

  it("shows sandbox tab", () => {
    const { getByText } = renderWithProviders(
      <TopicModuleView moduleData={mockModule} sandboxContent={<div>Sandbox Content</div>} />
    );
    expect(getByText(/Kanvas Interaktif Penuh/)).toBeTruthy();
  });
});
