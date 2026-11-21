import { redis } from "@/lib/redis";

function parseDurationSeconds(isoDuration?: string): number {
  if (!isoDuration) return 0;
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export default async function fetchAllPlaylist(playlistId: string) {
  // Version 7: Strictly filters out clips >= 7 minutes (420s max)
  const cacheKey = `Youtubelist_all:v7:${playlistId}`;

  try {
    // 1. Check if cache exists in Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`Serving from Cache (v7 All): ${playlistId}`);
      return cachedData;
    }

    // 2. Fetch from YouTube API if cache miss
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return [];

    console.log(`Fetching from YouTube API (All) for playlist: ${playlistId}`);
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items || data.items.length === 0) return [];

    // 3. Query video durations to strictly filter clips under 7 minutes (15s to 420s)
    const videoIds = data.items.map((it: any) => it.contentDetails?.videoId).filter(Boolean);
    const durUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(",")}&key=${apiKey}`;
    const durRes = await fetch(durUrl);
    const durData = await durRes.json();

    const durationMap = new Map<string, number>();
    durData.items?.forEach((v: any) => {
      durationMap.set(v.id, parseDurationSeconds(v.contentDetails?.duration));
    });

    const under7MinVideos = data.items.filter((item: any) => {
      const vid = item.contentDetails?.videoId;
      const dur = durationMap.get(vid);
      return dur && dur >= 15 && dur <= 420; // Maximum 7 minutes (420 seconds)
    });

    // 4. Save to Redis cache for 24 hours (86400 seconds)
    if (under7MinVideos.length > 0) {
      await redis.set(cacheKey, under7MinVideos, { ex: 86400 });
    }

    return under7MinVideos;
  } catch (error) {
    console.error("Redis or YouTube API Error:", error);
    return [];
  }
}
