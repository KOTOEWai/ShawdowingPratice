"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Volume2, ArrowLeft, Sparkles, RotateCcw, Check, RefreshCw } from "lucide-react";
import { SavedWord } from "@/features/vocabulary";

export default function FlashcardsPage() {
  const [cards, setCards] = useState<SavedWord[]>([]);
  const [onlyDue, setOnlyDue] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Load vocabulary from localStorage
  useEffect(() => {
    try {
      const saved: SavedWord[] = JSON.parse(localStorage.getItem("vocabulary") || "[]");
      setCards(saved);
    } catch {
      setCards([]);
    }
  }, []);

  const now = new Date();

  // Cards that are due for SRS review today
  const dueCards = useMemo(() => {
    return cards.filter((c) => {
      if (!c.nextReviewDate) return true;
      return new Date(c.nextReviewDate) <= now;
    });
  }, [cards, now]);

  // Active review deck depending on filter
  const activeDeck = useMemo(() => {
    const pool = onlyDue ? dueCards : cards;
    return [...pool];
  }, [onlyDue, dueCards, cards]);

  const currentWord = activeDeck[currentIndex];

  // Handle Spaced Repetition Grading (Again, Hard, Good, Easy)
  const handleSrsGrade = (rating: "again" | "hard" | "good" | "easy") => {
    if (!currentWord) return;

    let newInterval = currentWord.intervalDays || 1;
    let newEase = currentWord.easeFactor || 2.5;

    switch (rating) {
      case "again":
        newInterval = 1; // reset to 1 day
        newEase = Math.max(1.3, newEase - 0.2);
        break;
      case "hard":
        newInterval = Math.max(1, Math.round(newInterval * 1.2));
        newEase = Math.max(1.3, newEase - 0.15);
        break;
      case "good":
        newInterval = Math.max(2, Math.round(newInterval * newEase));
        break;
      case "easy":
        newInterval = Math.max(4, Math.round(newInterval * newEase * 1.3));
        newEase += 0.15;
        break;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);

    // Update in allCards state and localStorage
    const updatedCards = cards.map((c) => {
      if (c.word.toLowerCase() === currentWord.word.toLowerCase()) {
        return {
          ...c,
          intervalDays: newInterval,
          nextReviewDate: nextDate.toISOString(),
          lastReviewedAt: new Date().toISOString(),
          reviewCount: (c.reviewCount || 0) + 1,
          easeFactor: newEase,
        };
      }
      return c;
    });

    setCards(updatedCards);
    localStorage.setItem("vocabulary", JSON.stringify(updatedCards));
    setReviewedCount((prev) => prev + 1);

    // Advance to next card
    if (currentIndex < activeDeck.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
    } else {
      setIsFinished(true);
    }
  };

  const playAudio = (word: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const restartDeck = (dueOnlyMode: boolean) => {
    setOnlyDue(dueOnlyMode);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setReviewedCount(0);
  };

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-[#2E2E2E] flex flex-col items-center justify-center p-6 text-center text-[#E9E1D4]">
        <div className="p-8 border border-[#3A3A3A] bg-[#1F132A] rounded-md max-w-md w-full space-y-4">
          <p className="text-[#B5A642] font-mono text-sm uppercase tracking-wider">Empty Vocabulary</p>
          <p className="text-xs text-[#7A7A7A]">No words saved yet. Click words in the shadowing room to save them with video dialogue context!</p>
          <Link
            href="/Topics"
            className="inline-block px-5 py-2 text-xs font-mono uppercase font-bold bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 rounded-sm"
          >
            Start Practicing
          </Link>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#2E2E2E] flex flex-col items-center justify-center p-6 text-center text-[#E9E1D4]">
        <div className="p-8 border border-[#3A3A3A] bg-[#1F132A] rounded-md max-w-md w-full space-y-5">
          <div className="inline-block p-3 bg-[#B5A642]/10 border border-[#B5A642] rounded-sm text-[#B5A642]">
            <Check size={28} />
          </div>
          <h2 className="text-xl font-bold font-mono uppercase tracking-wider text-[#E9E1D4]">
            Review Session Complete
          </h2>
          <p className="text-xs font-mono text-[#7A7A7A]">
            You reviewed <span className="text-[#B5A642] font-bold">{reviewedCount}</span> words today. Spaced repetition intervals have been scheduled!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => restartDeck(false)}
              className="px-4 py-2 border border-[#3A3A3A] bg-[#2E2E2E] hover:border-[#B5A642] text-[#E9E1D4] text-xs font-mono uppercase rounded-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Review All Cards</span>
            </button>
            <Link
              href="/Vocabulary"
              className="px-4 py-2 bg-[#B5A642] text-[#1F132A] font-bold text-xs font-mono uppercase rounded-sm flex items-center justify-center gap-1.5"
            >
              <span>Back to Word List</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (activeDeck.length === 0) {
    return (
      <div className="min-h-screen bg-[#2E2E2E] flex flex-col items-center justify-center p-6 text-center text-[#E9E1D4]">
        <div className="p-8 border border-[#3A3A3A] bg-[#1F132A] rounded-md max-w-md w-full space-y-4">
          <p className="text-[#B5A642] font-mono text-sm uppercase tracking-wider">All Caught Up!</p>
          <p className="text-xs text-[#7A7A7A]">
            You have no SRS cards due for review right now. Great job keeping your memory fresh!
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => restartDeck(false)}
              className="px-4 py-2 bg-[#B5A642] text-[#1F132A] font-bold text-xs font-mono uppercase rounded-sm cursor-pointer"
            >
              Review All ({cards.length}) Words
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2E2E2E] text-[#E9E1D4] p-4 sm:p-6 flex flex-col items-center justify-center">
      {/* Top Bar Navigation & Mode Filter */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <Link
          href="/Vocabulary"
          className="text-xs font-mono text-[#7A7A7A] hover:text-[#B5A642] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Exit SRS</span>
        </Link>

        {/* Filter Toggle: Due vs All */}
        <div className="flex items-center gap-1 bg-[#1F132A] p-1 border border-[#3A3A3A] rounded-sm text-[11px] font-mono">
          <button
            onClick={() => restartDeck(true)}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              onlyDue
                ? "bg-[#B5A642] text-[#1F132A] font-bold"
                : "text-[#7A7A7A] hover:text-[#E9E1D4]"
            }`}
          >
            Due ({dueCards.length})
          </button>
          <button
            onClick={() => restartDeck(false)}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              !onlyDue
                ? "bg-[#B5A642] text-[#1F132A] font-bold"
                : "text-[#7A7A7A] hover:text-[#E9E1D4]"
            }`}
          >
            All ({cards.length})
          </button>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="w-full max-w-md mb-3 flex justify-between items-center text-xs font-mono text-[#7A7A7A]">
        <span>
          Card {currentIndex + 1} of {activeDeck.length}
        </span>
        <span className="flex items-center gap-1 text-[#B5A642]">
          <Sparkles size={11} /> SRS Spaced Repetition
        </span>
      </div>

      {/* Flip Card Container */}
      <div
        className="relative w-full max-w-md aspect-4/3 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-all duration-300 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 bg-[#1F132A] border-2 border-[#3A3A3A] rounded-md flex flex-col items-center justify-between backface-hidden p-6 text-center select-none shadow-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A7A7A]">
              Click or tap to reveal definition
            </span>

            <div className="my-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#E9E1D4] capitalize">
                {currentWord.word}
              </h2>
              {currentWord.phonetic && (
                <p className="text-[#B5A642] font-mono text-sm">{currentWord.phonetic}</p>
              )}
            </div>

            {/* Context Sentence Preview if available */}
            {currentWord.contextSentence ? (
              <div className="w-full bg-[#2E2E2E]/80 border border-[#3A3A3A] p-2.5 rounded-sm text-left">
                <span className="text-[9px] font-mono uppercase text-[#7A7A7A] block mb-1">
                  Movie Scene Context:
                </span>
                <p className="text-xs text-[#E9E1D4] italic line-clamp-2">
                  &quot;{currentWord.contextSentence}&quot;
                </p>
              </div>
            ) : (
              <span className="text-[10px] font-mono text-[#7A7A7A]">Interval: {currentWord.intervalDays || 1}d</span>
            )}
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 bg-[#262432] border-2 border-[#B5A642] rounded-md flex flex-col justify-between backface-hidden rotate-y-180 p-6 text-[#E9E1D4] shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold font-mono text-[#E9E1D4] uppercase">
                  {currentWord.word}
                </span>
                <p className="text-[#B5A642] font-mono text-xs">{currentWord.phonetic || ""}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio(currentWord.word);
                }}
                className="p-1.5 bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] text-[#B5A642] rounded-sm transition-colors cursor-pointer"
                title="Pronounce"
              >
                <Volume2 size={14} />
              </button>
            </div>

            {/* Definition */}
            <div className="my-auto space-y-2 text-left overflow-y-auto max-h-36 pr-1">
              <span className="text-[10px] font-mono uppercase text-[#B5A642] block font-bold">
                Meaning:
              </span>
              <p className="text-sm font-sans leading-relaxed text-[#E9E1D4]">
                {currentWord.definition}
              </p>
              {currentWord.contextSentence && (
                <div className="pt-2 border-t border-[#3A3A3A]">
                  <span className="text-[9px] font-mono uppercase text-[#7A7A7A] block">
                    Context:
                  </span>
                  <p className="text-xs text-[#B5A642] italic">
                    &quot;{currentWord.contextSentence}&quot;
                  </p>
                </div>
              )}
            </div>

            <div className="text-[10px] font-mono text-[#7A7A7A] flex justify-between items-center border-t border-[#3A3A3A] pt-2">
              <span>Reviews: {currentWord.reviewCount || 0}</span>
              <span>Next interval: ~{(currentWord.intervalDays || 1) * 2} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* SRS Response Grading Controls */}
      <div
        className={`mt-6 w-full max-w-md grid grid-cols-4 gap-2 transition-all duration-200 ${
          isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSrsGrade("again");
          }}
          className="p-2.5 bg-[#8C2727]/30 hover:bg-[#8C2727] border border-[#8C2727] text-[#E9E1D4] rounded-sm text-center transition-all cursor-pointer group"
        >
          <span className="block text-[11px] font-bold font-mono uppercase text-red-300 group-hover:text-white">
            Again
          </span>
          <span className="text-[9px] font-mono text-[#7A7A7A] block group-hover:text-red-100">1 day</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSrsGrade("hard");
          }}
          className="p-2.5 bg-[#1F132A] hover:bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4] rounded-sm text-center transition-all cursor-pointer"
        >
          <span className="block text-[11px] font-bold font-mono uppercase text-[#7A7A7A] hover:text-[#E9E1D4]">
            Hard
          </span>
          <span className="text-[9px] font-mono text-[#7A7A7A] block">
            {Math.max(1, Math.round((currentWord?.intervalDays || 1) * 1.2))}d
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSrsGrade("good");
          }}
          className="p-2.5 bg-[#1F132A] hover:bg-[#B5A642]/20 border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] rounded-sm text-center transition-all cursor-pointer"
        >
          <span className="block text-[11px] font-bold font-mono uppercase text-[#B5A642]">
            Good
          </span>
          <span className="text-[9px] font-mono text-[#7A7A7A] block">
            {Math.max(2, Math.round((currentWord?.intervalDays || 1) * 2))}d
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSrsGrade("easy");
          }}
          className="p-2.5 bg-[#6B8E23]/25 hover:bg-[#6B8E23] border border-[#6B8E23] text-[#E9E1D4] rounded-sm text-center transition-all cursor-pointer group"
        >
          <span className="block text-[11px] font-bold font-mono uppercase text-emerald-300 group-hover:text-white">
            Easy
          </span>
          <span className="text-[9px] font-mono text-[#7A7A7A] block group-hover:text-emerald-100">
            {Math.max(4, Math.round((currentWord?.intervalDays || 1) * 3))}d
          </span>
        </button>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
