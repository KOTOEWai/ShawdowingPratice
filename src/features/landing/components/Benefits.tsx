import React from "react";
import { Zap, Volume2, Target, Smartphone } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Natural Accent",
      description: "Master native pronunciation, cadence, and rhythm by shadowing authentic real-world speakers.",
      icon: <Volume2 className="text-[#82AAFF]" size={24} />,
      bg: "bg-[#306EE8]/15 border-[#306EE8]/30",
    },
    {
      title: "Synced Transcripts",
      description: "Follow every word in real time with line-by-line audio synchronization and instant dictionary lookup.",
      icon: <Target className="text-[#A667E4]" size={24} />,
      bg: "bg-[#853BCE]/15 border-[#853BCE]/30",
    },
    {
      title: "Rapid Progress",
      description: "Experience noticeable improvements in speaking confidence with just 15 minutes of daily practice.",
      icon: <Zap className="text-amber-400" size={24} />,
      bg: "bg-amber-500/15 border-amber-500/30",
    },
    {
      title: "Learn Anywhere",
      description: "Practice seamlessly across desktop, tablet, or smartphone anytime at your own pace.",
      icon: <Smartphone className="text-[#42946E]" size={24} />,
      bg: "bg-[#26543F]/40 border-[#42946E]/30",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="hero-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-4">
            Why Practice <span className="text-gradient italic">Shadowing</span>?
          </h2>
          <p className="text-[#A1A0AB] max-w-xl mx-auto text-base">
            The proven technique used by polyglots and language experts to build effortless spoken fluency.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#1F132A] border border-[#33323E] hover:border-[#853BCE]/50 p-7 rounded-xl transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/40"
            >
              <div
                className={`w-12 h-12 rounded-lg border ${benefit.bg} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}
              >
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-[#A1A0AB] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
