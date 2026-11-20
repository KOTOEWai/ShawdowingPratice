export interface TranscriptItem {
  text: string;
  duration: number; // in milliseconds
  offset: number; // in milliseconds
}

export type ShadowingMode = "normal" | "echo" | "blind";
