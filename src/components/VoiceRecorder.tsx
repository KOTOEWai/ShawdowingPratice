"use client";

import React, { useState, useEffect } from "react";
import { useVoiceRecorder } from "@/app/lib/hooks/useVoiceRecorder";
import { Mic, Square, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceRecorderProps {
    originalText: string;
}

export default function VoiceRecorder({ originalText }: VoiceRecorderProps) {
    const { isRecording, audioBlob, startRecording, stopRecording, setAudioBlob } = useVoiceRecorder();
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{
        userText: string;
        accuracy: number;
    } | null>(null);

    useEffect(() => {
        if (audioBlob) {
            handleUpload(audioBlob);
        }
    }, [audioBlob]);

    const handleUpload = async (blob: Blob) => {
        setLoading(true);
        setFeedback(null);
        try {
            const formData = new FormData();
            formData.append("audio", blob);
            formData.append("originalText", originalText);

            const res = await fetch("/api/VoiceFeedback", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.accuracy !== undefined) {
                setFeedback(data);
            }
        } catch (err) {
            console.error("Feedback upload failed", err);
        } finally {
            setLoading(false);
            setAudioBlob(null); // Clear for next try
        }
    };

    return (
        <div className="mt-8 glass-card p-6 rounded-3xl border-white/5 shadow-2xl">
            <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {!isRecording && !loading && !feedback && (
                            <motion.p
                                key="prompt"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="text-sm text-slate-400 font-medium"
                            >
                                မင်းရဲ့ အသံထွက်ကို စမ်းသပ်ကြည့်ပါ။
                            </motion.p>
                        )}
                        {isRecording && (
                            <motion.div
                                key="recording"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                                <span className="text-sm text-rose-400 font-black tracking-wide uppercase">Recording...</span>
                            </motion.div>
                        )}
                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                                <span className="text-sm text-indigo-400 font-bold">AI စစ်ဆေးနေပါတယ်...</span>
                            </motion.div>
                        )}
                        {feedback && (
                            <motion.div
                                key="feedback"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className="space-y-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${feedback.accuracy > 80 ? "bg-emerald-500/10 text-emerald-400" : feedback.accuracy > 50 ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"}`}>
                                        Accuracy: {feedback.accuracy}%
                                    </div>
                                    {feedback.accuracy > 80 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                </div>
                                <p className="text-sm text-slate-300 font-medium italic">
                                    &quot; {feedback.userText} &quot;
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={loading}
                    className={`p-5 rounded-2xl transition-all duration-500 ${isRecording
                        ? "bg-rose-600 hover:bg-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.4)]"
                        : "bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:opacity-50"
                        }`}
                >
                    {isRecording ? (
                        <Square className="w-5 h-5 text-white fill-white" />
                    ) : (
                        <Mic className="w-5 h-5 text-white" />
                    )}
                </button>
            </div>
        </div>
    );
}
