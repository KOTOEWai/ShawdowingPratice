"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Snowflake, Trophy, CheckCircle2, Shield, Sparkles, X, Target } from "lucide-react";
import { StreakData } from "../types";
import { DAILY_STREAK_TARGET, getTodayDateString } from "../utils/streakManager";

interface StreakTrackerProps {
  data: StreakData;
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({
  data,
  isModal = false,
  isOpen = false,
  onClose,
}) => {
  const todayStr = getTodayDateString();

  // Generate the last 7 days array
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    const dateStr = d.toISOString().slice(0, 10);
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    const isToday = dateStr === todayStr;
    const isPracticed = data.activeDates?.includes(dateStr) || (isToday && data.isGoalMet);
    const isFrozen = data.freezeUsedDates?.includes(dateStr);

    return {
      dateStr,
      dayLabel,
      dayNum,
      isToday,
      isPracticed,
      isFrozen,
    };
  });

  const getMilestone = (days: number) => {
    if (days >= 30) return { title: "English Legend", icon: "👑", color: "text-amber-400" };
    if (days >= 14) return { title: "Fluency Master", icon: "⚡", color: "text-[#A667E4]" };
    if (days >= 7) return { title: "Habit Builder", icon: "🥇", color: "text-[#82AAFF]" };
    if (days >= 3) return { title: "Dedicated Learner", icon: "🥉", color: "text-[#42946E]" };
    return { title: "Starting Journey", icon: "🌱", color: "text-[#A1A0AB]" };
  };

  const milestone = getMilestone(data.streak);
  const progressPercent = Math.min(100, Math.round((data.todayCount / DAILY_STREAK_TARGET) * 100));

  const content = (
    <div className="bg-[#1F132A] border border-[#33323E] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background Nocturnal Glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
            <Flame size={26} className="fill-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="hero-headline text-xl font-bold text-white tracking-tight">
                {data.streak} Day Streak
              </h3>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#13111C] border border-[#33323E] ${milestone.color}`}>
                {milestone.icon} {milestone.title}
              </span>
            </div>
            <p className="text-xs text-[#A1A0AB] mt-0.5 font-mono">
              Best record: <strong className="text-white">{data.bestStreak} days</strong>
            </p>
          </div>
        </div>

        {/* Streak Freeze Badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono"
          title="Streak Freeze protects your streak if you miss a single day"
        >
          <Snowflake size={14} className="animate-spin-slow" />
          <span>{data.freezes} Freeze</span>
        </div>
      </div>

      {/* 7-Day Flame Track */}
      <div className="bg-[#13111C] border border-[#33323E] rounded-xl p-3.5 mb-5">
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
          {last7Days.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className={`text-[10px] font-mono ${day.isToday ? "text-amber-400 font-bold" : "text-[#6C6B7B]"}`}>
                {day.dayLabel}
              </span>

              {/* Day Circle */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                  day.isPracticed
                    ? "bg-amber-500/20 border border-amber-500/60 text-amber-400 shadow-md shadow-amber-500/20"
                    : day.isFrozen
                    ? "bg-cyan-950/60 border border-cyan-500/50 text-cyan-400"
                    : day.isToday
                    ? "bg-[#181622] border-2 border-dashed border-amber-500/50 text-[#A1A0AB]"
                    : "bg-[#181622] border border-[#33323E] text-[#6C6B7B]"
                }`}
              >
                {day.isPracticed ? (
                  <Flame size={18} className="fill-amber-400" />
                ) : day.isFrozen ? (
                  <Snowflake size={16} />
                ) : day.isToday ? (
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    {data.todayCount}/{DAILY_STREAK_TARGET}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono">{day.dayNum}</span>
                )}
              </div>

              {day.isToday && (
                <span className="text-[9px] font-mono text-amber-400 font-medium uppercase tracking-widest">
                  Today
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Goal Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#DCDCE0]">
            <Target size={14} className="text-[#A667E4]" />
            <span>Daily Practice Goal ({DAILY_STREAK_TARGET} Mastered Lines)</span>
          </div>
          <span className={data.isGoalMet ? "text-[#42946E] font-bold" : "text-amber-400 font-bold"}>
            {data.isGoalMet ? "Goal Met ✔" : `${data.todayCount} / ${DAILY_STREAK_TARGET} lines`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#13111C] rounded-full overflow-hidden border border-[#33323E]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${
              data.isGoalMet
                ? "bg-[#42946E]"
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
          />
        </div>

        <p className="text-[11px] text-[#A1A0AB] text-center pt-1">
          {data.isGoalMet
            ? "🎉 Flame lit for today! Come back tomorrow to keep your streak burning."
            : `Master ${Math.max(0, DAILY_STREAK_TARGET - data.todayCount)} more lines today to maintain your streak!`}
        </p>
      </div>
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="max-w-lg w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-[#A1A0AB] hover:text-white hover:bg-[#13111C] transition-colors"
            >
              <X size={18} />
            </button>
            {content}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return content;
};
