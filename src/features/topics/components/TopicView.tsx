"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, ArrowRight, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { CustomVideoModal } from "@/features/shadowing";
import { TopicPageProps, DifficultyLevel, VideoItem } from "../types";
import TopicGrid from "./TopicGrid";

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "ielts", label: "IELTS & 6-Min English" },
  { id: "ted", label: "TED Talks & Inspiration" },
  { id: "daily", label: "Daily English" },
  { id: "movie", label: "Movie Short Clips" },
  { id: "business", label: "Business English" },
  { id: "qa", label: "Everyday Q&A (3-Min)" },
];

const DIFFICULTY_LEVELS: { id: DifficultyLevel; label: string; badge: string; desc: string }[] = [
  { id: "all", label: "All Levels", badge: "All", desc: "Show all practice materials" },
  { id: "beginner", label: "Beginner (A1 - A2)", badge: "A1-A2", desc: "Short drills & daily phrases" },
  { id: "intermediate", label: "Intermediate (B1 - B2)", badge: "B1-B2", desc: "Natural movie scenes & IELTS" },
  { id: "advanced", label: "Advanced (C1 - C2)", badge: "C1-C2", desc: "TED Talks & complex speeches" },
];

export default function TopicPage({
  ielts = [],
  tedVideos = [],
  dailyVideos = [],
  movieVideos = [],
  business = [],
  everydayQa = [],
}: TopicPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyLevel>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customOpen, setCustomOpen] = useState(false);

  // Decorate video items with difficulty & CEFR levels
  const decoratedIelts = useMemo(
    () => ielts.map((v) => ({ ...v, difficulty: "Intermediate" as const, cefr: "B2" })),
    [ielts]
  );
  const decoratedTed = useMemo(
    () => tedVideos.map((v) => ({ ...v, difficulty: "Advanced" as const, cefr: "C1-C2" })),
    [tedVideos]
  );
  const decoratedDaily = useMemo(
    () => dailyVideos.map((v) => ({ ...v, difficulty: "Beginner" as const, cefr: "A2" })),
    [dailyVideos]
  );
  const decoratedMovie = useMemo(
    () => movieVideos.map((v) => ({ ...v, difficulty: "Intermediate" as const, cefr: "B1-B2" })),
    [movieVideos]
  );
  const decoratedBusiness = useMemo(
    () => business.map((v) => ({ ...v, difficulty: "Intermediate" as const, cefr: "B2" })),
    [business]
  );
  const decoratedQa = useMemo(
    () => everydayQa.map((v) => ({ ...v, difficulty: "Beginner" as const, cefr: "A1" })),
    [everydayQa]
  );

  const sections = useMemo(
    () => [
      {
        id: "qa",
        title: "Everyday English Q&A (3-Min Drill)",
        link: "/Topics/everydayQa",
        difficulty: "beginner" as DifficultyLevel,
        cefr: "A1",
        data: decoratedQa,
      },
      {
        id: "daily",
        title: "Daily English Conversation",
        link: "/Topics/dailyEnglish",
        difficulty: "beginner" as DifficultyLevel,
        cefr: "A2",
        data: decoratedDaily,
      },
      {
        id: "movie",
        title: "Movie Short Clips",
        link: "/Topics/shortMovies",
        difficulty: "intermediate" as DifficultyLevel,
        cefr: "B1-B2",
        data: decoratedMovie,
      },
      {
        id: "ielts",
        title: "IELTS & 6-Minute English",
        link: "/Topics/ielts",
        difficulty: "intermediate" as DifficultyLevel,
        cefr: "B2",
        data: decoratedIelts,
      },
      {
        id: "business",
        title: "Business English & Job Interview",
        link: "/Topics/business",
        difficulty: "intermediate" as DifficultyLevel,
        cefr: "B2",
        data: decoratedBusiness,
      },
      {
        id: "ted",
        title: "TED Talks & Inspiring Ideas",
        link: "/Topics/tedTalks",
        difficulty: "advanced" as DifficultyLevel,
        cefr: "C1-C2",
        data: decoratedTed,
      },
    ],
    [decoratedQa, decoratedDaily, decoratedMovie, decoratedIelts, decoratedBusiness, decoratedTed]
  );

  // Apply Category, Difficulty, and Search filters
  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return sections
      .filter((s) => {
        // Category filter
        if (activeCategory !== "all" && s.id !== activeCategory) return false;
        // Difficulty filter
        if (activeDifficulty !== "all" && s.difficulty !== activeDifficulty) return false;
        return true;
      })
      .map((s) => {
        if (!q) return s;
        // Search filter within videos
        const matchingVideos = s.data.filter((v) =>
          v.snippet?.title?.toLowerCase().includes(q)
        );
        return { ...s, data: matchingVideos };
      })
      .filter((s) => s.data.length > 0);
  }, [sections, activeCategory, activeDifficulty, searchQuery]);

  const totalFilteredLessons = useMemo(
    () => filteredSections.reduce((sum, s) => sum + s.data.length, 0),
    [filteredSections]
  );

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDifficulty("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    activeCategory !== "all" || activeDifficulty !== "all" || searchQuery.trim() !== "";

  return (
    <div className="bg-[#2E2E2E] min-h-screen text-[#E9E1D4] p-4 sm:p-6 lg:p-12">
      <CustomVideoModal isOpen={customOpen} onClose={() => setCustomOpen(false)} />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dynamic Header & Custom Video Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E9E1D4] uppercase tracking-tight">
                Practice Topics & Library
              </h1>
              <span className="px-2 py-0.5 rounded-xs bg-[#1F132A] border border-[#3A3A3A] text-[#B5A642] text-xs font-mono">
                {totalFilteredLessons} lessons
              </span>
            </div>
            <p className="text-xs text-[#7A7A7A] font-mono mt-1">
              Filter by English CEFR level (A1 to C2) and topics for targeted shadowing practice.
            </p>
          </div>

          <button
            onClick={() => setCustomOpen(true)}
            className="px-4 py-2.5 rounded-sm text-xs font-mono font-bold bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 transition-all flex items-center gap-2 shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <Plus size={14} />
            <span>Practice Any YouTube Video</span>
          </button>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="space-y-4 bg-[#1F132A] border border-[#3A3A3A] p-4 rounded-sm">
          {/* Top Row: Search Input */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A7A]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search practice lessons by topic or keyword (e.g. coffee, interview, BBC)..."
                className="w-full pl-9 pr-9 py-2 bg-[#2E2E2E] border border-[#3A3A3A] rounded-xs text-xs font-mono text-[#E9E1D4] placeholder-[#7A7A7A] focus:outline-none focus:border-[#B5A642] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#E9E1D4]"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 rounded-xs bg-[#2E2E2E] border border-[#3A3A3A] hover:border-red-400 text-[11px] font-mono text-[#E98C8C] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Difficulty Level Filter Row (CEFR) */}
          <div className="space-y-1.5 pt-1 border-t border-[#3A3A3A]/60">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A7A7A] flex items-center gap-1.5">
              <SlidersHorizontal size={11} className="text-[#B5A642]" />
              <span>Difficulty Level (CEFR):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_LEVELS.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setActiveDifficulty(diff.id)}
                  className={`px-3 py-1.5 rounded-xs text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5 ${
                    activeDifficulty === diff.id
                      ? "border-[#B5A642] bg-[#B5A642] text-[#1F132A] font-bold shadow-sm"
                      : "border-[#3A3A3A] bg-[#2E2E2E] text-[#E9E1D4]/80 hover:text-[#E9E1D4] hover:border-[#B5A642]/60"
                  }`}
                  title={diff.desc}
                >
                  <span>{diff.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Row */}
          <div className="space-y-1.5 pt-1 border-t border-[#3A3A3A]/60">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A7A7A] flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#B5A642]" />
              <span>Category / Theme:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-xs text-[11px] font-mono transition-all border cursor-pointer ${
                    activeCategory === cat.id
                      ? "border-[#E9E1D4] bg-[#E9E1D4] text-[#1F132A] font-bold"
                      : "border-[#3A3A3A] bg-[#2E2E2E] text-[#7A7A7A] hover:text-[#E9E1D4] hover:border-[#3A3A3A]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Rows & Video Grids */}
        <div className="space-y-12 pt-2">
          <AnimatePresence mode="wait">
            {filteredSections.map((section) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 border-b border-[#3A3A3A] pb-10"
              >
                <div className="flex flex-wrap justify-between items-center gap-2 pb-2">
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg sm:text-xl font-bold font-mono text-[#E9E1D4] uppercase tracking-tight">
                      {section.title}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold uppercase ${
                        section.difficulty === "beginner"
                          ? "bg-[#26543F]/80 text-[#42946E] border border-[#367859]"
                          : section.difficulty === "advanced"
                          ? "bg-[#3D1E56]/80 text-[#A667E4] border border-[#853BCE]/50"
                          : "bg-[#3A351E]/80 text-[#B5A642] border border-[#B5A642]/50"
                      }`}
                    >
                      {section.difficulty} • {section.cefr}
                    </span>
                    <span className="text-[#7A7A7A] text-xs font-mono">
                      ({section.data?.length || 0} lessons)
                    </span>
                  </div>

                  <Link
                    href={section.link}
                    className="text-[#B5A642] hover:text-[#E9E1D4] text-xs font-mono transition-colors flex items-center gap-1"
                  >
                    <span>View all</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <TopicGrid videos={section.data} />
              </motion.section>
            ))}
          </AnimatePresence>

          {filteredSections.length === 0 && (
            <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm text-center py-16 px-4 space-y-3">
              <p className="text-[#E9E1D4] font-mono font-bold text-sm">
                No lessons found matching your current filter criteria.
              </p>
              <p className="text-[#7A7A7A] font-mono text-xs max-w-md mx-auto">
                Try clearing your search query or selecting &ldquo;All Levels&rdquo; and &ldquo;All Topics&rdquo; to explore available videos.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 bg-[#B5A642] text-[#1F132A] rounded-xs font-mono text-xs font-bold uppercase cursor-pointer hover:bg-[#B5A642]/90 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
