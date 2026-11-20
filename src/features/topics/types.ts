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
  movieVideos: VideoItem[];
  dailyVideos: VideoItem[];
  business: VideoItem[];
  ielts: VideoItem[];
}

export interface VideoRowProps {
  title: string;
  link: string;
  videos: VideoItem[];
}
