"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Youtube, ArrowRight, AlertCircle, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomVideoModal({ isOpen, onClose }: CustomVideoModalProps) {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Extracts YouTube Video ID from any standard URL format:
   * - https://www.youtube.com/watch?v=5y_KJAg8bHI
   * - https://youtu.be/5y_KJAg8bHI
   * - https://www.youtube.com/shorts/...
   * - Direct 11-char ID
   */
  const extractVideoId = (input: string): string | null => {
    const trimmed = input.trim();
    if (!trimmed) return null;

    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    try {
      const url = new URL(trimmed);
      if (url.hostname.includes("youtube.com")) {
        if (url.pathname.startsWith("/shorts/")) {
          return url.pathname.replace("/shorts/", "").split("/")[0].split("?")[0];
        }
        if (url.pathname.startsWith("/embed/")) {
          return url.pathname.replace("/embed/", "").split("/")[0].split("?")[0];
        }
        return url.searchParams.get("v");
      }
      if (url.hostname === "youtu.be") {
        return url.pathname.slice(1).split("?")[0];
      }
    } catch {
      const regexMatch = trimmed.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*)/);
      if (regexMatch && regexMatch[1] && regexMatch[1].length === 11) {
        return regexMatch[1];
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const videoId = extractVideoId(urlInput);
    if (!videoId) {
      setError("Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=...) or an 11-character Video ID.");
      return;
    }

    setLoading(true);

    try {
      // Validate video length (must be <= 7 minutes) and fetch transcript
      const res = await fetch(`/api/FetchTranscript?videoId=${videoId}`);
      const data = await res.json();

      if (!res.ok || data.error) {
        const errorMsg =
          data.message ||
          data.error ||
          "Could not load subtitles for this video. Please make sure the video has English subtitles.";
        setError(errorMsg);
        setLoading(false);
        return;
      }

      // Valid video!
      setLoading(false);
      onClose();
      router.push(`/lessons/shadowing/${videoId}`);
    } catch {
      setError("Failed to validate video. Please check your network connection and try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="relative w-full max-w-lg bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-6 sm:p-7 shadow-2xl text-[#E9E1D4]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#E9E1D4]/60 hover:text-[#B5A642] hover:bg-[#2E2E2E] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4 border-b border-[#3A3A3A] pb-3">
            <div className="w-9 h-9 rounded-sm bg-[#8C2727]/20 border border-[#8C2727] flex items-center justify-center text-[#8C2727]">
              <Youtube size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono uppercase tracking-wider text-[#E9E1D4]">
                Practice Custom Video
              </h3>
              <p className="text-xs text-[#E9E1D4]/60 font-mono">Turn movie scenes & talks into shadowing lessons</p>
            </div>
          </div>

          {/* 7-Minute Limit Notice */}
          <div className="mb-5 p-3 rounded-sm bg-[#2E2E2E] border border-[#B5A642]/60 flex items-start gap-2.5">
            <Clock size={16} className="text-[#B5A642] shrink-0 mt-0.5" />
            <div className="text-xs font-mono leading-relaxed text-[#E9E1D4]">
              <strong className="text-[#B5A642] uppercase block mb-0.5">Max 7 Minutes Limit:</strong>
              To prevent fatigue and keep shadowing practice 100% focused, please choose short movie clips or conversations under 7 minutes.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#E9E1D4] mb-2 font-bold">
                YouTube URL or Video ID
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (error) setError("");
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3.5 py-2.5 bg-[#2E2E2E] border border-[#3A3A3A] focus:border-[#B5A642] rounded-sm text-xs text-[#E9E1D4] placeholder-[#7A7A7A] outline-none transition-colors font-mono"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-sm bg-[#8C2727]/20 border border-[#8C2727] text-[#E9E1D4] text-xs font-mono">
                <AlertCircle size={15} className="shrink-0 text-[#8C2727] mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-xs font-mono text-[#E9E1D4]/80 hover:text-[#E9E1D4] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !urlInput.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-sm bg-[#B5A642] text-[#1F132A] hover:bg-[#c4b54e] font-mono font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-colors cursor-pointer"
              >
                {loading ? <Loader2 size={13} className="animate-spin" /> : <ArrowRight size={13} />}
                <span>{loading ? "Validating & Building..." : "Start Lesson"}</span>
              </button>
            </div>
          </form>

          {/* Sample Short Movie Clips */}
          <div className="mt-5 pt-4 border-t border-[#3A3A3A]">
            <span className="text-[11px] font-mono text-[#7A7A7A] uppercase tracking-wider block mb-2">
              Try sample short clips (under 7 mins):
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "The Incredibles Clip (2m)", id: "5y_KJAg8bHI" },
                { label: "Shorts Conversation (1m)", id: "Rnwwo9Zol6w" },
              ].map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setUrlInput(`https://www.youtube.com/watch?v=${sample.id}`)}
                  className="px-2.5 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[11px] text-[#E9E1D4]/80 hover:text-[#B5A642] transition-colors font-mono cursor-pointer"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
