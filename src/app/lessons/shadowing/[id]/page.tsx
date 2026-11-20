"use client";

import { TranscriptItem } from "@/app/Types/Type";
import WordWithMeaning from "@/components/WordWithMeaning";
import AudioComparison from "@/components/AudioComparison";
import ShortcutsModal from "@/components/ShortcutsModal";
import React, { use, useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import {
  RotateCcw,
  SkipBack,
  SkipForward,
  Repeat,
  ScrollText,
  Gauge,
  Sparkles,
  Volume2,
  CheckCircle2,
  Flame,
  Target,
  Keyboard,
  Languages,
  Check,
  PartyPopper,
  Loader2,
} from "lucide-react";

/**
 * Accurately finds the current transcript line based on video playback time (in ms).
 * 1. 120ms anticipation buffer catches initial consonant/voice onset.
 * 2. Overlap resolver picks the latest line that has started.
 * 3. Bridges short breath pauses (< 700ms) to prevent UI flickering between words.
 * 4. Clears active highlight during long silence/music (> 1000ms).
 */
function findActiveTranscriptIndex(items: TranscriptItem[], currentMs: number): number {
  if (!items || items.length === 0) return -1;
  if (currentMs < items[0].offset - 150) return -1;

  let bestIndex = -1;
  let bestOffset = -1;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const duration = item.duration && item.duration > 0 ? item.duration : 3000;
    const start = item.offset - 120; // 120ms lead-in
    const end = item.offset + duration + 200; // 200ms tail cushion

    if (currentMs >= start && currentMs <= end) {
      if (item.offset >= bestOffset) {
        bestIndex = i;
        bestOffset = item.offset;
      }
    }
  }

  if (bestIndex !== -1) return bestIndex;

  // Short pause bridge between adjacent lines (< 700ms)
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    const duration = item.duration && item.duration > 0 ? item.duration : 3000;
    const end = item.offset + duration;
    const nextItem = items[i + 1];

    if (currentMs > end && currentMs - end <= 700) {
      if (!nextItem || currentMs < nextItem.offset - 120) {
        return i;
      }
    }
  }

  return -1;
}

