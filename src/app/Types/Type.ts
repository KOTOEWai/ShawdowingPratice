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


export interface TranscriptItem {
  text: string;
  duration: number;
  offset: number; // ms
}


export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
    }[];
  }[];
}


export type PopOverProps = {
  data: DictionaryEntry | null;
  loading: boolean;
  coords: { top: number; left: number };
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  cleanWord: string;
};


export type ExternalLinkProps = {
  href: string;
  label: string;
  color: string;
};


export type Colors = {
  [key: string]: string;
}

export interface VideoRowProps {
  title: string;
  link: string;
  videos: VideoItem[];
}