"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Play, Volume2, Sparkles, Film, ArrowRight, Bookmark, BookmarkCheck } from "lucide-react";
import { SavedWord } from "@/features/vocabulary";

interface DailyChallenge {
  id: string; // YouTube videoId
  movie: string;
  character: string;
  sentence: string;
  phoneticTip: string;
  burmeseContext: string;
  level: "Level 1 • Beginner" | "Level 2 • Intermediate" | "Level 3 • Advanced";
  levelColor: string;
  keyWord: string;
}

const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: "5y_KJAg8bHI",
    movie: "The Incredibles",
    character: "Bob Parr (Mr. Incredible)",
    sentence: "You are not encouraging this, I'm not encouraging this!",
    phoneticTip: "Listen to the sharp contraction /aɪm nɑːt ɪnˈkɜːr.ɪ.dʒɪŋ/ with clear stress on 'encouraging'.",
    burmeseContext: "Bob Parr ဒေါသထွက်ပြီး အလေးပေးပြောဆိုသော rhythm ကို သေချာလိုက်ပါ တုပလေ့ကျင့်ပါ။",
    level: "Level 1 • Beginner",
    levelColor: "border-[#6B8E23] text-[#6B8E23] bg-[#6B8E23]/15",
    keyWord: "encouraging",
  },
  {
    id: "KYz2wyBy3kc",
    movie: "Toy Story",
    character: "Woody",
    sentence: "You are a child's plaything! You are a toy!",
    phoneticTip: "Notice how 'child's plaything' connects smoothly without unnatural pauses.",
    burmeseContext: "စကားလုံးအဆက်အစပ် (connected speech) နှင့် စိတ်ခံစားမှုပြင်းပြင်းဖြင့် short sentences များကို လေ့ကျင့်ပါ။",
    level: "Level 1 • Beginner",
    levelColor: "border-[#6B8E23] text-[#6B8E23] bg-[#6B8E23]/15",
    keyWord: "plaything",
  },
  {
    id: "8cT_Ul8ElW8",
    movie: "Ratatouille",
    character: "Anton Ego",
    sentence: "Not everyone can become a great artist, but a great artist can come from anywhere.",
    phoneticTip: "Pay attention to the deliberate pauses between clauses and the gentle rising-falling pitch.",
    burmeseContext: "စကားပြောအသံနေအထား (intonation) အလွန်လှပသောကြောင့် နားထောင်သူကို ဆွဲဆောင်နိုင်သည့် စကားပြောစတိုင်ဖြစ်သည်။",
    level: "Level 1 • Beginner",
    levelColor: "border-[#6B8E23] text-[#6B8E23] bg-[#6B8E23]/15",
    keyWord: "artist",
  },
  {
    id: "ry4U_Y8aNlU",
    movie: "Friends",
    character: "Ross Geller",
    sentence: "Pivot! Pivot! Pivot! Okay, I don't think it's gonna pivot anymore.",
    phoneticTip: "Note the reduction in 'gonna' (/ˈɡən.ə/) and the sudden drop from shouting to exhaustion.",
    burmeseContext: "အမေရိကန် လူငယ်စကားပြော rhythm နှင့် informal reductions (gonna, don't think) များကို လေ့ကျင့်ရန်။",
    level: "Level 2 • Intermediate",
    levelColor: "border-[#B5A642] text-[#B5A642] bg-[#B5A642]/15",
    keyWord: "pivot",
  },
  {
    id: "UF8uR6Z6KLc",
    movie: "Steve Jobs (Stanford 2005)",
    character: "Steve Jobs",
    sentence: "Your time is limited, so don't waste it living someone else's life.",
    phoneticTip: "Notice the vocal fry and deliberate cadence. 'Limited' and 'waste' receive pitch emphasis.",
    burmeseContext: "မိန့်ခွန်းနှင့် presentation များတွင် အသုံးပြုနိုင်သည့် ခွန်အားရှိသော စကားပြော pacing ကို ရရှိစေသည်။",
    level: "Level 3 • Advanced",
    levelColor: "border-[#8C2727] text-red-300 bg-[#8C2727]/15",
    keyWord: "limited",
  },
  {
    id: "lB95KLmpLR4",
    movie: "The Social Network",
    character: "Sean Parker",
    sentence: "A million dollars isn't cool. You know what is cool? A billion dollars.",
    phoneticTip: "Listen for the conversational rhetorical question intonation followed by confident delivery.",
    burmeseContext: "လျင်မြန်သော startup English နှင့် high-confidence articulation ကို အလွယ်တကူ လေ့ကျင့်နိုင်သည်။",
    level: "Level 3 • Advanced",
    levelColor: "border-[#8C2727] text-red-300 bg-[#8C2727]/15",
    keyWord: "billion",
  },
  {
    id: "VbxgY9t2N_M",
    movie: "Good Will Hunting",
    character: "Sean Maguire (Robin Williams)",
    sentence: "You don't know about real loss, because that only occurs when you love something more than yourself.",
    phoneticTip: "Focus on the relaxed American rhotic /r/ in 'real', 'occurs', and 'yourself'.",
    burmeseContext: "နက်နဲလေးနက်သော စကားလုံးအသုံးအနှုန်းနှင့် သဘာဝကျသော pauses များကို shadow လုပ်ပါ။",
    level: "Level 2 • Intermediate",
    levelColor: "border-[#B5A642] text-[#B5A642] bg-[#B5A642]/15",
    keyWord: "occurs",
  },
];

