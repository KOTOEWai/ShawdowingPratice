"use client";

import React, { useState, useRef, useEffect } from "react";
import { Minus, Plus, RefreshCw, SlidersHorizontal, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`px-2.5 py-1.5 rounded-sm border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
          isAdjusted
            ? "bg-[#B5A642]/15 border-[#B5A642]/50 text-[#B5A642]"
            : "bg-[#2E2E2E] border-[#3A3A3A] text-[#7A7A7A] hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
        }`}
        title="Subtitle Sync Timing"
      >
        <SlidersHorizontal size={12} className={isAdjusted ? "text-[#B5A642]" : "text-[#7A7A7A]"} />
        <span>Sync</span>
        {isAdjusted && <span className="font-bold text-[11px]">({formatOffsetDisplay(offsetMs)})</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-1.5 z-40 bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-2 shadow-2xl flex items-center gap-2 text-xs font-mono min-w-max">
          <span className="text-[11px] text-[#7A7A7A] uppercase tracking-wider">Sync:</span>
          <div className="inline-flex items-center border border-[#3A3A3A] bg-[#2E2E2E] rounded-sm p-0.5">
            <button
              type="button"
              onClick={() => onAdjustOffset(-100)}
              title="Delay subtitles (-100ms)"
              className="px-1.5 py-0.5 text-xs text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:bg-[#3A3A3A] rounded-sm transition-colors cursor-pointer"
            >
              <Minus size={11} />
            </button>
            <span
              className={`px-2 py-0.5 text-xs font-mono font-bold ${
                isAdjusted ? "text-[#B5A642]" : "text-[#E9E1D4]/80"
              }`}
            >
              {formatOffsetDisplay(offsetMs)}
            </span>
            <button
              type="button"
              onClick={() => onAdjustOffset(100)}
              title="Advance subtitles (+100ms)"
              className="px-1.5 py-0.5 text-xs text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:bg-[#3A3A3A] rounded-sm transition-colors cursor-pointer"
            >
              <Plus size={11} />
            </button>
          </div>

          {isAdjusted && (
            <button
              type="button"
              onClick={onResetOffset}
              title="Reset offset to 0ms"
              className="px-1.5 py-0.5 text-[10px] text-[#7A7A7A] hover:text-[#8C2727] hover:border-[#8C2727] border border-transparent rounded-sm transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <RefreshCw size={10} />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 text-[#7A7A7A] hover:text-[#E9E1D4] cursor-pointer"
            title="Close"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
