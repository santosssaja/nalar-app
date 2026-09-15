import { Hono } from "hono";
import { generateNaiHint } from "../services/ai-service";

export const hintsRouter = new Hono();

hintsRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { topicSlug, challengeQuestion, hintLevel, userAttempts } = body;

    if (!topicSlug || !challengeQuestion || typeof hintLevel !== "number") {
      return c.json({ error: "Parameter topicSlug, challengeQuestion, dan hintLevel diperlukan" }, 400);
    }

    const result = await generateNaiHint({
      topicSlug,
      challengeQuestion,
      hintLevel,
      userAttempts,
    });

    return c.json(result);
  } catch (error) {
    console.error("[Backend Hints] Error generating hint:", error);
    return c.json({ error: "Gagal memproses petunjuk" }, 500);
  }
});
