"use client"


import { VideoItem } from '@/app/Types/Type'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'



export default function Topic({ videos }: { videos: VideoItem[] }) {

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Card တစ်ခုချင်းစီကို အစဉ်လိုက် ပေါ်လာစေရန်
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className=" ">
      <div className="max-w-7xl mx-auto">


        {/* Video Grid */}
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

              whileHover={{ y: -8 }} // Hover လုပ်လျှင် အပေါ်သို့ ကြွတက်ခြင်း
              className="group cursor-pointer"
            >
              <Link href={`/lessons/shadowing/${video.snippet.resourceId.videoId}`}>
                {/* Thumbnail Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-slate-800/50 shadow-2xl glass-card">
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay with Play Button */}
                  <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-14 h-14 bg-indigo-600/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)] transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play className="text-white fill-white ml-1" size={24} />
                    </div>
                  </div>


                </div>
              </Link>
              {/* Video Title */}
              <h3 className="mt-4 text-slate-300 text-sm font-bold line-clamp-2 leading-relaxed group-hover:text-indigo-400 transition-colors">
                {video.snippet.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}