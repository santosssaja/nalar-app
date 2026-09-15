import { Hono } from "hono";
import { storage } from "../db/storage";
import { ProgressRecord } from "../db/schema";

export const authRouter = new Hono();

function generateToken(): string {
  return `tok_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// POST /api/auth/guest
authRouter.post("/guest", async (c) => {
  const guestId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const guestUser = await storage.createUser({
    id: guestId,
    email: null,
    name: "Tamu Penjelajah",
    passwordHash: null,
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${guestId}`,
    isGuest: true,
  });

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await storage.createSession(guestUser.id, token, expiresAt);

  return c.json({ user: guestUser, token, expiresAt });
});

// POST /api/auth/register
authRouter.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const { email, name, password, initialProgress } = body;

    if (!email || !name) {
      return c.json({ error: "Email dan nama wajib diisi" }, 400);
    }

    const existing = await storage.getUserByEmail(email);
    if (existing) {
      return c.json({ error: "Email sudah terdaftar" }, 409);
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const user = await storage.createUser({
      id: userId,
      email,
      name,
      passwordHash: password ? `hash_${password}` : null,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      isGuest: false,
    });

    if (initialProgress) {
      await storage.syncFullProgress(user.id, initialProgress);
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await storage.createSession(user.id, token, expiresAt);

    return c.json({ message: "Akun berhasil dibuat", user, token, expiresAt });
  } catch (err) {
    console.error("[Backend Auth] Register error:", err);
    return c.json({ error: "Gagal mendaftarkan akun" }, 500);
  }
});

// POST /api/auth/login
authRouter.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email) {
      return c.json({ error: "Email wajib diisi" }, 400);
    }

    let user = await storage.getUserByEmail(email);
    if (!user) {
      user = await storage.createUser({
        id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        email,
        name: email.split("@")[0],
        passwordHash: password ? `hash_${password}` : null,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
        isGuest: false,
      });
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await storage.createSession(user.id, token, expiresAt);

    return c.json({ message: "Berhasil masuk", user, token, expiresAt });
  } catch (err) {
    console.error("[Backend Auth] Login error:", err);
    return c.json({ error: "Gagal masuk" }, 500);
  }
});

// GET /api/auth/me
authRouter.get("/me", async (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return c.json({ user: null, isGuest: true });
  }

  const sessionData = await storage.getSession(token);
  if (!sessionData) {
    return c.json({ user: null, isGuest: true });
  }

  const streak = await storage.getStreak(sessionData.user.id);
  const achievements = await storage.getAchievements(sessionData.user.id);
  const progressList = await storage.getProgress(sessionData.user.id);
  const totalXp = progressList.reduce((sum: number, p: ProgressRecord) => sum + p.xpEarned, 0);

  return c.json({
    user: sessionData.user,
    stats: {
      totalXp,
      streak: streak?.currentStreak || 0,
      achievementsCount: achievements.length,
      completedLevelsCount: progressList.filter((p: ProgressRecord) => p.completed).length,
    },
  });
});

// POST /api/auth/logout
authRouter.post("/logout", async (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (token) {
    await storage.deleteSession(token);
  }
  return c.json({ message: "Berhasil keluar" });
});
