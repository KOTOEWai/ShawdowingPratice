"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Topic from '@/components/Topic';
import Link from 'next/link';
import { TopicPageProps} from '../Types/Type';

// Category Tag များကို Object Array ပြောင်းခြင်း (Filtering လုပ်ရလွယ်စေရန်)
const CATEGORIES = [
  { id: "all", label: "All topics" },
  { id: "movie", label: "Movie short clip" },
  { id: "daily", label: "Daily English" },
  { id: "business", label: "Business English" },
  { id: "ielts", label: "IELTS Listening" },
];

export default function TopicPage({ movieVideos, dailyVideos, business, ielts }: TopicPageProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter Logic: ရွေးထားတဲ့ Tag အပေါ်မူတည်ပြီး ပြရမယ့် Array ကို စစ်ထုတ်ခြင်း
  const sections = useMemo(() => [
    { id: "movie", title: "Movie short clip", link: "/Topics/shortMovies", data: movieVideos },
    { id: "daily", title: "Daily English Conversation", link: "/Topics/dailyEnglish", data: dailyVideos },
    { id: "business", title: "Business English", link: "/Topics/business", data: business },
    { id: "ielts", title: "IELTS Listening", link: "/Topics/ielts", data: ielts },
  ], [movieVideos, dailyVideos, business, ielts]);

  const filteredSections = activeFilter === "all" 
    ? sections 
    : sections.filter(s => s.id === activeFilter);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- ၁။ Dynamic Header --- */}
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {activeFilter === "all" ? "All Topics" : activeFilter + " Lessons"}
        </h1>

        {/* --- ၂။ Animated Filter Tags --- */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all  duration-300 border ${
                activeFilter === cat.id 
                ? "border-blue-500 text-white" 
                : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {/* ရွေးထားတဲ့ Tag အနောက်က Active Background Animation */}
              {activeFilter === cat.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* --- ၃။ Animated Category Rows --- */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {filteredSections.map((section) => (
              <motion.section 
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 border-b border-slate-800 pb-6"
              >
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <h2 className="text-xl font-bold">
                    {section.title} 
                    <span className="text-blue-400 text-sm font-normal ml-2">(100+ lessons)</span>
                  </h2>
                  <Link href={section.link} className="text-blue-400 text-sm hover:underline">
                    View all &gt;
                  </Link>
                </div>
                <Topic videos={section.data} />
              </motion.section>
            ))}
          </AnimatePresence>
          
          {/* No Results Found (If any) */}
          {filteredSections.length === 0 && (
            <p className="text-slate-500 text-center py-20">No topics found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}