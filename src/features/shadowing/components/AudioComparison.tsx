"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, RotateCcw, Volume2 } from "lucide-react";

interface AttemptMeta {
  beforeDate: string;
  latestDate: string;
  totalAttempts: number;
  recognizedText?: string;
  speechScore?: number;
}

interface AudioComparisonProps {
  sentenceText: string;
  lessonId?: string;
  sentenceIndex?: number;
  onPlayNative: () => void;
  onMasteredToggle?: () => void;
  isMastered?: boolean;
  onClose?: () => void;
}

export default function AudioComparison({
  sentenceText,
  lessonId = "default",
  sentenceIndex = 0,
  onPlayNative,
  onMasteredToggle,
  isMastered,
  onClose,
}: AudioComparisonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  // Before & After audio states
  const [beforeAudioUrl, setBeforeAudioUrl] = useState<string | null>(null);
  const [latestAudioUrl, setLatestAudioUrl] = useState<string | null>(null);
  const [attemptMeta, setAttemptMeta] = useState<AttemptMeta | null>(null);

  // Pronunciation Accuracy & Speech-to-Text
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Playback states
  const [activePlaying, setActivePlaying] = useState<"before" | "latest" | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const activeAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time Waveform Visualizer Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const beforeStorageKey = `shadowing_before_${lessonId}_${sentenceIndex}`;
  const latestStorageKey = `shadowing_latest_${lessonId}_${sentenceIndex}`;
  const metaStorageKey = `shadowing_meta_${lessonId}_${sentenceIndex}`;

  // Load existing Before & After attempts on mount or when sentence changes
  useEffect(() => {
    if (activeAudioPlayerRef.current) {
      activeAudioPlayerRef.current.pause();
      activeAudioPlayerRef.current = null;
    }
    setActivePlaying(null);
    setIsRecording(false);
    setRecordSeconds(0);
    setSpeechScore(null);
    setRecognizedText(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }

    // Load from localStorage
    try {
      const storedBefore = localStorage.getItem(beforeStorageKey);
      const storedLatest = localStorage.getItem(latestStorageKey);
      const storedMeta = localStorage.getItem(metaStorageKey);

      setBeforeAudioUrl(storedBefore);
      setLatestAudioUrl(storedLatest);
      if (storedMeta) {
        try {
          const parsed: AttemptMeta = JSON.parse(storedMeta);
          setAttemptMeta(parsed);
          if (parsed.recognizedText) setRecognizedText(parsed.recognizedText);
          if (parsed.speechScore !== undefined) setSpeechScore(parsed.speechScore);
        } catch {
          setAttemptMeta(null);
        }
      } else {
        setAttemptMeta(null);
      }
    } catch {
      setBeforeAudioUrl(null);
      setLatestAudioUrl(null);
      setAttemptMeta(null);
    }
  }, [lessonId, sentenceIndex, sentenceText, beforeStorageKey, latestStorageKey, metaStorageKey]);

  const calculateSimilarity = (original: string, spoken: string): number => {
    const clean = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
    const origWords = clean(original);
    const spokenWords = clean(spoken);
    if (origWords.length === 0) return 100;
    if (spokenWords.length === 0) return 0;

    let matches = 0;
    const spokenCopy = [...spokenWords];
    for (const word of origWords) {
      const idx = spokenCopy.indexOf(word);
      if (idx !== -1) {
        matches++;
        spokenCopy.splice(idx, 1);
      }
    }
    return Math.min(100, Math.round((matches / origWords.length) * 100));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      // Cross-browser MIME detection for iOS / Safari / Chrome compatibility
      let mimeType = "";
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        } else if (MediaRecorder.isTypeSupported("audio/aac")) {
          mimeType = "audio/aac";
        }
      }

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      // Initialize Web Speech Recognition API if supported (Chrome, Edge, Safari, iOS)
      const SpeechRecClass =
        typeof window !== "undefined"
          ? (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
            (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition
          : null;

      if (SpeechRecClass) {
        try {
          const rec = new SpeechRecClass();
          rec.lang = "en-US";
          rec.continuous = true;
          rec.interimResults = false;
          let transcriptBuffer = "";

          rec.onresult = (e: any) => {
            for (let i = e.resultIndex; i < e.results.length; ++i) {
              if (e.results[i].isFinal) {
                transcriptBuffer += " " + e.results[i][0].transcript;
              }
            }
            if (transcriptBuffer.trim()) {
              const heard = transcriptBuffer.trim();
              setRecognizedText(heard);
              const score = calculateSimilarity(sentenceText, heard);
              setSpeechScore(score);

              try {
                const storedMeta = localStorage.getItem(metaStorageKey);
                const meta = storedMeta ? JSON.parse(storedMeta) : {};
                meta.recognizedText = heard;
                meta.speechScore = score;
                localStorage.setItem(metaStorageKey, JSON.stringify(meta));
              } catch {}
            }
          };
          rec.onerror = () => {};
          rec.start();
          recognitionRef.current = rec;
        } catch (e) {
          console.warn("Speech recognition init skipped:", e);
        }
      }

      // Initialize Web Audio API for Real-time Waveform
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawWaveform = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        animFrameRef.current = requestAnimationFrame(drawWaveform);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const val = dataArray[i];
          const barHeight = Math.max(3, (val / 255) * canvas.height);

          // 90s Grunge dirty yellow & muted red waveform
          ctx.fillStyle = val > 140 ? "#B5A642" : "#8C2727";
          ctx.fillRect(x, canvas.height - barHeight, Math.max(2, barWidth - 1), barHeight);

          x += barWidth;
        }
      };

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || "audio/webm" });

        // Convert blob to base64 Data URL for persistent storage
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          saveRecordingAttempt(base64Audio);
        };
        reader.readAsDataURL(audioBlob);

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (audioCtxRef.current) {
          audioCtxRef.current.close().catch(() => {});
          audioCtxRef.current = null;
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordSeconds(0);
      drawWaveform();

      timerRef.current = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      alert("Microphone permission is required to record your accent comparison.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // Save new recording as Before (if first time) or After (if subsequent)
  const saveRecordingAttempt = (audioBase64: string) => {
    const nowIso = new Date().toISOString();
    let currentBefore = beforeAudioUrl;
    let newAttempts = 1;

    if (!currentBefore) {
      // First attempt ever: becomes Baseline (Before) and also Latest (After)
      currentBefore = audioBase64;
      setBeforeAudioUrl(audioBase64);
      setLatestAudioUrl(audioBase64);
      const meta: AttemptMeta = {
        beforeDate: nowIso,
        latestDate: nowIso,
        totalAttempts: 1,
        recognizedText: recognizedText || undefined,
        speechScore: speechScore ?? undefined,
      };
      setAttemptMeta(meta);

      try {
        localStorage.setItem(beforeStorageKey, audioBase64);
        localStorage.setItem(latestStorageKey, audioBase64);
        localStorage.setItem(metaStorageKey, JSON.stringify(meta));
      } catch (e) {
        console.warn("Storage quota exceeded", e);
      }
    } else {
      // Subsequent attempt: keeps existing Before baseline, updates Latest (After)
      newAttempts = (attemptMeta?.totalAttempts || 1) + 1;
      setLatestAudioUrl(audioBase64);
      const meta: AttemptMeta = {
        beforeDate: attemptMeta?.beforeDate || nowIso,
        latestDate: nowIso,
        totalAttempts: newAttempts,
        recognizedText: recognizedText || attemptMeta?.recognizedText,
        speechScore: speechScore ?? attemptMeta?.speechScore,
      };
      setAttemptMeta(meta);

      try {
        localStorage.setItem(latestStorageKey, audioBase64);
        localStorage.setItem(metaStorageKey, JSON.stringify(meta));
      } catch (e) {
        console.warn("Storage quota exceeded", e);
      }
    }
  };

  const playAudio = (type: "before" | "latest") => {
    const url = type === "before" ? beforeAudioUrl : latestAudioUrl;
    if (!url) return;

    if (activeAudioPlayerRef.current) {
      activeAudioPlayerRef.current.pause();
    }

    const audio = new Audio(url);
    activeAudioPlayerRef.current = audio;
    setActivePlaying(type);

    audio.onended = () => {
      setActivePlaying(null);
    };

    audio.play().catch((err) => {
      console.error("Audio playback error:", err);
      setActivePlaying(null);
    });
  };

  const resetRecordings = () => {
    if (window.confirm("Reset your recordings for this sentence?")) {
      localStorage.removeItem(beforeStorageKey);
      localStorage.removeItem(latestStorageKey);
      localStorage.removeItem(metaStorageKey);
      setBeforeAudioUrl(null);
      setLatestAudioUrl(null);
      setAttemptMeta(null);
      setSpeechScore(null);
      setRecognizedText(null);
    }
  };

  const hasRecordings = Boolean(beforeAudioUrl || latestAudioUrl);

  return (
    <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm p-3 mt-3 shadow-md space-y-2.5">
      {/* Top Header: Title & Close */}
      <div className="flex items-center justify-between pb-2 border-b border-[#3A3A3A]/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#B5A642] tracking-wider uppercase flex items-center gap-1.5">
            <Mic size={13} />
            <span>Voice Test</span>
          </span>
          {attemptMeta && attemptMeta.totalAttempts > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-[#2E2E2E] text-[#7A7A7A]">
              Attempt #{attemptMeta.totalAttempts}
            </span>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-0.5 rounded-xs text-[11px] font-mono text-[#7A7A7A] hover:text-[#E9E1D4] hover:bg-[#2E2E2E] transition-colors cursor-pointer"
            title="Close Voice Test"
          >
            ✕ Close
          </button>
        )}
      </div>

      {/* Main Controls Row: Status/Score on left, Buttons on right */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left: Waveform (when recording) or Pronunciation Score */}
        {isRecording ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono text-red-400 font-bold">
              Recording {recordSeconds}s
            </span>
            <canvas
              ref={canvasRef}
              width={100}
              height={20}
              className="bg-[#2E2E2E] rounded-xs border border-[#3A3A3A]"
            />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#7A7A7A]">
            {speechScore !== null ? (
              <span className="flex items-center gap-1.5">
                <span>Accuracy:</span>
                <span
                  className={`font-bold px-1.5 py-0.5 rounded-xs text-[11px] ${
                    speechScore >= 75
                      ? "text-[#42946E] bg-[#26543F]/40 border border-[#367859]"
                      : speechScore >= 50
                      ? "text-[#B5A642] bg-[#B5A642]/15 border border-[#B5A642]/40"
                      : "text-[#E98C8C] bg-[#8C2727]/20 border border-[#8C2727]/40"
                  }`}
                >
                  {speechScore}%
                </span>
              </span>
            ) : (
              <span className="text-[11px] text-[#7A7A7A]">Record to compare with Native:</span>
            )}
          </div>
        )}

        {/* Right: Audio Playback & Record Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          {/* Record / Stop Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isRecording
                ? "bg-red-700 hover:bg-red-600 text-white animate-pulse"
                : "bg-[#B5A642] hover:bg-[#B5A642]/90 text-[#1F132A]"
            }`}
          >
            {isRecording ? (
              <>
                <Square size={12} className="fill-white" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic size={12} />
                <span>{hasRecordings ? "Record Again" : "Record"}</span>
              </>
            )}
          </button>

          {/* Native Dialogue Button */}
          <button
            onClick={onPlayNative}
            className="px-2.5 py-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-xs font-mono text-[#E9E1D4] transition-all flex items-center gap-1 cursor-pointer"
            title="Listen to original native speaker"
          >
            <Volume2 size={12} className="text-[#B5A642]" />
            <span>Native</span>
          </button>

          {/* Baseline (Before) */}
          {beforeAudioUrl && (
            <button
              onClick={() => playAudio("before")}
              className={`px-2.5 py-1.5 rounded-sm border text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
                activePlaying === "before"
                  ? "bg-[#B5A642] text-[#1F132A] font-bold border-[#B5A642]"
                  : "bg-[#2E2E2E] border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4]"
              }`}
              title="Play your first baseline attempt"
            >
              <Play size={11} className={activePlaying === "before" ? "fill-[#1F132A]" : "text-[#B5A642]"} />
              <span>1st Try</span>
            </button>
          )}

          {/* Latest (After) */}
          {latestAudioUrl && (
            <button
              onClick={() => playAudio("latest")}
              className={`px-2.5 py-1.5 rounded-sm border text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
                activePlaying === "latest"
                  ? "bg-[#42946E] text-[#1F132A] font-bold border-[#42946E]"
                  : "bg-[#2E2E2E] border-[#3A3A3A] hover:border-[#42946E] text-[#E9E1D4]"
              }`}
              title="Play your latest attempt"
            >
              <Play size={11} className={activePlaying === "latest" ? "fill-[#1F132A]" : "text-[#42946E]"} />
              <span>Latest</span>
            </button>
          )}

          {/* Reset recordings */}
          {hasRecordings && (
            <button
              onClick={resetRecordings}
              className="p-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:text-red-400 text-[#7A7A7A] transition-colors cursor-pointer"
              title="Reset recordings for this line"
            >
              <RotateCcw size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Full Recognized Spoken Sentence */}
      {recognizedText && (
        <div className="bg-[#2E2E2E]/60 border border-[#3A3A3A] px-3 py-2 rounded-xs text-xs font-mono text-[#E9E1D4] flex items-start gap-2 leading-relaxed">
          <span className="text-[#B5A642] font-semibold shrink-0">You said:</span>
          <p className="select-text break-words text-[#E9E1D4]/90">
            &ldquo;{recognizedText}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
