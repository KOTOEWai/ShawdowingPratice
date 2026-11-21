"use client";

import React from "react";
import { WaitMode } from "../types";
import { Clock } from "lucide-react";

interface WaitModeSelectorProps {
  currentMode: WaitMode;
  onSelectMode: (mode: WaitMode) => void;
  className?: string;
}

const MODES: { id: WaitMode; label: string; tooltip: string }[] = [
  { id: "off", label: "Off", tooltip: "Continuous playback without automatic pauses" },
  { id: "30%", label: "+30%", tooltip: "Pause for +30% of sentence duration to repeat" },
  { id: "50%", label: "+50%", tooltip: "Pause for +50% of sentence duration to repeat" },
  { id: "manual", label: "Manual", tooltip: "Pause indefinitely until Space or Next is pressed" },
];

export default function WaitModeSelector({
  currentMode,
  onSelectMode,
  className = "",
}: WaitModeSelectorProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-1 text-[11px] font-mono tracking-wider uppercase text-[#B5A642] select-none mr-1">
        <Clock size={12} className="text-[#B5A642]" />
        <span className="hidden sm:inline">Wait Mode:</span>
      </div>

      <div className="inline-flex border border-[#3A3A3A] bg-[#1F132A] rounded-sm p-0.5">
        {MODES.map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelectMode(mode.id)}
              title={mode.tooltip}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-sm transition-colors cursor-pointer select-none ${
                isActive
                  ? "bg-[#B5A642] text-[#1F132A] font-bold shadow-none"
                  : "text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:bg-[#2E2E2E]"
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
