"use client";

import { VideoItem } from "../types";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Topic({ videos }: { videos: VideoItem[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {videos?.map((video, index) => {
            const videoId = video.snippet?.resourceId?.videoId || video.id?.videoId;
            return (
              <motion.div
                key={videoId || index}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="group cursor-pointer"
              >
                <Link href={`/lessons/shadowing/${videoId}`}>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video rounded-md overflow-hidden border border-[#3A3A3A] bg-[#1F132A] group-hover:border-[#B5A642] transition-all">
                    {/* Difficulty Badge */}
                    {video.difficulty && (
                      <div className="absolute top-2 left-2 z-20">
                        <span
                          className={`px-1.5 py-0.5 rounded-xs text-[10px] font-mono font-bold uppercase shadow-sm ${
                            video.difficulty === "Beginner"
                              ? "bg-[#26543F]/95 text-[#42946E] border border-[#367859]"
                              : video.difficulty === "Advanced"
                              ? "bg-[#3D1E56]/95 text-[#A667E4] border border-[#853BCE]/60"
                              : "bg-[#3A351E]/95 text-[#B5A642] border border-[#B5A642]/60"
                          }`}
                        >
                          {video.difficulty} {video.cefr ? `• ${video.cefr}` : ""}
                        </span>
                      </div>
                    )}

                    {video.snippet?.thumbnails?.high?.url ? (
                      <Image
                        src={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                        width={320}
                        height={180}
                        unoptimized
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#2E2E2E] flex items-center justify-center text-[#7A7A7A] text-xs font-mono">
                        No Preview
                      </div>
                    )}

                    {/* Overlay with Play Button */}
                    <div className="absolute inset-0 bg-[#1F132A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 bg-[#B5A642] rounded-sm flex items-center justify-center shadow-lg">
                        <Play className="text-[#1F132A] fill-[#1F132A] ml-0.5" size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Video Title */}
                <h3 className="mt-2.5 text-[#E9E1D4] text-xs font-mono font-bold line-clamp-2 leading-snug group-hover:text-[#B5A642] transition-colors">
                  {video.snippet?.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
