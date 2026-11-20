import { redis } from "@/lib/redis";

export default async function fetchAllPlaylist(playlistId: string) {
  const cacheKey = `Youtubelist_all:${playlistId}`;

  try {
    // 1. Check if cache exists in Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Serving from Cache");
      return cachedData;
    }

    // 2. Fetch from YouTube API if cache miss
    console.log("Fetching from YouTube API");
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items) return [];

    // 3. Save to Redis cache for 24 hours (86400 seconds)
    await redis.set(cacheKey, data.items, { ex: 86400 });

    return data.items;
  } catch (error) {
    console.error("Redis or YouTube API Error:", error);
    return [];
  }
}
