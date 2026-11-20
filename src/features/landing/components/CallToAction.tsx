import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl bg-[#1F132A] border border-[#33323E] p-10 sm:p-16 lg:p-20 overflow-hidden shadow-2xl">
          {/* Ambient Purple Glow inside card */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#853BCE]/18 rounded-full blur-[140px] pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#553F83]/15 rounded-full blur-[140px] pointer-events-none -z-0" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 bg-[#13111C] border border-[#853BCE]/40 rounded-full">
              <Sparkles size={14} className="text-[#A667E4]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#DCDCE0]">
                Start Today for Free
              </span>
            </div>

            <h2 className="hero-headline text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.1] mb-6">
              Ready to Speak English with <span className="text-gradient italic">Natural Confidence</span>?
            </h2>

            <p className="text-base sm:text-lg text-[#A1A0AB] mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of learners training their ears, mouth, and pronunciation daily. Experience the proven power of the shadowing technique.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link
                href="/register"
                className="btn-railway-primary w-full sm:w-auto px-8 py-3.5 text-base font-medium flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link
                href="/Pricing"
                className="btn-railway-secondary w-full sm:w-auto px-8 py-3.5 text-base font-medium flex items-center justify-center gap-2"
              >
                View Plans & Pricing
              </Link>
            </div>

            {/* Micro value props */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-[#A1A0AB] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#42946E]" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#42946E]" /> Free daily practice lessons
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#42946E]" /> Real-time Gemini AI scoring
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
