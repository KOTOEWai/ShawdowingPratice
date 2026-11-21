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
    { key: "Space", desc: "Play/Pause (or Advance immediately when in Wait / Manual Mode)" },
    { key: "Enter", desc: "Jump to Next sentence" },
    { key: "R", desc: "Replay current active sentence" },
    { key: "L", desc: "Toggle single sentence loop" },
    { key: "← (Left)", desc: "Jump to previous sentence" },
    { key: "→ (Right)", desc: "Jump to next sentence" },
    { key: "M", desc: "Toggle Mastered status for current sentence" },
    { key: "S", desc: "Cycle playback speed (0.75x → 1.0x → 1.25x → 1.5x)" },
    { key: "?", desc: "Toggle this keyboard shortcuts menu" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="relative w-full max-w-md bg-[#1F132A] border border-[#3A3A3A] rounded-none p-6 shadow-2xl text-[#E9E1D4]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#E9E1D4]/70 hover:text-[#B5A642] hover:bg-[#2E2E2E] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5 border-b border-[#3A3A3A] pb-3">
            <div className="w-8 h-8 rounded-none bg-[#B5A642]/20 border border-[#B5A642] flex items-center justify-center text-[#B5A642]">
              <Keyboard size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[#E9E1D4]">
                Keyboard Shortcuts
              </h3>
              <p className="text-xs text-[#E9E1D4]/60">Hands-free shadowing practice</p>
            </div>
          </div>

          {/* Shortcuts list */}
          <div className="space-y-2 mb-6 max-h-[60vh] overflow-y-auto pr-1">
            {shortcuts.map((sc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-[#2E2E2E] border border-[#3A3A3A]"
              >
                <span className="text-xs text-[#E9E1D4]/90 pr-2">{sc.desc}</span>
                <kbd className="px-2 py-0.5 bg-[#1F132A] border border-[#B5A642]/50 text-[11px] font-mono text-[#B5A642] font-bold shrink-0">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-mono font-bold uppercase bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 transition-colors"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
