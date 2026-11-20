import React from "react";
import { Sparkles, Video, Users, CheckCircle2 } from "lucide-react";

const stats = [
  {
    label: "Curated Native Lessons",
    value: "500+",
    icon: <Video size={18} className="text-[#82AAFF]" />,
    detail: "Movies, IELTS, Daily & Business",
  },
  {
    label: "AI Pronunciation Accuracy",
    value: "98%",
    icon: <Sparkles size={18} className="text-[#A667E4]" />,
    detail: "Powered by Google Gemini",
  },
  {
    label: "Daily Study Routine",
    value: "15 min",
    icon: <CheckCircle2 size={18} className="text-[#42946E]" />,
    detail: "Bite-sized high-retention sessions",
  },
  {
    label: "Vocabulary SRS Bank",
    value: "10,000+",
    icon: <Users size={18} className="text-amber-400" />,
    detail: "Interactive flashcard memory engine",
  },
];

export default function StatsBar() {
  return (
    <section className="relative border-y border-[#33323E] bg-[#1F132A]/40 backdrop-blur-md py-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#13111C] border border-[#33323E] flex items-center justify-center shrink-0 group-hover:border-[#853BCE]/40 transition-colors">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-[#DCDCE0]">{stat.label}</div>
              <div className="text-[11px] text-[#6C6B7B] hidden sm:block mt-0.5">{stat.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
