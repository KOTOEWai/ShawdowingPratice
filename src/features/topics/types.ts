export interface VideoItem {
  title: string;
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { high: { url: string } };
    resourceId: { videoId: string };
  };
}

export interface TopicPageProps {
  ielts: VideoItem[];
  tedVideos?: VideoItem[];
  dailyVideos: VideoItem[];
  movieVideos: VideoItem[];
  business: VideoItem[];
  everydayQa?: VideoItem[];
}

export interface VideoRowProps {
  title: string;
  link: string;
  videos: VideoItem[];
}
