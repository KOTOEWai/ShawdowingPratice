import React from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Michael Chen",
    role: "IELTS Student",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&s",
    content:
      "I could read English well, but my spoken cadence felt stiff and unnatural. Daily shadowing with this platform improved my rhythm and helped me achieve Band 8 in IELTS Speaking.",
    rating: 5,
  },
  {
    name: "Sophia Rose",
    role: "Intermediate Learner",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&s",
    content:
      "Repeating after authentic native videos while receiving real-time AI accuracy scores is unmatched. The interactive transcript makes dictionary lookups completely effortless.",
    rating: 5,
  },
  {
    name: "David Miller",
    role: "Business Professional",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&s",
    content:
      "Leading international meetings and speaking with overseas clients used to make me nervous. Shadowing has given me genuine confidence in my spoken English.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-[#A667E4] font-mono tracking-widest uppercase text-xs mb-3">
            Real Stories
          </h2>
          <h3 className="hero-headline text-3xl sm:text-5xl font-normal text-white">
            What Our <span className="text-gradient italic">Learners Say</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative p-7 sm:p-8 rounded-xl bg-[#1F132A] border border-[#33323E] hover:border-[#853BCE]/40 transition-all duration-300 hover:-translate-y-1 shadow-xl group overflow-hidden"
            >
              {/* Quote Icon Background */}
              <Quote
                className="absolute top-6 right-6 text-white/5 group-hover:text-[#853BCE]/10 transition-all duration-300 rotate-12"
                size={48}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-[#DCDCE0] text-sm leading-relaxed mb-8 font-normal italic relative z-10">
                &quot;{item.content}&quot;
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3.5">
                <Image
                  src={item.image}
                  width={44}
                  height={44}
                  alt={item.name}
                  className="w-11 h-11 rounded-lg border border-[#33323E] object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                  <p className="text-[11px] text-[#A667E4] font-mono uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
