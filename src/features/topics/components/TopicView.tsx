"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { CustomVideoModal } from "@/features/shadowing";
import { TopicPageProps } from "../types";
import TopicGrid from "./TopicGrid";

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "movie", label: "Movie Short Clips" },
  { id: "daily", label: "Daily English" },
  { id: "business", label: "Business English" },
  { id: "ielts", label: "IELTS Listening" },
];

export default function TopicPage({ movieVideos, dailyVideos, business, ielts }: TopicPageProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [customOpen, setCustomOpen] = useState(false);

  const sections = useMemo(
    () => [
      { id: "movie", title: "Movie Short Clips", link: "/Topics/shortMovies", data: movieVideos },
      { id: "daily", title: "Daily English Conversation", link: "/Topics/dailyEnglish", data: dailyVideos },
      { id: "business", title: "Business English", link: "/Topics/business", data: business },
      { id: "ielts", title: "IELTS Listening", link: "/Topics/ielts", data: ielts },
    ],
    [movieVideos, dailyVideos, business, ielts]
  );

  const filteredSections =
    activeFilter === "all" ? sections : sections.filter((s) => s.id === activeFilter);

  return (
    <div className="bg-[#2E2E2E] min-h-screen text-[#E9E1D4] p-4 sm:p-6 lg:p-12">
      <CustomVideoModal isOpen={customOpen} onClose={() => setCustomOpen(false)} />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dynamic Header & Custom Video Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E9E1D4] uppercase tracking-tight">
              {activeFilter === "all" ? "Explore Practice Topics" : activeFilter + " Lessons"}
            </h1>
            <p className="text-xs text-[#7A7A7A] font-mono mt-1">
              Select any clip to practice sentence-by-sentence shadowing.
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

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-all border cursor-pointer ${
                activeFilter === cat.id
                  ? "border-[#B5A642] bg-[#B5A642] text-[#1F132A] font-bold"
                  : "border-[#3A3A3A] bg-[#1F132A] text-[#7A7A7A] hover:text-[#E9E1D4] hover:border-[#B5A642]/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Rows */}
        <div className="space-y-12">
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
                <div className="flex justify-between items-center pb-2">
                  <h2 className="text-lg sm:text-xl font-bold font-mono text-[#E9E1D4] uppercase tracking-tight flex items-center gap-2">
                    <span>{section.title}</span>
                    <span className="text-[#B5A642] text-xs font-mono font-normal">
                      ({section.data?.length || 0} lessons)
                    </span>
                  </h2>
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
            <p className="text-[#7A7A7A] font-mono text-center py-20 text-sm">
              No topics found for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
