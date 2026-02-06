"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from 'lucide-react';
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
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-[#0f172a] min-h-screen py-10 px-6 lg:px-20">
      
    <div className="flex items-center gap-4 mb-8">
    <Link href="/Topics" className="p-2 hover:bg-blue-700 rounded-full transition-colors">
      <MoveLeft className="text-white"/>
    </Link>
    <h1 className="text-3xl font-bold text-white">{title}</h1>
   </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-l-4 border-blue-600 pl-4">
          <div>
           
            <p className="text-slate-400 text-sm">
              Improve your English with {title} lessons. Shadowing practice for better fluency.
            </p>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {videos?.map((video, index) => (
            <motion.div
              key={video.id?.videoId || index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link
                href={`/lessons/shadowing/${video.snippet.resourceId.videoId}`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Play className="text-white fill-white" size={20} />
                    </div>
                  </div>
                </div>

                <h3 className="mt-4 text-slate-200 text-sm line-clamp-2 group-hover:text-blue-400">
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