export default function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const transcriptRef = useRef<TranscriptItem[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);

  // Translation State
  const [sentenceTranslation, setSentenceTranslation] = useState<string | null>(null);
  const [translating, setTranslating] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  // Mastered Lines State (Persisted in localStorage)
  const [masteredIndices, setMasteredIndices] = useState<Set<number>>(new Set());

  // Daily Streak & Target State
  const [streak, setStreak] = useState<number>(1);
  const [todayMastered, setTodayMastered] = useState<number>(0);

  const isLoopingRef = useRef(false);
  isLoopingRef.current = isLooping;

  const activeIndexRef = useRef(-1);
  activeIndexRef.current = activeIndex;

  // Sync transcriptRef
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // Load Mastered sentences from localStorage
  useEffect(() => {
    if (!id) return;
    try {
      const saved = localStorage.getItem(`mastered_lesson_${id}`);
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          setMasteredIndices(new Set(arr));
        }
      }

      // Load streak info
      const streakSaved = localStorage.getItem("shadowing_streak_data");
      const todayStr = new Date().toISOString().slice(0, 10);
      if (streakSaved) {
        const parsed = JSON.parse(streakSaved);
        if (parsed.lastDate === todayStr) {
          setStreak(parsed.streak || 1);
          setTodayMastered(parsed.todayCount || 0);
        } else {
          // Check if yesterday was active
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          if (parsed.lastDate === yesterday) {
            setStreak((parsed.streak || 1) + 1);
          } else {
            setStreak(1);
          }
          setTodayMastered(0);
        }
      }
    } catch (e) {
      console.warn("Storage load error:", e);
    }
  }, [id]);

  /* 1. Fetch Transcript */
  useEffect(() => {
    async function fetchTranscript() {
      try {
        setLoading(true);
        const res = await fetch(`/api/FetchTranscript?videoId=${id}`);
        const data = await res.json();
        const rawItems = Array.isArray(data) ? data : data?.content || [];
        
        // Strip out non-speech sound tags like [Music], [Applause], ♪
        const soundRegex = /\[(?:music|applause|laughter|cheering|cheers|sigh|cough|groan|screaming|snickering|gasp|chuckle|bell|giggle|whisper|snort|sound|audio|silence|intro music|outro music|background music).*?\]|\([a-z\s]*(?:music|applause|laughter|cheering|sound)[a-z\s]*\)|[♪♫♩♬]+/gi;
        const bracketOnlyRegex = /^\[.*?\]$/;

        const items: TranscriptItem[] = rawItems
          .map((item: any) => ({
            ...item,
            text: String(item.text || "").replace(soundRegex, "").replace(/\s+/g, " ").trim(),
          }))
          .filter((item: TranscriptItem) => item.text.length > 0 && !bracketOnlyRegex.test(item.text));

        setTranscript(items);
        transcriptRef.current = items;
      } catch (err) {
        console.error("Failed to load transcript", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTranscript();
  }, [id]);

  /* 2. Init video.js (Run only once per id) */
  useEffect(() => {
    if (!videoRef.current || !id) return;

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered", "vjs-theme-city");
    videoRef.current.appendChild(videoElement);

    const player = (playerRef.current = videojs(videoElement, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5],
      techOrder: ["youtube"],
      sources: [{ src: `https://www.youtube.com/watch?v=${id}`, type: "video/youtube" }],
    }));

    const syncTranscript = () => {
      if (!player) return;
      const currentMs = (player.currentTime() || 0) * 1000;
      const items = transcriptRef.current;
      if (!items || items.length === 0) return;

      // Handle Sentence Loop Mode
      if (isLoopingRef.current && activeIndexRef.current !== -1) {
        const currentItem = items[activeIndexRef.current];
        if (currentItem) {
          const duration = currentItem.duration && currentItem.duration > 0 ? currentItem.duration : 3000;
          const endMs = currentItem.offset + duration + 100;
          const startSec = Math.max(0, (currentItem.offset - 150) / 1000);

          if (currentMs >= endMs) {
            player.currentTime(startSec);
            return;
          }
        }
      }

      // Sync active line
      const newIndex = findActiveTranscriptIndex(items, currentMs);
      setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
    };

    player.on("timeupdate", syncTranscript);
    player.on("seeked", syncTranscript);
    player.on("ratechange", () => {
      const rate = player.playbackRate();
      if (rate) setPlaybackRate(rate);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [id]);

  /* 3. Handle Auto-Scroll when activeIndex changes */
  useEffect(() => {
    if (autoScroll && activeIndex !== -1 && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // Reset translation visibility on line change
    setShowTranslation(false);
    setSentenceTranslation(null);
  }, [activeIndex, autoScroll]);

  /**
   * Seek with pre-roll buffer (150ms lead-in) so speech starts naturally.
   */
  const handleSeek = useCallback((offset: number, explicitIndex?: number) => {
    if (playerRef.current) {
      const targetSec = Math.max(0, (offset - 150) / 1000);
      playerRef.current.currentTime(targetSec);
      playerRef.current.play();

      if (typeof explicitIndex === "number") {
        setActiveIndex(explicitIndex);
      }
    }
  }, []);

  const handlePrevLine = useCallback(() => {
    if (transcript.length === 0) return;
    const targetIdx = activeIndex > 0 ? activeIndex - 1 : 0;
    handleSeek(transcript[targetIdx].offset, targetIdx);
  }, [transcript, activeIndex, handleSeek]);

  const handleReplayCurrent = useCallback(() => {
    if (transcript.length === 0 || activeIndex === -1) return;
    const target = transcript[activeIndex];
    if (target) {
      handleSeek(target.offset, activeIndex);
    }
  }, [transcript, activeIndex, handleSeek]);

  const handleNextLine = useCallback(() => {
    if (transcript.length === 0) return;
    const targetIdx = activeIndex < transcript.length - 1 ? activeIndex + 1 : transcript.length - 1;
    handleSeek(transcript[targetIdx].offset, targetIdx);
  }, [transcript, activeIndex, handleSeek]);

  const handleSpeedPreset = useCallback((speed: number) => {
    if (playerRef.current) {
      playerRef.current.playbackRate(speed);
      setPlaybackRate(speed);
    }
  }, []);

  const cycleSpeed = useCallback(() => {
    const speeds = [0.75, 1, 1.25];
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    handleSpeedPreset(nextSpeed);
  }, [playbackRate, handleSpeedPreset]);

  // Toggle Mastered Sentence
  const toggleMastered = useCallback(
    (index: number) => {
      setMasteredIndices((prev) => {
        const next = new Set(prev);
        const wasAdded = !next.has(index);
        if (wasAdded) {
          next.add(index);
        } else {
          next.delete(index);
        }

        try {
          localStorage.setItem(`mastered_lesson_${id}`, JSON.stringify(Array.from(next)));

          if (wasAdded) {
            setTodayMastered((c) => {
              const updated = c + 1;
              const todayStr = new Date().toISOString().slice(0, 10);
              localStorage.setItem(
                "shadowing_streak_data",
                JSON.stringify({ lastDate: todayStr, streak, todayCount: updated })
              );
              return updated;
            });
          }
        } catch (e) {
          console.warn("Storage error:", e);
        }

        return next;
      });
    },
    [id, streak]
  );

  // Fetch contextual translation
  const handleTranslateToggle = async () => {
    if (showTranslation) {
      setShowTranslation(false);
      return;
    }

    if (sentenceTranslation) {
      setShowTranslation(true);
      return;
    }

    if (activeIndex === -1 || !transcript[activeIndex]) return;

    try {
      setTranslating(true);
      const res = await fetch(`/api/translate?text=${encodeURIComponent(transcript[activeIndex].text)}&tl=my`);
      const data = await res.json();
      if (data.translated) {
        setSentenceTranslation(data.translated);
        setShowTranslation(true);
      }
    } catch (e) {
      console.error("Translation failed:", e);
    } finally {
      setTranslating(false);
    }
  };

  /* 4. Power-User Keyboard Shortcuts */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const tag = (document.activeElement?.tagName || "").toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        if (playerRef.current) {
          if (playerRef.current.paused()) {
            playerRef.current.play();
          } else {
            playerRef.current.pause();
          }
        }
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleReplayCurrent();
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        setIsLooping((v) => !v);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevLine();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextLine();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        if (activeIndex !== -1) toggleMastered(activeIndex);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        cycleSpeed();
      } else if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts((v) => !v);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleReplayCurrent, handlePrevLine, handleNextLine, activeIndex, toggleMastered, cycleSpeed]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const masteryPercent = transcript.length > 0 ? Math.round((masteredIndices.size / transcript.length) * 100) : 0;
  const isLessonFinished = transcript.length > 0 && masteredIndices.size === transcript.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 bg-[#13111C] min-h-screen">
      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />

      {/* Left Column: Video + Controls + Focus Card + Audio Comparison */}
      <div className="lg:col-span-2 space-y-4">
        {/* Top Activity & Gamification Bar */}
        <div className="flex items-center justify-between bg-[#1F132A] border border-[#33323E] rounded-xl px-4 py-2.5 shadow-md">
          <div className="flex items-center gap-4 text-xs font-mono">
            {/* Streak */}
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold" title="Consecutive Daily Practice Streak">
              <Flame size={15} className="fill-amber-400" />
              <span>{streak} Day Streak</span>
            </div>

            <div className="h-3.5 w-px bg-[#33323E]" />

            {/* Daily Goal */}
            <div className="flex items-center gap-1.5 text-[#A667E4]" title="Today's Mastered Sentences Goal">
              <Target size={14} />
              <span>Today: {todayMastered}/10</span>
            </div>
          </div>

          {/* Shortcuts Info Button */}
          <button
            onClick={() => setShowShortcuts(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181622] border border-[#33323E] text-[11px] font-mono text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 transition-all"
            title="Open Keyboard Shortcuts Menu (?)"
          >
            <Keyboard size={12} />
            <span className="hidden sm:inline">Shortcuts</span>
            <kbd className="text-[10px] bg-[#13111C] px-1 rounded text-[#A667E4]">?</kbd>
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video rounded-xl overflow-hidden border border-[#33323E] bg-black shadow-2xl">
          <div ref={videoRef} data-vjs-player />
        </div>

        {/* Shadowing Interactive Control Bar */}
        <div className="bg-[#1F132A] border border-[#33323E] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xl">
          {/* Playback Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrevLine}
              disabled={activeIndex <= 0}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#181622] border border-[#33323E] text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Previous Line (←)"
            >
              <SkipBack size={14} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={handleReplayCurrent}
              disabled={activeIndex === -1}
              className="p-2 sm:px-3.5 sm:py-2 rounded-lg bg-[#853BCE]/20 border border-[#853BCE]/40 text-white hover:bg-[#853BCE] hover:border-[#853BCE] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-medium shadow-md shadow-[#853BCE]/15"
              title="Replay Current Line (R)"
            >
              <RotateCcw size={14} />
              <span>Replay</span>
            </button>

            <button
              onClick={handleNextLine}
              disabled={activeIndex >= transcript.length - 1}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#181622] border border-[#33323E] text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Next Line (→)"
            >
              <span className="hidden sm:inline">Next</span>
              <SkipForward size={14} />
            </button>

            <div className="h-5 w-[1px] bg-[#33323E] mx-1" />

            {/* Loop Toggle */}
            <button
              onClick={() => setIsLooping((v) => !v)}
              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                isLooping
                  ? "bg-[#853BCE] border-[#A667E4] text-white shadow-md shadow-[#853BCE]/30"
                  : "bg-[#181622] border-[#33323E] text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/40"
              }`}
              title="Loop current sentence continuously for shadowing (L)"
            >
              <Repeat size={13} className={isLooping ? "animate-spin" : ""} />
              <span>Loop {isLooping ? "ON" : "OFF"}</span>
            </button>
          </div>

          {/* Speed Presets */}
          <div className="flex items-center gap-1.5 bg-[#181622] border border-[#33323E] rounded-lg p-1">
            <Gauge size={13} className="text-[#A1A0AB] ml-1.5 hidden sm:inline" />
            {[0.75, 1, 1.25].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedPreset(speed)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                  playbackRate === speed
                    ? "bg-[#853BCE] text-white font-semibold"
                    : "text-[#A1A0AB] hover:text-white"
                }`}
                title={`Playback Speed: ${speed}x (Press S to cycle)`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Active Shadowing Sentence Focus Card */}
        <AnimatePresence mode="wait">
          {activeIndex !== -1 && transcript[activeIndex] && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-[#1F132A] border border-[#33323E] rounded-xl p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#A667E4] font-semibold flex items-center gap-1.5">
                    <Volume2 size={13} className="animate-pulse" /> Active Sentence
                  </span>
                  <span className="text-xs font-mono text-[#6C6B7B]">
                    Line {activeIndex + 1} of {transcript.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Translate Button */}
                  <button
                    onClick={handleTranslateToggle}
                    disabled={translating}
                    className="px-2.5 py-1 rounded bg-[#181622] border border-[#33323E] hover:border-[#853BCE]/50 text-[11px] font-mono text-[#A1A0AB] hover:text-white transition-all flex items-center gap-1"
                    title="Translate this sentence"
                  >
                    {translating ? <Loader2 size={11} className="animate-spin" /> : <Languages size={12} />}
                    <span>{showTranslation ? "Hide Meaning" : "Translate"}</span>
                  </button>

                  {/* Mark as Mastered button */}
                  <button
                    onClick={() => toggleMastered(activeIndex)}
                    className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-all flex items-center gap-1 ${
                      masteredIndices.has(activeIndex)
                        ? "bg-[#26543F] text-[#42946E] border-[#367859] font-semibold"
                        : "bg-[#181622] border-[#33323E] text-[#A1A0AB] hover:text-white"
                    }`}
                    title="Mark this sentence as mastered (M)"
                  >
                    <Check size={11} />
                    <span>{masteredIndices.has(activeIndex) ? "Mastered" : "Mark Mastered"}</span>
                  </button>
                </div>
              </div>

              {/* Large Typography Sentence */}
              <p className="text-base sm:text-xl text-white leading-relaxed font-normal select-text">
                {transcript[activeIndex].text.split(" ").map((word, wIdx) => (
                  <WordWithMeaning key={wIdx} word={word} />
                ))}
              </p>

              {/* Contextual Translation Drawer */}
              {showTranslation && sentenceTranslation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-[#33323E] text-xs sm:text-sm text-[#A667E4] leading-relaxed"
                >
                  <span className="font-mono text-[10px] uppercase text-[#6C6B7B] block mb-1">
                    Myanmar Translation:
                  </span>
                  {sentenceTranslation}
                </motion.div>
              )}

              {/* Local A/B Voice Comparison Widget */}
              <AudioComparison
                sentenceText={transcript[activeIndex].text}
                onPlayNative={() => handleSeek(transcript[activeIndex].offset, activeIndex)}
                onMasteredToggle={() => toggleMastered(activeIndex)}
                isMastered={masteredIndices.has(activeIndex)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Interactive Synced Transcript & Progress */}
      <div className="bg-[#1F132A] rounded-xl border border-[#33323E] flex flex-col h-130 lg:h-[700px] shadow-2xl overflow-hidden">
        {/* Transcript Header with Auto-scroll Toggle */}
        <div className="p-3.5 border-b border-[#33323E] bg-[#181622]/95 sticky top-0 rounded-t-xl backdrop-blur-md z-10 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white tracking-tight uppercase">Transcript</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#13111C] border border-[#33323E] text-[#A1A0AB]">
                {transcript.length} lines
              </span>
            </div>

            <button
              onClick={() => setAutoScroll((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all flex items-center gap-1.5 ${
                autoScroll
                  ? "bg-[#853BCE]/20 border-[#853BCE]/50 text-[#A667E4]"
                  : "bg-[#13111C] border-[#33323E] text-[#6C6B7B] hover:text-[#A1A0AB]"
              }`}
              title="Toggle automatic scrolling to active line"
            >
              <ScrollText size={12} />
              <span>Auto-Scroll: {autoScroll ? "ON" : "OFF"}</span>
            </button>
          </div>

          {/* Lesson Mastery Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A0AB] mb-1">
              <span>Mastery Progress</span>
              <span className={masteryPercent === 100 ? "text-[#42946E] font-bold" : "text-[#A667E4]"}>
                {masteredIndices.size} / {transcript.length} ({masteryPercent}%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#13111C] rounded-full overflow-hidden border border-[#33323E]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${masteryPercent}%` }}
                transition={{ duration: 0.4 }}
                className={`h-full rounded-full ${
                  masteryPercent === 100 ? "bg-[#42946E]" : "bg-gradient-to-r from-[#853BCE] to-[#A667E4]"
                }`}
              />
            </div>
          </div>

          {/* Celebration Banner when 100% Mastered */}
          {isLessonFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-2 rounded-lg bg-[#26543F]/60 border border-[#42946E] flex items-center gap-2 text-xs text-[#42946E] font-medium"
            >
              <PartyPopper size={15} />
              <span>Awesome! You have mastered all sentences in this lesson!</span>
            </motion.div>
          )}
        </div>

        {/* Transcript List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
          {loading ? (
            <div className="space-y-2 animate-pulse">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="h-16 bg-[#181622] rounded-lg border border-[#33323E]" />
              ))}
            </div>
          ) : transcript.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#A1A0AB]">
              <Sparkles className="w-8 h-8 text-[#853BCE] mb-2 opacity-60" />
              <p className="text-sm">No transcript available for this lesson.</p>
            </div>
          ) : (
            transcript.map((item, index) => {
              const isActive = index === activeIndex;
              const isMastered = masteredIndices.has(index);
              const duration = item.duration && item.duration > 0 ? item.duration : 0;
              const endTime = item.offset + duration;

              return (
                <div
                  key={index}
                  ref={isActive ? activeLineRef : null}
                  onClick={() => handleSeek(item.offset, index)}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                    isActive
                      ? "bg-[#853BCE]/15 border-[#853BCE] shadow-lg shadow-[#853BCE]/15 translate-x-1"
                      : "border-transparent hover:bg-[#181622] hover:border-[#33323E] text-[#A1A0AB] hover:text-white"
                  }`}
                >
                  {/* Line Header: Timestamp and Active Pill & Mastered Checkbox */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                          isActive
                            ? "bg-[#853BCE] text-white font-medium"
                            : "bg-[#13111C] text-[#6C6B7B] group-hover:text-[#A1A0AB]"
                        }`}
                      >
                        {formatTime(item.offset)}
                        {duration > 0 ? ` - ${formatTime(endTime)}` : ""}
                      </span>

                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#A667E4] font-semibold tracking-wider uppercase">
                          <Volume2 size={12} className="animate-pulse" /> Playing
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Mastered Status Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMastered(index);
                        }}
                        className={`p-1 rounded transition-colors ${
                          isMastered
                            ? "text-[#42946E]"
                            : "text-[#6C6B7B] hover:text-white opacity-40 group-hover:opacity-100"
                        }`}
                        title={isMastered ? "Mastered" : "Mark as Mastered"}
                      >
                        <CheckCircle2 size={14} className={isMastered ? "fill-[#26543F]" : ""} />
                      </button>

                      {/* Replay Line Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeek(item.offset, index);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#853BCE]/20 text-[#A667E4] transition-opacity text-xs"
                        title="Play this line"
                      >
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Line Text with Dictionary Word Lookup */}
                  <p
                    className={`text-sm sm:text-[15px] leading-relaxed select-text ${
                      isActive ? "text-white font-medium" : "text-[#DCDCE0]"
                    } ${isMastered ? "opacity-90" : ""}`}
                  >
                    {item.text.split(" ").map((word, wIdx) => (
                      <WordWithMeaning key={wIdx} word={word} />
                    ))}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
