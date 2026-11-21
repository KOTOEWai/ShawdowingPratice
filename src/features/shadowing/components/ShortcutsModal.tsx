"use client";

import React from "react";
import { X, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "Space / Enter", desc: "Play/Pause (or Skip Echo pause to next line)" },
    { key: "R", desc: "Replay current active sentence" },
    { key: "L", desc: "Toggle sentence loop mode (continuous shadowing)" },
    { key: "← (Left)", desc: "Jump to previous sentence" },
    { key: "→ (Right)", desc: "Jump to next sentence" },
    { key: "M", desc: "Toggle Mastered status for current sentence" },
    { key: "S", desc: "Cycle playback speed (0.75x → 1.0x → 1.25x)" },
    { key: "?", desc: "Toggle this keyboard shortcuts menu" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-[#1F132A] border border-[#33323E] rounded-2xl p-6 sm:p-7 shadow-2xl text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-[#A1A0AB] hover:text-white hover:bg-[#181622] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#853BCE]/15 border border-[#853BCE]/30 flex items-center justify-center text-[#A667E4]">
              <Keyboard size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">Keyboard Shortcuts</h3>
              <p className="text-xs text-[#A1A0AB]">Practice effortlessly without touching the mouse</p>
            </div>
          </div>

          {/* Shortcuts list */}
          <div className="space-y-2.5 mb-6">
            {shortcuts.map((sc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-[#181622] border border-[#33323E]"
              >
                <span className="text-xs text-[#DCDCE0]">{sc.desc}</span>
                <kbd className="px-2 py-0.5 rounded bg-[#13111C] border border-[#33323E] text-[11px] font-mono text-[#A667E4] font-semibold">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="btn-railway-primary px-5 py-2 text-xs font-medium"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
