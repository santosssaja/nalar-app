import { z } from "zod";

/**
 * Validates requests to /api/hints
 */
export const hintRequestSchema = z.object({
  topicSlug: z
    .string()
    .min(1, "topicSlug wajib diisi")
    .max(100, "topicSlug terlalu panjang")
    .regex(/^[a-zA-Z0-9_-]+$/, "topicSlug hanya boleh mengandung huruf, angka, garis hubung, atau garis bawah"),
  challengeQuestion: z
    .string()
    .min(1, "challengeQuestion wajib diisi")
    .max(500, "challengeQuestion maksimal 500 karakter"),
  hintLevel: z
    .number()
    .int("hintLevel harus bilangan bulat")
    .min(1, "hintLevel minimal 1")
    .max(4, "hintLevel maksimal 4"),
  userAttempts: z
    .array(
      z.object({
        value: z.union([z.number(), z.string().max(100)]),
        timestamp: z.number().optional(),
      })
    )
    .max(20)
    .optional(),
});

export type HintRequest = z.infer<typeof hintRequestSchema>;

/**
 * Validates requests to /api/auth/register
 */
export const registerRequestSchema = z.object({
  email: z.string().email("Format email tidak valid").max(255),
  name: z.string().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter").trim(),
  password: z.string().min(6, "Password minimal 6 karakter").max(100).optional(),
  initialProgress: z.any().optional(),
});

/**
 * Validates requests to /api/auth/login
 */
export const loginRequestSchema = z.object({
  email: z.string().email("Format email tidak valid").max(255),
  password: z.string().max(100).optional(),
});

/**
 * Validates requests to /api/progress/save
 */
export const saveProgressSchema = z.object({
  topicSlug: z
    .string()
    .min(1, "topicSlug wajib diisi")
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/, "topicSlug tidak valid"),
  levelId: z.string().min(1, "levelId wajib diisi").max(100),
  completed: z.boolean().default(true),
  score: z.number().min(0).max(1000).default(100),
  xpEarned: z.number().min(0).max(1000).default(40),
});

/**
 * Validates requests to /api/progress/sync and /api/sync
 */
export const syncProgressSchema = z.object({
  xp: z.number().min(0).default(0),
  completedLevels: z.record(z.string(), z.boolean()).default({}),
  unlockedBadges: z.array(z.string().max(100)).max(200).default([]),
  streak: z
    .object({
      current: z.number().min(0).default(0),
      longest: z.number().min(0).default(0),
      lastActiveDate: z.string().nullable().optional(),
    })
    .default({ current: 0, longest: 0, lastActiveDate: null }),
});
