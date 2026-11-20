"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Shadowing?",
    answer:
      "Shadowing is an advanced language learning technique where you listen to native speech and repeat it immediately with minimal delay, mirroring the speaker's accent, rhythm, and intonation.",
  },
  {
    question: "Do I need an internet connection?",
    answer:
      "Yes, an internet connection is required to stream real-world practice videos and access interactive shadowing transcripts.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "Absolutely. Our curriculum offers progressive lessons ranging from everyday conversational English to advanced professional topics.",
  },
  {
    question: "How do I practice shadowing effectively?",
    answer:
      "Listen to each sentence, use the Replay or Loop controls to practice along with the native speaker, and click any unfamiliar word to view instant dictionary definitions.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 bg-[#1F132A] rounded-xl flex items-center justify-center text-[#A667E4] border border-[#33323E]">
              <HelpCircle size={24} />
            </div>
          </div>
          <h2 className="hero-headline text-3xl sm:text-4xl font-normal text-white mb-3">
            Frequently Asked <span className="text-gradient italic">Questions</span>
          </h2>
          <p className="text-[#A1A0AB] text-base">
            Everything you need to know about the Shadowing platform and learning method.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1F132A] rounded-xl overflow-hidden transition-all duration-300 border border-[#33323E]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-5 sm:p-6 text-left transition-all duration-200 ${
                  openIndex === index ? "bg-[#181622]" : "hover:bg-white/5"
                }`}
              >
                <span
                  className={`text-base font-medium transition-colors ${
                    openIndex === index ? "text-white" : "text-[#DCDCE0]"
                  }`}
                >
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#A667E4] shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-[#6C6B7B] shrink-0" size={20} />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-[#A1A0AB] border-t border-[#33323E] text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
