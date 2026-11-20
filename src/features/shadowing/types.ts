export interface TranscriptItem {
  text: string;
  duration: number; // in milliseconds
  offset: number; // in milliseconds
}

export type ShadowingMode = "normal" | "echo" | "blind";

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

