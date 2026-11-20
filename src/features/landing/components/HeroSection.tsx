import React from "react";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-transparent py-24 px-6 lg:px-20 overflow-hidden">
      {/* Background Decor - Railway subtle twilight glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[550px] h-[550px] bg-[#853BCE]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#553F83]/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 text-xs font-medium tracking-wide text-[#A667E4] bg-[#1F132A] border border-[#853BCE]/30 rounded-full shadow-sm">
            <Sparkles size={14} className="text-[#A667E4]" />
            <span>Master English Fluency with Shadowing</span>
          </div>

          <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] mb-6">
            Speak like a <span className="text-gradient font-medium italic">Native Speaker</span>
          </h1>

          <p className="text-lg text-[#A1A0AB] mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
            Listen, shadow, and master spoken English fluency with interactive synchronized transcripts in minutes a day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/Topics"
              className="btn-railway-primary group flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-medium"
            >
              Start Practice
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
            <Link
              href="/lessons/shadowing/Rnwwo9Zol6w"
              className="btn-railway-secondary flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-medium"
            >
              <Play size={16} className="fill-white" /> Watch Demo
            </Link>
          </div>
        </div>

        {/* Right Content - Preview Card */}
        <div className="relative z-10 group">
          <div className="relative overflow-hidden rounded-xl border border-[#33323E] bg-[#1F132A] shadow-2xl transition-all duration-500 group-hover:border-[#853BCE]/40">
            <div className="bg-[#181622] flex items-center justify-center aspect-video overflow-hidden">
              <Image
                src="/shawdow.jpg"
                width={640}
                height={360}
                alt="Shadowing Preview"
                className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700"
              />
            </div>
          </div>

          {/* Floating Fluency Badge */}
          <div className="absolute -bottom-6 -left-6 bg-[#1F132A]/90 backdrop-blur-xl border border-[#33323E] p-4 rounded-xl hidden md:flex items-center gap-3.5 shadow-2xl shadow-black/80">
            <div className="w-10 h-10 bg-[#853BCE]/20 border border-[#853BCE]/40 rounded-lg flex items-center justify-center text-[#A667E4] text-lg font-bold font-mono">
              A+
            </div>
            <div>
              <p className="text-[11px] text-[#A1A0AB] uppercase tracking-wider font-medium">Fluency Match</p>
              <p className="font-semibold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#42946E]" /> 98% Accuracy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
