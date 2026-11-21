export interface VideoItem {
  title: string;
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { high: { url: string } };
    resourceId: { videoId: string };
  };
}

export interface CuratedMovieItem {
  id: string;
  title: string;
  movie: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  duration: string;
  accent: "American" | "British" | "Australian / American" | "American / British";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  situation: string;
  description: string;
  thumbnail: string;
  featuredQuote?: string;
}

export interface TopicPageProps {
  movieVideos: VideoItem[];
  dailyVideos: VideoItem[];
  business: VideoItem[];
  ielts: VideoItem[];
  curatedMovies?: CuratedMovieItem[];
}

export interface VideoRowProps {
  title: string;
  link: string;
  videos: VideoItem[];
}
