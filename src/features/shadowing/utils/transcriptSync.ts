import { TranscriptItem } from "../types";

/**
 * Strips non-speech tags such as [Music], [Applause], [Laughter], [Cheering], ♪,
 * and filters out any lines that contain only sound markers.
 */
export function cleanTranscriptItems(items: TranscriptItem[]): TranscriptItem[] {
  if (!Array.isArray(items)) return [];

  const soundRegex =
    /\[[^\]]*(?:music|applause|laughter|cheer|sing|sound|audio|noise|beat|tune|guitar|piano|drum|sigh|cough|groan|scream|snicker|gasp|chuckle|bell|giggle|whisper|snort|silence|intro|outro)[^\]]*\]|\([^\)]*(?:music|applause|laughter|cheer|sound)[^\)]*\)|[♪♫♩♬]+/gi;
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
      if (/^[\s.,\/#!$%\^&\*;:{}=\-_`~()♪♫♩♬[\]]+$/.test(item.text)) return false;
      return true;
    });
}

/**
 * Accurately finds the current transcript line based on video playback time (in ms).
 * A sentence strictly starts at its offset and does not yield to the next line
 * until the next line's exact offset is reached.
 */
export function findActiveTranscriptIndex(items: TranscriptItem[], currentMs: number): number {
  if (!items || items.length === 0) return -1;
  if (currentMs < items[0].offset - 50) return -1;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const duration = item.duration && item.duration > 0 ? item.duration : 3000;
    const nextItem = items[i + 1];

    // Current sentence starts at its offset (-30ms tolerance)
    const start = item.offset - 30;
    // Current sentence ends either when the next sentence starts, or at its duration
    const end =
      nextItem && nextItem.offset > item.offset
        ? nextItem.offset - 10
        : item.offset + duration + 100;

    if (currentMs >= start && currentMs < end) {
      return i;
    }
  }

  // Trailing check for the last sentence in transcript
  const lastIdx = items.length - 1;
  const lastItem = items[lastIdx];
  if (lastItem) {
    const lastDur = lastItem.duration && lastItem.duration > 0 ? lastItem.duration : 3000;
    if (currentMs >= lastItem.offset - 30 && currentMs <= lastItem.offset + lastDur + 500) {
      return lastIdx;
    }
  }

  return -1;
}
