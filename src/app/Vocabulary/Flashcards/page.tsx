"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SavedWord } from "@/features/vocabulary";

export default function FlashcardsPage() {
  const [cards, setCards] = useState<SavedWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewQueue, setReviewQueue] = useState<SavedWord[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vocabulary") || "[]");
    setCards(saved.sort(() => Math.random() - 0.5));
  }, []);

  const handleAnswer = (knewIt: boolean) => {
    if (!knewIt) {
      setReviewQueue((prev) => [...prev, cards[currentIndex]]);
    }

    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
    } else {
      setIsFinished(true);
    }
  };

  const startReviewSession = () => {
    setCards(reviewQueue);
    setReviewQueue([]);
    setCurrentIndex(0);
    setIsFinished(false);
    setIsFlipped(false);
  };

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-[#13111C] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-[#A1A0AB] mb-4">No words to practice. Save some words first!</p>
        <Link href="/Topics" className="btn-railway-primary px-5 py-2 text-sm rounded-lg">
          Go to Practice
        </Link>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#13111C] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="hero-headline text-3xl font-normal text-white mb-2">Session Finished! 🎉</h2>
        <p className="text-[#A1A0AB] mb-8 text-sm">
          You didn&apos;t know{" "}
          <span className="text-rose-400 font-bold font-mono">{reviewQueue.length}</span> words.
        </p>

        <div className="flex gap-4">
          {reviewQueue.length > 0 && (
            <button
              onClick={startReviewSession}
              className="btn-railway-primary px-6 py-2.5 rounded-lg text-sm font-medium"
            >
              Review Unknown Words
            </button>
          )}
          <Link
            href="/Vocabulary"
            className="btn-railway-secondary px-6 py-2.5 rounded-lg text-sm font-medium"
          >
            Back to List
          </Link>
        </div>
      </div>
    );
  }

  const currentWord = cards[currentIndex];

  return (
    <div className="min-h-screen bg-[#13111C] text-white p-6 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="hero-headline text-2xl sm:text-3xl font-normal mb-2">Smart Flashcards</h1>
        <div className="flex gap-4 text-xs font-mono justify-center">
          <span className="text-[#A1A0AB]">Remaining: {cards.length - currentIndex}</span>
          <span className="text-[#A667E4]">To Review: {reviewQueue.length}</span>
        </div>
      </div>

      <div
        className="relative w-full max-w-sm aspect-3/4 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 bg-[#1F132A] border border-[#33323E] rounded-xl flex flex-col items-center justify-center backface-hidden shadow-2xl p-6 text-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6C6B7B] mb-4">
              Tap card to flip
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white capitalize">
              {currentWord.word}
            </h2>
            <p className="text-[#A667E4] mt-2 font-mono text-sm">{currentWord.phonetic}</p>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 bg-[#853BCE] border border-[#A667E4] rounded-xl flex flex-col items-center justify-center backface-hidden rotate-y-180 shadow-2xl p-8 text-center text-white">
            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-200 mb-3">
              Definition
            </span>
            <p className="text-base sm:text-lg leading-relaxed font-normal">
              {currentWord.definition}
            </p>
          </div>
        </div>
      </div>

      {/* Answer Controls */}
      <div
        className={`mt-10 flex gap-8 transition-all duration-300 ${
          isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAnswer(false);
          }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-13 h-13 bg-rose-950/40 border border-rose-600/40 rounded-full flex items-center justify-center text-xl text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-lg">
            ✕
          </div>
          <span className="text-[11px] text-rose-400 font-mono uppercase tracking-wide">Don&apos;t Know</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAnswer(true);
          }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-13 h-13 bg-[#26543F] border border-[#367859] rounded-full flex items-center justify-center text-xl text-[#42946E] group-hover:bg-[#42946E] group-hover:text-white transition-all shadow-lg">
            ✓
          </div>
          <span className="text-[11px] text-[#42946E] font-mono uppercase tracking-wide">I Knew It</span>
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
