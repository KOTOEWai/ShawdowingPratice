"use client";

import { motion } from "framer-motion";
import { Play, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { high: { url: string } };
    resourceId: { videoId: string };
  };
}

type DetailAllProps = {
  videos: Video[];
  title?: string;
};

export default function DetailAll({ videos, title }: DetailAllProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-[#2E2E2E] min-h-screen py-8 px-4 sm:px-6 lg:px-12 text-[#E9E1D4]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/Topics"
            className="p-2 bg-[#1F132A] hover:bg-[#3A3A3A] border border-[#3A3A3A] hover:border-[#B5A642] rounded-sm text-[#E9E1D4] transition-colors"
          >
            <MoveLeft size={16} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E9E1D4] uppercase">{title}</h1>
        </div>

        {/* Header note */}
        <div className="border-l-2 border-[#B5A642] pl-3 py-1">
          <p className="text-[#7A7A7A] text-xs font-mono">
            Improve your English with {title} lessons. All lessons strictly structured for shadowing focus.
          </p>
        </div>

        {/* Grid */}
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
                    {video.snippet.title}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
