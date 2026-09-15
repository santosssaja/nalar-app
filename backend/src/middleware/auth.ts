import { Context, Next } from "hono";
import { storage } from "../db/storage";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    c.set("user", null);
    c.set("isGuest", true);
    return await next();
  }

  const sessionData = await storage.getSession(token);
  if (!sessionData) {
    c.set("user", null);
    c.set("isGuest", true);
    return await next();
  }

  c.set("user", sessionData.user);
  c.set("isGuest", sessionData.user.isGuest);
  c.set("session", sessionData.session);
  await next();
}

export async function requireAuth(c: Context, next: Next) {
  const user = c.get("user");
  if (!user || user.isGuest) {
    return c.json({ error: "Otentikasi diperlukan" }, 401);
  }
  await next();
}
