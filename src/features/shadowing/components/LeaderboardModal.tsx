"use client";

import React from "react";
import { X, Trophy, Flame, CheckCircle2, Medal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStreak: number;
  userMasteredCount: number;
}

export default function LeaderboardModal({
  isOpen,
  onClose,
  userStreak,
  userMasteredCount,
}: LeaderboardModalProps) {
  if (!isOpen) return null;

  const topLearners = [
    { rank: 1, name: "Alexander P.", streak: 18, mastered: 142, badge: "🥇" },
    { rank: 2, name: "May Thazin", streak: 14, mastered: 118, badge: "🥈" },
    { rank: 3, name: "Kenji Sato", streak: 9, mastered: 89, badge: "🥉" },
    { rank: 4, name: "You (Learner)", streak: userStreak || 1, mastered: userMasteredCount || 12, isUser: true },
    { rank: 5, name: "Sarah Jenkins", streak: 7, mastered: 64 },
    { rank: 6, name: "David Lin", streak: 5, mastered: 51 },
    { rank: 7, name: "Elena Rostova", streak: 4, mastered: 43 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-[#1F132A] border border-[#33323E] rounded-2xl p-6 sm:p-8 shadow-2xl text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-[#A1A0AB] hover:text-white hover:bg-[#181622] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                Weekly Community Leaderboard
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#853BCE]/20 text-[#A667E4] border border-[#853BCE]/30">
                  Live
                </span>
              </h3>
              <p className="text-xs text-[#A1A0AB]">Top English shadowers ranked by sentences mastered & streaks</p>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="space-y-2 mb-6 max-h-[340px] overflow-y-auto pr-1">
            {topLearners.map((item) => (
              <div
                key={item.rank}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  item.isUser
                    ? "bg-[#853BCE]/20 border-[#853BCE] shadow-md shadow-[#853BCE]/20"
                    : "bg-[#181622] border-[#33323E] hover:border-[#853BCE]/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-mono font-bold text-[#A1A0AB]">
                    {item.badge || `#${item.rank}`}
                  </span>
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        item.isUser ? "text-white font-semibold flex items-center gap-1.5" : "text-[#DCDCE0]"
                      }`}
                    >
                      {item.name}
                      {item.isUser && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#853BCE] text-white">
                          You
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  {/* Streak */}
                  <div className="flex items-center gap-1 text-amber-400">
                    <Flame size={13} className="fill-amber-400" />
                    <span>{item.streak}d</span>
                  </div>

                  {/* Mastered */}
                  <div className="flex items-center gap-1 text-[#42946E] font-medium">
                    <CheckCircle2 size={13} />
                    <span>{item.mastered}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#13111C] border border-[#33323E] flex items-center justify-between text-xs text-[#A1A0AB]">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#A667E4]" />
              Practice sentences to climb the global leaderboard!
            </span>
            <button
              onClick={onClose}
              className="btn-railway-primary px-4 py-1.5 text-xs font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
