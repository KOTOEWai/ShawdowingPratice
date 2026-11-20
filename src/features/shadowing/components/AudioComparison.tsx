"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, RotateCcw, Volume2, UserCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioComparisonProps {
  sentenceText: string;
  onPlayNative: () => void;
  onMasteredToggle?: () => void;
  isMastered?: boolean;
}

export default function AudioComparison({
  sentenceText,
  onPlayNative,
  onMasteredToggle,
  isMastered,
}: AudioComparisonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time Waveform Visualizer Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Clean up recording when sentenceText changes
  useEffect(() => {
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      userAudioPlayerRef.current = null;
    }
    setRecordedAudioUrl(null);
    setIsRecording(false);
    setIsPlayingUserAudio(false);
    setRecordSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, [sentenceText]);

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
        const barWidth = (canvas.width / bufferLength) * 1.6;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const val = dataArray[i];
          const barHeight = Math.max(3, (val / 255) * canvas.height);

          // Railway nocturnal violet gradient
          const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
          gradient.addColorStop(0, "#853BCE");
          gradient.addColorStop(1, "#A667E4");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, canvas.height - barHeight, Math.max(2, barWidth - 2), barHeight, 2);
          ctx.fill();

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
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (audioCtxRef.current) {
          audioCtxRef.current.close().catch(() => {});
          audioCtxRef.current = null;
        }
        // Stop all audio tracks to release microphone
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
      alert("Microphone permission is required to record your voice for comparison.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const playUserAudio = () => {
    if (!recordedAudioUrl) return;

    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }

    const audio = new Audio(recordedAudioUrl);
    userAudioPlayerRef.current = audio;
    setIsPlayingUserAudio(true);

    audio.onended = () => {
      setIsPlayingUserAudio(false);
    };

    audio.play();
  };

  return (
    <div className="bg-[#181622] border border-[#33323E] rounded-xl p-4 mt-4 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Status & Waveform */}
        <div className="flex items-center gap-3">
          {isRecording ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
                  {recordSeconds}s
                </span>
              </div>
              {/* Live Canvas Waveform */}
              <canvas
                ref={canvasRef}
                width={120}
                height={26}
                className="bg-[#13111C] rounded border border-[#33323E]/60 px-1"
              />
            </div>
          ) : recordedAudioUrl ? (
            <div className="flex items-center gap-2 text-xs text-[#DCDCE0]">
              <UserCheck size={15} className="text-[#A667E4]" />
              <span className="font-medium">Audio Captured! Compare below:</span>
            </div>
          ) : (
            <span className="text-xs text-[#A1A0AB] font-normal">
              Record yourself to compare pitch & rhythm with the native speaker:
            </span>
          )}
        </div>

        {/* Right Side: Action Controls */}
        <div className="flex items-center gap-2">
          {!recordedAudioUrl ? (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                isRecording
                  ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
                  : "bg-[#853BCE] hover:bg-[#A667E4] text-white shadow-[#853BCE]/25"
              }`}
            >
              {isRecording ? (
                <>
                  <Square size={12} className="fill-white" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic size={13} />
                  <span>Record Voice</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              {/* Play Native */}
              <button
                onClick={onPlayNative}
                className="px-3 py-1.5 rounded-lg bg-[#1F132A] border border-[#33323E] hover:border-[#853BCE]/50 text-xs font-medium text-white transition-all flex items-center gap-1.5 cursor-pointer"
                title="Hear Native Speaker"
              >
                <Volume2 size={13} className="text-[#82AAFF]" />
                <span className="hidden sm:inline">Hear</span> Native
              </button>

              {/* Play User Audio */}
              <button
                onClick={playUserAudio}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isPlayingUserAudio
                    ? "bg-[#853BCE] border-[#A667E4] text-white"
                    : "bg-[#1F132A] border-[#33323E] hover:border-[#853BCE]/50 text-white"
                }`}
                title="Hear My Recorded Voice"
              >
                <Play size={13} className={isPlayingUserAudio ? "fill-white text-white" : "text-[#A667E4]"} />
                <span className="hidden sm:inline">Hear</span> My Voice
              </button>

              {/* Re-record */}
              <button
                onClick={() => setRecordedAudioUrl(null)}
                className="p-1.5 rounded-lg bg-[#1F132A] border border-[#33323E] hover:text-white text-[#A1A0AB] transition-colors cursor-pointer"
                title="Re-record"
              >
                <RotateCcw size={13} />
              </button>

              {/* Mark Mastered Quick Button */}
              {onMasteredToggle && (
                <button
                  onClick={onMasteredToggle}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                    isMastered
                      ? "bg-[#26543F] text-[#42946E] border-[#367859]"
                      : "bg-[#1F132A] border-[#33323E] text-[#A1A0AB] hover:text-white"
                  }`}
                  title="Mark sentence as mastered"
                >
                  <CheckCircle2 size={13} />
                  <span className="hidden md:inline">{isMastered ? "Mastered" : "Mark Mastered"}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
