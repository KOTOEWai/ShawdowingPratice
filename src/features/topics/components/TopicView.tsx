"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus, Play, Clock, Sparkles, Film, Filter } from "lucide-react";
import { CustomVideoModal } from "@/features/shadowing";
import { TopicPageProps, CuratedMovieItem } from "../types";
import { CURATED_MOVIES } from "../data/curatedVideos";
import TopicGrid from "./TopicGrid";

const FILTER_TABS = [
  { id: "all_curated", label: "All Curated Clips (< 7m)", count: CURATED_MOVIES.length },
  { id: "level1", label: "Level 1: Animation (Pixar/Disney)", count: CURATED_MOVIES.filter((m) => m.level === 1).length },
  { id: "level2", label: "Level 2: Sitcoms & Banter", count: CURATED_MOVIES.filter((m) => m.level === 2).length },
  { id: "level3", label: "Level 3: Talks & Speeches", count: CURATED_MOVIES.filter((m) => m.level === 3).length },
  { id: "daily", label: "Daily English", count: null },
  { id: "business", label: "Business English", count: null },
  { id: "ielts", label: "IELTS Listening", count: null },
];

export default function TopicPage({
  movieVideos,
  dailyVideos,
  business,
  ielts,
  curatedMovies = CURATED_MOVIES,
}: TopicPageProps) {
  const [activeFilter, setActiveFilter] = useState("all_curated");
  const [customOpen, setCustomOpen] = useState(false);

  // Filter curated movies by difficulty level
  const displayedCurated = useMemo(() => {
    if (activeFilter === "all_curated") return curatedMovies;
    if (activeFilter === "level1") return curatedMovies.filter((m) => m.level === 1);
    if (activeFilter === "level2") return curatedMovies.filter((m) => m.level === 2);
    if (activeFilter === "level3") return curatedMovies.filter((m) => m.level === 3);
    return [];
  }, [activeFilter, curatedMovies]);

  // Playlist video mapping for fallback / legacy categories
  const playlistVideos = useMemo(() => {
    if (activeFilter === "daily") return dailyVideos;
    if (activeFilter === "business") return business;
    if (activeFilter === "ielts") return ielts;
    return null;
  }, [activeFilter, dailyVideos, business, ielts]);

  return (
    <div className="bg-[#2E2E2E] min-h-screen text-[#E9E1D4] p-4 sm:p-6 lg:p-10">
      <CustomVideoModal isOpen={customOpen} onClose={() => setCustomOpen(false)} />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Custom Video Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-[#B5A642]/15 text-[#B5A642] border border-[#B5A642]/40 font-bold">
                7-Minute Rule Curated
              </span>
              <span className="text-[10px] font-mono text-[#7A7A7A]">
                High-Retention Bite-Sized Movie Practice
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E9E1D4] uppercase tracking-tight">
              Curated Movie Library
            </h1>
            <p className="text-xs text-[#7A7A7A] font-mono mt-1">
              Handpicked iconic scenes under 7 minutes, categorized by natural conversational pacing & difficulty.
            </p>
          </div>

          <button
            onClick={() => setCustomOpen(true)}
            className="px-4 py-2.5 rounded-sm text-xs font-mono font-bold bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer self-start md:self-auto"
          >
            <Plus size={14} />
            <span>Practice Any YouTube Video</span>
          </button>
        </div>

        {/* Level & Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-all border cursor-pointer ${
                  isActive
                    ? "bg-[#B5A642] text-[#1F132A] border-[#B5A642] font-bold"
                    : "bg-[#1F132A] text-[#7A7A7A] border-[#3A3A3A] hover:text-[#E9E1D4] hover:border-[#B5A642]/60"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`ml-1.5 text-[10px] ${isActive ? "text-[#1F132A]" : "text-[#B5A642]"}`}>
                    ({tab.count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Curated Grid Display */}
        {displayedCurated.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#7A7A7A]">
              <span>Showing {displayedCurated.length} curated lessons (all ≤ 7 mins)</span>
              <span className="flex items-center gap-1 text-[#B5A642]">
                <Sparkles size={11} /> 100% Focused Shadowing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedCurated.map((movie) => {
                const levelColor =
                  movie.level === 1
                    ? "bg-[#6B8E23]/20 text-[#6B8E23] border-[#6B8E23]"
                    : movie.level === 2
                    ? "bg-[#B5A642]/20 text-[#B5A642] border-[#B5A642]"
                    : "bg-[#8C2727]/20 text-red-300 border-[#8C2727]";

                return (
                  <div
                    key={movie.id}
                    className="bg-[#1F132A] border border-[#3A3A3A] hover:border-[#B5A642] rounded-md overflow-hidden flex flex-col justify-between transition-all group shadow-lg"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <Link
                        href={`/lessons/shadowing/${movie.id}`}
                        className="relative block aspect-video overflow-hidden bg-[#2E2E2E]"
                      >
                        <Image
                          src={movie.thumbnail}
                          alt={movie.title}
                          width={480}
                          height={270}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Duration Pill (Strictly under 7 min notice) */}
                        <div className="absolute top-2 right-2 bg-[#1F132A]/90 border border-[#3A3A3A] px-2 py-0.5 rounded-xs text-[10px] font-mono text-[#E9E1D4] flex items-center gap-1 backdrop-blur-xs">
                          <Clock size={10} className="text-[#B5A642]" />
                          <span>{movie.duration}</span>
                        </div>

                        {/* Level Badge */}
                        <div className="absolute bottom-2 left-2">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border ${levelColor} backdrop-blur-xs`}
                          >
                            {movie.levelLabel}
                          </span>
                        </div>

                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-[#1F132A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 rounded-sm bg-[#B5A642] flex items-center justify-center text-[#1F132A] shadow-lg">
                            <Play size={18} className="fill-[#1F132A] ml-0.5" />
                          </div>
                        </div>
                      </Link>

                      {/* Content Info */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7A7A]">
                          <span className="text-[#B5A642] font-semibold flex items-center gap-1">
                            <Film size={11} /> {movie.movie}
                          </span>
                          <span>{movie.accent} Accent</span>
                        </div>

                        <Link href={`/lessons/shadowing/${movie.id}`}>
                          <h3 className="text-sm font-bold font-mono text-[#E9E1D4] group-hover:text-[#B5A642] transition-colors line-clamp-1">
                            {movie.title}
                          </h3>
                        </Link>

                        {movie.featuredQuote && (
                          <p className="text-xs text-[#E9E1D4]/80 italic line-clamp-2 bg-[#2E2E2E]/80 border border-[#3A3A3A] p-2 rounded-xs">
                            &quot;{movie.featuredQuote}&quot;
                          </p>
                        )}

                        <p className="text-[11px] text-[#7A7A7A] line-clamp-2 leading-relaxed">
                          {movie.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-4 pt-0">
                      <Link
                        href={`/lessons/shadowing/${movie.id}`}
                        className="w-full py-2 bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] hover:bg-[#B5A642] hover:text-[#1F132A] text-xs font-mono uppercase font-bold text-[#E9E1D4] rounded-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <Play size={12} />
                        <span>Shadow This Clip</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Playlist Videos (for Daily, Business, IELTS tabs) */}
        {playlistVideos && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-mono text-[#E9E1D4] uppercase">
              {activeFilter.toUpperCase()} Lessons
            </h2>
            <TopicGrid videos={playlistVideos} />
          </div>
        )}
      </div>
    </div>
  );
}
