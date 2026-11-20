"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopicGrid from "./TopicGrid";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CustomVideoModal } from "@/features/shadowing";
import { TopicPageProps } from "../types";

const CATEGORIES = [
  { id: "all", label: "All topics" },
  { id: "movie", label: "Movie short clip" },
  { id: "daily", label: "Daily English" },
  { id: "business", label: "Business English" },
  { id: "ielts", label: "IELTS Listening" },
];

export default function TopicPage({ movieVideos, dailyVideos, business, ielts }: TopicPageProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [customOpen, setCustomOpen] = useState(false);

  const sections = useMemo(
    () => [
      { id: "movie", title: "Movie short clip", link: "/Topics/shortMovies", data: movieVideos },
      { id: "daily", title: "Daily English Conversation", link: "/Topics/dailyEnglish", data: dailyVideos },
      { id: "business", title: "Business English", link: "/Topics/business", data: business },
      { id: "ielts", title: "IELTS Listening", link: "/Topics/ielts", data: ielts },
    ],
    [movieVideos, dailyVideos, business, ielts]
  );

  const filteredSections =
    activeFilter === "all" ? sections : sections.filter((s) => s.id === activeFilter);

  return (
    <div className="bg-[#13111C] min-h-screen text-white p-6 lg:p-12">
      <CustomVideoModal isOpen={customOpen} onClose={() => setCustomOpen(false)} />
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Header & Custom Video Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="hero-headline text-2xl sm:text-3xl font-normal text-white capitalize">
            {activeFilter === "all" ? "Explore Practice Topics" : activeFilter + " Lessons"}
          </h1>

          <button
            onClick={() => setCustomOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-mono font-medium border border-[#853BCE]/50 bg-[#853BCE]/15 text-[#A667E4] hover:bg-[#853BCE] hover:text-white transition-all flex items-center gap-2 shadow-lg shadow-[#853BCE]/15 cursor-pointer"
          >
            <Plus size={14} />
            <span>Practice Any YouTube Video</span>
          </button>
        </div>

        {/* Animated Filter Tags */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                activeFilter === cat.id
                  ? "border-[#853BCE] text-white"
                  : "border-[#33323E] bg-[#1F132A] text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/40"
              }`}
            >
              {activeFilter === cat.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#853BCE] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Animated Category Rows */}
        <div className="space-y-14">
          <AnimatePresence mode="wait">
            {filteredSections.map((section) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 border-b border-[#33323E] pb-10"
              >
                <div className="flex justify-between items-center pb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                    {section.title}
                    <span className="text-[#A667E4] text-xs font-mono font-normal ml-2.5">
                      (100+ lessons)
                    </span>
                  </h2>
                  <Link
                    href={section.link}
                    className="text-[#A667E4] hover:text-white text-xs font-medium transition-colors"
                  >
                    View all →
                  </Link>
                </div>
                <TopicGrid videos={section.data} />
              </motion.section>
            ))}
          </AnimatePresence>

          {filteredSections.length === 0 && (
            <p className="text-[#6C6B7B] text-center py-20 text-sm">
              No topics found for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
