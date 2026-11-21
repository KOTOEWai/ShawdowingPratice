export interface TranscriptItem {
  text: string;
  duration: number; // in milliseconds
  offset: number; // in milliseconds
}

export type ShadowingMode = "continuous" | "step" | "blind";

export type WaitMode = "off" | "30%" | "50%" | "manual";

export type PlaybackState =
  | "idle"
  | "playing"
  | "waiting"
  | "manual-paused"
  | "looping"
  | "ended";

export interface SubtitleSyncSettings {
  offsetMs: number; // in milliseconds, default 0ms
}

export interface SentenceTiming {
  startMs: number;
  endMs: number;
  durationMs: number;
}

export interface StreakData {
  streak: number;
  bestStreak: number;
  lastDate: string; // YYYY-MM-DD
  todayCount: number;
  isGoalMet: boolean;
  freezes: number;
  freezeUsedDates: string[];
  activeDates: string[];
}
