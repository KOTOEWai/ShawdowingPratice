import React from 'react';
import {  Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';
export default function HeroSection() {
  return (
      <section className="relative bg-white py-20 px-6 lg:px-20 overflow-hidden">
      {/* Background Decor - အရောင်ပြေးလေးတွေ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-100 h-100 bg-blue-400 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-purple-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content - စာသားပိုင်း */}
        <div className="z-10 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
            Master English Fluency
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            Speak like a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Native Speaker</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0">
            Practice shadowing with real-world videos. Improve your accent, rhythm, and confidence in minutes a day.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              စတင် လေ့ကျင့် မယ် <ArrowRight size={20} />
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-100 hover:border-blue-200 transition-all">
              Watch Demo <Play size={20} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Right Content - Visual/Preview အပိုင်း */}
        <div className="relative z-10 group">
          <div className="relative overflow-hidden rounded-3xl border-8 border-slate-900 bg-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
             {/* ဒီနေရာမှာ သင့် App ရဲ့ Screenshot ဒါမှမဟုတ် Video ထည့်ပါ */}
            <div className=" bg-slate-800 flex items-center justify-center">
                 <Image src="/shawdow.jpg" width={500} height={400} alt='shadowHeroImage'/>
            </div>
          </div>
          
          {/* Floating Card အသေးလေးတွေ */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl font-bold">A+</div>
                <div>
                    <p className="text-xs text-slate-500">Fluency Score</p>
                    <p className="font-bold text-slate-800">98% Match</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
