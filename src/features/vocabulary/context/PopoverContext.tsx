"use client";

import React from "react";
import { Volume2, Bookmark, BookmarkCheck, ExternalLink, Sparkles } from "lucide-react";
import { PopOverProps } from "../types";

export default function PopoverContent({
  data,
  loading,
  coords,
  isSaved,
  onSave,
  cleanWord,
  contextSentence,
}: PopOverProps) {
  // Browser Speech Synthesis
  const speakWord = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAudioPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audioUrl = data?.phonetics?.find((p) => p.audio && p.audio.length > 0)?.audio;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => {
        console.warn("Dictionary audio failed, falling back to speech synthesis:", err);
        speakWord();
      });
    } else {
      speakWord();
    }
  };

  if (loading)
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed z-50 w-72 bg-[#1F132A] p-4 rounded-md border border-[#3A3A3A] shadow-2xl"
        style={{
          bottom: `calc(100vh - ${coords.top}px + 12px)`,
          left: `${coords.left}px`,
          transform: "translateX(-50%)",
        }}
      >
        <p className="text-xs text-[#B5A642] italic font-mono animate-pulse">Searching dictionary...</p>
      </div>
    );

  if (!data) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed z-50 w-80 bg-[#1F132A] border border-[#3A3A3A] rounded-md shadow-2xl p-4 text-[#E9E1D4]"
      style={{
        bottom: `calc(100vh - ${coords.top}px + 12px)`,
        left: `${coords.left}px`,
        transform: "translateX(-50%)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2.5">
        <div>
          <h3 className="text-base font-bold font-mono text-[#E9E1D4] leading-none capitalize">
            {data.word}
          </h3>
          <p className="text-[#B5A642] text-xs mt-1 font-mono">{data.phonetic || ""}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleAudioPlay}
            aria-label="Pronounce word"
            className="p-1.5 bg-[#2E2E2E] border border-[#3A3A3A] rounded-sm text-[#E9E1D4] hover:text-[#B5A642] hover:border-[#B5A642] transition-colors cursor-pointer"
            title="Listen to pronunciation"
          >
            <Volume2 size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave(e);
            }}
            aria-label="Save word for SRS review"
            className={`px-2 py-1 rounded-sm border text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer ${
              isSaved
                ? "bg-[#B5A642] text-[#1F132A] border-[#B5A642] font-bold"
                : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4] hover:border-[#B5A642] hover:text-[#B5A642]"
            }`}
            title={isSaved ? "Saved to SRS Flashcards! Click to remove" : "1-Click Save to SRS Flashcards"}
          >
            {isSaved ? (
              <>
                <BookmarkCheck size={12} />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark size={12} />
                <span>+ Save Word</span>
              </>
            )}
          </button>
        </div>
      </div>

      <hr className="border-[#3A3A3A] my-2" />

      {/* Definitions */}
      <div className="max-h-44 overflow-y-auto pr-1 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[#7A7A7A] text-[10px] uppercase font-mono font-bold tracking-wider">
            {data.meanings[0]?.partOfSpeech || "Definition"}
          </span>
          {isSaved && (
            <span className="text-[10px] font-mono text-[#B5A642] flex items-center gap-1">
              <Sparkles size={10} /> SRS Active
            </span>
          )}
        </div>

        <p className="text-[#E9E1D4] leading-relaxed">
          {data.meanings[0]?.definitions[0]?.definition || "No definition found."}
        </p>

        {/* Video Context Sentence */}
        {contextSentence && (
          <div className="mt-2 pt-2 border-t border-[#3A3A3A]/60 bg-[#2E2E2E]/60 p-2 rounded-sm">
            <span className="text-[9px] font-mono uppercase text-[#7A7A7A] block mb-0.5">
              Scene Context:
            </span>
            <p className="text-[11px] text-[#B5A642] italic leading-tight">
              &quot;{contextSentence}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Footer External Links */}
      <div className="mt-3 pt-2 border-t border-[#3A3A3A] flex justify-between text-[10px] font-mono text-[#7A7A7A]">
        <a
          href={`https://www.oxfordlearnersdictionaries.com/definition/english/${cleanWord}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#B5A642] flex items-center gap-1 transition-colors"
        >
          <span>Oxford</span>
          <ExternalLink size={9} />
        </a>
        <a
          href={`https://dictionary.cambridge.org/dictionary/english/${cleanWord}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#B5A642] flex items-center gap-1 transition-colors"
        >
          <span>Cambridge</span>
          <ExternalLink size={9} />
        </a>
      </div>
    </div>
  );
}
