import { NextRequest, NextResponse } from "next/server";
import { HintRequest, HintResponse } from "@/lib/hints/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as HintRequest;

    const {
      topicSlug,
      challengeQuestion,
      hintLevel,
      userAttempts,
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // If API Key is configured, attempt real LLM call
    if (apiKey) {
      const prompt = `Anda adalah Nai, teman belajar STEM ceria dan sabar di platform Nalar.
Tugas Anda memberikan bantuan ${hintLevel === 3 ? "Langkah Petunjuk Konseptual (Hint 3)" : "Jawaban Lengkap Solusi (Hint 4)"}.
Topik: ${topicSlug}
Soal: ${challengeQuestion}
Snapshot usaha pengguna terakhir: ${JSON.stringify(userAttempts.slice(-2))}

Aturan:
- Gunakan bahasa Indonesia yang ramah, santun, dan membangkitkan rasa ingin tahu.
- Maksimal 3 kalimat ringkas.
- Format respon dalam JSON: {"title": string, "text": string}`;

      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json", temperature: 0.3 },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            const resPayload: Partial<HintResponse> = {
              hintLevel,
              naiMood: hintLevel === 4 ? "teaching" : "hinting",
              title: parsed.title || "Petunjuk AI",
              text: parsed.text,
              source: "ai",
            };
            return NextResponse.json(resPayload);
          }
        }
      } catch (geminiErr) {
        console.warn("[API Hints] Gemini call error, falling back:", geminiErr);
      }
    }

    // Default pedagogical fallback if API key is not set or network fails
    const fallbackResponse: Partial<HintResponse> = {
      hintLevel,
      naiMood: hintLevel === 4 ? "teaching" : "hinting",
      title: hintLevel === 4 ? "Solusi & Penjelasan Lengkap" : "Petunjuk Terarah Nai",
      text:
        hintLevel === 4
          ? `Untuk menyelesaikan teka-teki ini, perhatikan hubungan target dengan kondisi batas. Nai telah menyesuaikan parameter kanvas ke nilai jawaban.`
          : `Coba amati perubahan pada kanvas saat nilai variabel digeser. Nilai target sangat dipengaruhi oleh kelipatan dari modulus atau determinan.`,
      source: "mock",
    };

    return NextResponse.json(fallbackResponse);
  } catch (error) {
    console.error("[API Hints] Internal route error:", error);
    return NextResponse.json(
      { error: "Gagal memproses petunjuk" },
      { status: 500 }
    );
  }
}
