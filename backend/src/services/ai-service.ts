import "dotenv/config";

export interface GenerateHintParams {
  topicSlug: string;
  challengeQuestion: string;
  hintLevel: number;
  userAttempts?: Array<{ value: number | string; timestamp?: number }>;
}

export interface GenerateHintResult {
  hintLevel: number;
  naiMood: "teaching" | "hinting";
  title: string;
  text: string;
  source: "gemma" | "mock";
  model?: string;
}

/**
 * Extracts and parses JSON from raw model output,
 * stripping markdown code fences (```json ... ```) if present.
 */
function extractJson<T>(rawText: string): T | null {
  try {
    // Try direct parse first
    return JSON.parse(rawText.trim()) as T;
  } catch {
    // Try extracting from markdown ```json ... ```
    const codeBlockMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      try {
        return JSON.parse(codeBlockMatch[1].trim()) as T;
      } catch {
        // continue
      }
    }

    // Try finding first { and last }
    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(rawText.slice(firstBrace, lastBrace + 1)) as T;
      } catch {
        // continue
      }
    }
  }
  return null;
}

/**
 * Call Gemma via Google Generative Language API (gemma-2-9b-it / gemma-2-27b-it)
 */
async function callGoogleGemma(
  prompt: string,
  apiKey: string,
  modelName: string
): Promise<{ title: string; text: string } | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 250,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.warn(`[Gemma AI] Google API error (${response.status}):`, errorText);
    return null;
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  return extractJson<{ title: string; text: string }>(rawText);
}

/**
 * Call Gemma via Groq API (gemma2-9b-it) if GROQ_API_KEY is configured
 */
async function callGroqGemma(
  prompt: string,
  groqKey: string
): Promise<{ title: string; text: string } | null> {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: "gemma2-9b-it",
      messages: [
        {
          role: "system",
          content: "Anda adalah Nai, asisten tutor STEM ceria. Respon HANYA dalam format JSON: {\"title\": string, \"text\": string}",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 250,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    console.warn(`[Gemma AI] Groq API error (${response.status})`);
    return null;
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  return extractJson<{ title: string; text: string }>(content);
}

/**
 * Primary AI handler using Gemma with pedagogical fallback
 */
export async function generateNaiHint(params: GenerateHintParams): Promise<GenerateHintResult> {
  const { topicSlug, challengeQuestion, hintLevel, userAttempts } = params;
  const naiMood = hintLevel === 4 ? "teaching" : "hinting";

  // Build targeted pedagogical prompt for Gemma
  const prompt = `Anda adalah Nai, teman belajar STEM ceria dan sabar di platform Nalar.
Tugas Anda memberikan bantuan ${hintLevel === 3 ? "Langkah Petunjuk Konseptual (Hint 3)" : "Jawaban Lengkap Solusi (Hint 4)"}.
Topik Pembelajaran: ${topicSlug}
Pertanyaan Tantangan: ${challengeQuestion}
Snapshot usaha pengguna terakhir: ${JSON.stringify(userAttempts?.slice(-2) || [])}

Aturan:
- Gunakan bahasa Indonesia yang ramah, memotivasi, dan membangkitkan rasa ingin tahu.
- Maksimal 3 kalimat ringkas dan jelas.
- Format respon HARUS dalam JSON valid: {"title": "Judul Singkat", "text": "Isi petunjuk Nai"}`;

  // 1. Try Groq with Gemma (fastest inference, if key available)
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const groqResult = await callGroqGemma(prompt, groqKey);
      if (groqResult?.text) {
        return {
          hintLevel,
          naiMood,
          title: groqResult.title || (hintLevel === 4 ? "Solusi & Penjelasan Nai" : "Petunjuk Terarah Nai"),
          text: groqResult.text,
          source: "gemma",
          model: "gemma2-9b-it (Groq)",
        };
      }
    } catch (err) {
      console.warn("[Gemma AI] Groq attempt failed, trying Google API:", err);
    }
  }

  // 2. Try Google AI Studio with Gemma (gemma-2-9b-it)
  const googleApiKey = process.env.GEMMA_API_KEY || process.env.GEMINI_API_KEY;
  const gemmaModel = process.env.GEMMA_MODEL || "gemma-2-9b-it";

  if (googleApiKey) {
    try {
      const googleResult = await callGoogleGemma(prompt, googleApiKey, gemmaModel);
      if (googleResult?.text) {
        return {
          hintLevel,
          naiMood,
          title: googleResult.title || (hintLevel === 4 ? "Solusi & Penjelasan Nai" : "Petunjuk Terarah Nai"),
          text: googleResult.text,
          source: "gemma",
          model: gemmaModel,
        };
      }
    } catch (err) {
      console.warn("[Gemma AI] Google Gemma attempt failed:", err);
    }
  }

  // 3. Fallback pedagogis lokal (Zero-token safe fallback)
  return {
    hintLevel,
    naiMood,
    title: hintLevel === 4 ? "Solusi & Penjelasan Lengkap" : "Petunjuk Terarah Nai",
    text:
      hintLevel === 4
        ? "Untuk menyelesaikan tantangan ini, perhatikan hubungan target dengan kondisi batas kanvas. Amati parameter yang paling menentukan nilai output."
        : "Coba amati perubahan pada kanvas saat nilai variabel digeser perlahan. Nilai target memiliki pola keteraturan yang proporsional.",
    source: "mock",
    model: "local-pedagogy-mock",
  };
}
