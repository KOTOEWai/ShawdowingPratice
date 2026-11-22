/**
 * Utility for exporting and merging practice audio recordings.
 * Encodes decoded Web Audio API AudioBuffers into standard 16-bit PCM WAV blobs.
 */

/**
 * Downloads a data URL (e.g. base64 audio/webm, audio/mp4, or audio/wav)
 */
export function downloadAudioDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Converts an AudioBuffer into a WAV binary Blob (16-bit PCM, RIFF container)
 */
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const length = buffer.length * blockAlign;
  const headerLength = 44;
  const outBuffer = new ArrayBuffer(headerLength + length);
  const view = new DataView(outBuffer);

  // RIFF identifier
  writeString(view, 0, "RIFF");
  // RIFF chunk length
  view.setUint32(4, 36 + length, true);
  // RIFF type
  writeString(view, 8, "WAVE");
  // format chunk identifier
  writeString(view, 12, "fmt ");
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw PCM)
  view.setUint16(20, format, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * blockAlign, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, blockAlign, true);
  // bits per sample
  view.setUint16(34, bitDepth, true);
  // data chunk identifier
  writeString(view, 36, "data");
  // data chunk length
  view.setUint32(40, length, true);

  // Write interleaved PCM audio data
  let offset = 44;
  const channels = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  for (let i = 0; i < buffer.length; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      // Convert float [-1.0, 1.0] to 16-bit signed integer [-32768, 32767]
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Collects all recorded sentence attempts for a lesson, stitches them seamlessly
 * with a 0.5s pause between sentences, and downloads a single combined .wav file.
 */
export async function exportLessonPracticeAudio(
  lessonId: string,
  totalSentences: number,
  lessonTitle = "lesson"
): Promise<{ success: boolean; count: number; error?: string }> {
  if (typeof window === "undefined") {
    return { success: false, count: 0, error: "Not in browser environment" };
  }

  // 1. Gather all recorded base64 data URLs for this lesson from localStorage
  const recordings: { index: number; dataUrl: string }[] = [];

  for (let i = 0; i < totalSentences; i++) {
    const latestKey = `shadowing_latest_${lessonId}_${i}`;
    const beforeKey = `shadowing_before_${lessonId}_${i}`;
    const dataUrl = localStorage.getItem(latestKey) || localStorage.getItem(beforeKey);

    if (dataUrl) {
      recordings.push({ index: i, dataUrl });
    }
  }

  // Fallback: search any matching keys in localStorage in case indices were sparse
  if (recordings.length === 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`shadowing_latest_${lessonId}_`)) {
        const val = localStorage.getItem(key);
        if (val) {
          const idx = parseInt(key.split("_").pop() || "0", 10);
          if (!recordings.some((r) => r.index === idx)) {
            recordings.push({ index: idx, dataUrl: val });
          }
        }
      }
    }
    recordings.sort((a, b) => a.index - b.index);
  }

  if (recordings.length === 0) {
    return {
      success: false,
      count: 0,
      error: "No practice recordings found for this lesson yet. Record your voice using the 'Voice Test' button on any sentence first!",
    };
  }

  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioCtx = new AudioContextClass();

    // 2. Decode each base64 audio data URL into an AudioBuffer
    const audioBuffers: AudioBuffer[] = [];

    for (const rec of recordings) {
      try {
        const res = await fetch(rec.dataUrl);
        const arrayBuf = await res.arrayBuffer();
        const decoded = await audioCtx.decodeAudioData(arrayBuf);
        audioBuffers.push(decoded);
      } catch (decodeErr) {
        console.warn(`Could not decode audio for sentence ${rec.index}:`, decodeErr);
      }
    }

    if (audioBuffers.length === 0) {
      audioCtx.close().catch(() => {});
      return { success: false, count: 0, error: "Failed to decode practice audio files." };
    }

    // 3. Calculate total length with a 0.5-second silence gap between each sentence
    const sampleRate = audioBuffers[0].sampleRate;
    const gapSamples = Math.floor(sampleRate * 0.5); // 0.5s pause
    const totalSamples =
      audioBuffers.reduce((sum, b) => sum + b.length, 0) + (audioBuffers.length - 1) * gapSamples;

    // 4. Merge buffers into a single combined AudioBuffer
    const combinedBuffer = audioCtx.createBuffer(1, totalSamples, sampleRate);
    const combinedData = combinedBuffer.getChannelData(0);

    let writeOffset = 0;
    for (let bIdx = 0; bIdx < audioBuffers.length; bIdx++) {
      const buf = audioBuffers[bIdx];
      const channel = buf.getChannelData(0);

      combinedData.set(channel, writeOffset);
      writeOffset += channel.length;

      // Add silence gap between sentences
      if (bIdx < audioBuffers.length - 1) {
        writeOffset += gapSamples;
      }
    }

    // 5. Convert to WAV Blob and trigger download
    const wavBlob = audioBufferToWav(combinedBuffer);
    const downloadUrl = URL.createObjectURL(wavBlob);

    const safeTitle = lessonTitle.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const filename = `Shadowing_${safeTitle}_${audioBuffers.length}_sentences.wav`;

    downloadAudioDataUrl(downloadUrl, filename);

    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
      audioCtx.close().catch(() => {});
    }, 2000);

    return { success: true, count: audioBuffers.length };
  } catch (err: any) {
    console.error("Audio export error:", err);
    return { success: false, count: 0, error: err?.message || "Error generating combined audio." };
  }
}
