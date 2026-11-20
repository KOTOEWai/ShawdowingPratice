"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, CheckCircle2, X, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

interface LessonCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  masteredCount: number;
  totalLines: number;
  reason: "mastery" | "playthrough" | "manual";
}

export const LessonCompleteModal: React.FC<LessonCompleteModalProps> = ({
  isOpen,
  onClose,
  masteredCount,
  totalLines,
  reason,
}) => {
  if (!isOpen) return null;

  const percent = totalLines > 0 ? Math.round((masteredCount / totalLines) * 100) : 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#1F132A] border border-[#853BCE]/50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center overflow-hidden"
        >
          {/* Subtle Glow background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#853BCE]/20 rounded-full blur-[70px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A1A0AB] hover:text-white hover:bg-[#13111C] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header Trophy Icon */}
          <div className="relative inline-block mb-4 mt-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#853BCE] to-[#42946E] flex items-center justify-center text-white shadow-xl shadow-[#853BCE]/30 mx-auto">
              <Trophy size={32} className="animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#42946E] border-2 border-[#1F132A] flex items-center justify-center text-white text-[10px]">
              <CheckCircle2 size={14} />
            </div>
          </div>

          <h3 className="hero-headline text-2xl font-bold text-white mb-2">
            🎉 Lesson Completed!
          </h3>

          <p className="text-xs sm:text-sm text-[#DCDCE0] mb-6 leading-relaxed">
            {reason === "mastery" && (
              <>Outstanding achievement! You mastered over <strong>80%</strong> of the speech lines in this lesson.</>
            )}
            {reason === "playthrough" && (
              <>Great discipline! You shadowed through the entire lesson video from start to finish.</>
            )}
            {reason === "manual" && (
              <>Congratulations! You marked this lesson as complete in your study records.</>
            )}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 bg-[#13111C] border border-[#33323E] rounded-xl p-3.5 mb-6 text-center">
            <div className="border-r border-[#33323E] pr-2">
              <div className="text-[11px] font-mono text-[#A1A0AB] mb-1">Mastery Score</div>
              <div className="text-lg font-bold font-mono text-[#42946E]">
                {masteredCount} / {totalLines} ({percent}%)
              </div>
            </div>
            <div className="pl-2">
              <div className="text-[11px] font-mono text-[#A1A0AB] mb-1">Profile Stat</div>
              <div className="text-lg font-bold font-mono text-[#A667E4]">
                +1 Lesson Done
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 btn-railway-secondary text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Continue Practicing</span>
            </button>
            <Link
              href="/profile"
              className="flex-1 py-2.5 btn-railway-primary text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 text-center"
            >
              <span>View Profile</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
