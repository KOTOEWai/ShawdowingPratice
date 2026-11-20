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
  }, [sentenceText]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        // Stop all audio tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordSeconds(0);

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
        {/* Left Side: Status / Instructions */}
        <div className="flex items-center gap-3">
          {isRecording ? (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
                Recording... {recordSeconds}s
              </span>
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm ${
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
                className="px-3 py-1.5 rounded-lg bg-[#1F132A] border border-[#33323E] hover:border-[#853BCE]/50 text-xs font-medium text-white transition-all flex items-center gap-1.5"
                title="Hear Native Speaker"
              >
                <Volume2 size={13} className="text-[#82AAFF]" />
                <span className="hidden sm:inline">Hear</span> Native
              </button>

              {/* Play User Audio */}
              <button
                onClick={playUserAudio}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
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
                className="p-1.5 rounded-lg bg-[#1F132A] border border-[#33323E] hover:text-white text-[#A1A0AB] transition-colors"
                title="Re-record"
              >
                <RotateCcw size={13} />
              </button>

              {/* Mark Mastered Quick Button */}
              {onMasteredToggle && (
                <button
                  onClick={onMasteredToggle}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 ${
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
