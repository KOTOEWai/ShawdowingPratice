export interface TranscriptItem {
  text: string;
  duration: number; // in milliseconds
  offset: number; // in milliseconds
}

export type ShadowingMode = "continuous" | "blind";

export interface SubtitleSyncSettings {
  offsetMs: number; // in milliseconds, default 0ms
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
