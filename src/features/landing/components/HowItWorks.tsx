import React from "react";
import { Headphones, Mic, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Listen & Understand",
    subtitle: "Real-world context",
    description:
      "Select an authentic native video. Follow along with interactive synchronized transcripts and look up unknown definitions instantly with one click.",
    icon: <Headphones className="text-[#82AAFF]" size={24} />,
    tag: "Synchronized Audio",
    tagColor: "bg-[#306EE8]/15 text-[#82AAFF] border-[#306EE8]/30",
  },
  {
    step: "02",
    title: "Shadow & Record",
    subtitle: "Train mouth & tongue muscles",
    description:
      "Repeat sentence-by-sentence immediately behind the native speaker. Mirror their pitch, speed, and sentence rhythm using our built-in voice recorder.",
    icon: <Mic className="text-[#A667E4]" size={24} />,
    tag: "Native Mirroring",
    tagColor: "bg-[#853BCE]/15 text-[#A667E4] border-[#853BCE]/30",
  },
  {
    step: "03",
    title: "Instant AI Feedback",
    subtitle: "Word-by-word accuracy score",
    description:
      "Google Gemini AI analyzes your pronunciation in seconds, highlighting missed words, intonation, and providing clear accuracy percentages.",
    icon: <Sparkles className="text-[#42946E]" size={24} />,
    tag: "Gemini Analysis",
    tagColor: "bg-[#26543F] text-[#42946E] border-[#367859]/40",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 lg:px-20 relative overflow-hidden">
      {/* Background Nocturnal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#853BCE]/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 bg-[#1F132A] border border-[#853BCE]/30 rounded-full">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A667E4]">
              The Shadowing Method
            </span>
          </div>
          <h2 className="hero-headline text-3xl sm:text-5xl font-normal text-white mb-4">
            How It Works in <span className="text-gradient italic">3 Simple Steps</span>
          </h2>
          <p className="text-[#A1A0AB] text-base max-w-xl mx-auto">
            A science-backed neuro-linguistic technique designed to bridge the gap between understanding English and speaking it effortlessly.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-[#1F132A] border border-[#33323E] hover:border-[#853BCE]/50 p-8 rounded-xl transition-all duration-300 group hover:-translate-y-1.5 shadow-xl relative flex flex-col justify-between"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#13111C] border border-[#33323E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#6C6B7B] group-hover:text-[#A667E4] transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-mono border mb-4 ${item.tagColor}`}>
                  {item.tag}
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#A667E4] mb-3">{item.subtitle}</p>
                <p className="text-[#A1A0AB] text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#33323E] flex items-center justify-between text-xs text-[#6C6B7B] group-hover:text-white transition-colors">
                <span className="font-mono">Step {item.step} of 03</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-14 text-center">
          <Link
            href="/Topics"
            className="btn-railway-primary inline-flex items-center gap-2 px-7 py-3 text-sm font-medium"
          >
            Try a Free Practice Lesson <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
