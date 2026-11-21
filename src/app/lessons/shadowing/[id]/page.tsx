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
  SubtitleSyncControl,
} from "@/features/shadowing";
import { WordWithMeaning } from "@/features/vocabulary";
import React, { use, useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
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
  Keyboard,
  Languages,
  Check,
  PartyPopper,
  Loader2,
  Bookmark,
  Trophy,
  Eye,
  EyeOff,
  Play,
  Pause,
  PauseCircle,
  Minimize2,
  Maximize2,
  Square,
  Clock,
} from "lucide-react";

type VideoSize = "compact" | "normal" | "wide";

export default function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const transcriptListRef = useRef<HTMLDivElement | null>(null);

  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const transcriptRef = useRef<TranscriptItem[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const activeIndexRef = useRef<number>(-1);
  activeIndexRef.current = activeIndex;

  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const isLoopingRef = useRef<boolean>(false);
  isLoopingRef.current = isLooping;

  // Step Mode: Automatically pause at sentence end until user clicks Next
  const [autoPauseAtEnd, setAutoPauseAtEnd] = useState<boolean>(true);
  const autoPauseAtEndRef = useRef<boolean>(true);
  autoPauseAtEndRef.current = autoPauseAtEnd;
  const lastPausedIdxRef = useRef<number | null>(null);
  const [isPausedAtSentenceEnd, setIsPausedAtSentenceEnd] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [subtitleOffsetMs, setSubtitleOffsetMs] = useState<number>(0);
  const subtitleOffsetMsRef = useRef<number>(0);
  subtitleOffsetMsRef.current = subtitleOffsetMs;

  // Dynamic Video Frame Sizing: "compact" (460px) | "normal" (620px) | "wide" (100%)
  const [videoSize, setVideoSize] = useState<VideoSize>("normal");

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

  // Daily Streak State
  const [streakData, setStreakData] = useState<StreakData>(loadStreakData);
  const [showStreakModal, setShowStreakModal] = useState<boolean>(false);

  // Lesson Completion State
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);
  const isLessonCompletedRef = useRef<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completionReason, setCompletionReason] = useState<"mastery" | "playthrough" | "manual">("mastery");

  // Video Validation Error (e.g. video exceeds 7-minute limit)
  const [durationError, setDurationError] = useState<string | null>(null);

  // Sync focusedIndex so the focus card persists during breath pauses & silence
  useEffect(() => {
    if (activeIndex !== -1) {
      setFocusedIndex(activeIndex);
    }
  }, [activeIndex]);

  // Sync transcriptRef & masteredIndicesRef
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    masteredIndicesRef.current = masteredIndices;
  }, [masteredIndices]);

  // Load mastered lines, bookmark state, and user's saved video size preference on mount
  useEffect(() => {
    try {
      const savedMastered = localStorage.getItem(`mastered_lesson_${id}`);
      if (savedMastered) {
        setMasteredIndices(new Set(JSON.parse(savedMastered)));
      }

      const savedBookmarks = JSON.parse(localStorage.getItem("saved_study_lessons") || "[]");
      setIsBookmarked(savedBookmarks.some((l: { id: string }) => l.id === id));

      const savedSize = localStorage.getItem("shadowing_video_size") as VideoSize | null;
      if (savedSize === "compact" || savedSize === "normal" || savedSize === "wide") {
        setVideoSize(savedSize);
      }

      const savedStepMode = localStorage.getItem("shadowing_step_pause_mode");
      if (savedStepMode !== null) {
        const parsed = JSON.parse(savedStepMode);
        setAutoPauseAtEnd(parsed);
        autoPauseAtEndRef.current = parsed;
      }

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

  // Change video size and persist preference
  const handleSetVideoSize = (size: VideoSize) => {
    setVideoSize(size);
    try {
      localStorage.setItem("shadowing_video_size", size);
    } catch {}
  };

  // Toggle Step Mode (Auto-pause at sentence end)
  const toggleAutoPause = useCallback(() => {
    setAutoPauseAtEnd((prev) => {
      const next = !prev;
      autoPauseAtEndRef.current = next;
      try {
        localStorage.setItem("shadowing_step_pause_mode", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

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

  // Seek video to specific sentence offset
  const handleSeek = useCallback((offset: number, explicitIndex?: number) => {
    if (playerRef.current) {
      lastPausedIdxRef.current = null;
      setIsPausedAtSentenceEnd(false);
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

  /* 1. Fetch Transcript & clean non-speech tags */
  useEffect(() => {
    async function fetchTranscript() {
      try {
        setLoading(true);
        setDurationError(null);
        const res = await fetch(`/api/FetchTranscript?videoId=${id}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          setDurationError(
            data.message || data.error || "Could not load subtitles for this video."
          );
          return;
        }

        const rawItems = Array.isArray(data) ? data : data?.content || [];
        const items: TranscriptItem[] = cleanTranscriptItems(rawItems);

        setTranscript(items);
        transcriptRef.current = items;
      } catch (err) {
        console.error("Failed to load transcript", err);
        setDurationError("Network error while loading video subtitles.");
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

      const curIdx = activeIndexRef.current;

      // Handle Single Sentence Loop Mode
      if (isLoopingRef.current && curIdx !== -1) {
        const currentItem = items[curIdx];
        if (currentItem) {
          const duration = currentItem.duration && currentItem.duration > 0 ? currentItem.duration : 3000;
          const endMs = currentItem.offset + duration + 100;
          const startSec = Math.max(0, (currentItem.offset - 150) / 1000);

          if (rawCurrentMs >= endMs) {
            player.currentTime(startSec);
            return;
          }
        }
      }

      // Handle Step Mode: Automatically pause at sentence end until user clicks Next
      if (autoPauseAtEndRef.current && !isLoopingRef.current && curIdx !== -1) {
        const currentItem = items[curIdx];
        if (currentItem) {
          const duration = currentItem.duration && currentItem.duration > 0 ? currentItem.duration : 3000;
          const rawEnd = currentItem.offset + duration;
          const nextItem = items[curIdx + 1];
          const pauseTargetMs =
            nextItem && nextItem.offset > currentItem.offset
              ? Math.min(rawEnd + 80, Math.max(currentItem.offset + 400, nextItem.offset - 40))
              : rawEnd + 80;

          if (rawCurrentMs >= pauseTargetMs && lastPausedIdxRef.current !== curIdx) {
            lastPausedIdxRef.current = curIdx;
            setIsPausedAtSentenceEnd(true);
            player.pause();
            return;
          }
        }
      }

      // Playthrough detection near end of video
      try {
        const dur = typeof player.duration === "function" ? player.duration() : 0;
        const cur = typeof player.currentTime === "function" ? player.currentTime() : 0;
        if (typeof dur === "number" && dur > 5 && typeof cur === "number" && cur >= dur - 1.5) {
          triggerLessonCompletion("playthrough");
        }
      } catch {}

      // Calculate effective time with subtitle offset for UI transcript highlighting ONLY
      const effectiveMs = Math.max(0, rawCurrentMs + subtitleOffsetMsRef.current);
      const newIndex = findActiveTranscriptIndex(items, effectiveMs);

      if (newIndex !== -1 && newIndex !== activeIndexRef.current) {
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    player.on("timeupdate", syncTranscript);
    player.on("seeked", syncTranscript);
    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("ended", () => {
      setIsPlaying(false);
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
  }, [id, triggerLessonCompletion]);

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

  // Controls Navigation
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

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;
    if (playerRef.current.paused()) {
      const curIdx = activeIndexRef.current;
      // If paused at sentence end in step mode, pressing Play/Space advances to next sentence
      if (
        autoPauseAtEndRef.current &&
        lastPausedIdxRef.current === curIdx &&
        curIdx !== -1 &&
        transcriptRef.current.length > 0 &&
        curIdx < transcriptRef.current.length - 1
      ) {
        handleNextLine();
        return;
      }
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [handleNextLine]);

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
      const target = e.target as HTMLElement | null;
      const tagName = (target?.tagName || "").toLowerCase();
      if (tagName === "input" || tagName === "textarea" || tagName === "select" || target?.isContentEditable) {
        return;
      }

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
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        toggleAutoPause();
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
    handlePrevLine,
    activeIndex,
    focusedIndex,
    toggleMastered,
    cycleSpeed,
    toggleAutoPause,
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

  // Dynamic max-width class based on user size selection
  const videoMaxWidthClass =
    videoSize === "compact"
      ? "max-w-[460px]"
      : videoSize === "wide"
      ? "max-w-full"
      : "max-w-[620px]";

  return (
    <div className="bg-[#2E2E2E] min-h-screen text-[#E9E1D4]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
        {/* Keyboard Shortcuts Modal */}
        <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />

        {/* Community Leaderboard Modal */}
        <LeaderboardModal
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          userStreak={streakData.streak}
          userMasteredCount={masteredIndices.size}
        />

        {/* 7-Day Streak Tracker Modal */}
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

        {/* If video duration exceeds 7-minute limit, display warning banner */}
        {durationError ? (
          <div className="lg:col-span-3 my-8">
            <div className="max-w-xl mx-auto bg-[#1F132A] border border-[#8C2727] rounded-sm p-6 sm:p-8 text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-sm bg-[#8C2727]/20 border border-[#8C2727] flex items-center justify-center text-[#8C2727] mx-auto">
                <Clock size={24} />
              </div>
              <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#E9E1D4]">
                Video Exceeds 7-Minute Limit
              </h2>
              <p className="text-xs text-[#E9E1D4]/80 font-mono leading-relaxed">
                {durationError}
              </p>
              <div className="p-3 bg-[#2E2E2E] border border-[#3A3A3A] rounded-sm text-[11px] font-mono text-[#B5A642] text-left">
                <strong>Why 7 minutes?</strong> Shadowing requires deep, repetitive focus on native speech rhythm and pronunciation. Videos longer than 7 minutes cause mental fatigue and hinder speaking mastery.
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/Topics"
                  className="px-5 py-2.5 bg-[#B5A642] text-[#1F132A] hover:bg-[#c4b54e] rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Browse Short Practice Lessons
                </Link>
                <Link
                  href="/"
                  className="px-5 py-2.5 bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] rounded-sm font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Left Column: Video + Unified Controls + Focus Card + Audio Comparison */}
            <div className="lg:col-span-2 space-y-4">
          {/* Streamlined Top Bar (Distraction-Free) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1F132A] border border-[#3A3A3A] rounded-sm px-4 py-2.5">
            <div className="flex items-center gap-3 text-xs font-mono">
              {/* Streak Indicator */}
              <button
                onClick={() => setShowStreakModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2E2E2E] hover:bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] text-[#B5A642] font-semibold text-xs font-mono transition-colors cursor-pointer"
                title="View Streak Status"
              >
                <Flame size={14} className={`fill-[#B5A642] ${streakData.isGoalMet ? "animate-pulse" : ""}`} />
                <span>{streakData.streak}d Streak</span>
                {streakData.freezes > 0 && (
                  <span className="flex items-center gap-0.5 text-[#3B5998] text-[10px]">
                    <Snowflake size={11} /> {streakData.freezes}
                  </span>
                )}
              </button>

              <span className="text-[#7A7A7A] hidden sm:inline">|</span>

              {/* Mastered Counter */}
              <span className="text-[11px] font-mono text-[#E9E1D4]/80 hidden sm:inline">
                Mastered:{" "}
                <span className="text-[#B5A642] font-bold">
                  {masteredIndices.size}/{transcript.length}
                </span>
              </span>
            </div>

            {/* Top Right Quick Actions */}
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

              {/* Bookmark Button */}
              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-sm border text-[11px] font-mono transition-colors cursor-pointer ${
                  isBookmarked
                    ? "bg-[#B5A642]/20 text-[#B5A642] border-[#B5A642]/50"
                    : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/70 hover:text-[#E9E1D4]"
                }`}
                title="Save Lesson"
              >
                <Bookmark size={13} className={isBookmarked ? "fill-[#B5A642]" : ""} />
                <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
              </button>

              {/* Shortcuts Key Button */}
              <button
                onClick={() => setShowShortcuts(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[11px] font-mono text-[#E9E1D4]/70 hover:text-[#E9E1D4] hover:border-[#B5A642]/50 transition-colors cursor-pointer"
                title="Keyboard Shortcuts (?)"
              >
                <Keyboard size={12} />
                <kbd className="text-[10px] bg-[#1F132A] px-1 rounded-sm text-[#B5A642] font-bold">?</kbd>
              </button>
            </div>
          </div>

          {/* Dynamic Resizable Video Player Container */}
          <div className="space-y-1.5">
            <div
              className={`relative w-full ${videoMaxWidthClass} mx-auto aspect-video rounded-sm overflow-hidden border border-[#3A3A3A] bg-black shadow-lg transition-all duration-300`}
            >
              <div ref={videoRef} data-vjs-player />
            </div>

            {/* Video Size Controller Bar (Compact | Normal | Wide) */}
            <div className={`w-full ${videoMaxWidthClass} mx-auto flex items-center justify-between px-1 text-xs font-mono transition-all duration-300`}>
              <span className="text-[11px] text-[#7A7A7A] uppercase tracking-wider">Video Size:</span>
              <div className="inline-flex border border-[#3A3A3A] bg-[#1F132A] rounded-sm p-0.5">
                {[
                  { id: "compact", label: "Compact", icon: <Minimize2 size={11} />, desc: "Narrow (460px)" },
                  { id: "normal", label: "Normal", icon: <Square size={11} />, desc: "Standard (620px)" },
                  { id: "wide", label: "Wide", icon: <Maximize2 size={11} />, desc: "Expanded (100%)" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSetVideoSize(s.id as VideoSize)}
                    title={s.desc}
                    className={`px-2 py-0.5 text-[11px] font-mono flex items-center gap-1 rounded-sm transition-colors cursor-pointer ${
                      videoSize === s.id
                        ? "bg-[#B5A642] text-[#1F132A] font-bold"
                        : "text-[#E9E1D4]/70 hover:text-[#E9E1D4] hover:bg-[#2E2E2E]"
                    }`}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Unified, Distraction-Free Playback & Practice Toolbar */}
          <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
            {/* Primary Navigation Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Prev Line (←) */}
              <button
                onClick={handlePrevLine}
                disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) <= 0}
                className="p-2 sm:px-3 sm:py-2 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                title="Previous Line (←)"
              >
                <SkipBack size={14} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Play / Pause Toggle (Space) */}
              <button
                onClick={togglePlayPause}
                className="p-2 sm:px-3.5 sm:py-2 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4] hover:border-[#B5A642] hover:text-[#B5A642] transition-colors flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
              </button>

              {/* Replay Current Line (R) */}
              <button
                onClick={handleReplayCurrent}
                disabled={transcript.length === 0}
                className="p-2 sm:px-3.5 sm:py-2 rounded-sm bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
                title="Replay Current Line (R)"
              >
                <RotateCcw size={14} />
                <span>Replay</span>
              </button>

              {/* Next Line (→ / Enter) */}
              <button
                onClick={handleNextLine}
                disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) >= transcript.length - 1}
                className={`p-2 sm:px-3 sm:py-2 rounded-sm border transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer ${
                  isPausedAtSentenceEnd
                    ? "bg-[#B5A642] text-[#1F132A] border-[#B5A642] font-bold animate-pulse shadow-md"
                    : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642] disabled:opacity-30 disabled:cursor-not-allowed"
                }`}
                title="Next Line (→ / Enter)"
              >
                <span className="hidden sm:inline">Next</span>
                <SkipForward size={14} />
              </button>

              <div className="h-5 w-[1px] bg-[#3A3A3A] mx-0.5" />

              {/* Single Sentence Loop (L) */}
              <button
                onClick={() => setIsLooping((v) => !v)}
                className={`px-2.5 py-2 rounded-sm border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isLooping
                    ? "bg-[#3B5998] border-[#3B5998] text-[#E9E1D4] font-bold"
                    : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
                }`}
                title="Loop current sentence (L)"
              >
                <Repeat size={13} className={isLooping ? "animate-spin" : ""} />
                <span>Loop {isLooping ? "ON" : "OFF"}</span>
              </button>

              {/* Step Mode (Pause at sentence end until user clicks Next) */}
              <button
                onClick={toggleAutoPause}
                className={`px-2.5 py-2 rounded-sm border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                  autoPauseAtEnd
                    ? "bg-[#B5A642] border-[#B5A642] text-[#1F132A] font-bold"
                    : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
                }`}
                title="Step Mode: Automatically pause at sentence end until you click Next (P)"
              >
                <PauseCircle size={13} />
                <span>Step Mode {autoPauseAtEnd ? "ON" : "OFF"}</span>
              </button>
            </div>

            {/* Essential Practice Modifiers (Speed, Sync, Blind Mode) */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Speed Presets */}
              <div className="flex items-center gap-0.5 bg-[#2E2E2E] border border-[#3A3A3A] rounded-sm p-0.5">
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedPreset(speed)}
                    className={`px-1.5 py-1 rounded-sm text-[11px] font-mono transition-colors cursor-pointer ${
                      playbackRate === speed
                        ? "bg-[#B5A642] text-[#1F132A] font-bold"
                        : "text-[#E9E1D4]/70 hover:text-[#E9E1D4]"
                    }`}
                    title={`Playback Speed: ${speed}x`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Subtitle Sync */}
              <SubtitleSyncControl
                offsetMs={subtitleOffsetMs}
                onAdjustOffset={(delta) => setSubtitleOffsetMs((v) => v + delta)}
                onResetOffset={() => setSubtitleOffsetMs(0)}
              />

              {/* Blind Mode Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsBlindMode((prev) => !prev);
                  setPeekBlind(false);
                }}
                className={`p-1.5 rounded-sm border transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono ${
                  isBlindMode
                    ? "bg-[#8C2727] text-[#E9E1D4] border-[#8C2727] font-bold"
                    : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/70 hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
                }`}
                title="Blind Mode (Blurs transcript for ear training)"
              >
                {isBlindMode ? <EyeOff size={13} /> : <Eye size={13} />}
                <span className="hidden sm:inline">Blind</span>
              </button>
            </div>
          </div>

          {/* Active Shadowing Sentence Focus Card */}
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

              {/* Large Typography Sentence */}
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
                    <WordWithMeaning
                      key={wIdx}
                      word={word}
                      contextSentence={currentSentence.text}
                      lessonId={id}
                    />
                  ))}
                </p>
              </div>

              {/* Step Mode: Sentence Paused for Shadowing Notification Banner */}
              {isPausedAtSentenceEnd && (
                <div className="mt-3 px-3 py-2 bg-[#2E2E2E] border-l-2 border-[#B5A642] rounded-xs flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#E9E1D4]">
                  <div className="flex items-center gap-2">
                    <PauseCircle size={14} className="text-[#B5A642] shrink-0" />
                    <span className="font-bold text-[#B5A642]">Sentence Paused:</span>
                    <span className="text-[#E9E1D4]/80 text-[11px]">Ready for shadowing practice!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReplayCurrent}
                      className="px-2 py-1 bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] rounded-xs text-[11px] text-[#E9E1D4] hover:text-[#B5A642] transition-colors cursor-pointer flex items-center gap-1"
                      title="Replay this sentence"
                    >
                      <RotateCcw size={11} />
                      <span>Replay (R)</span>
                    </button>
                    <button
                      onClick={handleNextLine}
                      disabled={displayIndex >= transcript.length - 1}
                      className="px-2.5 py-1 bg-[#B5A642] text-[#1F132A] font-bold rounded-xs text-[11px] hover:bg-[#B5A642]/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
                      title="Play next sentence"
                    >
                      <span>Next Line (→ / Enter)</span>
                      <SkipForward size={11} />
                    </button>
                  </div>
                </div>
              )}

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
                lessonId={id}
                sentenceIndex={displayIndex}
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
      </>
    )}
  </div>
</div>
  );
}
