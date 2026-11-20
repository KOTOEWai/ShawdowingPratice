import React from "react";
import Link from "next/link";
import { Film, MessageSquare, Briefcase, GraduationCap, ArrowRight, Play } from "lucide-react";

const categories = [
  {
    title: "Movie Short Clips",
    subtitle: "Conversational Idioms & Pop Culture",
    icon: <Film size={22} className="text-[#82AAFF]" />,
    lessons: "100+ Lessons",
    slug: "shortMovies",
    badge: "Popular",
    description: "Learn natural slang, emotion, and everyday cultural idioms from popular films.",
  },
  {
    title: "Daily English",
    subtitle: "Real-Life Social Situations",
    icon: <MessageSquare size={22} className="text-[#A667E4]" />,
    lessons: "120+ Lessons",
    slug: "dailyEnglish",
    badge: "Essential",
    description: "Master cafe orders, small talk, travel scenarios, and casual friend conversations.",
  },
  {
    title: "Business English",
    subtitle: "Meetings, Negotiations & Pitches",
    icon: <Briefcase size={22} className="text-amber-400" />,
    lessons: "80+ Lessons",
    slug: "business",
    badge: "Career",
    description: "Professional vocabulary, formal email phrasing, and executive presentation cadence.",
  },
  {
    title: "IELTS Listening & Speaking",
    subtitle: "Academic Band 8+ Training",
    icon: <GraduationCap size={22} className="text-[#42946E]" />,
    lessons: "90+ Lessons",
    slug: "ielts",
    badge: "Exam Prep",
    description: "Complex sentence structures, academic discourse, and fluent monologue drills.",
  },
];

export default function FeaturedTopics() {
  return (
    <section className="py-20 px-6 lg:px-20 bg-[#1F132A]/20 border-t border-[#33323E]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 bg-[#1F132A] border border-[#33323E] rounded-full text-xs font-mono text-[#A667E4]">
              Curated Lesson Hub
            </div>
            <h2 className="hero-headline text-3xl sm:text-5xl font-normal text-white">
              Explore Practice <span className="text-gradient italic">Topics</span>
            </h2>
            <p className="text-[#A1A0AB] text-sm sm:text-base mt-2 max-w-lg">
              Choose from diverse native contexts tailored for your specific fluency goals.
            </p>
          </div>

          <Link
            href="/Topics"
            className="text-xs sm:text-sm font-medium text-[#A667E4] hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
          >
            View all categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/Topics/${cat.slug}`}
              className="bg-[#1F132A] border border-[#33323E] hover:border-[#853BCE]/50 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-lg bg-[#13111C] border border-[#33323E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#13111C] text-[#A667E4] border border-[#33323E]">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 tracking-tight group-hover:text-[#A667E4] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs font-mono text-[#6C6B7B] mb-3">{cat.lessons}</p>
                <p className="text-xs text-[#A1A0AB] leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#33323E] flex items-center justify-between text-xs font-medium text-[#DCDCE0] group-hover:text-[#A667E4] transition-colors">
                <span className="flex items-center gap-1.5">
                  <Play size={12} className="fill-current" /> Start Practice
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
