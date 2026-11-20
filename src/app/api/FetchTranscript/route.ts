import { Supadata } from "@supadata/js";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TranscriptItem, cleanTranscriptItems } from "@/features/shadowing";

const supadataApiKey = process.env.SUPADATA_API_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

/**
 * Polishes raw YouTube auto-captions using Gemini 2.5 Flash:
 * 1. Strips sound effect markers [Music], [Applause], ♪.
 * 2. Adds punctuation (periods, commas, question marks).
 * 3. Fixes capitalization (sentence beginnings, proper nouns, "I").
 * 4. Corrects speech-to-text typos while maintaining exact timing & line counts.
 * 5. Falls back to raw transcript gracefully if anything fails.
 */
async function polishTranscriptWithGemini(items: TranscriptItem[]): Promise<TranscriptItem[]> {
  if (!geminiApiKey || items.length === 0) return items;

  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const BATCH_SIZE = 50;
    const polishedItems = [...items];

    for (let start = 0; start < items.length; start += BATCH_SIZE) {
      const slice = items.slice(start, start + BATCH_SIZE);
      const payload = slice.map((item, idx) => ({ i: start + idx, t: item.text }));

      const prompt = `You are an English linguistic editor for a shadowing language learning app.
Refine these speech transcription lines by:
1. Stripping out any sound effect markers, background noise descriptions, or musical tags like [Music], [Applause], [Laughter], [Cheering], ♪.
2. Adding proper punctuation (periods, commas, apostrophes, question marks, exclamation marks).
3. Adding proper sentence capitalization (sentence beginnings, proper nouns, "I").
4. Correcting obvious speech-to-text typos while keeping the spoken phrasing natural.
Return a valid JSON array of objects: [{"i": number, "t": string}] with the exact same count and indices as the input payload.`;

      // 7-second timeout race to prevent hanging during AI traffic spikes
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini polish timeout (7s)")), 7000)
      );

      const generatePromise = model.generateContent([
        { text: prompt },
        { text: JSON.stringify(payload) },
      ]);

      const result: any = await Promise.race([generatePromise, timeoutPromise]);
      const text = result.response.text();
      const parsed: { i: number; t: string }[] = JSON.parse(text);

      if (Array.isArray(parsed)) {
        for (const p of parsed) {
          if (typeof p.i === "number" && p.t && polishedItems[p.i]) {
            polishedItems[p.i] = {
              ...polishedItems[p.i],
              text: p.t,
            };
          }
        }
      }
    }

    console.log(`Gemini polished ${items.length} transcript lines successfully.`);
    return polishedItems;
  } catch (err: any) {
    console.warn("Gemini transcript polish error, falling back to raw items:", err?.message || err);
    return items;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    // Version 5: Cleaned transcript cache key (music tags removed & Gemini polished)
    const cacheKey = `transcript:v5:${videoId}`;

    // 1. Try Permanent Redis Cache first (Instant, 0 API cost)
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log(`Redis Cache Hit (v5 Cleaned) for video: ${videoId}`);
        const parsed = typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;
        const cleanedCached = cleanTranscriptItems(parsed.content || parsed);
        return NextResponse.json(cleanedCached);
      }
    } catch (redisError) {
      console.error("Redis Cache Read Error (continuing to fetch):", redisError);
    }

    if (!supadataApiKey) {
      console.error("CRITICAL: SUPADATA_API_KEY is missing in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const fullYoutubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // 2. Fetch raw transcript from Supadata
    console.log(`Fetching transcript from Supadata for: ${videoId}`);
    const supadata = new Supadata({ apiKey: supadataApiKey });
    const result = await supadata.youtube.transcript({
      url: fullYoutubeUrl,
      text: false,
    });

    if (!result || !result.content || !Array.isArray(result.content)) {
      return NextResponse.json({ error: "No transcript found for this video" }, { status: 404 });
    }

    // Map and immediately filter out non-speech sound tags like [Music]
    const rawItems: TranscriptItem[] = cleanTranscriptItems(
      result.content.map((item: any) => ({
        text: String(item.text || "").trim(),
        offset: Number(item.offset) || 0,
        duration: Number(item.duration) || 0,
      }))
    );

    // 3. Post-Process & Polish with Gemini 2.5 Flash
    console.log(`Polishing transcript with Gemini AI for: ${videoId}`);
    const polishedTranscript = cleanTranscriptItems(await polishTranscriptWithGemini(rawItems));

    // 4. Save to Redis Permanently (1 year TTL)
    try {
      await redis.set(cacheKey, JSON.stringify(polishedTranscript), { ex: 31536000 });
      console.log(`Saved polished cleaned transcript to permanent Redis cache for: ${videoId}`);
    } catch (redisSetError) {
      console.error("Redis Cache Save Error:", redisSetError);
    }

    return NextResponse.json(polishedTranscript);
  } catch (e: any) {
    console.error("Full Transcript API Error:", e);
    return NextResponse.json(
      { error: e?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
