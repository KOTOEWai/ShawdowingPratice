"use client";

import {
  TranscriptItem,
  findActiveTranscriptIndex,
  cleanTranscriptItems,
  AudioComparison,
  ShortcutsModal,
  LeaderboardModal,
  LessonCompleteModal,
  StreakTracker,
  loadStreakData,
  recordMasteredLineProgress,
  StreakData,
  DAILY_STREAK_TARGET,
} from "@/features/shadowing";
import { WordWithMeaning } from "@/features/vocabulary";
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
  Snowflake,
  Target,
  Keyboard,
  Languages,
  Check,
  PartyPopper,
  Loader2,
  Bookmark,
  Trophy,
  Eye,
  EyeOff,
  Headphones,
  Mic,
  Layers,
} from "lucide-react";

export default function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const transcriptListRef = useRef<HTMLDivElement | null>(null);

  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const transcriptRef = useRef<TranscriptItem[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // Sync focusedIndex so the focus card persists during breath pauses & silence
  useEffect(() => {
    if (activeIndex !== -1) {
      setFocusedIndex(activeIndex);
    }
  }, [activeIndex]);
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  // Shadowing Modes: 'step' (ShadowingEnglish Listen & Repeat) | 'continuous' (Speak Along) | 'blind' (Ear Training)
  const [shadowingMode, setShadowingMode] = useState<"continuous" | "step" | "blind">("step");
  const shadowingModeRef = useRef<"continuous" | "step" | "blind">("step");
  shadowingModeRef.current = shadowingMode;

  // Step-by-Step Paused status (ShadowingEnglish signature pause at sentence end)
  const [isStepPaused, setIsStepPaused] = useState<boolean>(false);
  const isStepPausedRef = useRef<boolean>(false);

  const [peekBlind, setPeekBlind] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Translation State
  const [sentenceTranslation, setSentenceTranslation] = useState<string | null>(null);
  const [translating, setTranslating] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  // Mastered Lines State (Persisted in localStorage)
  const [masteredIndices, setMasteredIndices] = useState<Set<number>>(new Set());

  // Daily Streak & Target State (with 7-Day Flame & Freeze protection)
  const [streakData, setStreakData] = useState<StreakData>(loadStreakData);
  const [showStreakModal, setShowStreakModal] = useState<boolean>(false);

  // Lesson Completion State (Method 1: >=80% Mastery + Method 2: Video Playthrough)
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);
  const isLessonCompletedRef = useRef<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completionReason, setCompletionReason] = useState<"mastery" | "playthrough" | "manual">("mastery");
  const masteredIndicesRef = useRef<Set<number>>(new Set());

  const isLoopingRef = useRef(false);
  isLoopingRef.current = isLooping;

  const activeIndexRef = useRef(-1);
  activeIndexRef.current = activeIndex;

  // Sync transcriptRef & masteredIndicesRef
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    masteredIndicesRef.current = masteredIndices;
  }, [masteredIndices]);

  // Load Saved Lessons, Mastered sentences & Completion status from localStorage
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

      // Check bookmark
      const savedLessons = JSON.parse(localStorage.getItem("saved_study_lessons") || "[]");
      setIsBookmarked(savedLessons.some((l: { id: string }) => l.id === id));

      // Check if already completed
      const completedList = JSON.parse(localStorage.getItem("completed_shadowing_lessons") || "[]");
      const alreadyDone = completedList.some((l: { id: string }) => l.id === id);
      if (alreadyDone) {
        setIsLessonCompleted(true);
        isLessonCompletedRef.current = true;
      }

      // Load streak info with Freeze auto-evaluation
      const currentStreak = loadStreakData();
      setStreakData(currentStreak);

      // Track active practice seconds (for real Hours Studied stats)
      const studyInterval = setInterval(() => {
        try {
          const sec = parseInt(localStorage.getItem("shadowing_study_seconds") || "0", 10);
          localStorage.setItem("shadowing_study_seconds", String(sec + 10));
        } catch {}
      }, 10000);

      return () => clearInterval(studyInterval);
    } catch (e) {
      console.warn("Storage load error:", e);
    }
  }, [id]);

  /**
   * Seek with pre-roll buffer (150ms lead-in) so speech starts naturally.
   */
  const handleSeek = useCallback((offset: number, explicitIndex?: number) => {
    isStepPausedRef.current = false;
    setIsStepPaused(false);

    if (playerRef.current) {
      const targetSec = Math.max(0, (offset - 150) / 1000);
      playerRef.current.currentTime(targetSec);
      playerRef.current.play();

      const resolvedIdx =
        typeof explicitIndex === "number"
          ? explicitIndex
          : transcriptRef.current.findIndex((i) => Math.abs(i.offset - offset) < 200);

      if (resolvedIdx >= 0) {
        activeIndexRef.current = resolvedIdx;
        setActiveIndex(resolvedIdx);
        setFocusedIndex(resolvedIdx);
      }
    }
  }, []);

  // Trigger Lesson Completion (Method 1: >=80% Mastery, Method 2: Video Playthrough, or Manual)
  const triggerLessonCompletion = useCallback(
    (reason: "mastery" | "playthrough" | "manual") => {
      if (isLessonCompletedRef.current) return;
      setIsLessonCompleted(true);
      isLessonCompletedRef.current = true;
      setCompletionReason(reason);
      setShowCompletionModal(true);

      try {
        const existing = JSON.parse(localStorage.getItem("completed_shadowing_lessons") || "[]");
        if (!existing.some((l: { id: string }) => l.id === id)) {
          const newRecord = {
            id,
            title: `Shadowing Practice #${id.slice(0, 6)}`,
            completedAt: new Date().toISOString(),
            masteredCount: masteredIndicesRef.current.size,
            totalLines: transcriptRef.current.length,
            reason,
          };
          localStorage.setItem("completed_shadowing_lessons", JSON.stringify([newRecord, ...existing]));
        }
      } catch (e) {
        console.warn("Completion save error:", e);
      }
    },
    [id]
  );

  // Uncomplete Lesson (Reset status and remove from completed records)
  const uncompleteLesson = useCallback(() => {
    setIsLessonCompleted(false);
    isLessonCompletedRef.current = false;
    try {
      const existing = JSON.parse(localStorage.getItem("completed_shadowing_lessons") || "[]");
      const filtered = existing.filter((l: { id: string }) => l.id !== id);
      localStorage.setItem("completed_shadowing_lessons", JSON.stringify(filtered));
    } catch (e) {
      console.warn("Completion uncomplete error:", e);
    }
  }, [id]);

  /* 1. Fetch Transcript & filter out [Music], [Applause], ♪ */
  useEffect(() => {
    async function fetchTranscript() {
      try {
        setLoading(true);
        const res = await fetch(`/api/FetchTranscript?videoId=${id}`);
        const data = await res.json();
        const rawItems = Array.isArray(data) ? data : data?.content || [];
        const items: TranscriptItem[] = cleanTranscriptItems(rawItems);

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

      // Handle Step-by-Step Mode (ShadowingEnglish: Listen & Repeat auto-pause at line end)
      if (
        shadowingModeRef.current === "step" &&
        !isStepPausedRef.current &&
        activeIndexRef.current !== -1
      ) {
        const curIdx = activeIndexRef.current;
        const currentItem = items[curIdx];
        if (currentItem) {
          const nextItem = items[curIdx + 1];
          const duration = currentItem.duration && currentItem.duration > 0 ? currentItem.duration : 3000;
          let endMs = currentItem.offset + duration + 100;
          if (nextItem && nextItem.offset > currentItem.offset) {
            endMs = Math.min(endMs, nextItem.offset - 50);
          }

          if (currentMs >= endMs) {
            isStepPausedRef.current = true;
            setIsStepPaused(true);
            player.pause();
            return;
          }
        }
      }

      // Method 2: Video Playthrough detection near end of lesson
      try {
        const dur = typeof player.duration === "function" ? player.duration() : 0;
        const cur = typeof player.currentTime === "function" ? player.currentTime() : 0;
        if (typeof dur === "number" && dur > 5 && typeof cur === "number" && cur >= dur - 1.5) {
          triggerLessonCompletion("playthrough");
        }
      } catch {}

      // Sync active line
      const newIndex = findActiveTranscriptIndex(items, currentMs);
      if (newIndex !== -1 && newIndex !== activeIndexRef.current) {
        activeIndexRef.current = newIndex;
      }
      setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
    };

    player.on("timeupdate", syncTranscript);
    player.on("seeked", syncTranscript);
    player.on("ended", () => {
      // Method 2: On video end, mark lesson complete!
      triggerLessonCompletion("playthrough");
    });
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
  }, [id, handleSeek, triggerLessonCompletion]);

  /* 3. Handle Auto-Scroll INSIDE transcript container ONLY (Never scroll the main window) */
  useEffect(() => {
    if (autoScroll && activeIndex !== -1 && activeLineRef.current && transcriptListRef.current) {
      const container = transcriptListRef.current;
      const element = activeLineRef.current;

      const elementTop = element.offsetTop;
      const containerHeight = container.clientHeight;
      const elementHeight = element.offsetHeight;

      const targetScroll = elementTop - containerHeight / 2 + elementHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
    setShowTranslation(false);
    setSentenceTranslation(null);
  }, [activeIndex, autoScroll]);

  const handlePrevLine = useCallback(() => {
    if (transcript.length === 0) return;
    const baseIdx = activeIndex !== -1 ? activeIndex : focusedIndex;
    const targetIdx = baseIdx > 0 ? baseIdx - 1 : 0;
    handleSeek(transcript[targetIdx].offset, targetIdx);
  }, [transcript, activeIndex, focusedIndex, handleSeek]);

  const handleReplayCurrent = useCallback(() => {
    if (transcript.length === 0) return;
    const targetIdx = activeIndex !== -1 ? activeIndex : focusedIndex;
    const target = transcript[targetIdx];
    if (target) {
      handleSeek(target.offset, targetIdx);
    }
  }, [transcript, activeIndex, focusedIndex, handleSeek]);

  const handleNextLine = useCallback(() => {
    if (transcript.length === 0) return;
    const baseIdx = activeIndex !== -1 ? activeIndex : focusedIndex;
    const targetIdx = baseIdx < transcript.length - 1 ? baseIdx + 1 : transcript.length - 1;
    handleSeek(transcript[targetIdx].offset, targetIdx);
  }, [transcript, activeIndex, focusedIndex, handleSeek]);

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
            const newMasteredCount = next.size;
            const totalLines = transcriptRef.current.length;

            // Method 1: If user reaches >=80% mastery of all lines, complete lesson!
            if (totalLines > 0 && newMasteredCount / totalLines >= 0.8) {
              triggerLessonCompletion("mastery");
            }

            // Advance Streak progress (Daily target of 3 lines + freeze protection)
            setStreakData((prevData) => {
              const { updatedData } = recordMasteredLineProgress(prevData);
              return updatedData;
            });
          }
        } catch (e) {
          console.warn("Storage error:", e);
        }

        return next;
      });
    },
    [id, triggerLessonCompletion]
  );

  // Toggle Bookmark Lesson to Playlist
  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("saved_study_lessons") || "[]");
      let updated;
      if (isBookmarked) {
        updated = saved.filter((l: { id: string }) => l.id !== id);
        setIsBookmarked(false);
      } else {
        updated = [
          ...saved,
          {
            id,
            title: `Shadowing Practice #${id.slice(0, 6)}`,
            addedAt: new Date().toISOString(),
          },
        ];
        setIsBookmarked(true);
      }
      localStorage.setItem("saved_study_lessons", JSON.stringify(updated));
    } catch (e) {
      console.warn("Bookmark error:", e);
    }
  };

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

    const targetIdx = activeIndex !== -1 ? activeIndex : focusedIndex;
    if (targetIdx === -1 || !transcript[targetIdx]) return;

    try {
      setTranslating(true);
      const res = await fetch(`/api/translate?text=${encodeURIComponent(transcript[targetIdx].text)}&tl=my`);
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
      const tag = (document.activeElement?.tagName || "").toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        // ShadowingEnglish Step Mode: If paused at line end, Space advances to the next sentence!
        if (shadowingModeRef.current === "step" && isStepPausedRef.current) {
          handleNextLine();
          return;
        }

        if (playerRef.current) {
          if (playerRef.current.paused()) {
            playerRef.current.play();
          } else {
            playerRef.current.pause();
          }
        }
      } else if (e.key === "Enter") {
        if (shadowingModeRef.current === "step" && isStepPausedRef.current) {
          e.preventDefault();
          handleNextLine();
          return;
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
        const targetM = activeIndex !== -1 ? activeIndex : focusedIndex;
        if (targetM >= 0) toggleMastered(targetM);
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
  }, [handleReplayCurrent, handlePrevLine, handleNextLine, activeIndex, focusedIndex, toggleMastered, cycleSpeed]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const masteryPercent = transcript.length > 0 ? Math.round((masteredIndices.size / transcript.length) * 100) : 0;
  const isLessonFinished = transcript.length > 0 && masteredIndices.size === transcript.length;

  const displayIndex = activeIndex !== -1 ? activeIndex : (focusedIndex < transcript.length ? focusedIndex : 0);
  const currentSentence = transcript[displayIndex] || transcript[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 bg-[#13111C] min-h-screen">
      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />

      {/* Community Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        userStreak={streakData.streak}
        userMasteredCount={masteredIndices.size}
      />

      {/* Left Column: Video + Controls + Focus Card + Audio Comparison */}
      <div className="lg:col-span-2 space-y-4">
        {/* Top Activity & Gamification Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1F132A] border border-[#33323E] rounded-xl px-4 py-2.5 shadow-md">
          <div className="flex items-center gap-3 text-xs font-mono">
            {/* Interactive Streak Button with Flame & Freeze */}
            <button
              onClick={() => setShowStreakModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181622] hover:bg-[#1F132A] border border-[#33323E] hover:border-amber-500/50 text-amber-400 font-semibold text-xs font-mono transition-all cursor-pointer"
              title="Click to view 7-Day Streak & Freeze Status"
            >
              <Flame size={15} className={`fill-amber-400 ${streakData.isGoalMet ? "animate-pulse" : ""}`} />
              <span>{streakData.streak}d Streak</span>
              {streakData.freezes > 0 && (
                <span className="text-[10px] text-cyan-400 flex items-center gap-0.5 ml-1" title={`${streakData.freezes} Streak Freeze available`}>
                  <Snowflake size={11} />
                  {streakData.freezes}
                </span>
              )}
            </button>

            <div className="h-3.5 w-px bg-[#33323E]" />

            {/* Daily Goal: Master 3 lines per day */}
            <div
              className="flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              onClick={() => setShowStreakModal(true)}
              title="Daily Goal: Master 3 lines today to ignite flame"
            >
              <Target size={14} className={streakData.isGoalMet ? "text-[#42946E]" : "text-[#A667E4]"} />
              <span className={streakData.isGoalMet ? "text-[#42946E] font-medium" : "text-[#DCDCE0]"}>
                Today: {streakData.todayCount}/{DAILY_STREAK_TARGET}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Completion Status Badge / Button with Uncomplete action */}
            {isLessonCompleted ? (
              <button
                onClick={uncompleteLesson}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#26543F]/80 hover:bg-rose-950/70 border border-[#367859] hover:border-rose-500/50 text-[#42946E] hover:text-rose-300 text-[11px] font-mono font-medium transition-all cursor-pointer group"
                title="Lesson Done! Click to mark as uncompleted / reset"
              >
                <CheckCircle2 size={13} className="group-hover:hidden" />
                <RotateCcw size={12} className="hidden group-hover:inline text-rose-400" />
                <span className="group-hover:hidden">Lesson Done</span>
                <span className="hidden group-hover:inline">Uncomplete</span>
              </button>
            ) : (
              <button
                onClick={() => triggerLessonCompletion("manual")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#181622] border border-[#33323E] hover:border-[#42946E] text-[11px] font-mono text-[#A1A0AB] hover:text-[#42946E] transition-all cursor-pointer"
                title="Mark this lesson as done"
              >
                <Check size={12} />
                <span className="hidden sm:inline">Mark Done</span>
              </button>
            )}

            {/* Leaderboard Button */}
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#181622] border border-[#33323E] text-[11px] font-mono text-[#DCDCE0] hover:text-white hover:border-[#853BCE]/50 transition-all cursor-pointer"
              title="View Leaderboard"
            >
              <Trophy size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>

            {/* Bookmark Lesson Button */}
            <button
              onClick={toggleBookmark}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-[#181622] border-[#33323E] text-[#A1A0AB] hover:text-white"
              }`}
              title="Save this lesson to your study playlist"
            >
              <Bookmark size={13} className={isBookmarked ? "fill-amber-400" : ""} />
              <span>{isBookmarked ? "Saved" : "Save Lesson"}</span>
            </button>

            {/* Shortcuts Info Button */}
            <button
              onClick={() => setShowShortcuts(true)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#181622] border border-[#33323E] text-[11px] font-mono text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 transition-all cursor-pointer"
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard size={12} />
              <kbd className="text-[10px] bg-[#13111C] px-1 rounded text-[#A667E4]">?</kbd>
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-xl overflow-hidden border border-[#33323E] bg-black shadow-2xl">
          <div ref={videoRef} data-vjs-player />
        </div>

        {/* Shadowing Methodology Mode Bar (ShadowingEnglish style with Grunge Rock aesthetic) */}
        <div className="bg-[#181622] border border-[#33323E] rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A0AB] font-semibold pl-1">
            Shadowing Mode:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              {[
                {
                  id: "step",
                  label: "Step-by-Step",
                  icon: <Layers size={12} />,
                  title: "ShadowingEnglish: Auto-pauses at each line end. Press Space or Next to advance",
                },
                {
                  id: "continuous",
                  label: "Speak Along",
                  icon: <Headphones size={12} />,
                  title: "Continuous playback for fluent speaking along with the speaker",
                },
                {
                  id: "blind",
                  label: "Blind (Ear Training)",
                  icon: <EyeOff size={12} />,
                  title: "Blurs subtitles to train your listening comprehension first",
                },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    const mode = m.id as "continuous" | "step" | "blind";
                    setShadowingMode(mode);
                    shadowingModeRef.current = mode;
                    isStepPausedRef.current = false;
                    setIsStepPaused(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer active:translate-y-px ${
                    shadowingMode === m.id
                      ? "bg-[#B5A642] text-[#2E2E2E] font-bold shadow-md shadow-[#B5A642]/20"
                      : "bg-[#13111C] border border-[#33323E] text-[#A1A0AB] hover:text-white hover:border-[#B5A642]/40"
                  }`}
                  title={m.title}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shadowing Interactive Control Bar */}
        <div className="bg-[#1F132A] border border-[#33323E] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xl">
          {/* Playback Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrevLine}
              disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) <= 0}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#181622] border border-[#33323E] text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Previous Line (←)"
            >
              <SkipBack size={14} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={handleReplayCurrent}
              disabled={transcript.length === 0}
              className="p-2 sm:px-3.5 sm:py-2 rounded-lg bg-[#853BCE]/20 border border-[#853BCE]/40 text-white hover:bg-[#853BCE] hover:border-[#853BCE] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-medium shadow-md shadow-[#853BCE]/15 cursor-pointer"
              title="Replay Current Line (R)"
            >
              <RotateCcw size={14} />
              <span>Replay</span>
            </button>

            <button
              onClick={handleNextLine}
              disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) >= transcript.length - 1}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#181622] border border-[#33323E] text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Next Line (→)"
            >
              <span className="hidden sm:inline">Next</span>
              <SkipForward size={14} />
            </button>

            <div className="h-5 w-[1px] bg-[#33323E] mx-1" />

            {/* Loop Toggle */}
            <button
              onClick={() => setIsLooping((v) => !v)}
              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
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
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
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

        {/* Active Shadowing Sentence Focus Card - Persistent Container (Zero layout shift / No jumping) */}
        {transcript.length > 0 && currentSentence && (
          <div className="bg-[#1F132A] border border-[#33323E] rounded-xl p-5 shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#A667E4] font-semibold flex items-center gap-1.5">
                  <Volume2
                    size={13}
                    className={activeIndex !== -1 ? "text-[#A667E4] animate-pulse" : "text-[#6C6B7B]"}
                  />{" "}
                  {activeIndex !== -1 ? "Active Sentence" : "Current Focus"}
                </span>
                <span className="text-xs font-mono text-[#6C6B7B]">
                  Line {displayIndex + 1} of {transcript.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Blind Mode Peek Button */}
                {shadowingMode === "blind" && (
                  <button
                    onClick={() => setPeekBlind((v) => !v)}
                    className="px-2.5 py-1 rounded bg-[#181622] border border-[#33323E] hover:border-[#853BCE]/50 text-[11px] font-mono text-[#DCDCE0] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {peekBlind ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span>{peekBlind ? "Hide" : "Peek"}</span>
                  </button>
                )}

                {/* Translate Button */}
                <button
                  onClick={handleTranslateToggle}
                  disabled={translating}
                  className="px-2.5 py-1 rounded bg-[#181622] border border-[#33323E] hover:border-[#853BCE]/50 text-[11px] font-mono text-[#A1A0AB] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  title="Translate this sentence"
                >
                  {translating ? <Loader2 size={11} className="animate-spin" /> : <Languages size={12} />}
                  <span>{showTranslation ? "Hide Meaning" : "Translate"}</span>
                </button>

                {/* Mark as Mastered button */}
                <button
                  onClick={() => toggleMastered(displayIndex)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                    masteredIndices.has(displayIndex)
                      ? "bg-[#26543F] text-[#42946E] border-[#367859] font-semibold"
                      : "bg-[#181622] border-[#33323E] text-[#A1A0AB] hover:text-white"
                  }`}
                  title="Mark this sentence as mastered (M)"
                >
                  <Check size={11} />
                  <span>{masteredIndices.has(displayIndex) ? "Mastered" : "Mark Mastered"}</span>
                </button>
              </div>
            </div>

            {/* Step-by-Step Status Prompt Banner (ShadowingEnglish style) */}
            {isStepPaused && shadowingMode === "step" && (
              <div className="mb-4 p-3 rounded-lg bg-[#B5A642]/15 border border-[#B5A642]/50 flex flex-wrap items-center justify-between gap-2.5 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B5A642] animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-[#E9E1D4]">
                    Sentence Finished — Repeat out loud!
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNextLine}
                    className="px-3 py-1.5 rounded-lg bg-[#B5A642] hover:bg-[#c4b54e] text-[#2E2E2E] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer active:translate-y-px"
                    title="Continue to next sentence (Spacebar or Enter)"
                  >
                    <span>Next Line</span>
                    <SkipForward size={12} />
                    <kbd className="text-[10px] bg-[#2E2E2E]/20 px-1 rounded">Space</kbd>
                  </button>

                  <button
                    onClick={handleReplayCurrent}
                    className="px-2.5 py-1.5 rounded-lg bg-[#181622] border border-[#7A7A7A]/50 hover:border-[#B5A642] text-[#E9E1D4] text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer active:translate-y-px"
                    title="Replay this sentence (R)"
                  >
                    <RotateCcw size={12} />
                    <span>Replay</span>
                    <kbd className="text-[10px] bg-[#13111C] px-1 rounded text-[#B5A642]">R</kbd>
                  </button>
                </div>
              </div>
            )}

            {/* Large Typography Sentence (with Blind Mode blur support) */}
            <div
              key={displayIndex}
              className={`transition-all duration-300 min-h-[36px] flex items-center ${
                shadowingMode === "blind" && !peekBlind
                  ? "filter blur-md select-none opacity-40 hover:filter-none hover:opacity-100"
                  : ""
              }`}
            >
              <p className="text-base sm:text-xl text-white leading-relaxed font-normal select-text">
                {currentSentence.text.split(" ").map((word, wIdx) => (
                  <WordWithMeaning key={wIdx} word={word} />
                ))}
              </p>
            </div>

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

            {/* Local A/B Voice Comparison Widget with Waveform */}
            <AudioComparison
              sentenceText={currentSentence.text}
              onPlayNative={() => handleSeek(currentSentence.offset, displayIndex)}
              onMasteredToggle={() => toggleMastered(displayIndex)}
              isMastered={masteredIndices.has(displayIndex)}
            />
          </div>
        )}
      </div>

      {/* Right Column: Interactive Synced Transcript & Progress */}
      <div className="bg-[#1F132A] rounded-xl border border-[#33323E] flex flex-col h-130 lg:h-[720px] shadow-2xl overflow-hidden">
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
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
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
        <div ref={transcriptListRef} className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
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
                        className={`p-1 rounded transition-colors cursor-pointer ${
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
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#853BCE]/20 text-[#A667E4] transition-opacity text-xs cursor-pointer"
                        title="Play this line"
                      >
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Line Text with Dictionary Word Lookup (Blind Mode blur support) */}
                  <div
                    className={
                      shadowingMode === "blind" && !peekBlind
                        ? "filter blur-sm select-none opacity-40 group-hover:filter-none group-hover:opacity-100 transition-all"
                        : "transition-all"
                    }
                  >
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
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Lesson Complete Celebration Modal */}
      <LessonCompleteModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        masteredCount={masteredIndices.size}
        totalLines={transcript.length}
        reason={completionReason}
      />

      {/* 7-Day Flame & Freeze Tracker Modal */}
      <StreakTracker
        isModal
        isOpen={showStreakModal}
        onClose={() => setShowStreakModal(false)}
        data={streakData}
      />
    </div>
  );
}
