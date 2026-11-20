import { TranscriptItem } from "../types";

/**
 * Strips non-speech tags such as [Music], [Applause], [Laughter], [Cheering], ♪,
 * and filters out any lines that contain only sound markers.
 */
export function cleanTranscriptItems(items: TranscriptItem[]): TranscriptItem[] {
  if (!Array.isArray(items)) return [];

  // Match bracketed sound markers: [Music], [applause], [upbeat music], (laughter), ♪, etc.
  const soundRegex =
    /\[[^\]]*(?:music|applause|laughter|cheer|sing|sound|audio|noise|beat|tune|guitar|piano|drum|sigh|cough|groan|scream|snicker|gasp|chuckle|bell|giggle|whisper|snort|silence|intro|outro)[^\]]*\]|\([^\)]*(?:music|applause|laughter|cheer|sound)[^\)]*\)|[♪♫♩♬]+/gi;
  // Any line completely enclosed in brackets or parentheses (e.g. "[Music]", "(Applause)", "[Inaudible]")
  const bracketOnlyRegex = /^(\[.*\]|\(.*\))$/;

  return items
    .map((item) => {
      const cleaned = String(item.text || "")
        .replace(soundRegex, "")
        .replace(/\s+/g, " ")
        .trim();
      return {
        ...item,
        text: cleaned,
      };
    })
    .filter((item) => {
      if (!item.text || item.text.length === 0) return false;
      if (bracketOnlyRegex.test(item.text)) return false;
      // Strip any line that only contains punctuation or musical notes
      if (/^[\s.,\/#!$%\^&\*;:{}=\-_`~()♪♫♩♬[\]]+$/.test(item.text)) return false;
      return true;
    });
}

/**
 * Accurately finds the current transcript line based on video playback time (in ms).
 * 1. 120ms anticipation buffer catches initial consonant/voice onset.
 * 2. Overlap resolver picks the latest line that has started.
 * 3. Bridges short breath pauses (< 700ms) to prevent UI flickering between words.
 * 4. Clears active highlight during long silence/music (> 1000ms).
 */
export function findActiveTranscriptIndex(items: TranscriptItem[], currentMs: number): number {
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
