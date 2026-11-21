"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, Layers, Trash2, Volume2, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import { SavedWord } from "@/features/vocabulary";

export default function VocabularyPage() {
  const [vocabList, setVocabList] = useState<SavedWord[]>([]);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const clearAllVocabulary = () => {
    const confirmed = window.confirm("Are you sure you want to delete ALL saved words? This action cannot be undone.");
    if (confirmed) {
      localStorage.removeItem("vocabulary");
      setVocabList([]);
    }
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("vocabulary") || "[]");
      setVocabList(
        saved.sort(
          (a: SavedWord, b: SavedWord) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        )
      );
    } catch {
      setVocabList([]);
    }
  }, []);

  const removeWord = (word: string) => {
    const updated = vocabList.filter((item) => item.word.toLowerCase() !== word.toLowerCase());
    localStorage.setItem("vocabulary", JSON.stringify(updated));
    setVocabList(updated);
  };

  const playAudio = (word: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const exportToCSV = () => {
    if (vocabList.length === 0) return;
    const header = ["Word", "Phonetic", "Definition", "Context Sentence", "Date Added"];
    const rows = vocabList.map((item) => [
      `"${item.word.replace(/"/g, '""')}"`,
      `"${(item.phonetic || "").replace(/"/g, '""')}"`,
      `"${(item.definition || "").replace(/"/g, '""')}"`,
      `"${(item.contextSentence || "").replace(/"/g, '""')}"`,
      `"${item.addedAt}"`,
    ]);
    const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `shadowing_vocabulary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToAnki = () => {
    if (vocabList.length === 0) return;
    const rows = vocabList.map(
      (item) => `${item.word} ${item.phonetic || ""}\t${item.definition || ""}${item.contextSentence ? `\nExample: ${item.contextSentence}` : ""}`
    );
    const ankiContent = rows.join("\n");
    const blob = new Blob([ankiContent], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `shadowing_anki_deck_${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const now = new Date();
  const dueCount = vocabList.filter(
    (item) => !item.nextReviewDate || new Date(item.nextReviewDate) <= now
  ).length;

  return (
    <div className="min-h-screen bg-[#2E2E2E] text-[#E9E1D4] p-4 sm:p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 bg-[#1F132A] p-5 rounded-md border border-[#3A3A3A]">
          {/* Left Side: Title & Counter */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-mono text-[#E9E1D4] tracking-tight uppercase">
              My Vocabulary
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-mono">
              Total: <span className="text-[#B5A642] font-bold">{vocabList.length}</span> words saved •{" "}
              <span className="text-[#B5A642] font-bold">{dueCount}</span> due for SRS review
            </p>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Export Dropdown */}
            {vocabList.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu((v) => !v)}
                  className="px-3.5 py-2 text-xs font-mono font-medium text-[#E9E1D4] bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] rounded-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} className="text-[#B5A642]" />
                  <span>Export</span>
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-sm bg-[#1F132A] border border-[#3A3A3A] shadow-2xl p-1.5 z-20 space-y-1">
                    <button
                      onClick={exportToCSV}
                      className="w-full text-left px-3 py-2 rounded-xs text-xs font-mono hover:bg-[#2E2E2E] hover:text-[#B5A642] text-[#E9E1D4] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet size={13} className="text-[#6B8E23]" />
                      <span>Export as CSV</span>
                    </button>
                    <button
                      onClick={exportToAnki}
                      className="w-full text-left px-3 py-2 rounded-xs text-xs font-mono hover:bg-[#2E2E2E] hover:text-[#B5A642] text-[#E9E1D4] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Layers size={13} className="text-[#3B5998]" />
                      <span>Export for Anki (.txt)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {vocabList.length > 0 && (
              <button
                onClick={clearAllVocabulary}
                className="px-3 py-2 text-xs font-mono font-medium text-[#8C2727] border border-[#8C2727]/30 hover:bg-[#8C2727]/20 rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
                title="Delete all saved words"
              >
                <Trash2 size={13} />
                <span>Clear</span>
              </button>
            )}

            <Link
              href="/Topics"
              className="px-4 py-2 text-xs font-mono uppercase bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] rounded-sm transition-colors"
            >
              Practice
            </Link>

            <Link
              href="/Vocabulary/Flashcards"
              className="px-4 py-2 text-xs font-mono uppercase font-bold bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 rounded-sm flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles size={13} />
              <span>SRS Flashcards ({dueCount})</span>
            </Link>
          </div>
        </div>

        {/* Word List */}
        {vocabList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1F132A] rounded-md border border-dashed border-[#3A3A3A] p-8 space-y-3">
            <BookOpen size={36} className="text-[#B5A642]" />
            <h3 className="text-base font-bold font-mono uppercase text-[#E9E1D4]">
              Your vocabulary list is empty
            </h3>
            <p className="text-[#7A7A7A] text-xs max-w-sm font-sans">
              Click on any word in the movie shadowing subtitles to look up its definition and save it for SRS review!
            </p>
            <Link
              href="/Topics"
              className="inline-block mt-3 px-5 py-2 text-xs font-mono uppercase font-bold bg-[#B5A642] text-[#1F132A] rounded-sm"
            >
              Browse Practice Topics
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {vocabList.map((item) => {
              const isDue = !item.nextReviewDate || new Date(item.nextReviewDate) <= now;
              return (
                <div
                  key={item.word}
                  className="bg-[#1F132A] border border-[#3A3A3A] p-4 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#B5A642] transition-all group"
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg font-bold font-mono text-[#E9E1D4] capitalize tracking-tight">
                        {item.word}
                      </h2>
                      {item.phonetic && (
                        <span className="text-xs font-mono text-[#B5A642]">{item.phonetic}</span>
                      )}
                      <button
                        onClick={() => playAudio(item.word)}
                        aria-label="Listen"
                        className="text-[#7A7A7A] hover:text-[#B5A642] transition-colors cursor-pointer p-1"
                        title="Pronounce"
                      >
                        <Volume2 size={14} />
                      </button>

                      {/* SRS Due Badge */}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-xs border ${
                          isDue
                            ? "bg-[#B5A642]/15 text-[#B5A642] border-[#B5A642]/40"
                            : "bg-[#2E2E2E] text-[#7A7A7A] border-[#3A3A3A]"
                        }`}
                      >
                        {isDue ? "SRS Due" : `In ${item.intervalDays || 1}d`}
                      </span>
                    </div>

                    <p className="text-[#E9E1D4] text-xs leading-relaxed">
                      {item.definition || "No definition available."}
                    </p>

                    {item.contextSentence && (
                      <div className="pt-1.5 border-t border-[#3A3A3A]/40">
                        <span className="text-[9px] font-mono uppercase text-[#7A7A7A]">Movie Context: </span>
                        <span className="text-xs text-[#B5A642] italic">&quot;{item.contextSentence}&quot;</span>
                      </div>
                    )}

                    <p className="text-[10px] text-[#7A7A7A] font-mono">
                      Added {new Date(item.addedAt).toLocaleDateString()} • Reviews: {item.reviewCount || 0}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={`https://www.google.com/search?q=define+${item.word}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 text-xs font-mono bg-[#2E2E2E] hover:bg-[#3A3A3A] border border-[#3A3A3A] text-[#E9E1D4] rounded-sm transition-colors flex items-center gap-1"
                    >
                      <span>Search</span>
                      <ExternalLink size={11} />
                    </a>
                    <button
                      onClick={() => removeWord(item.word)}
                      className="px-3 py-1.5 text-xs font-mono bg-[#8C2727]/20 hover:bg-[#8C2727] text-red-300 hover:text-white border border-[#8C2727]/40 rounded-sm transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
