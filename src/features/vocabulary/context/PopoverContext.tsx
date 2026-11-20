"use client";

import { Colors, ExternalLinkProps, PopOverProps } from "../types";

export default function PopoverContent({
  data,
  loading,
  coords,
  isSaved,
  onSave,
  cleanWord,
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
    if (data?.phonetics?.find((p) => p.audio)?.audio) {
      const audioUrl = data.phonetics.find((p) => p.audio)!.audio!;
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
        className="fixed z-50 w-72 bg-[#1F132A] p-4 rounded-xl border border-[#33323E] shadow-2xl"
        style={{
          bottom: `calc(100vh - ${coords.top}px + 12px)`,
          left: `${coords.left}px`,
          transform: "translateX(-50%)",
        }}
      >
        <p className="text-xs text-[#A1A0AB] italic font-mono animate-pulse">Searching dictionary...</p>
      </div>
    );

  if (!data) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed z-50 w-72 bg-[#1F132A] border border-[#33323E] rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200"
      style={{
        bottom: `calc(100vh - ${coords.top}px + 12px)`,
        left: `${coords.left}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-base font-bold text-white leading-none capitalize">{data.word}</h3>
          <p className="text-[#A667E4] text-xs mt-1 font-mono">{data.phonetic}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAudioPlay}
            aria-label="Pronounce word"
            className="p-1.5 bg-[#853BCE]/15 rounded-md text-[#A667E4] hover:bg-[#853BCE]/30 transition-colors cursor-pointer"
          >
            🔊
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave(e);
            }}
            aria-label="Save word"
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              isSaved
                ? "text-amber-400 bg-amber-400/15 scale-105"
                : "text-[#A1A0AB] bg-[#13111C] hover:text-white"
            }`}
          >
            {isSaved ? "⭐" : "📝"}
          </button>
        </div>
      </div>

      <hr className="border-[#33323E] mb-3" />

      <div className="max-h-40 overflow-y-auto pr-1 scrollbar-hide">
        <p className="text-[#6C6B7B] text-[10px] uppercase font-mono font-semibold tracking-wider">
          {data.meanings[0]?.partOfSpeech || "word"}
        </p>
        <p className="text-xs sm:text-sm text-[#DCDCE0] mt-1 leading-relaxed">
          {data.meanings[0]?.definitions[0]?.definition}
        </p>

        {data.synonyms && data.synonyms.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#33323E]">
            <p className="text-[10px] text-[#6C6B7B] uppercase font-mono font-semibold mb-2">Synonyms</p>
            <div className="flex flex-wrap gap-1.5">
              {data.synonyms.map((syn, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-[#13111C] text-[#A1A0AB] text-[11px] rounded border border-[#33323E]"
                >
                  {syn}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* External Links */}
      <div className="pt-3 mt-3 border-t border-[#33323E] flex gap-2">
        <ExternalLink
          href={`https://www.oxfordlearnersdictionaries.com/definition/english/${cleanWord}`}
          label="Oxford"
          color="blue"
        />
        <ExternalLink
          href={`https://dictionary.cambridge.org/dictionary/english/${cleanWord}`}
          label="Cambridge"
          color="green"
        />
      </div>

      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1F132A] border-r border-b border-[#33323E] rotate-45 -mt-1.5" />
    </div>
  );
}

function ExternalLink({ href, label, color }: ExternalLinkProps) {
  const colors: Colors = {
    blue: "bg-[#306EE8]/15 text-[#82AAFF] hover:bg-[#306EE8]/25 border border-[#306EE8]/30",
    green: "bg-[#26543F] text-[#42946E] hover:bg-[#367859]/30 border border-[#367859]/40",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`text-[10px] font-medium px-2 py-1 rounded transition-colors ${colors[color]}`}
    >
      {label} ↗
    </a>
  );
}
