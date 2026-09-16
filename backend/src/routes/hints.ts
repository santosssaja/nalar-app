import { Hono } from "hono";
import { generateNaiHint } from "../services/ai-service";
import { hintRequestSchema } from "../validations/schemas";

export const hintsRouter = new Hono();

hintsRouter.post("/", async (c) => {
  try {
    const rawBody = await c.req.json();
    const parsed = hintRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
      return c.json({ error: errorMsg, details: parsed.error.issues }, 400);
    }

    const { topicSlug, challengeQuestion, hintLevel, userAttempts } = parsed.data;

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
