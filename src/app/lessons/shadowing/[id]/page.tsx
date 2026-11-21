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
  WaitModeSelector,
  SubtitleSyncControl,
  useShadowingEngine,
  calculateEffectiveTime,
  isInputField,
  WaitMode,
  PlaybackState,
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
  Play,
  Pause,
  Clock,
} from "lucide-react";

export default function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const transcriptListRef = useRef<HTMLDivElement | null>(null);

  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const transcriptRef = useRef<TranscriptItem[]>([]);

  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  // Blind Mode (Ear Training blur toggle)
  const [isBlindMode, setIsBlindMode] = useState<boolean>(false);
  const [peekBlind, setPeekBlind] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Translation State
  const [sentenceTranslation, setSentenceTranslation] = useState<string | null>(null);
  const [translating, setTranslating] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  // Mastered Lines State (Persisted in localStorage)
  const [masteredIndices, setMasteredIndices] = useState<Set<number>>(new Set());
  const masteredIndicesRef = useRef<Set<number>>(new Set());

  // Daily Streak & Target State (with 7-Day Flame & Freeze protection)
  const [streakData, setStreakData] = useState<StreakData>(loadStreakData);
  const [showStreakModal, setShowStreakModal] = useState<boolean>(false);

  // Lesson Completion State
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);
  const isLessonCompletedRef = useRef<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completionReason, setCompletionReason] = useState<"mastery" | "playthrough" | "manual">("mastery");

  // Trigger Lesson Completion
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

  // Uncomplete Lesson
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

  // Centralized Playback Engine Hook
  const {
    playbackState,
    setPlaybackState,
    waitMode,
    setWaitMode,
    isLooping,
    toggleLoop,
    subtitleOffsetMs,
    adjustSubtitleOffset,
    resetSubtitleOffset,
    activeIndex,
    setActiveIndex,
    waitDurationMs,
    waitRemainingMs,
    evaluatePlaybackPosition,
    seekToSentence,
    handleReplayCurrent,
    handleNextLine,
    handlePrevLine,
    togglePlayPause,
    cancelWaitTimers,
  } = useShadowingEngine({
    transcript,
    playerRef,
    onActiveIndexChange: (idx) => {
      if (idx !== -1) {
        setFocusedIndex(idx);
      }
    },
    onLessonComplete: triggerLessonCompletion,
    initialWaitMode: "30%",
  });

  const subtitleOffsetMsRef = useRef<number>(0);
  subtitleOffsetMsRef.current = subtitleOffsetMs;

  const activeIndexRef = useRef<number>(-1);
  activeIndexRef.current = activeIndex;

  // Sync transcriptRef & masteredIndicesRef
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    masteredIndicesRef.current = masteredIndices;
  }, [masteredIndices]);

  // Load mastered lines and bookmark state on mount
  useEffect(() => {
    try {
      const savedMastered = localStorage.getItem(`mastered_lesson_${id}`);
      if (savedMastered) {
        setMasteredIndices(new Set(JSON.parse(savedMastered)));
      }

      const savedBookmarks = JSON.parse(localStorage.getItem("saved_study_lessons") || "[]");
      setIsBookmarked(savedBookmarks.some((l: { id: string }) => l.id === id));

      const completedLessons = JSON.parse(localStorage.getItem("completed_shadowing_lessons") || "[]");
      const isAlreadyCompleted = completedLessons.some((l: { id: string }) => l.id === id);
      if (isAlreadyCompleted) {
        setIsLessonCompleted(true);
        isLessonCompletedRef.current = true;
      }
    } catch (e) {
      console.warn("Storage read error:", e);
    }
  }, [id]);

  /* 1. Fetch Transcript & clean non-speech tags */
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

  /* 2. Init video.js */
  useEffect(() => {
    if (!videoRef.current || !id) return;

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered", "vjs-theme-city");
    videoRef.current.appendChild(videoElement);

    const player = (playerRef.current = videojs(videoElement, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.75, 1, 1.25, 1.5],
      techOrder: ["youtube"],
      sources: [{ src: `https://www.youtube.com/watch?v=${id}`, type: "video/youtube" }],
    }));

    const syncTranscript = () => {
      if (!player) return;
      const rawCurrentMs = (player.currentTime() || 0) * 1000;
      const items = transcriptRef.current;
      if (!items || items.length === 0) return;

      // Evaluate sentence boundaries & wait mode logic
      evaluatePlaybackPosition(rawCurrentMs);

      // Playthrough detection near end of video
      try {
        const dur = typeof player.duration === "function" ? player.duration() : 0;
        const cur = typeof player.currentTime === "function" ? player.currentTime() : 0;
        if (typeof dur === "number" && dur > 5 && typeof cur === "number" && cur >= dur - 1.5) {
          triggerLessonCompletion("playthrough");
        }
      } catch {}

      // Calculate effective time with subtitle offset for UI transcript highlighting ONLY
      const effectiveMs = calculateEffectiveTime(rawCurrentMs, subtitleOffsetMsRef.current);
      const newIndex = findActiveTranscriptIndex(items, effectiveMs);

      if (newIndex !== -1 && newIndex !== activeIndexRef.current) {
        setActiveIndex(newIndex);
      }
    };

    player.on("timeupdate", syncTranscript);
    player.on("seeked", syncTranscript);
    player.on("play", () => {
      setPlaybackState(isLooping ? "looping" : "playing");
    });
    player.on("pause", () => {
      // If we are not currently in a wait or manual-pause state, transition to idle
      setPlaybackState((current) => {
        if (current === "waiting" || current === "manual-paused") {
          return current;
        }
        return "idle";
      });
    });
    player.on("ended", () => {
      triggerLessonCompletion("playthrough");
      setPlaybackState("ended");
    });
    player.on("ratechange", () => {
      const rate = player.playbackRate();
      if (rate) setPlaybackRate(rate);
    });

    return () => {
      cancelWaitTimers();
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [id, evaluatePlaybackPosition, setActiveIndex, triggerLessonCompletion, cancelWaitTimers, isLooping, setPlaybackState]);

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

  // Seek handler from clicking transcript items
  const handleSeek = useCallback(
    (offset: number, explicitIndex?: number) => {
      const resolvedIdx =
        typeof explicitIndex === "number"
          ? explicitIndex
          : transcriptRef.current.findIndex((i) => Math.abs(i.offset - offset) < 200);

      if (resolvedIdx >= 0) {
        seekToSentence(resolvedIdx);
      } else if (playerRef.current) {
        const targetSec = Math.max(0, (offset - 150) / 1000);
        playerRef.current.currentTime(targetSec);
        playerRef.current.play();
      }
    },
    [seekToSentence]
  );

  // Playback Speed Controls
  const handleSpeedPreset = useCallback((speed: number) => {
    if (playerRef.current) {
      playerRef.current.playbackRate(speed);
      setPlaybackRate(speed);
    }
  }, []);

  const cycleSpeed = useCallback(() => {
    const speeds = [0.75, 1, 1.25, 1.5];
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

            if (totalLines > 0 && newMasteredCount / totalLines >= 0.8) {
              triggerLessonCompletion("mastery");
            }

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

  /* 4. Keyboard Shortcuts with Input Field Protection */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputField(e.target)) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleNextLine();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleReplayCurrent();
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        toggleLoop();
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
  }, [
    togglePlayPause,
    handleNextLine,
    handleReplayCurrent,
    toggleLoop,
    handlePrevLine,
    activeIndex,
    focusedIndex,
    toggleMastered,
    cycleSpeed,
  ]);

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

  const isVideoPlaying = playbackState === "playing" || playbackState === "looping";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 bg-[#2E2E2E] min-h-screen text-[#E9E1D4]">
      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />

      {/* Community Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        userStreak={streakData.streak}
        userMasteredCount={masteredIndices.size}
      />

      {/* 7-Day Streak & Target Tracker Modal */}
      <StreakTracker
        isOpen={showStreakModal}
        isModal={true}
        onClose={() => setShowStreakModal(false)}
        data={streakData}
      />

      {/* Lesson Complete Celebration Modal */}
      <LessonCompleteModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        totalLines={transcript.length}
        masteredCount={masteredIndices.size}
        reason={completionReason}
      />

      {/* Left Column: Video + Wait Controls + Focus Card + Audio Comparison */}
      <div className="lg:col-span-2 space-y-4">
        {/* Top Activity & Gamification Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1F132A] border border-[#3A3A3A] rounded-sm px-4 py-2.5 shadow-none">
          <div className="flex items-center gap-3 text-xs font-mono">
            {/* Interactive Streak Button */}
            <button
              onClick={() => setShowStreakModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2E2E2E] hover:bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] text-[#B5A642] font-semibold text-xs font-mono transition-colors cursor-pointer"
              title="Click to view 7-Day Streak & Freeze Status"
            >
              <Flame size={14} className={`fill-[#B5A642] ${streakData.isGoalMet ? "animate-pulse" : ""}`} />
              <span>{streakData.streak}d Streak</span>
              {streakData.freezes > 0 && (
                <span className="flex items-center gap-0.5 text-[#3B5998] text-[10px]" title="Streak Freeze Protected">
                  <Snowflake size={11} /> {streakData.freezes}
                </span>
              )}
            </button>

            {/* Daily Target Progress */}
            <div className="flex items-center gap-1 text-[11px] text-[#E9E1D4]/80 hidden sm:flex">
              <Target size={13} className="text-[#B5A642]" />
              <span>
                Target: {streakData.todayCount}/{DAILY_STREAK_TARGET}
              </span>
              {streakData.isGoalMet && (
                <span className="px-1.5 py-0.2 bg-[#B5A642]/20 text-[#B5A642] border border-[#B5A642]/50 text-[10px] uppercase font-bold rounded-sm">
                  Met
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {isLessonCompleted ? (
              <button
                onClick={uncompleteLesson}
                className="group flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#B5A642]/20 border border-[#B5A642] text-[11px] font-mono text-[#B5A642] hover:bg-[#8C2727]/30 hover:border-[#8C2727] hover:text-[#E9E1D4] transition-colors cursor-pointer"
                title="Click to reset lesson completed status"
              >
                <CheckCircle2 size={13} className="group-hover:hidden" />
                <RotateCcw size={12} className="hidden group-hover:inline text-[#8C2727]" />
                <span className="group-hover:hidden">Lesson Done</span>
                <span className="hidden group-hover:inline">Uncomplete</span>
              </button>
            ) : (
              <button
                onClick={() => triggerLessonCompletion("manual")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[11px] font-mono text-[#E9E1D4]/70 hover:text-[#B5A642] transition-colors cursor-pointer"
                title="Mark this lesson as done"
              >
                <Check size={12} />
                <span className="hidden sm:inline">Mark Done</span>
              </button>
            )}

            {/* Leaderboard Button */}
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[11px] font-mono text-[#E9E1D4] hover:text-[#B5A642] hover:border-[#B5A642]/50 transition-colors cursor-pointer"
              title="View Leaderboard"
            >
              <Trophy size={13} className="text-[#B5A642]" />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>

            {/* Bookmark Lesson Button */}
            <button
              onClick={toggleBookmark}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[11px] font-mono transition-colors cursor-pointer ${
                isBookmarked
                  ? "bg-[#B5A642]/20 text-[#B5A642] border-[#B5A642]/50"
                  : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/70 hover:text-[#E9E1D4]"
              }`}
              title="Save this lesson to your study playlist"
            >
              <Bookmark size={13} className={isBookmarked ? "fill-[#B5A642]" : ""} />
              <span>{isBookmarked ? "Saved" : "Save Lesson"}</span>
            </button>

            {/* Shortcuts Info Button */}
            <button
              onClick={() => setShowShortcuts(true)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[11px] font-mono text-[#E9E1D4]/70 hover:text-[#E9E1D4] hover:border-[#B5A642]/50 transition-colors cursor-pointer"
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard size={12} />
              <kbd className="text-[10px] bg-[#1F132A] px-1 rounded-sm text-[#B5A642] font-bold">?</kbd>
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-sm overflow-hidden border border-[#3A3A3A] bg-black">
          <div ref={videoRef} data-vjs-player />
        </div>

        {/* Shadowing Engine Configuration Bar: Wait Mode + Subtitle Sync + Blind Mode */}
        <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Wait Mode Selector */}
            <WaitModeSelector
              currentMode={waitMode}
              onSelectMode={setWaitMode}
            />

            <div className="h-4 w-[1px] bg-[#3A3A3A] hidden sm:block" />

            {/* Subtitle Sync Controller (Affects transcript only) */}
            <SubtitleSyncControl
              offsetMs={subtitleOffsetMs}
              onAdjustOffset={adjustSubtitleOffset}
              onResetOffset={resetSubtitleOffset}
            />
          </div>

          {/* Blind Mode Toggle (Ear Training) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setIsBlindMode((prev) => !prev);
                setPeekBlind(false);
              }}
              className={`px-2.5 py-1 rounded-sm text-xs font-mono font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isBlindMode
                  ? "bg-[#8C2727] text-[#E9E1D4] border-[#8C2727] font-bold"
                  : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/70 hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
              }`}
              title="Blind Mode: Blurs transcript to test listening comprehension"
            >
              {isBlindMode ? <EyeOff size={12} /> : <Eye size={12} />}
              <span>Blind Mode: {isBlindMode ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>

        {/* Sentence Playback Interactive Control Bar */}
        <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Playback Navigation Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Previous Sentence (Left Arrow) */}
            <button
              onClick={handlePrevLine}
              disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) <= 0}
              className="p-2 sm:px-3 sm:py-2 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Previous Line (←)"
            >
              <SkipBack size={14} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Play / Pause Toggle (Spacebar) */}
            <button
              onClick={togglePlayPause}
              className="p-2 sm:px-3.5 sm:py-2 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4] hover:border-[#B5A642] hover:text-[#B5A642] transition-colors flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
              title={
                playbackState === "waiting" || playbackState === "manual-paused"
                  ? "Advance to Next Line (Space)"
                  : isVideoPlaying
                  ? "Pause (Space)"
                  : "Play (Space)"
              }
            >
              {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span className="hidden sm:inline">
                {playbackState === "waiting" || playbackState === "manual-paused"
                  ? "Continue"
                  : isVideoPlaying
                  ? "Pause"
                  : "Play"}
              </span>
            </button>

            {/* Replay Current Sentence (R) */}
            <button
              onClick={handleReplayCurrent}
              disabled={transcript.length === 0}
              className="p-2 sm:px-3.5 sm:py-2 rounded-sm bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
              title="Replay Current Line (R)"
            >
              <RotateCcw size={14} />
              <span>Replay</span>
            </button>

            {/* Next Sentence (Right Arrow / Enter) */}
            <button
              onClick={handleNextLine}
              disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) >= transcript.length - 1}
              className="p-2 sm:px-3 sm:py-2 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Next Line (→ / Enter)"
            >
              <span className="hidden sm:inline">Next</span>
              <SkipForward size={14} />
            </button>

            <div className="h-5 w-[1px] bg-[#3A3A3A] mx-1" />

            {/* Single Sentence Loop Toggle (L) */}
            <button
              onClick={toggleLoop}
              className={`px-3 py-2 rounded-sm border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                isLooping
                  ? "bg-[#3B5998] border-[#3B5998] text-[#E9E1D4] font-bold"
                  : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
              }`}
              title="Loop current sentence continuously for shadowing (L)"
            >
              <Repeat size={13} className={isLooping ? "animate-spin" : ""} />
              <span>Loop: {isLooping ? "ON" : "OFF"}</span>
            </button>
          </div>

          {/* Speed Presets (0.75x, 1.0x, 1.25x, 1.5x) */}
          <div className="flex items-center gap-1 bg-[#2E2E2E] border border-[#3A3A3A] rounded-sm p-1">
            <Gauge size={13} className="text-[#B5A642] ml-1.5 hidden sm:inline" />
            {[0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedPreset(speed)}
                className={`px-2 py-1 rounded-sm text-[11px] font-mono transition-colors cursor-pointer ${
                  playbackRate === speed
                    ? "bg-[#B5A642] text-[#1F132A] font-bold"
                    : "text-[#E9E1D4]/70 hover:text-[#E9E1D4]"
                }`}
                title={`Playback Speed: ${speed}x (Press S to cycle)`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Active Shadowing Sentence Focus Card (Zero layout shift / Persistent height) */}
        {transcript.length > 0 && currentSentence && (
          <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-5 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#B5A642] font-bold flex items-center gap-1.5">
                  <Volume2
                    size={13}
                    className={activeIndex !== -1 ? "text-[#B5A642] animate-pulse" : "text-[#7A7A7A]"}
                  />{" "}
                  {activeIndex !== -1 ? "Active Sentence" : "Current Focus"}
                </span>
                <span className="text-xs font-mono text-[#7A7A7A]">
                  Line {displayIndex + 1} of {transcript.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Blind Mode Peek Button */}
                {isBlindMode && (
                  <button
                    onClick={() => setPeekBlind((v) => !v)}
                    className="px-2.5 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[11px] font-mono text-[#E9E1D4] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {peekBlind ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span>{peekBlind ? "Hide Text" : "Peek Text"}</span>
                  </button>
                )}

                {/* Translate Button */}
                <button
                  onClick={handleTranslateToggle}
                  disabled={translating}
                  className="px-2.5 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[11px] font-mono text-[#E9E1D4]/80 hover:text-[#E9E1D4] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Translate this sentence"
                >
                  {translating ? <Loader2 size={11} className="animate-spin" /> : <Languages size={12} />}
                  <span>{showTranslation ? "Hide Meaning" : "Translate"}</span>
                </button>

                {/* Mark as Mastered button */}
                <button
                  onClick={() => toggleMastered(displayIndex)}
                  className={`px-2.5 py-1 rounded-sm border text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                    masteredIndices.has(displayIndex)
                      ? "bg-[#26543F] text-[#42946E] border-[#367859] font-bold"
                      : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4]"
                  }`}
                  title="Mark this sentence as mastered (M)"
                >
                  <Check size={11} />
                  <span>{masteredIndices.has(displayIndex) ? "Mastered" : "Mark Mastered"}</span>
                </button>
              </div>
            </div>

            {/* Wait Mode / Manual Paused Status Prompt Banners */}
            {playbackState === "waiting" && (
              <div className="mb-4 p-3 rounded-sm bg-[#2E2E2E] border border-[#B5A642] flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B5A642] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#B5A642] uppercase tracking-wider">
                    REPEAT OUT LOUD:
                  </span>
                  <span className="text-xs font-mono text-[#E9E1D4]">
                    {(waitRemainingMs / 1000).toFixed(1)}s remaining ({waitMode})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNextLine}
                    className="px-3 py-1.5 rounded-sm bg-[#B5A642] hover:bg-[#B5A642]/90 text-[#1F132A] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Advance to next sentence now (Space / Enter)"
                  >
                    <span>Next Line</span>
                    <SkipForward size={12} />
                    <kbd className="text-[10px] bg-[#1F132A]/20 px-1 rounded-sm">Space</kbd>
                  </button>

                  <button
                    onClick={handleReplayCurrent}
                    className="px-2.5 py-1.5 rounded-sm bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Replay this sentence (R)"
                  >
                    <RotateCcw size={12} />
                    <span>Replay</span>
                    <kbd className="text-[10px] bg-[#2E2E2E] px-1 rounded-sm text-[#B5A642]">R</kbd>
                  </button>
                </div>
              </div>
            )}

            {playbackState === "manual-paused" && (
              <div className="mb-4 p-3 rounded-sm bg-[#2E2E2E] border border-[#B5A642] flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B5A642]" />
                  <span className="text-xs font-mono font-bold text-[#B5A642] uppercase tracking-wider">
                    PAUSED — REPEAT AT YOUR OWN PACE
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNextLine}
                    className="px-3 py-1.5 rounded-sm bg-[#B5A642] hover:bg-[#B5A642]/90 text-[#1F132A] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Continue to next sentence (Space / Enter)"
                  >
                    <span>Next Line</span>
                    <SkipForward size={12} />
                    <kbd className="text-[10px] bg-[#1F132A]/20 px-1 rounded-sm">Space</kbd>
                  </button>

                  <button
                    onClick={handleReplayCurrent}
                    className="px-2.5 py-1.5 rounded-sm bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Replay this sentence (R)"
                  >
                    <RotateCcw size={12} />
                    <span>Replay</span>
                    <kbd className="text-[10px] bg-[#2E2E2E] px-1 rounded-sm text-[#B5A642]">R</kbd>
                  </button>
                </div>
              </div>
            )}

            {/* Large Typography Sentence (with Blind Mode blur support) */}
            <div
              key={displayIndex}
              className={`transition-all duration-300 min-h-[36px] flex items-center ${
                isBlindMode && !peekBlind
                  ? "filter blur-md select-none opacity-40 hover:filter-none hover:opacity-100"
                  : ""
              }`}
            >
              <p className="text-base sm:text-xl text-[#E9E1D4] leading-relaxed font-normal select-text">
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
                className="mt-3 pt-3 border-t border-[#3A3A3A] text-xs sm:text-sm text-[#B5A642] leading-relaxed"
              >
                <span className="font-mono text-[10px] uppercase text-[#7A7A7A] block mb-1">
                  Myanmar Translation:
                </span>
                {sentenceTranslation}
              </motion.div>
            )}

            {/* Local A/B Voice Comparison Widget */}
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
      <div className="bg-[#1F132A] rounded-sm border border-[#3A3A3A] flex flex-col h-130 lg:h-[720px] overflow-hidden">
        {/* Transcript Header with Auto-scroll Toggle */}
        <div className="p-3.5 border-b border-[#3A3A3A] bg-[#1F132A] sticky top-0 rounded-t-sm z-10 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold font-mono text-[#E9E1D4] tracking-wider uppercase">Transcript</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#B5A642]">
                {transcript.length} lines
              </span>
            </div>

            <button
              onClick={() => setAutoScroll((v) => !v)}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-mono border transition-colors flex items-center gap-1.5 cursor-pointer ${
                autoScroll
                  ? "bg-[#B5A642]/20 border-[#B5A642]/60 text-[#B5A642] font-bold"
                  : "bg-[#2E2E2E] border-[#3A3A3A] text-[#7A7A7A] hover:text-[#E9E1D4]"
              }`}
              title="Toggle automatic scrolling to active line"
            >
              <ScrollText size={12} />
              <span>Auto-Scroll: {autoScroll ? "ON" : "OFF"}</span>
            </button>
          </div>

          {/* Lesson Mastery Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#E9E1D4]/80 mb-1">
              <span>Mastery Progress</span>
              <span className={masteryPercent === 100 ? "text-[#42946E] font-bold" : "text-[#B5A642]"}>
                {masteredIndices.size} / {transcript.length} ({masteryPercent}%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#2E2E2E] rounded-none overflow-hidden border border-[#3A3A3A]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${masteryPercent}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full ${
                  masteryPercent === 100 ? "bg-[#42946E]" : "bg-[#B5A642]"
                }`}
              />
            </div>
          </div>

          {/* Celebration Banner when 100% Mastered */}
          {isLessonFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-2 rounded-sm bg-[#26543F]/60 border border-[#42946E] flex items-center gap-2 text-xs text-[#42946E] font-medium font-mono"
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
                <div key={i} className="h-16 bg-[#2E2E2E] rounded-sm border border-[#3A3A3A]" />
              ))}
            </div>
          ) : transcript.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#7A7A7A]">
              <Sparkles className="w-8 h-8 text-[#B5A642] mb-2 opacity-60" />
              <p className="text-sm font-mono">No transcript available for this lesson.</p>
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
                  className={`group relative p-3 rounded-sm cursor-pointer transition-colors border ${
                    isActive
                      ? "bg-[#2E2E2E] border-[#B5A642] shadow-none translate-x-1"
                      : "border-transparent hover:bg-[#2E2E2E] hover:border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4]"
                  }`}
                >
                  {/* Line Header: Timestamp and Active Pill & Mastered Checkbox */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded-sm ${
                          isActive
                            ? "bg-[#B5A642] text-[#1F132A] font-bold"
                            : "bg-[#1F132A] text-[#7A7A7A] group-hover:text-[#E9E1D4]"
                        }`}
                      >
                        {formatTime(item.offset)}
                        {duration > 0 ? ` - ${formatTime(endTime)}` : ""}
                      </span>

                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#B5A642] font-bold tracking-wider uppercase">
                          <Volume2 size={12} className="animate-pulse" /> Active
                        </span>
                      )}
                    </div>

                    {/* Mastered Badge / Checkbox */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMastered(index);
                      }}
                      className={`p-1 rounded-sm border transition-colors cursor-pointer ${
                        isMastered
                          ? "bg-[#26543F] text-[#42946E] border-[#367859]"
                          : "bg-[#1F132A] border-[#3A3A3A] text-[#7A7A7A] hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
                      }`}
                      title={isMastered ? "Mastered (Click to unmark)" : "Mark as Mastered"}
                    >
                      <Check size={11} className={isMastered ? "stroke-[3]" : "opacity-40"} />
                    </button>
                  </div>

                  {/* Transcript Line Text */}
                  <p
                    className={`text-sm leading-relaxed ${
                      isActive ? "text-[#E9E1D4] font-medium" : "text-[#E9E1D4]/75 group-hover:text-[#E9E1D4]"
                    }`}
                  >
                    {item.text}
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
