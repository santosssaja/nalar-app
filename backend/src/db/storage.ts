import { User, ProgressRecord, AchievementRecord, StreakRecord, SessionRecord } from "./schema";

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarUrl?: string;
  totalXp: number;
  completedCount: number;
  currentStreak: number;
  rank: number;
}

export interface UserProgressSyncPayload {
  xp: number;
  completedLevels: Record<string, boolean>;
  unlockedBadges: string[];
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string | null;
  };
}

export interface StorageAdapter {
  getUser(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: Omit<User, "createdAt" | "updatedAt">): Promise<User>;
  createSession(userId: string, token: string, expiresAt: Date): Promise<SessionRecord>;
  getSession(token: string): Promise<{ session: SessionRecord; user: User } | null>;
  deleteSession(token: string): Promise<void>;
  getProgress(userId: string): Promise<ProgressRecord[]>;
  saveProgress(
    userId: string,
    topicSlug: string,
    levelId: string,
    completed: boolean,
    score: number,
    xpEarned: number
  ): Promise<ProgressRecord>;
  syncFullProgress(userId: string, data: UserProgressSyncPayload): Promise<UserProgressSyncPayload>;
  getAchievements(userId: string): Promise<AchievementRecord[]>;
  unlockAchievement(userId: string, badgeId: string): Promise<AchievementRecord>;
  getStreak(userId: string): Promise<StreakRecord | null>;
  updateStreak(userId: string, current: number, longest: number, lastActiveDate: string): Promise<StreakRecord>;
  getLeaderboard(limit?: number): Promise<LeaderboardEntry[]>;
}

export class MemoryStorageAdapter implements StorageAdapter {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, SessionRecord> = new Map();
  private progress: Map<string, ProgressRecord> = new Map();
  private achievements: Map<string, AchievementRecord> = new Map();
  private streaks: Map<string, StreakRecord> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    const seedUsers = [
      { id: "seed-1", name: "Aria Dewantara", email: "aria@example.com", totalXp: 1450, completed: 8, streak: 12 },
      { id: "seed-2", name: "Siti Nurhaliza", email: "siti@example.com", totalXp: 1120, completed: 6, streak: 7 },
      { id: "seed-3", name: "Budi Santoso", email: "budi@example.com", totalXp: 980, completed: 5, streak: 5 },
      { id: "seed-4", name: "Dina Kartika", email: "dina@example.com", totalXp: 740, completed: 4, streak: 3 },
      { id: "seed-5", name: "Fajar Nugraha", email: "fajar@example.com", totalXp: 520, completed: 3, streak: 2 },
    ];

