"use client";

import React from "react";
import { Minus, Plus, RefreshCw, SlidersHorizontal } from "lucide-react";

interface SubtitleSyncControlProps {
  offsetMs: number;
  onAdjustOffset: (deltaMs: number) => void;
  onResetOffset: () => void;
  className?: string;
}

function formatOffsetDisplay(offsetMs: number): string {
  if (offsetMs === 0) return "0ms";
  if (offsetMs > 0) return `+${offsetMs}ms`;
  return `${offsetMs}ms`;
}

export default function SubtitleSyncControl({
  offsetMs,
  onAdjustOffset,
  onResetOffset,
  className = "",
}: SubtitleSyncControlProps) {
  const isAdjusted = offsetMs !== 0;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-1 text-[11px] font-mono tracking-wider uppercase text-[#B5A642] select-none mr-1">
        <SlidersHorizontal size={12} className="text-[#B5A642]" />
        <span className="hidden sm:inline">Sync:</span>
      </div>

      <div className="inline-flex items-center border border-[#3A3A3A] bg-[#1F132A] rounded-sm p-0.5">
        {/* Decrement by 100ms */}
        <button
          type="button"
          onClick={() => onAdjustOffset(-100)}
          title="Delay subtitles by 100ms"
          className="px-1.5 py-1 text-xs text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:bg-[#2E2E2E] rounded-sm transition-colors cursor-pointer"
        >
          <Minus size={12} />
        </button>

        {/* Current offset badge */}
        <button
          type="button"
          onClick={onResetOffset}
          title="Click to reset offset to 0ms"
          className={`px-2 py-0.5 text-xs font-mono font-semibold rounded-sm transition-colors cursor-pointer ${
            isAdjusted
              ? "bg-[#B5A642]/20 text-[#B5A642] border border-[#B5A642]/40"
              : "text-[#E9E1D4]/70 hover:text-[#E9E1D4]"
          }`}
        >
          {formatOffsetDisplay(offsetMs)}
        </button>

        {/* Increment by 100ms */}
        <button
          type="button"
          onClick={() => onAdjustOffset(100)}
          title="Advance subtitles by 100ms"
          className="px-1.5 py-1 text-xs text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:bg-[#2E2E2E] rounded-sm transition-colors cursor-pointer"
        >
          <Plus size={12} />
        </button>
      </div>

      {isAdjusted && (
        <button
          type="button"
          onClick={onResetOffset}
          title="Reset sync offset to 0ms"
          className="p-1 text-[#E9E1D4]/60 hover:text-[#B5A642] transition-colors cursor-pointer"
        >
          <RefreshCw size={11} />
        </button>
      )}
    </div>
  );
}