export default function SentenceOfTheDay() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Deterministic daily rotation using day-of-year
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const challenge = DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];

  // Check if keyword is already saved in vocabulary
  useEffect(() => {
    try {
      const saved: SavedWord[] = JSON.parse(localStorage.getItem("vocabulary") || "[]");
      const exists = saved.some((s) => s.word.toLowerCase() === challenge.keyWord.toLowerCase());
      setIsSaved(exists);
    } catch {
      setIsSaved(false);
    }
  }, [challenge.keyWord]);

  const playAudio = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(challenge.sentence);
      utterance.lang = "en-US";
      utterance.rate = 0.95;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuickSave = () => {
    try {
      const saved: SavedWord[] = JSON.parse(localStorage.getItem("vocabulary") || "[]");
      let updated: SavedWord[];

      if (isSaved) {
        updated = saved.filter((s) => s.word.toLowerCase() !== challenge.keyWord.toLowerCase());
      } else {
        const newWord: SavedWord = {
          word: challenge.keyWord,
          definition: `Featured in today's challenge: "${challenge.sentence}"`,
          phonetic: "",
          addedAt: new Date().toISOString(),
          contextSentence: challenge.sentence,
          lessonId: challenge.id,
          intervalDays: 1,
          nextReviewDate: new Date().toISOString(),
          reviewCount: 0,
          easeFactor: 2.5,
        };
        updated = [...saved, newWord];
      }

      localStorage.setItem("vocabulary", JSON.stringify(updated));
      setIsSaved(!isSaved);
    } catch (e) {
      console.warn("Could not save to vocabulary", e);
    }
  };

  return (
    <section className="bg-[#2E2E2E] py-8 px-4 sm:px-6 lg:px-12 border-b border-[#3A3A3A]">
      <div className="max-w-4xl mx-auto">
        {/* Main Grunge Challenge Card */}
        <div className="bg-[#1F132A] border-2 border-[#3A3A3A] hover:border-[#B5A642] rounded-md p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-all">
          {/* Subtle Grunge Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B5A642] via-[#8C2727] to-[#B5A642]" />

          {/* Top Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xs text-[11px] font-mono font-bold uppercase bg-[#B5A642] text-[#1F132A] flex items-center gap-1 shadow-sm">
                <Flame size={12} className="fill-[#1F132A]" />
                <span>Sentence of the Day</span>
              </span>

              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border ${challenge.levelColor}`}>
                {challenge.level}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#7A7A7A]">
              <Film size={12} className="text-[#B5A642]" />
              <span className="text-[#E9E1D4] font-semibold">{challenge.movie}</span>
              <span>•</span>
              <span>{challenge.character}</span>
            </div>
          </div>

          {/* The Sentence (Display Typography) */}
          <div className="my-4 p-4 bg-[#2E2E2E]/80 border border-[#3A3A3A] rounded-sm">
            <blockquote className="text-lg sm:text-2xl font-bold font-mono text-[#E9E1D4] leading-relaxed tracking-tight">
              &quot;{challenge.sentence}&quot;
            </blockquote>
          </div>

          {/* Pronunciation & Context Guidance */}
          <div className="space-y-2 mb-6 text-xs font-mono">
            <div className="flex items-start gap-2 text-[#B5A642]">
              <Sparkles size={14} className="shrink-0 mt-0.5" />
              <span>
                <strong>Pronunciation Focus:</strong> {challenge.phoneticTip}
              </span>
            </div>

            <div className="text-[#7A7A7A] pl-5 leading-relaxed font-sans text-xs">
              {challenge.burmeseContext}
            </div>
          </div>

          {/* Actions & Streak Motivation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#3A3A3A]">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Play Audio Preview */}
              <button
                onClick={playAudio}
                className={`px-3.5 py-2 rounded-sm text-xs font-mono font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isPlayingAudio
                    ? "bg-[#B5A642] text-[#1F132A] border-[#B5A642]"
                    : "bg-[#2E2E2E] border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4]"
                }`}
                title="Preview native pronunciation"
              >
                <Volume2 size={13} className={isPlayingAudio ? "text-[#1F132A]" : "text-[#B5A642]"} />
                <span>{isPlayingAudio ? "Playing..." : "Audio Preview"}</span>
              </button>

              {/* 1-Click Save Word to SRS */}
              <button
                onClick={handleQuickSave}
                className={`px-3.5 py-2 rounded-sm text-xs font-mono font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSaved
                    ? "bg-[#B5A642]/20 border-[#B5A642] text-[#B5A642]"
                    : "bg-[#2E2E2E] border-[#3A3A3A] hover:border-[#B5A642] text-[#7A7A7A] hover:text-[#E9E1D4]"
                }`}
                title="Save keyword to Spaced Repetition flashcards"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck size={13} className="text-[#B5A642]" />
                    <span>Saved &quot;{challenge.keyWord}&quot;</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={13} />
                    <span>+ Save &quot;{challenge.keyWord}&quot;</span>
                  </>
                )}
              </button>
            </div>

            {/* Jump straight to lesson in Shadowing Practice Room */}
            <Link
              href={`/lessons/shadowing/${challenge.id}`}
              className="px-5 py-2.5 bg-[#B5A642] hover:bg-[#B5A642]/90 text-[#1F132A] font-bold font-mono text-xs uppercase rounded-sm flex items-center justify-center gap-2 shadow-md transition-all self-stretch sm:self-auto"
            >
              <Play size={13} className="fill-[#1F132A]" />
              <span>Practice in Shadowing Room</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
