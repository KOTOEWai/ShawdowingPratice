"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, MoveLeft, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Video {
  id?: { videoId: string };
  snippet?: {
    title: string;
    thumbnails: { high: { url: string } };
    resourceId?: { videoId: string };
  };
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  cefr?: string;
}

type DetailAllProps = {
  videos: Video[];
  title?: string;
};

export default function DetailAll({ videos = [], title }: DetailAllProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    const q = searchQuery.toLowerCase().trim();
    return videos.filter((v) => v.snippet?.title?.toLowerCase().includes(q));
  }, [videos, searchQuery]);

  return (
    <div className="bg-[#2E2E2E] min-h-screen py-8 px-4 sm:px-6 lg:px-12 text-[#E9E1D4]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-4">
          <div className="flex items-center gap-4">
            <Link
              href="/Topics"
              className="p-2 bg-[#1F132A] hover:bg-[#3A3A3A] border border-[#3A3A3A] hover:border-[#B5A642] rounded-sm text-[#E9E1D4] transition-colors cursor-pointer"
              title="Back to Topics"
            >
              <MoveLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E9E1D4] uppercase">
                  {title}
                </h1>
                <span className="px-2 py-0.5 rounded-xs bg-[#1F132A] border border-[#3A3A3A] text-[#B5A642] text-xs font-mono">
                  {filteredVideos.length} lessons
                </span>
              </div>
              <p className="text-[#7A7A7A] text-xs font-mono mt-1">
                Improve your English fluency with {title} shadowing lessons.
              </p>
            </div>
          </div>

          {/* Quick Search in Detail Page */}
          <div className="relative w-full sm:w-72">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A7A]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title..."
              className="w-full pl-9 pr-8 py-2 bg-[#1F132A] border border-[#3A3A3A] rounded-xs text-xs font-mono text-[#E9E1D4] placeholder-[#7A7A7A] focus:outline-none focus:border-[#B5A642] transition-colors"
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
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredVideos.map((video, index) => {
            const videoId = video.snippet?.resourceId?.videoId || video.id?.videoId;
            return (
              <motion.div
                key={videoId || index}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="group cursor-pointer"
              >
                <Link href={`/lessons/shadowing/${videoId}`}>
                  <div className="relative aspect-video rounded-md overflow-hidden border border-[#3A3A3A] bg-[#1F132A] group-hover:border-[#B5A642] transition-all">
                    {video.snippet?.thumbnails?.high?.url ? (
                      <Image
                        src={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#2E2E2E] flex items-center justify-center text-[#7A7A7A] text-xs font-mono">
                        No Preview
                      </div>
                    )}

                    <div className="absolute inset-0 bg-[#1F132A]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="w-10 h-10 bg-[#B5A642] rounded-sm flex items-center justify-center shadow-lg">
                        <Play className="text-[#1F132A] fill-[#1F132A] ml-0.5" size={16} />
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-2.5 text-[#E9E1D4] text-xs font-mono font-bold line-clamp-2 group-hover:text-[#B5A642] transition-colors leading-snug">
                    {video.snippet?.title}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredVideos.length === 0 && (
          <div className="bg-[#1F132A] border border-[#3A3A3A] rounded-sm text-center py-16 px-4 space-y-2">
            <p className="text-[#E9E1D4] font-mono font-bold text-sm">
              No lessons match &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 px-3 py-1.5 bg-[#B5A642] text-[#1F132A] rounded-xs font-mono text-xs font-bold uppercase cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
