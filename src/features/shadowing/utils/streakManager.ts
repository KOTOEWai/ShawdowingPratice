import { StreakData } from "../types";

export const DAILY_STREAK_TARGET = 3; // 3 mastered lines per day

export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getYesterdayDateString(): string {
  const d = new Date(Date.now() - 86400000);
  return d.toISOString().slice(0, 10);
}

/**
 * Loads streak information from localStorage, automatically evaluating
 * yesterday's activity and applying a Streak Freeze if 1 day was missed.
 */
export function loadStreakData(): StreakData {
  const todayStr = getTodayDateString();
  const yesterdayStr = getYesterdayDateString();

  const defaultData: StreakData = {
    streak: 0,
    bestStreak: 0,
    lastDate: todayStr,
    todayCount: 0,
    isGoalMet: false,
    freezes: 1, // Every user gets 1 complimentary Streak Freeze!
    freezeUsedDates: [],
    activeDates: [],
  };

  if (typeof window === "undefined") return defaultData;

  try {
    const raw = localStorage.getItem("shadowing_streak_data");
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);

    let streak = typeof parsed.streak === "number" ? parsed.streak : 1;
    let bestStreak = typeof parsed.bestStreak === "number" ? parsed.bestStreak : Math.max(1, streak);
    let freezes = typeof parsed.freezes === "number" ? parsed.freezes : 1;
    let freezeUsedDates: string[] = Array.isArray(parsed.freezeUsedDates) ? parsed.freezeUsedDates : [];
    let activeDates: string[] = Array.isArray(parsed.activeDates) ? parsed.activeDates : [];
    let todayCount = 0;
    let isGoalMet = false;

    if (parsed.lastDate === todayStr) {
      // Activity recorded today
      todayCount = parsed.todayCount || 0;
      isGoalMet = parsed.isGoalMet || todayCount >= DAILY_STREAK_TARGET;
    } else if (parsed.lastDate === yesterdayStr) {
      // Last active yesterday - streak is intact!
      todayCount = 0;
      isGoalMet = false;
    } else if (parsed.lastDate) {
      // Missed at least 1 day. Check if Streak Freeze can protect it!
      const lastPracticed = new Date(parsed.lastDate).getTime();
      const now = new Date(todayStr).getTime();
      const daysDiff = Math.round((now - lastPracticed) / (1000 * 60 * 60 * 24));

      if (daysDiff === 2 && freezes > 0 && !freezeUsedDates.includes(yesterdayStr)) {
        // Freeze protects yesterday!
        freezes -= 1;
        freezeUsedDates.push(yesterdayStr);
        // Streak is preserved!
      } else if (daysDiff > 1) {
        // Streak lost
        streak = 0;
      }
      todayCount = 0;
      isGoalMet = false;
    }

    const result: StreakData = {
      streak,
      bestStreak: Math.max(bestStreak, streak),
      lastDate: todayStr,
      todayCount,
      isGoalMet,
      freezes,
      freezeUsedDates,
      activeDates,
    };

    saveStreakData(result);
    return result;
  } catch (e) {
    console.warn("Streak load error:", e);
    return defaultData;
  }
}

/**
 * Records a newly mastered line, updating today's count and extending
 * the streak when DAILY_STREAK_TARGET is met.
 */
export function recordMasteredLineProgress(currentData: StreakData): {
  updatedData: StreakData;
  justMetGoal: boolean;
} {
  const todayStr = getTodayDateString();
  const newTodayCount = currentData.todayCount + 1;
  const wasAlreadyMet = currentData.isGoalMet;
  const justMetGoal = !wasAlreadyMet && newTodayCount >= DAILY_STREAK_TARGET;
  const isGoalMet = wasAlreadyMet || justMetGoal;

  let newStreak = currentData.streak;

  if (justMetGoal) {
    // Increment streak on hitting target for today
    newStreak = currentData.streak === 0 ? 1 : currentData.streak + 1;

    // Milestone bonus: every 7 days, earn +1 freeze (up to 3)
    let newFreezes = currentData.freezes;
    if (newStreak % 7 === 0 && newFreezes < 3) {
      newFreezes += 1;
    }

    const updatedActiveDates = Array.from(new Set([...currentData.activeDates, todayStr]));

    const updatedData: StreakData = {
      ...currentData,
      streak: newStreak,
      bestStreak: Math.max(currentData.bestStreak, newStreak),
      lastDate: todayStr,
      todayCount: newTodayCount,
      isGoalMet: true,
      freezes: newFreezes,
      activeDates: updatedActiveDates,
    };

    saveStreakData(updatedData);
    return { updatedData, justMetGoal: true };
  } else {
    const updatedActiveDates = Array.from(new Set([...currentData.activeDates, todayStr]));
    const updatedData: StreakData = {
      ...currentData,
      todayCount: newTodayCount,
      isGoalMet,
      activeDates: updatedActiveDates,
    };

    saveStreakData(updatedData);
    return { updatedData, justMetGoal: false };
  }
}

export function saveStreakData(data: StreakData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("shadowing_streak_data", JSON.stringify(data));
  } catch (e) {
    console.warn("Streak save error:", e);
  }
}