    const now = new Date();
    for (const u of seedUsers) {
      this.users.set(u.id, {
        id: u.id,
        email: u.email,
        name: u.name,
        passwordHash: null,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${u.name}`,
        isGuest: false,
        createdAt: now,
        updatedAt: now,
      });

      this.streaks.set(u.id, {
        id: `streak-${u.id}`,
        userId: u.id,
        currentStreak: u.streak,
        longestStreak: u.streak + 2,
        lastActiveDate: now.toISOString().split("T")[0],
        updatedAt: now,
      });

      this.progress.set(`${u.id}_math-real-numbers-line_tk-1b1d42`, {
        id: `prog-${u.id}`,
        userId: u.id,
        topicSlug: "math-real-numbers-line",
        levelId: "tk-1b1d42",
        completed: true,
        score: 100,
        xpEarned: u.totalXp,
        completedAt: now,
        updatedAt: now,
      });
    }
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email?.toLowerCase() === email.toLowerCase()) return user;
    }
    return null;
  }

  async createUser(user: Omit<User, "createdAt" | "updatedAt">): Promise<User> {
    const now = new Date();
    const created: User = { ...user, createdAt: now, updatedAt: now };
    this.users.set(created.id, created);
    return created;
  }

  async createSession(userId: string, token: string, expiresAt: Date): Promise<SessionRecord> {
    const session: SessionRecord = {
      id: `sess-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId,
      token,
      expiresAt,
      createdAt: new Date(),
    };
    this.sessions.set(token, session);
    return session;
  }

  async getSession(token: string): Promise<{ session: SessionRecord; user: User } | null> {
    const session = this.sessions.get(token);
    if (!session) return null;
    if (new Date() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }
    const user = await this.getUser(session.userId);
    if (!user) return null;
    return { session, user };
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }

  async getProgress(userId: string): Promise<ProgressRecord[]> {
    return Array.from(this.progress.values()).filter((p) => p.userId === userId);
  }

  async saveProgress(
    userId: string,
    topicSlug: string,
    levelId: string,
    completed: boolean,
    score: number,
    xpEarned: number
  ): Promise<ProgressRecord> {
    const key = `${userId}_${topicSlug}_${levelId}`;
    const existing = this.progress.get(key);
    const now = new Date();

    const record: ProgressRecord = {
      id: existing?.id || `prog-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId,
      topicSlug,
      levelId,
      completed,
      score: Math.max(score, existing?.score || 0),
      xpEarned: Math.max(xpEarned, existing?.xpEarned || 0),
      completedAt: completed ? now : existing?.completedAt || null,
      updatedAt: now,
    };

    this.progress.set(key, record);
    return record;
  }

  async syncFullProgress(userId: string, data: UserProgressSyncPayload): Promise<UserProgressSyncPayload> {
    for (const [key, completed] of Object.entries(data.completedLevels)) {
      if (!completed) continue;
      const parts = key.split(":");
      const topicSlug = parts[0] || "general";
      const levelId = parts[1] || key;
      await this.saveProgress(userId, topicSlug, levelId, true, 100, 40);
    }

    for (const badgeId of data.unlockedBadges) {
      await this.unlockAchievement(userId, badgeId);
    }

    if (data.streak.lastActiveDate) {
      await this.updateStreak(userId, data.streak.current, data.streak.longest, data.streak.lastActiveDate);
    }

    return data;
  }

  async getAchievements(userId: string): Promise<AchievementRecord[]> {
    return Array.from(this.achievements.values()).filter((a) => a.userId === userId);
  }

  async unlockAchievement(userId: string, badgeId: string): Promise<AchievementRecord> {
    const key = `${userId}_${badgeId}`;
    const existing = this.achievements.get(key);
    if (existing) return existing;

    const now = new Date();
    const record: AchievementRecord = {
      id: `ach-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId,
      badgeId,
      unlockedAt: now,
    };
    this.achievements.set(key, record);
    return record;
  }

  async getStreak(userId: string): Promise<StreakRecord | null> {
    return this.streaks.get(userId) || null;
  }

  async updateStreak(userId: string, current: number, longest: number, lastActiveDate: string): Promise<StreakRecord> {
    const existing = this.streaks.get(userId);
    const now = new Date();
    const record: StreakRecord = {
      id: existing?.id || `streak-${userId}`,
      userId,
      currentStreak: current,
      longestStreak: Math.max(longest, existing?.longestStreak || 0),
      lastActiveDate,
      updatedAt: now,
    };
    this.streaks.set(userId, record);
    return record;
  }

  async getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
    const entries: LeaderboardEntry[] = [];
    for (const user of this.users.values()) {
      const userProgress = Array.from(this.progress.values()).filter((p) => p.userId === user.id);
      const totalXp = userProgress.reduce((sum, p) => sum + p.xpEarned, 0);
      const completedCount = userProgress.filter((p) => p.completed).length;
      const streak = this.streaks.get(user.id)?.currentStreak || 0;

      entries.push({
        userId: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl || undefined,
        totalXp,
        completedCount,
        currentStreak: streak,
        rank: 0,
      });
    }

    entries.sort((a, b) => b.totalXp - a.totalXp);
    entries.forEach((e, idx) => {
      e.rank = idx + 1;
    });

    return entries.slice(0, limit);
  }
}

export const storage: StorageAdapter = new MemoryStorageAdapter();
