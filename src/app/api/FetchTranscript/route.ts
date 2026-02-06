import { Supadata } from "@supadata/js";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

// Non-blocking key check
const apiKey = process.env.SUPADATA_API_KEY;

export async function GET(req: NextRequest) {
  try {
    if (!apiKey) {
      console.error("CRITICAL: SUPADATA_API_KEY is missing");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    const cacheKey = `transcript:v3:${videoId}`;

    // 1. Try Cache with a try/catch to prevent Redis down from breaking the app
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log("Redis Cache Hit");
        const parsed = typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;
        return NextResponse.json(parsed.content || parsed);
      }
    } catch (redisError) {
      console.error("Redis Error (continuing to API):", redisError);
    }
     const fullYoutubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    // 2. Fetch from Supadata
    const supadata = new Supadata({ apiKey });
    const result = await supadata.youtube.transcript({
      url: fullYoutubeUrl,
      text: false,
    });

    if (!result || !result.content) {
      return NextResponse.json({ error: "No transcript found for this video" }, { status: 404 });
    }

    // 3. Try to Save to Cache
    try {
      await redis.set(cacheKey, JSON.stringify(result), { ex: 86400 });
    } catch (redisSetError) {
      console.error("Redis Save Error:", redisSetError);
    }

    return NextResponse.json(result.content);
  } catch (e) {
    console.error("Full API Error:", e);
    return NextResponse.json(
      { error: e || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}