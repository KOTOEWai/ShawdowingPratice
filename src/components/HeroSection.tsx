import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';
export default function HeroSection() {
  return (
    <section className="relative bg-transparent py-24 px-6 lg:px-20 overflow-hidden">
      {/* Background Decor - အရောင်ပြေးလေးတွေ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content - စာသားပိုင်း */}
        <div className="z-10 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 mb-8 text-sm font-bold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            Master English Fluency
          </span>
          <h1 className="text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8">
            Speak like a <span className="text-gradient">Native Speaker</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Practice shadowing with real-world videos. Improve your accent, rhythm, and confidence in minutes a day.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <button className="group flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30">
              စတင် လေ့ကျင့် မယ် <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="flex items-center justify-center gap-3 px-10 py-5 glass-card text-white font-black rounded-2xl hover:bg-white/10 transition-all">
              Watch Demo <Play size={20} className="fill-white" />
            </button>
          </div>
        </div>

        {/* Right Content - Visual/Preview အပိုင်း */}
        <div className="relative z-10 group">
          <div className="relative overflow-hidden rounded-[2.5rem] border-[12px] border-slate-900/50 bg-slate-900 shadow-3xl transition-transform duration-700 group-hover:scale-[1.03] group-hover:-rotate-1">
            {/* ဒီနေရာမှာ သင့် App ရဲ့ Screenshot ဒါမှမဟုတ် Video ထည့်ပါ */}
            <div className=" bg-slate-800 flex items-center justify-center aspect-video">
              <Image src="/shawdow.jpg" width={600} height={500} alt='shadowHeroImage' className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Floating Card အသေးလေးတွေ */}
          <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-3xl hidden md:block animate-bounce shadow-indigo-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 text-2xl font-black">A+</div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Fluency Score</p>
                <p className="font-black text-white text-lg">98% Match</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
