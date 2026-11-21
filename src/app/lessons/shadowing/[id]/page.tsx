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
  Mic,
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
  const seekingTargetIdxRef = useRef<number | null>(null);
  const seekLockUntilRef = useRef<number>(0);
  const [isPausedAtSentenceEnd, setIsPausedAtSentenceEnd] = useState<boolean>(false);

  // Auto-Next Timer Mode (e.g. 5-second countdown progress bar after sentence pause)
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState<boolean>(true);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState<number>(5);
  const [countdownRemainingMs, setCountdownRemainingMs] = useState<number>(0);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [isCountdownPaused, setIsCountdownPaused] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

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

  // Voice Comparison On-Demand Drawer
  const [showVoiceComparison, setShowVoiceComparison] = useState<boolean>(false);

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

      const savedAutoAdvance = localStorage.getItem("shadowing_auto_advance_enabled");
      if (savedAutoAdvance !== null) {
        setAutoAdvanceEnabled(JSON.parse(savedAutoAdvance));
      }
      const savedAutoAdvanceSec = localStorage.getItem("shadowing_auto_advance_seconds");
      if (savedAutoAdvanceSec !== null) {
        setAutoAdvanceSeconds(JSON.parse(savedAutoAdvanceSec));
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

  // Cycle Auto-Next Timer: 5s -> 7s -> 3s -> OFF -> 5s
  const cycleAutoAdvance = useCallback(() => {
    if (!autoAdvanceEnabled) {
      setAutoAdvanceEnabled(true);
      setAutoAdvanceSeconds(5);
      try {
        localStorage.setItem("shadowing_auto_advance_enabled", JSON.stringify(true));
        localStorage.setItem("shadowing_auto_advance_seconds", JSON.stringify(5));
      } catch {}
    } else if (autoAdvanceSeconds === 5) {
      setAutoAdvanceSeconds(7);
      try {
        localStorage.setItem("shadowing_auto_advance_seconds", JSON.stringify(7));
      } catch {}
    } else if (autoAdvanceSeconds === 7) {
      setAutoAdvanceSeconds(3);
      try {
        localStorage.setItem("shadowing_auto_advance_seconds", JSON.stringify(3));
      } catch {}
    } else {
      setAutoAdvanceEnabled(false);
      try {
        localStorage.setItem("shadowing_auto_advance_enabled", JSON.stringify(false));
      } catch {}
    }
  }, [autoAdvanceEnabled, autoAdvanceSeconds]);

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

  // Mark Sentence as Mastered (Idempotent - auto-marks when sentence ends)
  const markMastered = useCallback(
    (index: number) => {
      setMasteredIndices((prev) => {
        if (prev.has(index)) return prev;
        const next = new Set(prev);
        next.add(index);

        try {
          localStorage.setItem(`mastered_lesson_${id}`, JSON.stringify(Array.from(next)));

          const newMasteredCount = next.size;
          const totalLines = transcriptRef.current.length;

          if (totalLines > 0 && newMasteredCount >= totalLines) {
            triggerLessonCompletion("mastery");
          }

          setStreakData((prevData) => {
            const { updatedData } = recordMasteredLineProgress(prevData);
            return updatedData;
          });
        } catch (e) {
          console.warn("Storage error:", e);
        }

        return next;
      });
    },
    [id, triggerLessonCompletion]
  );

  const markMasteredRef = useRef(markMastered);
  markMasteredRef.current = markMastered;

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

      const items = transcriptRef.current;
      const resolvedIdx =
        typeof explicitIndex === "number"
          ? explicitIndex
          : items.findIndex((i) => Math.abs(i.offset - offset) < 200);

      if (resolvedIdx >= 0) {
        seekingTargetIdxRef.current = resolvedIdx;
        activeIndexRef.current = resolvedIdx;
        setActiveIndex(resolvedIdx);
        setFocusedIndex(resolvedIdx);
      }

      // Lock time-sync for 600ms so video.js-youtube iframe seek completes smoothly
      // without reporting stale timestamps or prematurely reverting / pausing on the old line
      seekLockUntilRef.current = Date.now() + 600;

      // Seek directly to the exact sentence start offset
      const targetSec = Math.max(0, offset / 1000);
      playerRef.current.currentTime(targetSec);
      playerRef.current.play();
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

    let tickTimer: NodeJS.Timeout | null = null;

    const syncTranscript = () => {
      if (!player) return;

      // When seeking to a line, ignore stale timestamps until seek settling window elapses
      if (Date.now() < seekLockUntilRef.current) {
        return;
      }

      const rawCurrentMs = (player.currentTime() || 0) * 1000;
      const items = transcriptRef.current;
      if (!items || items.length === 0) return;

      const curIdx = activeIndexRef.current;

      // Handle Single Sentence Loop Mode
      if (isLoopingRef.current && curIdx !== -1) {
        const currentItem = items[curIdx];
        if (currentItem) {
          const duration = currentItem.duration && currentItem.duration > 0 ? currentItem.duration : 3000;
          const endMs = currentItem.offset + duration;
          const startSec = Math.max(0, currentItem.offset / 1000);

          if (rawCurrentMs >= endMs) {
            markMasteredRef.current(curIdx);
            seekLockUntilRef.current = Date.now() + 400;
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
          // Stop at sentence end or before next item starts
          const pauseTargetMs =
            nextItem && nextItem.offset > currentItem.offset
              ? Math.min(rawEnd, nextItem.offset - 30)
              : rawEnd;

          if (rawCurrentMs >= pauseTargetMs && lastPausedIdxRef.current !== curIdx) {
            lastPausedIdxRef.current = curIdx;
            player.pause();
            setIsPausedAtSentenceEnd(true);
            // Ensure activeIndex is locked on curIdx
            activeIndexRef.current = curIdx;
            setActiveIndex(curIdx);
            setFocusedIndex(curIdx);
            // Auto mark the completed sentence as Mastered!
            markMasteredRef.current(curIdx);
            return;
          }
        }
      }

      // If paused at sentence end in Step Mode, DO NOT allow activeIndex to advance!
      if (autoPauseAtEndRef.current && lastPausedIdxRef.current !== null && player.paused()) {
        return;
      }

      // Playthrough detection near end of video
      try {
        const dur = typeof player.duration === "function" ? player.duration() : 0;
        const cur = typeof player.currentTime === "function" ? player.currentTime() : 0;
        if (typeof dur === "number" && dur > 5 && typeof cur === "number" && cur >= dur - 1.5) {
          triggerLessonCompletion("playthrough");
        }
      } catch {}

      // In Step Mode, once a line is active, do not allow dynamic time-sync to overwrite activeIndex
      // unless user manually jumped with the native scrubber
      if (autoPauseAtEndRef.current && curIdx !== -1) {
        const currentItem = items[curIdx];
        if (currentItem) {
          const dur = currentItem.duration && currentItem.duration > 0 ? currentItem.duration : 3000;
          const nextItem = items[curIdx + 1];
          const upperBound =
            nextItem && nextItem.offset > currentItem.offset
              ? nextItem.offset + 200
              : currentItem.offset + dur + 1000;
          if (rawCurrentMs >= currentItem.offset - 500 && rawCurrentMs <= upperBound) {
            return;
          }
        }
      }

      // Calculate effective time for UI transcript highlighting
      const effectiveMs = Math.max(0, rawCurrentMs);
      const newIndex = findActiveTranscriptIndex(items, effectiveMs);

      if (newIndex !== -1 && newIndex !== activeIndexRef.current) {
        const prevIdx = activeIndexRef.current;
        if (prevIdx !== -1 && newIndex > prevIdx && !player.paused()) {
          markMasteredRef.current(prevIdx);
        }
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    player.on("timeupdate", syncTranscript);
    player.on("seeked", syncTranscript);
    player.on("play", () => {
      setIsPlaying(true);
      if (tickTimer) clearInterval(tickTimer);
      tickTimer = setInterval(syncTranscript, 25);
    });
    player.on("pause", () => {
      setIsPlaying(false);
      if (tickTimer) {
        clearInterval(tickTimer);
        tickTimer = null;
      }
    });
    player.on("ended", () => {
      setIsPlaying(false);
      if (tickTimer) {
        clearInterval(tickTimer);
        tickTimer = null;
      }
      if (activeIndexRef.current !== -1) {
        markMasteredRef.current(activeIndexRef.current);
      }
      triggerLessonCompletion("playthrough");
    });
    player.on("ratechange", () => {
      const rate = player.playbackRate();
      if (rate) setPlaybackRate(rate);
    });

    return () => {
      if (tickTimer) clearInterval(tickTimer);
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
    const items = transcriptRef.current;
    if (items.length === 0) return;
    const currentActive = activeIndexRef.current !== -1 ? activeIndexRef.current : focusedIndex;
    const baseIdx = currentActive >= 0 ? currentActive : 0;
    const targetIdx = Math.max(0, baseIdx - 1);
    handleSeek(items[targetIdx].offset, targetIdx);
  }, [focusedIndex, handleSeek]);

  const handleReplayCurrent = useCallback(() => {
    const items = transcriptRef.current;
    if (items.length === 0) return;
    const currentActive = activeIndexRef.current !== -1 ? activeIndexRef.current : focusedIndex;
    const targetIdx = currentActive >= 0 ? currentActive : 0;
    const target = items[targetIdx];
    if (target) {
      handleSeek(target.offset, targetIdx);
    }
  }, [focusedIndex, handleSeek]);

  const handleNextLine = useCallback(() => {
    const items = transcriptRef.current;
    if (items.length === 0) return;
    const currentActive = activeIndexRef.current !== -1 ? activeIndexRef.current : focusedIndex;
    const baseIdx = currentActive >= 0 ? currentActive : 0;
    // Auto-mark current sentence as Mastered before advancing
    markMastered(baseIdx);
    if (baseIdx >= items.length - 1) {
      triggerLessonCompletion("playthrough");
      return;
    }
    const targetIdx = Math.min(items.length - 1, baseIdx + 1);
    handleSeek(items[targetIdx].offset, targetIdx);
  }, [focusedIndex, handleSeek, markMastered, triggerLessonCompletion]);

  // 5-Second (Customizable) Auto-Next Countdown Timer when paused at sentence end
  useEffect(() => {
    if (isPausedAtSentenceEnd && autoAdvanceEnabled && autoPauseAtEnd && !isCountdownPaused) {
      const totalMs = autoAdvanceSeconds * 1000;
      let remaining = countdownRemainingMs > 0 ? countdownRemainingMs : totalMs;
      setCountdownRemainingMs(remaining);
      setIsCountingDown(true);

      const interval = setInterval(() => {
        remaining -= 50;
        const clamped = Math.max(0, remaining);
        setCountdownRemainingMs(clamped);

        if (clamped <= 0) {
          clearInterval(interval);
          setIsCountingDown(false);
          handleNextLine();
        }
      }, 50);

      return () => {
        clearInterval(interval);
      };
    } else if (!isPausedAtSentenceEnd) {
      setIsCountingDown(false);
      setCountdownRemainingMs(0);
      setIsCountdownPaused(false);
    }
  }, [
    isPausedAtSentenceEnd,
    autoAdvanceEnabled,
    autoPauseAtEnd,
    autoAdvanceSeconds,
    isCountdownPaused,
    handleNextLine,
  ]);

  const togglePlayPause = useCallback(() => {
    // 1. If currently in the auto-next countdown window: Space / Play button toggles Pause & Resume of the timer
    if (isPausedAtSentenceEnd && autoAdvanceEnabled && isCountingDown) {
      setIsCountdownPaused((v) => !v);
      return;
    }

    if (!playerRef.current) return;
    if (playerRef.current.paused()) {
      const curIdx = activeIndexRef.current;
      // If paused at sentence end in step mode without active countdown, pressing Play/Space advances to next sentence
      if (
        autoPauseAtEndRef.current &&
        (lastPausedIdxRef.current !== null || isPausedAtSentenceEnd) &&
        curIdx !== -1 &&
        transcriptRef.current.length > 0 &&
        curIdx < transcriptRef.current.length - 1
      ) {
        handleNextLine();
        return;
      }
      lastPausedIdxRef.current = null;
      setIsPausedAtSentenceEnd(false);
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [handleNextLine, isPausedAtSentenceEnd, autoAdvanceEnabled, isCountingDown]);

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

            if (totalLines > 0 && newMasteredCount >= totalLines) {
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
          <div className="space-y-2">
            <div
              className={`relative w-full ${videoMaxWidthClass} mx-auto aspect-video rounded-sm overflow-hidden border border-[#3A3A3A] bg-black shadow-lg transition-all duration-300`}
            >
              <div ref={videoRef} data-vjs-player />
            </div>

            {/* Video Player Compact Controller Bar */}
            <div className={`w-full ${videoMaxWidthClass} mx-auto bg-[#1F132A] border border-[#3A3A3A] rounded-sm px-3 py-2 flex flex-wrap items-center justify-between gap-2 shadow-sm transition-all duration-300`}>
              {/* Playback & Modes Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Prev Line */}
                <button
                  onClick={handlePrevLine}
                  disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) <= 0}
                  className="px-2.5 py-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                  title="Previous Line (←)"
                >
                  <SkipBack size={13} />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Play / Pause Toggle (Space) */}
                <button
                  onClick={togglePlayPause}
                  className="px-3 py-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4] hover:border-[#B5A642] hover:text-[#B5A642] transition-colors flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
                  title={
                    isPausedAtSentenceEnd && autoAdvanceEnabled && isCountingDown
                      ? isCountdownPaused
                        ? "Resume Timer (Space)"
                        : "Pause Timer (Space)"
                      : isPlaying
                      ? "Pause (Space)"
                      : "Play (Space)"
                  }
                >
                  {isPausedAtSentenceEnd && autoAdvanceEnabled && isCountingDown ? (
                    isCountdownPaused ? (
                      <>
                        <Play size={13} className="text-[#B5A642]" />
                        <span className="text-[#B5A642]">Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause size={13} className="text-[#B5A642]" />
                        <span className="text-[#B5A642]">Pause</span>
                      </>
                    )
                  ) : isPlaying ? (
                    <>
                      <Pause size={13} />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={13} />
                      <span>Play</span>
                    </>
                  )}
                </button>

                {/* Next Line */}
                <button
                  onClick={handleNextLine}
                  disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) >= transcript.length - 1}
                  className={`px-3 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer ${
                    isPausedAtSentenceEnd
                      ? "bg-[#B5A642] text-[#1F132A] border-[#B5A642] font-bold shadow-md"
                      : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642] disabled:opacity-30 disabled:cursor-not-allowed"
                  }`}
                  title="Next Line (→ / Enter)"
                >
                  <span>
                    Next
                    {isPausedAtSentenceEnd && autoAdvanceEnabled && isCountingDown && !isCountdownPaused
                      ? ` (${Math.ceil(countdownRemainingMs / 1000)}s)`
                      : ""}
                  </span>
                  <SkipForward size={13} />
                </button>

                <div className="h-4 w-[1px] bg-[#3A3A3A] mx-0.5 hidden sm:block" />

                {/* Step Mode Toggle */}
                <button
                  onClick={toggleAutoPause}
                  className={`px-2.5 py-1.5 rounded-sm border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                    autoPauseAtEnd
                      ? "bg-[#B5A642]/10 border-[#B5A642]/40 text-[#B5A642]"
                      : "bg-[#2E2E2E] border-[#3A3A3A] text-[#7A7A7A] hover:text-[#E9E1D4]"
                  }`}
                  title="Step Mode: Auto-pause after each sentence for shadowing (P)"
                >
                  <PauseCircle size={13} />
                  <span className="hidden sm:inline">Step Mode</span>
                  <span className="sm:hidden">Step</span>
                  {autoPauseAtEnd && <span className="w-1.5 h-1.5 rounded-full bg-[#B5A642]" />}
                </button>

                {/* Single Sentence Loop */}
                <button
                  onClick={() => setIsLooping((v) => !v)}
                  className={`px-2.5 py-1.5 rounded-sm border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isLooping
                      ? "bg-[#3B5998]/15 border-[#3B5998]/40 text-[#8BA2D0]"
                      : "bg-[#2E2E2E] border-[#3A3A3A] text-[#7A7A7A] hover:text-[#E9E1D4]"
                  }`}
                  title="Single Sentence Loop (L)"
                >
                  <Repeat size={13} className={isLooping ? "animate-spin" : ""} />
                  <span className="hidden sm:inline">Loop</span>
                  {isLooping && <span className="w-1.5 h-1.5 rounded-full bg-[#8BA2D0]" />}
                </button>
              </div>

              {/* Utility Tools & Video Size Bar Combined */}
              <div className="flex items-center gap-1.5">
                {/* Playback Speed */}
                <button
                  onClick={cycleSpeed}
                  className="px-2 py-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642]/50 text-xs font-mono text-[#E9E1D4] hover:text-[#B5A642] transition-colors flex items-center gap-1 cursor-pointer"
                  title={`Playback Speed: ${playbackRate}x (Click to cycle)`}
                >
                  <Gauge size={12} className="text-[#7A7A7A]" />
                  <span className="font-bold text-[11px]">{playbackRate}x</span>
                </button>

                {/* Blind Mode Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsBlindMode((prev) => !prev);
                    setPeekBlind(false);
                  }}
                  className={`px-2 py-1.5 rounded-sm border transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono ${
                    isBlindMode
                      ? "bg-[#8C2727]/15 text-[#E9E1D4] border-[#8C2727]/50 font-bold"
                      : "bg-[#2E2E2E] border-[#3A3A3A] text-[#7A7A7A] hover:text-[#E9E1D4] hover:border-[#B5A642]/40"
                  }`}
                  title="Blind Mode (Blurs transcript for ear training)"
                >
                  {isBlindMode ? <EyeOff size={12} className="text-[#8C2727]" /> : <Eye size={12} />}
                  <span className="hidden sm:inline">Blind</span>
                </button>

                <div className="h-4 w-[1px] bg-[#3A3A3A] mx-0.5 hidden md:block" />

                {/* Video Size Controller */}
                <div className="hidden md:inline-flex border border-[#3A3A3A] bg-[#2E2E2E] rounded-sm p-0.5">
                  {[
                    { id: "compact", label: "Compact", icon: <Minimize2 size={11} />, desc: "Narrow" },
                    { id: "normal", label: "Normal", icon: <Square size={11} />, desc: "Standard" },
                    { id: "wide", label: "Wide", icon: <Maximize2 size={11} />, desc: "Full width" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSetVideoSize(s.id as VideoSize)}
                      title={s.desc}
                      className={`px-1.5 py-0.5 text-[10px] font-mono flex items-center gap-1 rounded-xs transition-colors cursor-pointer ${
                        videoSize === s.id
                          ? "bg-[#B5A642] text-[#1F132A] font-bold"
                          : "text-[#E9E1D4]/60 hover:text-[#E9E1D4]"
                      }`}
                    >
                      {s.icon}
                      <span className="hidden lg:inline">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Shadowing Sentence Focus Card & Practice Center */}
          {transcript.length > 0 && currentSentence && (
            <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-4 sm:p-5 shadow-lg space-y-4 transition-all">
              {/* Header: Line Info & Actions */}
              <div className="flex items-center justify-between pb-3 border-b border-[#3A3A3A]/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#B5A642] flex items-center gap-1.5">
                    <Volume2
                      size={14}
                      className={activeIndex !== -1 && isPlaying ? "text-[#B5A642] animate-pulse" : "text-[#7A7A7A]"}
                    />
                    <span>Line {displayIndex + 1} of {transcript.length}</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#7A7A7A]">
                    ({formatTime(currentSentence.offset)} - {formatTime(currentSentence.offset + (currentSentence.duration || 0))})
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
                      <span>{peekBlind ? "Hide" : "Peek"}</span>
                    </button>
                  )}

                  {/* Voice Test / Accent Comparison Toggle */}
                  <button
                    onClick={() => setShowVoiceComparison((v) => !v)}
                    className={`px-2.5 py-1 rounded-sm border text-[11px] font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                      showVoiceComparison
                        ? "bg-[#B5A642]/20 border-[#B5A642] text-[#B5A642] font-bold"
                        : "bg-[#2E2E2E] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#B5A642] hover:border-[#B5A642]/50"
                    }`}
                    title="Record voice and compare accent (Before vs After)"
                  >
                    <Mic size={12} className={showVoiceComparison ? "text-[#B5A642]" : "text-[#7A7A7A]"} />
                    <span>{showVoiceComparison ? "Hide Voice Test" : "Voice Test"}</span>
                  </button>

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

              {/* Large Typography English Sentence (The Hero) */}
              <div
                key={displayIndex}
                className={`py-1 min-h-[44px] flex flex-col justify-center transition-all duration-300 ${
                  isBlindMode && !peekBlind
                    ? "filter blur-md select-none opacity-40 hover:filter-none hover:opacity-100"
                    : ""
                }`}
              >
                <p className="text-lg sm:text-2xl text-[#E9E1D4] leading-relaxed font-mono select-text tracking-wide">
                  {currentSentence.text.split(" ").map((word, wIdx) => (
                    <WordWithMeaning
                      key={wIdx}
                      word={word}
                      contextSentence={currentSentence.text}
                      lessonId={id}
                    />
                  ))}
                </p>

                {/* Inline Translation if open */}
                {showTranslation && sentenceTranslation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-xs sm:text-sm text-[#B5A642] font-mono leading-relaxed bg-[#2E2E2E]/40 border-l-2 border-[#B5A642] px-3 py-1.5 rounded-xs"
                  >
                    <span className="text-[10px] uppercase text-[#7A7A7A] block">မြန်မာဘာသာပြန်:</span>
                    <span>{sentenceTranslation}</span>
                  </motion.div>
                )}
              </div>

              {/* DEDICATED SHADOWING PRACTICE CONSOLE */}
              <div className="bg-[#2E2E2E] border border-[#3A3A3A] rounded-sm p-3 sm:p-3.5 space-y-3 shadow-inner">
                {/* Status Bar & Timer Preset Chips */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  {/* Left: Window Status */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isPausedAtSentenceEnd
                          ? isCountdownPaused
                            ? "bg-[#B5A642]/60"
                            : "bg-[#B5A642] animate-pulse"
                          : isPlaying
                          ? "bg-[#42946E] animate-pulse"
                          : "bg-[#7A7A7A]"
                      }`}
                    />
                    <span className="font-bold text-[#B5A642]">
                      {isPausedAtSentenceEnd
                        ? isCountdownPaused
                          ? "Timer Paused"
                          : autoAdvanceEnabled
                          ? `Shadowing (${(countdownRemainingMs / 1000).toFixed(1)}s)`
                          : "Shadowing Window"
                        : isPlaying
                        ? "Native Speaker Speaking..."
                        : "Ready to Practice"}
                    </span>
                    <span className="text-[#E9E1D4]/60 text-[11px] hidden sm:inline">
                      {isPausedAtSentenceEnd
                        ? isCountdownPaused
                          ? "Take your time! Space to resume, Enter for next."
                          : "Speak the sentence aloud now!"
                        : ""}
                    </span>
                  </div>

                  {/* Right: Quick Timer Presets (3s | 5s | 7s | Manual) */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#7A7A7A] uppercase hidden sm:inline">Timer:</span>
                    <div className="inline-flex border border-[#3A3A3A] bg-[#1F132A] rounded-xs p-0.5">
                      {[3, 5, 7].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => {
                            setAutoAdvanceEnabled(true);
                            setAutoAdvanceSeconds(sec);
                            try {
                              localStorage.setItem("shadowing_auto_advance_enabled", "true");
                              localStorage.setItem("shadowing_auto_advance_seconds", JSON.stringify(sec));
                            } catch {}
                          }}
                          className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-xs transition-colors cursor-pointer ${
                            autoAdvanceEnabled && autoAdvanceSeconds === sec
                              ? "bg-[#B5A642] text-[#1F132A]"
                              : "text-[#E9E1D4]/60 hover:text-[#E9E1D4]"
                          }`}
                          title={`Auto-advance after ${sec} seconds`}
                        >
                          {sec}s
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setAutoAdvanceEnabled(false);
                          try {
                            localStorage.setItem("shadowing_auto_advance_enabled", "false");
                          } catch {}
                        }}
                        className={`px-2 py-0.5 text-[10px] font-mono rounded-xs transition-colors cursor-pointer ${
                          !autoAdvanceEnabled
                            ? "bg-[#B5A642] text-[#1F132A] font-bold"
                            : "text-[#E9E1D4]/60 hover:text-[#E9E1D4]"
                        }`}
                        title="Manual mode (Wait until Next is clicked)"
                      >
                        Manual
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar (Clickable to Pause/Resume) */}
                {isPausedAtSentenceEnd && autoAdvanceEnabled && (
                  <div
                    onClick={() => setIsCountdownPaused((v) => !v)}
                    title={isCountdownPaused ? "Click to resume countdown (Space)" : "Click to pause countdown (Space)"}
                    className="w-full h-2.5 bg-[#1F132A] border border-[#3A3A3A] rounded-full overflow-hidden cursor-pointer relative"
                  >
                    <div
                      className={`h-full transition-all duration-75 ease-linear ${
                        isCountdownPaused ? "bg-[#B5A642]/50" : "bg-[#B5A642]"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            0,
                            ((autoAdvanceSeconds * 1000 - countdownRemainingMs) /
                              (autoAdvanceSeconds * 1000)) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                )}

                {/* Primary Shadowing Action Buttons (Replay, Pause/Resume Timer, Next Line) */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#3A3A3A]/40">
                  {/* Left: Replay Button */}
                  <button
                    onClick={handleReplayCurrent}
                    disabled={transcript.length === 0}
                    className="px-3.5 py-2 rounded-sm bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] hover:text-[#B5A642] transition-colors flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
                    title="Listen to this sentence again (R)"
                  >
                    <RotateCcw size={13} />
                    <span>Replay (R)</span>
                  </button>

                  {/* Center: Pause / Resume Timer Button (if timer mode) */}
                  {isPausedAtSentenceEnd && autoAdvanceEnabled && isCountingDown ? (
                    <button
                      type="button"
                      onClick={() => setIsCountdownPaused((v) => !v)}
                      className={`px-3 py-1.5 rounded-sm border text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCountdownPaused
                          ? "bg-[#B5A642] text-[#1F132A] border-[#B5A642] shadow-sm animate-pulse"
                          : "bg-[#1F132A] border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4]"
                      }`}
                      title="Pause or Resume the countdown timer (Space)"
                    >
                      {isCountdownPaused ? <Play size={12} className="fill-[#1F132A]" /> : <Pause size={12} />}
                      <span>
                        {isCountdownPaused
                          ? `Resume (${(countdownRemainingMs / 1000).toFixed(1)}s)`
                          : `Pause Timer (${(countdownRemainingMs / 1000).toFixed(1)}s)`}
                      </span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-[#7A7A7A] hidden md:inline">
                      Press <kbd className="bg-[#1F132A] border border-[#3A3A3A] px-1 text-[#B5A642]">Enter</kbd> to advance
                    </span>
                  )}

                  {/* Right: Next Line CTA */}
                  <button
                    onClick={handleNextLine}
                    disabled={(activeIndex !== -1 ? activeIndex : focusedIndex) >= transcript.length - 1}
                    className={`px-4 py-2 rounded-sm border transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer shadow-md ${
                      isPausedAtSentenceEnd
                        ? "bg-[#B5A642] text-[#1F132A] border-[#B5A642] hover:bg-[#B5A642]/90"
                        : "bg-[#1F132A] border-[#3A3A3A] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642] disabled:opacity-30 disabled:cursor-not-allowed"
                    }`}
                    title="Next Sentence (Enter / →)"
                  >
                    <span>
                      Next Sentence
                      {isPausedAtSentenceEnd && autoAdvanceEnabled && isCountingDown && !isCountdownPaused
                        ? ` (${Math.ceil(countdownRemainingMs / 1000)}s)`
                        : ""}
                    </span>
                    <SkipForward size={14} />
                  </button>
                </div>
              </div>

              {/* Local A/B Voice Comparison Widget - Only shown on demand when user clicks "Voice Test" */}
              <AnimatePresence>
                {showVoiceComparison && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <AudioComparison
                      sentenceText={currentSentence.text}
                      lessonId={id}
                      sentenceIndex={displayIndex}
                      onPlayNative={() => handleSeek(currentSentence.offset, displayIndex)}
                      onMasteredToggle={() => toggleMastered(displayIndex)}
                      isMastered={masteredIndices.has(displayIndex)}
                      onClose={() => setShowVoiceComparison(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
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
