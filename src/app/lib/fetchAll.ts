import { redis } from "./redis"; // အပေါ်က ဖိုင်ကို import လုပ်ပါ

export default async function fetchAllPlaylist(playlistId: string) {
  const cacheKey = `Youtubelist_all:${playlistId}`;

  try {
    // ၁။ Redis ထဲမှာ Cache ရှိမရှိ အရင်စစ်ပါ
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Serving from Cache");
      return cachedData;
    }

    // ၂။ Cache မရှိလျှင် YouTube API ကို ခေါ်ပါ
    console.log("Fetching from YouTube API");
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items) return [];

    // ၃။ ရလာတဲ့ Data ကို Redis ထဲမှာ Cache သိမ်းပါ (ဥပမာ - ၂၄ နာရီ သိမ်းထားမည်)
    // ex: 86400 seconds = 24 hours
    await redis.set(cacheKey, data.items, { ex: 86400 });

    return data.items;
  } catch (error) {
    console.error("Redis or YouTube API Error:", error);
    return [];
  }
}