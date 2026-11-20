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
    <div className="bg-[#13111C] min-h-screen py-10 px-6 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/Topics"
            className="p-2 bg-[#1F132A] hover:bg-[#33323E] border border-[#33323E] rounded-lg transition-colors"
          >
            <MoveLeft className="text-white" size={18} />
          </Link>
          <h1 className="hero-headline text-2xl sm:text-3xl font-normal text-white">{title}</h1>
        </div>

        {/* Header */}
        <div className="mb-8 border-l-2 border-[#853BCE] pl-4">
          <p className="text-[#A1A0AB] text-xs sm:text-sm">
            Improve your English with {title} lessons. Shadowing practice for better fluency.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {videos?.map((video, index) => (
            <motion.div
              key={video.id?.videoId || index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
            >
              <Link href={`/lessons/shadowing/${video.snippet.resourceId.videoId}`}>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#33323E] bg-[#1F132A] group-hover:border-[#853BCE]/40 transition-all shadow-xl">
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[#13111C]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="w-12 h-12 bg-[#853BCE] rounded-full flex items-center justify-center shadow-lg shadow-[#853BCE]/40">
                      <Play className="text-white fill-white ml-0.5" size={18} />
                    </div>
                  </div>
                </div>

                <h3 className="mt-3 text-[#DCDCE0] text-xs sm:text-sm font-medium line-clamp-2 group-hover:text-[#A667E4] transition-colors leading-snug">
                  {video.snippet.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
