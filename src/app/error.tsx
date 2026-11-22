"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Compass } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="bg-[#2E2E2E] min-h-[85vh] text-[#E9E1D4] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1F132A] border border-[#8C2727]/60 p-6 sm:p-8 rounded-sm shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#2E2E2E] border border-[#8C2727] flex items-center justify-center text-[#E98C8C]">
            <AlertTriangle size={32} />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#E98C8C] uppercase font-bold">
            [ Distortion Detected ]
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-[#E9E1D4] uppercase">
            Something Went Wrong
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7A7A] font-mono leading-relaxed">
            An unexpected error occurred while loading audio or video components. You can retry or head back to topics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <RotateCcw size={14} />
            <span>Try Again</span>
          </button>

          <Link
            href="/Topics"
            className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass size={14} />
            <span>Explore Topics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
