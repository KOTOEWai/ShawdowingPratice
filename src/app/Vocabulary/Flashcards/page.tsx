"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SavedWord {
  word: string;
  definition: string;
  phonetic: string;
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<SavedWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewQueue, setReviewQueue] = useState<SavedWord[]>([]); // မသိသေးတဲ့ စကားလုံးများ
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vocabulary") || "[]");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCards(saved.sort(() => Math.random() - 0.5));
  }, []);

  const handleAnswer = (knewIt: boolean) => {
    // အကယ်၍ မသိဘူးဆိုရင် review queue ထဲ ထည့်မယ်
    if (!knewIt) {
      setReviewQueue((prev) => [...prev, cards[currentIndex]]);
    }

    // နောက်တစ်ကတ်သွားရန်
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
    setCards(reviewQueue); // မသိတဲ့ စကားလုံးတွေကို Card အသစ်အနေနဲ့ ထည့်မယ်
    setReviewQueue([]);
    setCurrentIndex(0);
    setIsFinished(false);
    setIsFlipped(false);
  };

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-500 mb-4">No words to practice. Save some words first!</p>
        <Link href="/Topics" className="text-blue-400 hover:underline">Go to Practice</Link>
      </div>
    );
  }

  // Session ပြီးဆုံးသွားတဲ့ UI
  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2"> Finished! 🎉</h2>
        <p className="text-slate-400 mb-8">
          You didn&apos;t know <span className="text-red-400 font-bold">{reviewQueue.length}</span> words.
        </p>
        
        <div className="flex gap-4">
          {reviewQueue.length > 0 && (
            <button 
              onClick={startReviewSession}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700"
            >
              Review Unknown Words
            </button>
          )}
          <Link href="/Vocabulary" className="px-6 py-3 bg-slate-800 text-white rounded-full font-bold">
            Back to List
          </Link>
        </div>
      </div>
    );
  }

  const currentWord = cards[currentIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Smart Flashcards</h1>
        <div className="flex gap-4 text-xs font-mono">
           <span className="text-slate-500">Remaining: {cards.length - currentIndex}</span>
           <span className="text-red-400">To Review: {reviewQueue.length}</span>
        </div>
      </div>

      <div 
        className="relative w-full max-w-sm aspect-3/4 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
          {/* Front Side */}
          <div className="absolute inset-0 bg-slate-900 border-2 border-slate-800 rounded-3xl flex flex-col items-center justify-center backface-hidden shadow-2xl">
            <h2 className="text-4xl font-black tracking-tight">{currentWord.word}</h2>
            <p className="text-slate-500 mt-2 font-mono">{currentWord.phonetic}</p>
          </div>
          {/* Back Side */}
          <div className="absolute inset-0 bg-blue-600 border-2 border-blue-400 rounded-3xl flex flex-col items-center justify-center backface-hidden rotate-y-180 shadow-2xl p-8 text-center">
            <p className="text-xl leading-relaxed font-medium">{currentWord.definition}</p>
          </div>
        </div>
      </div>

      {/* Logic Buttons: အဖြေကို လှန်ကြည့်ပြီးမှ ပေါ်လာမည် */}
      <div className={`mt-10 flex gap-6 transition-all duration-300 ${isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
        <button 
          onClick={(e) => { e.stopPropagation(); handleAnswer(false); }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/50 rounded-full flex items-center justify-center text-2xl group-hover:bg-red-500 group-hover:text-white transition-all">
            ✕
          </div>
          <span className="text-xs text-red-400 font-bold uppercase">Don&apos;t Know</span>
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); handleAnswer(true); }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/50 rounded-full flex items-center justify-center text-2xl group-hover:bg-green-500 group-hover:text-white transition-all">
            ✓
          </div>
          <span className="text-xs text-green-400 font-bold uppercase">I Knew It</span>
        </button>
      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}