"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { TranscriptItem, WaitMode, PlaybackState } from "../types";
import {
  calculateWaitDuration,
  getSentenceTiming,
  calculateEffectiveTime,
} from "../engine/waitModeEngine";

export interface UseShadowingEngineProps {
  transcript: TranscriptItem[];
  playerRef: React.RefObject<any>;
  onActiveIndexChange?: (newIndex: number) => void;
  onLessonComplete?: (reason: "mastery" | "playthrough" | "manual") => void;
  initialWaitMode?: WaitMode;
}

export function useShadowingEngine({
  transcript,
  playerRef,
  onActiveIndexChange,
  onLessonComplete,
  initialWaitMode = "30%",
}: UseShadowingEngineProps) {
  // Playback state
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");
  const playbackStateRef = useRef<PlaybackState>("idle");
  playbackStateRef.current = playbackState;

  // Wait Mode: 'off' | '30%' | '50%' | 'manual'
  const [waitMode, setWaitModeState] = useState<WaitMode>(initialWaitMode);
  const waitModeRef = useRef<WaitMode>(initialWaitMode);
  waitModeRef.current = waitMode;

  // Single Sentence Loop
  const [isLooping, setIsLoopingState] = useState<boolean>(false);
  const isLoopingRef = useRef<boolean>(false);
  isLoopingRef.current = isLooping;

  // Subtitle offset (in ms) - modifies transcript sync timing ONLY
  const [subtitleOffsetMs, setSubtitleOffsetMs] = useState<number>(0);
  const subtitleOffsetMsRef = useRef<number>(0);
  subtitleOffsetMsRef.current = subtitleOffsetMs;

  // Active Sentence Index
  const [activeIndex, setActiveIndexState] = useState<number>(-1);
  const activeIndexRef = useRef<number>(-1);
  activeIndexRef.current = activeIndex;

  // Wait Mode progress indicator states (for smooth visual countdown)
  const [waitDurationMs, setWaitDurationMs] = useState<number>(0);
  const [waitRemainingMs, setWaitRemainingMs] = useState<number>(0);

  // References for timers
  const waitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sentenceEndHandledIndexRef = useRef<number | null>(null);

  /**
   * Synchronously cancels all active wait timers and intervals.
   * Prevents timer leaks, ghost transitions, and race conditions during rapid clicks.
   */
  const cancelWaitTimers = useCallback(() => {
    if (waitTimerRef.current) {
      clearTimeout(waitTimerRef.current);
      waitTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setWaitRemainingMs(0);
    setWaitDurationMs(0);
  }, []);

  // Update active index and notify parent
  const setActiveIndex = useCallback(
    (index: number) => {
      activeIndexRef.current = index;
      setActiveIndexState(index);
      if (onActiveIndexChange) {
        onActiveIndexChange(index);
      }
    },
    [onActiveIndexChange]
  );

  /**
   * Seek video to a specific sentence index and resume playback.
   */
  const seekToSentence = useCallback(
    (targetIndex: number) => {
      cancelWaitTimers();
      sentenceEndHandledIndexRef.current = null;

      if (!transcript || targetIndex < 0 || targetIndex >= transcript.length) {
        return;
      }

      const item = transcript[targetIndex];
      const targetSec = Math.max(0, (item.offset - 150) / 1000);

      const player = playerRef.current;
      if (player) {
        if (typeof player.currentTime === "function") {
          player.currentTime(targetSec);
        }
        if (typeof player.play === "function") {
          player.play();
        }
      }

      setActiveIndex(targetIndex);
      setPlaybackState(isLoopingRef.current ? "looping" : "playing");
    },
    [transcript, playerRef, cancelWaitTimers, setActiveIndex]
  );

  /**
   * Replay current sentence from the beginning.
   */
  const handleReplayCurrent = useCallback(() => {
    if (transcript.length === 0) return;
    const baseIdx = activeIndexRef.current >= 0 ? activeIndexRef.current : 0;
    seekToSentence(baseIdx);
  }, [transcript.length, seekToSentence]);

  /**
   * Advance to the next sentence.
   */
  const handleNextLine = useCallback(() => {
    if (transcript.length === 0) return;
    const baseIdx = activeIndexRef.current >= 0 ? activeIndexRef.current : 0;
    const targetIdx = Math.min(transcript.length - 1, baseIdx + 1);
    seekToSentence(targetIdx);
  }, [transcript.length, seekToSentence]);

  /**
   * Jump to the previous sentence.
   */
  const handlePrevLine = useCallback(() => {
    if (transcript.length === 0) return;
    const baseIdx = activeIndexRef.current >= 0 ? activeIndexRef.current : 0;
    const targetIdx = Math.max(0, baseIdx - 1);
    seekToSentence(targetIdx);
  }, [transcript.length, seekToSentence]);

  /**
   * Toggle single sentence loop.
   */
  const toggleLoop = useCallback(() => {
    setIsLoopingState((prev) => {
      const next = !prev;
      isLoopingRef.current = next;
      if (playbackStateRef.current === "playing" && next) {
        setPlaybackState("looping");
      } else if (playbackStateRef.current === "looping" && !next) {
        setPlaybackState("playing");
      }
      return next;
    });
  }, []);

  /**
   * Toggle Play / Pause.
   * If currently in waiting or manual-paused state, Spacebar acts as "Advance Now".
   */
  const togglePlayPause = useCallback(() => {
    const currentState = playbackStateRef.current;

    // If waiting or manual-paused, user pressing play/space means advance immediately!
    if (currentState === "waiting" || currentState === "manual-paused") {
      handleNextLine();
      return;
    }

    const player = playerRef.current;
    if (!player) return;

    if (typeof player.paused === "function" && player.paused()) {
      player.play();
      setPlaybackState(isLoopingRef.current ? "looping" : "playing");
    } else if (typeof player.pause === "function") {
      player.pause();
      setPlaybackState("idle");
    }
  }, [playerRef, handleNextLine]);

  /**
   * Sets Wait Mode with smooth state transition.
   */
  const setWaitMode = useCallback(
    (newMode: WaitMode) => {
      cancelWaitTimers();
      setWaitModeState(newMode);
      waitModeRef.current = newMode;

      // If switched to 'off' while waiting/paused, resume video
      if (newMode === "off") {
        if (playbackStateRef.current === "waiting" || playbackStateRef.current === "manual-paused") {
          const player = playerRef.current;
          if (player && typeof player.play === "function") {
            player.play();
          }
          setPlaybackState("playing");
        }
      }
    },
    [cancelWaitTimers, playerRef]
  );

  /**
   * Adjust subtitle offset in milliseconds (typically ±100ms).
   */
  const adjustSubtitleOffset = useCallback((deltaMs: number) => {
    setSubtitleOffsetMs((prev) => prev + deltaMs);
  }, []);

  const resetSubtitleOffset = useCallback(() => {
    setSubtitleOffsetMs(0);
  }, []);

  /**
   * Evaluates sentence boundaries during video playback (timeupdate).
   * Called by the player event listener with raw video currentTime in ms.
   */
  const evaluatePlaybackPosition = useCallback(
    (videoCurrentMs: number) => {
      if (transcript.length === 0) return;

      const player = playerRef.current;
      if (!player) return;

      // Check if player is paused by user
      const isPaused = typeof player.paused === "function" ? player.paused() : false;
      if (isPaused && playbackStateRef.current === "idle") {
        return;
      }

      const curIdx = activeIndexRef.current;
      if (curIdx < 0 || curIdx >= transcript.length) return;

      // Single Sentence Loop Handler
      if (isLoopingRef.current) {
        const timing = getSentenceTiming(transcript, curIdx);
        if (timing && videoCurrentMs >= timing.endMs) {
          seekToSentence(curIdx);
          return;
        }
      }

      const currentWaitMode = waitModeRef.current;

      // In 'off' mode: continuous playback without pausing at sentence end
      if (currentWaitMode === "off") {
        if (playbackStateRef.current !== "playing" && !isLoopingRef.current) {
          setPlaybackState("playing");
        }
        return;
      }

      // Percentage or Manual Wait Modes: Check if sentence finished
      const timing = getSentenceTiming(transcript, curIdx);
      if (!timing) return;

      if (videoCurrentMs >= timing.endMs) {
        // Prevent duplicate trigger for the same sentence
        if (sentenceEndHandledIndexRef.current === curIdx) {
          return;
        }
        sentenceEndHandledIndexRef.current = curIdx;

        // Auto-pause video at sentence end
        player.pause();

        if (currentWaitMode === "manual") {
          cancelWaitTimers();
          setPlaybackState("manual-paused");
          return;
        }

        // Percentage-based Wait Mode (+30% or +50%)
        const calculatedWaitMs = calculateWaitDuration(timing.durationMs, currentWaitMode);
        cancelWaitTimers();

        setWaitDurationMs(calculatedWaitMs);
        setWaitRemainingMs(calculatedWaitMs);
        setPlaybackState("waiting");

        const startTime = Date.now();
        const endTime = startTime + calculatedWaitMs;

        // Countdown interval for smooth UI visual feedback
        countdownIntervalRef.current = setInterval(() => {
          const remaining = Math.max(0, endTime - Date.now());
          setWaitRemainingMs(remaining);
          if (remaining <= 0 && countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }
        }, 50);

        // Auto-advance timer
        waitTimerRef.current = setTimeout(() => {
          cancelWaitTimers();
          if (curIdx < transcript.length - 1) {
            seekToSentence(curIdx + 1);
          } else {
            setPlaybackState("ended");
            if (onLessonComplete) {
              onLessonComplete("playthrough");
            }
          }
        }, calculatedWaitMs);
      }
    },
    [transcript, playerRef, seekToSentence, cancelWaitTimers, onLessonComplete]
  );

  // Clean up timers on component unmount
  useEffect(() => {
    return () => {
      cancelWaitTimers();
    };
  }, [cancelWaitTimers]);

  // Handle browser tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause active countdown timer if user leaves tab to prevent background skip
        if (playbackStateRef.current === "waiting") {
          cancelWaitTimers();
          setPlaybackState("manual-paused");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [cancelWaitTimers]);

  return {
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
  };
}
