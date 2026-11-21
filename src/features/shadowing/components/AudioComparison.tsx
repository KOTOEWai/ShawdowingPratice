"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, RotateCcw, Volume2, CheckCircle2, TrendingUp, History, Sparkles } from "lucide-react";

interface AttemptMeta {
  beforeDate: string;
  latestDate: string;
  totalAttempts: number;
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
      setAttemptMeta(storedMeta ? JSON.parse(storedMeta) : null);
    } catch {
      setBeforeAudioUrl(null);
      setLatestAudioUrl(null);
      setAttemptMeta(null);
    }
  }, [lessonId, sentenceIndex, sentenceText, beforeStorageKey, latestStorageKey, metaStorageKey]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

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
    if (window.confirm("Reset your Before and After recordings for this sentence?")) {
      localStorage.removeItem(beforeStorageKey);
      localStorage.removeItem(latestStorageKey);
      localStorage.removeItem(metaStorageKey);
      setBeforeAudioUrl(null);
      setLatestAudioUrl(null);
      setAttemptMeta(null);
    }
  };

  const hasRecordings = Boolean(beforeAudioUrl || latestAudioUrl);
  const hasMultipleAttempts = (attemptMeta?.totalAttempts || 0) >= 2;

  return (
    <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-md p-3.5 mt-4 shadow-xl">
      <div className="flex flex-col gap-3">
        {/* Top Header / Status Line */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3A3A3A]/60 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase font-bold text-[#B5A642] tracking-wider flex items-center gap-1.5">
              <TrendingUp size={13} />
              <span>Accent Comparison (Before vs After)</span>
            </span>

            {attemptMeta && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#2E2E2E] border border-[#3A3A3A] text-[#E9E1D4]">
                Attempt #{attemptMeta.totalAttempts}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mastered toggle */}
            {onMasteredToggle && (
              <button
                onClick={onMasteredToggle}
                className={`px-2.5 py-1 rounded-sm border text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isMastered
                    ? "bg-[#6B8E23]/20 text-[#6B8E23] border-[#6B8E23]"
                    : "bg-[#2E2E2E] border-[#3A3A3A] text-[#7A7A7A] hover:text-[#E9E1D4]"
                }`}
                title="Mark sentence as mastered"
              >
                <CheckCircle2 size={12} />
                <span>{isMastered ? "Mastered" : "Mark Mastered"}</span>
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#8C2727] text-[#7A7A7A] hover:text-[#E9E1D4] text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1"
                title="Close voice comparison"
              >
                ✕ Close
              </button>
            )}
          </div>
        </div>

        {/* Middle Bar: Recording Status or A/B Players */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Waveform or Instruction */}
          <div className="flex items-center gap-3">
            {isRecording ? (
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span className="text-xs font-mono text-red-400 font-bold tracking-wider">
                  RECORDING {recordSeconds}s
                </span>
                <canvas
                  ref={canvasRef}
                  width={140}
                  height={24}
                  className="bg-[#2E2E2E] rounded-xs border border-[#3A3A3A]"
                />
              </div>
            ) : hasRecordings ? (
              <div className="text-xs font-mono text-[#E9E1D4] flex items-center gap-2">
                <History size={13} className="text-[#B5A642]" />
                <span className="text-[#7A7A7A]">Compare your accent:</span>
              </div>
            ) : (
              <span className="text-xs font-mono text-[#7A7A7A]">
                Record your voice to establish your baseline accent attempt:
              </span>
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Record / Stop Button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
                  <span>{hasRecordings ? "Record New Attempt" : "Record First Try"}</span>
                </>
              )}
            </button>

            {/* Hear Native Speaker */}
            <button
              onClick={onPlayNative}
              className="px-3 py-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-xs font-mono text-[#E9E1D4] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Hear Native Dialogue from Movie"
            >
              <Volume2 size={13} className="text-[#B5A642]" />
              <span>Native</span>
            </button>

            {/* Play Baseline / First Try (Before) */}
            {beforeAudioUrl && (
              <button
                onClick={() => playAudio("before")}
                className={`px-3 py-1.5 rounded-sm border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePlaying === "before"
                    ? "bg-[#B5A642] text-[#1F132A] font-bold border-[#B5A642]"
                    : "bg-[#2E2E2E] border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4]"
                }`}
                title={`Recorded ${attemptMeta?.beforeDate ? new Date(attemptMeta.beforeDate).toLocaleDateString() : "Baseline"}`}
              >
                <Play size={12} className={activePlaying === "before" ? "fill-[#1F132A]" : "text-[#B5A642]"} />
                <span>Before (1st)</span>
              </button>
            )}

            {/* Play Latest Try (After) */}
            {latestAudioUrl && (
              <button
                onClick={() => playAudio("latest")}
                className={`px-3 py-1.5 rounded-sm border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePlaying === "latest"
                    ? "bg-[#6B8E23] text-white font-bold border-[#6B8E23]"
                    : "bg-[#2E2E2E] border-[#3A3A3A] hover:border-[#6B8E23] text-[#E9E1D4]"
                }`}
                title={`Latest attempt (${attemptMeta?.latestDate ? new Date(attemptMeta.latestDate).toLocaleTimeString() : "Now"})`}
              >
                <Play size={12} className={activePlaying === "latest" ? "fill-white" : "text-[#6B8E23]"} />
                <span>After (Latest)</span>
              </button>
            )}

            {/* Reset All Recordings for this line */}
            {hasRecordings && (
              <button
                onClick={resetRecordings}
                className="p-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:text-red-400 text-[#7A7A7A] transition-colors cursor-pointer"
                title="Reset recordings for this sentence"
              >
                <RotateCcw size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Motivational Accent Progression Notice */}
        {hasMultipleAttempts && (
          <div className="bg-[#2E2E2E] border-l-2 border-[#B5A642] p-2 text-[11px] font-mono text-[#E9E1D4] flex items-center gap-2">
            <Sparkles size={12} className="text-[#B5A642] shrink-0" />
            <span>
              Great persistence! You have recorded <strong>{attemptMeta?.totalAttempts} attempts</strong>. Listen back and forth between <strong>Before (1st)</strong> and <strong>After (Latest)</strong> to verify your connected speech and rhythm!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
