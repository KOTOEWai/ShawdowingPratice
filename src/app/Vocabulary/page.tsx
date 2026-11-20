"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, Layers, Trash2 } from "lucide-react";

interface SavedWord {
  word: string;
  definition: string;
  phonetic: string;
  addedAt: string;
}

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
    const saved = JSON.parse(localStorage.getItem("vocabulary") || "[]");
    setVocabList(
      saved.sort(
        (a: SavedWord, b: SavedWord) =>
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      )
    );
  }, []);

  const removeWord = (word: string) => {
    const updated = vocabList.filter((item) => item.word !== word);
    localStorage.setItem("vocabulary", JSON.stringify(updated));
    setVocabList(updated);
  };

  const playAudio = (word: string) => {
    const audio = new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${word}-us.mp3`);
    audio.play().catch(() => alert("Audio not available"));
  };

  const exportToCSV = () => {
    if (vocabList.length === 0) return;
    const header = ["Word", "Phonetic", "Definition", "Date Added"];
    const rows = vocabList.map((item) => [
      `"${item.word.replace(/"/g, '""')}"`,
      `"${(item.phonetic || "").replace(/"/g, '""')}"`,
      `"${(item.definition || "").replace(/"/g, '""')}"`,
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
      (item) => `${item.word} ${item.phonetic || ""}\t${item.definition || ""}`
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

  return (
    <div className="min-h-screen bg-[#13111C] text-[#DCDCE0] p-4 sm:p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8 bg-[#1F132A] p-5 rounded-xl border border-[#33323E]">
          {/* Left Side: Title & Counter */}
          <div>
            <h1 className="hero-headline text-2xl lg:text-3xl font-normal text-white tracking-tight">
              My Vocabulary
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A0AB] mt-1">
              Total: <span className="text-[#A667E4] font-mono font-medium">{vocabList.length}</span> words saved
            </p>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Export Dropdown */}
            {vocabList.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu((v) => !v)}
                  className="px-3.5 py-2 text-xs font-medium text-white bg-[#181622] border border-[#33323E] hover:border-[#853BCE]/50 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} className="text-[#A667E4]" />
                  <span>Export</span>
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#181622] border border-[#33323E] shadow-2xl p-1.5 z-20 space-y-1">
                    <button
                      onClick={exportToCSV}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#853BCE]/20 hover:text-white text-[#DCDCE0] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet size={13} className="text-[#42946E]" />
                      <span>Export as CSV</span>
                    </button>
                    <button
                      onClick={exportToAnki}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#853BCE]/20 hover:text-white text-[#DCDCE0] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Layers size={13} className="text-[#82AAFF]" />
                      <span>Export for Anki (.txt)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {vocabList.length > 0 && (
              <button
                onClick={clearAllVocabulary}
                className="px-3 py-2 text-xs font-medium text-rose-400 border border-rose-500/20 hover:bg-rose-900/20 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                title="Delete all saved words"
              >
                <Trash2 size={13} />
                <span>Clear</span>
              </button>
            )}

            <Link
              href="/Topics"
              className="btn-railway-secondary px-4 py-2 text-xs sm:text-sm rounded-lg"
            >
              Practice
            </Link>

            <Link
              href="/Vocabulary/Flashcards"
              className="btn-railway-primary px-4 py-2 text-xs sm:text-sm rounded-lg"
            >
              Flashcards
            </Link>
          </div>
        </div>

        {/* Word List */}
        {vocabList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1F132A]/50 rounded-xl border border-dashed border-[#33323E] p-8">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="text-lg font-semibold text-white mb-1.5">Your vocabulary list is empty</h3>
            <p className="text-[#A1A0AB] text-xs sm:text-sm max-w-sm mb-6">
              Go back to your practice videos and click on words you don&apos;t know to save them here.
            </p>
            <Link
              href="/Topics"
              className="btn-railway-primary px-5 py-2 text-xs sm:text-sm rounded-lg"
            >
              Browse Practice Topics
            </Link>
          </div>
        ) : (
          <div className="grid gap-3.5">
            {vocabList.map((item) => (
              <div
                key={item.word}
                className="bg-[#1F132A] border border-[#33323E] p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#853BCE]/40 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1">
                    <h2 className="text-lg font-semibold text-[#A667E4] capitalize tracking-tight">
                      {item.word}
                    </h2>
                    <span className="text-xs font-mono text-[#6C6B7B]">{item.phonetic}</span>
                    <button
                      onClick={() => playAudio(item.word)}
                      aria-label="Listen"
                      className="text-xs opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded hover:bg-[#33323E]"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="text-[#DCDCE0] text-xs sm:text-sm leading-relaxed">
                    {item.definition || "No definition available."}
                  </p>
                  <p className="text-[10px] text-[#6C6B7B] mt-2 font-mono">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <a
                    href={`https://www.google.com/search?q=define+${item.word}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs bg-[#13111C] hover:bg-[#33323E] border border-[#33323E] text-[#DCDCE0] rounded-md transition-colors"
                  >
                    Details ↗
                  </a>
                  <button
                    onClick={() => removeWord(item.word)}
                    className="px-3 py-1.5 text-xs bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/30 rounded-md transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
