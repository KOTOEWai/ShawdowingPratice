import { TranscriptItem, WaitMode, SentenceTiming } from "../types";

/**
 * Calculates the wait duration (in ms) given a sentence duration and the selected Wait Mode.
 *
 * Formula:
 * - Off: 0ms (no auto-pause, continuous playback)
 * - +30%: sentenceDuration * 0.3 (rounded to nearest integer)
 * - +50%: sentenceDuration * 0.5 (rounded to nearest integer)
 * - Manual: Infinity (pauses indefinitely, awaits user trigger)
 */
export function calculateWaitDuration(sentenceDurationMs: number, waitMode: WaitMode): number {
  if (sentenceDurationMs < 0) return 0;

  switch (waitMode) {
    case "off":
      return 0;
    case "30%":
      return Math.round(sentenceDurationMs * 0.3);
    case "50%":
      return Math.round(sentenceDurationMs * 0.5);
    case "manual":
      return Infinity;
    default:
      return 0;
  }
}

/**
 * Computes exact start, end, and duration timings for a sentence in the transcript.
 * Caches boundary cushions to prevent audio overlap with adjacent sentences.
 */
export function getSentenceTiming(items: TranscriptItem[], index: number): SentenceTiming | null {
  if (!items || index < 0 || index >= items.length) {
    return null;
  }

  const currentItem = items[index];
  const startMs = Math.max(0, currentItem.offset);
  const rawDuration = currentItem.duration && currentItem.duration > 0 ? currentItem.duration : 3000;
  let endMs = currentItem.offset + rawDuration + 100;

  const nextItem = items[index + 1];
  if (nextItem && nextItem.offset > currentItem.offset) {
    endMs = Math.min(endMs, nextItem.offset - 50);
  }

  if (endMs <= startMs) {
    endMs = startMs + Math.max(500, rawDuration);
  }

  const durationMs = Math.max(300, endMs - startMs);

  return {
    startMs,
    endMs,
    durationMs,
  };
}

/**
 * Calculates the effective virtual timestamp for transcript synchronization.
 *
 * NOTE: This adjusts ONLY the subtitle lookup position and NEVER touches
 * the actual video playback position.
 */
export function calculateEffectiveTime(videoMs: number, subtitleOffsetMs: number): number {
  return Math.max(0, videoMs + subtitleOffsetMs);
}

/**
 * Detects whether an active keyboard event target is an interactive text input
 * to prevent shortcuts (Space, Enter, R, L, Left, Right) from hijacking typing.
 */
export function isInputField(target: EventTarget | null): boolean {
  if (!target) {
    return false;
  }

  // Safe check across browser, SSR, and test environments
  if (typeof HTMLElement !== "undefined" && !(target instanceof HTMLElement)) {
    return false;
  }

  const el = target as { tagName?: string; isContentEditable?: boolean };
  const tagName = (el.tagName || "").toLowerCase();
  const isInput = tagName === "input" || tagName === "textarea" || tagName === "select";
  const isContentEditable = Boolean(el.isContentEditable);

  return isInput || isContentEditable;
}

/**
 * Formats subtitle offset into a human-readable display string (e.g. "+200ms", "-100ms", "0ms").
 */
export function formatOffsetDisplay(offsetMs: number): string {
  if (offsetMs === 0) return "0ms";
  if (offsetMs > 0) return `+${offsetMs}ms`;
  return `${offsetMs}ms`;
}
