"use client";

import { TranscriptItem } from "@/app/Types/Type";
import WordWithMeaning from "@/components/WordWithMeaning";
import React, { use, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
 // Import type
import "video.js/dist/video-js.css";
import "videojs-youtube";



export default function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);


  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  /* 1. Fetch Transcript */
  useEffect(() => {
    async function fetchTranscript() {
      try {
        setLoading(true);
        const res = await fetch(`/api/FetchTranscript?videoId=${id}`);
        const data = await res.json();
        setTranscript(Array.isArray(data) ? data : data?.content || []);
      } catch (err) {
        console.error("Failed to load transcript", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTranscript();
  }, [id]);

  /* 2. Init video.js (Run only once) */
  useEffect(() => {
    if (!videoRef.current || !id) return;

    // Create a video element dynamically to avoid re-init issues
    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered", "vjs-theme-city"); // Theme choice
    
    videoRef.current.appendChild(videoElement);

    const player = (playerRef.current = videojs(videoElement, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5], // Useful for shadowing
      techOrder: ["youtube"],
      sources: [{ src: `https://www.youtube.com/watch?v=${id}`, type: "video/youtube" }],
    }));

    // Time Update Listener
    player.on("timeupdate", () => {
      const currentMs = player.currentTime()! * 1000;
      // Use ref-based check to avoid dependency loop in useEffect
      setTranscript((prevTranscript) => {
        const index = prevTranscript.findIndex((item, i) => {
          const next = prevTranscript[i + 1];
          return currentMs >= item.offset && (!next || currentMs < next.offset);
        });
        
        setActiveIndex((prevIndex) => {
          if (index !== prevIndex) return index;
          return prevIndex;
        });
        return prevTranscript;
      });
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [id]); // DO NOT add transcript or activeIndex here

  /* 3. Handle Auto-Scroll when activeIndex changes */
  useEffect(() => {
    if (activeIndex !== -1) {
      activeLineRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  const handleSeek = (offset: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime(offset / 1000);
      playerRef.current.play();
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-6 bg-slate-950 min-h-screen">
      <div className="lg:col-span-2">
        {/* We use a div container for VideoJS instead of a direct video tag */}
        <div className="aspect-video rounded-3xl overflow-hidden  border border-slate-800 bg-black">
          <div ref={videoRef} data-vjs-player />
        </div>
        
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 flex flex-col h-120 md:h-135.5   shadow-2xl">
        <div className="p-3 border-b border-slate-800 bg-slate-900/50 sticky top-0 rounded-t-3xl backdrop-blur-md">
          <h2 className="text-lg font-bold text-white">Transcript</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
          {loading ? (
            <div className="space-y-2 animate-pulse">
               {[1,2,3,4,5,6].map(i => <div key={i} className="h-16 bg-slate-800/50 rounded-xl" />)}
            </div>
          ) : (
            transcript.map((item, index) => (
              <div
                key={index}
                ref={index === activeIndex ? activeLineRef : null}
                onClick={() => handleSeek(item.offset)}
                className={`p-2 rounded-xl cursor-pointer transition-all duration-300 border
                  ${index === activeIndex
                      ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/20 translate-x-1"
                      : "border-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  }
                `}
              >
                <p className={`text-[10px] font-mono mb-1 ${index === activeIndex ? "text-blue-200" : "text-slate-500"}`}>
                  {formatTime(item.offset)}
                </p>
                <p className={`text-base leading-relaxed border-b border-slate-800 ${index === activeIndex ? "text-white font-medium" : ""}`}>
                 {item.text.split(" ").map((word, wIdx) => (
                    <WordWithMeaning key={wIdx} word={word} />
                  ))}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}