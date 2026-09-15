import { Context, Next } from "hono";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export function rateLimitMiddleware(maxRequests = 10, windowMs = 60 * 1000) {
  return async (c: Context, next: Next) => {
    const ip =
      c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
      c.req.header("x-real-ip") ||
      "127.0.0.1";

    const now = Date.now();
    let record = rateLimitStore.get(ip);

    if (!record || now > record.resetAt) {
      record = { count: 1, resetAt: now + windowMs };
      rateLimitStore.set(ip, record);
    } else {
      record.count += 1;
    }

    c.header("X-RateLimit-Limit", maxRequests.toString());
    c.header("X-RateLimit-Remaining", Math.max(0, maxRequests - record.count).toString());
    c.header("X-RateLimit-Reset", Math.ceil(record.resetAt / 1000).toString());

    if (record.count > maxRequests) {
      return c.json(
        {
          error: "Terlalu banyak permintaan petunjuk AI. Harap tunggu beberapa saat.",
        },
        429
      );
    }

    await next();
  };
}
