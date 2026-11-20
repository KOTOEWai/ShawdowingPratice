"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Youtube, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
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
   * - https://www.youtube.com/watch?v=Rnwwo9Zol6w
   * - https://youtu.be/Rnwwo9Zol6w
   * - https://www.youtube.com/embed/Rnwwo9Zol6w
   * - https://www.youtube.com/shorts/Rnwwo9Zol6w
   * - Direct 11-char ID
   */
  const extractVideoId = (input: string): string | null => {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Direct 11-character video ID
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
      // Not a valid URL, try regex
      const regexMatch = trimmed.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*)/);
      if (regexMatch && regexMatch[1] && regexMatch[1].length === 11) {
        return regexMatch[1];
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const videoId = extractVideoId(urlInput);
    if (!videoId) {
      setError("Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=...) or an 11-character Video ID.");
      return;
    }

    setLoading(true);
    onClose();
    router.push(`/lessons/shadowing/${videoId}`);
  };

  if (!isOpen) return null;

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
            className="absolute top-5 right-5 p-1.5 rounded-lg text-[#A1A0AB] hover:text-white hover:bg-[#181622] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Icon & Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
              <Youtube size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight">Practice Any YouTube Video</h3>
              <p className="text-xs text-[#A1A0AB]">Turn any authentic native video into a shadowing lesson</p>
            </div>
          </div>

          <p className="text-xs text-[#A1A0AB] mb-6 leading-relaxed">
            Paste any English video link from YouTube (TED Talks, Movie clips, Interviews, Podcasts). Our engine will automatically fetch the subtitles, polish the punctuation, and build your interactive lesson.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#DCDCE0] mb-2 font-medium">
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
                className="w-full px-4 py-3 bg-[#13111C] border border-[#33323E] focus:border-[#853BCE] focus:ring-1 focus:ring-[#853BCE] rounded-xl text-sm text-white placeholder-[#6C6B7B] outline-none transition-all font-mono"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs">
                <AlertCircle size={14} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-railway-secondary px-4 py-2.5 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !urlInput.trim()}
                className="btn-railway-primary flex items-center gap-2 px-6 py-2.5 text-xs font-medium disabled:opacity-50"
              >
                <span>{loading ? "Generating..." : "Start Lesson"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {/* Quick Examples */}
          <div className="mt-6 pt-5 border-t border-[#33323E]/80">
            <span className="text-[11px] font-mono text-[#6C6B7B] uppercase tracking-wider block mb-2">
              Try a sample video:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Shorts Clip", id: "Rnwwo9Zol6w" },
                { label: "Steve Jobs Speech", id: "UF8uR6Z6KLc" },
              ].map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setUrlInput(`https://www.youtube.com/watch?v=${sample.id}`)}
                  className="px-2.5 py-1 rounded bg-[#13111C] border border-[#33323E] hover:border-[#853BCE]/50 text-[11px] text-[#A1A0AB] hover:text-white transition-all font-mono"
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
