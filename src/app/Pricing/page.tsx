"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Check, Zap, Crown, Star, ArrowRight, Sparkles, ShieldCheck, ZapIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const pricingTiers = [
  {
    name: "Starter",
    priceMonthly: "0",
    priceYearly: "0",
    description: "Essential shadowing tools for beginners",
    icon: <Star className="text-[#82AAFF]" size={22} />,
    features: [
      "Access to 3 Daily Lessons",
      "Interactive Transcript Sync",
      "Standard Audio Quality",
      "Community Dashboard Access",
      "Progress Tracking (Limited)",
    ],
    buttonText: "Start for Free",
    highlight: false,
  },
  {
    name: "Pro",
    priceMonthly: "9,900",
    priceYearly: "8,250",
    description: "The best choice for accelerated fluency",
    icon: <Zap className="text-[#A667E4]" size={22} />,
    features: [
      "Unlimited Lessons Access",
      "Interactive Audio Sync & Loops",
      "Smart Vocabulary SRS Flashcards",
      "High Fidelity Audio (HD)",
      "Daily Goal Reminders",
      "No Third Party Ads",
    ],
    buttonText: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Ultimate",
    priceMonthly: "19,900",
    priceYearly: "16,500",
    description: "For serious learners seeking mastery",
    icon: <Crown className="text-amber-400" size={22} />,
    features: [
      "Everything in Pro",
      "Offline Mode for Mobile",
      "Exclusive Masterclasses",
      "Personalized Learning Path",
      "Priority VIP Support",
      "Early Access to New Topics",
    ],
    buttonText: "Get Ultimate",
    highlight: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="relative min-h-screen bg-[#13111C] py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Nocturnal Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] -left-[5%] w-[45vw] h-[45vw] bg-[#853BCE]/12 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] -right-[10%] w-[35vw] h-[35vw] bg-[#553F83]/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 mt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 bg-[#1F132A] border border-[#853BCE]/30 rounded-full">
            <Sparkles size={14} className="text-[#A667E4]" />
            <span className="text-xs font-medium uppercase tracking-wider text-[#DCDCE0]">
              Flexible Subscription Plans
            </span>
          </div>

          <h1 className="hero-headline text-4xl sm:text-6xl lg:text-7xl font-normal text-white mb-5 tracking-tight leading-none">
            Unlock <span className="text-gradient font-medium italic">Fluency</span>
          </h1>

          <p className="text-base sm:text-lg text-[#A1A0AB] max-w-2xl mx-auto font-normal">
            Choose the plan that fits your learning pace and advance your spoken English with confidence.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <span
              className={`text-sm font-medium transition-colors ${
                billingCycle === "monthly" ? "text-white font-semibold" : "text-[#A1A0AB]"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-14 h-8 bg-[#1F132A] border border-[#33323E] rounded-full p-1 relative transition-colors cursor-pointer"
            >
              <motion.div
                animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-[#853BCE] rounded-full shadow-md"
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium transition-colors ${
                  billingCycle === "yearly" ? "text-white font-semibold" : "text-[#A1A0AB]"
                }`}
              >
                Yearly
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#26543F] text-[#42946E] border border-[#367859] rounded-full">
                Save 17%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-8 flex flex-col transition-all duration-300 border ${
                tier.highlight
                  ? "bg-[#1F132A] border-[#853BCE] shadow-2xl shadow-[#853BCE]/20 md:-translate-y-2"
                  : "bg-[#181622] border-[#33323E] hover:border-[#853BCE]/40 shadow-xl"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#853BCE] text-white text-[11px] font-mono uppercase tracking-wider font-semibold rounded-full shadow-lg shadow-[#853BCE]/40">
                  Most Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#13111C] border border-[#33323E] flex items-center justify-center">
                  {tier.icon}
                </div>
                <h3 className="text-xl font-medium text-white">{tier.name}</h3>
              </div>

              <p className="text-xs text-[#A1A0AB] mb-6 min-h-[32px]">{tier.description}</p>

              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billingCycle}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {billingCycle === "monthly" ? tier.priceMonthly : tier.priceYearly}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[#6C6B7B] font-mono text-xs uppercase tracking-wider">
                        MMK / mo
                      </span>
                      {billingCycle === "yearly" && tier.priceYearly !== "0" && (
                        <span className="text-[#A667E4] text-[10px] font-medium">Billed annually</span>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="h-px w-full bg-[#33323E] mb-8" />

              <ul className="flex-1 space-y-4 mb-10">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 p-0.5 rounded-full ${
                        tier.highlight ? "text-[#A667E4]" : "text-[#42946E]"
                      }`}
                    >
                      <Check size={16} />
                    </div>
                    <span className="text-[#DCDCE0] text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  tier.highlight
                    ? "btn-railway-primary"
                    : "btn-railway-secondary hover:bg-white/5"
                }`}
              >
                <span>{tier.buttonText}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Pro Benefits Banner */}
        <div className="mt-24 p-8 sm:p-12 rounded-xl bg-[#1F132A] border border-[#33323E] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="hero-headline text-2xl sm:text-3xl font-normal text-white mb-4">
                Why upgrade to Pro?
              </h2>
              <p className="text-[#A1A0AB] mb-8 leading-relaxed text-sm sm:text-base">
                Get unlimited practice, real-time sentence loops, and advance your spoken English faster with Pro.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Smart Progress Tracking", icon: <ShieldCheck className="text-[#42946E]" size={20} /> },
                  { title: "Interactive Shadowing Loops & Audio Sync", icon: <Sparkles className="text-[#A667E4]" size={20} /> },
                  { title: "Priority Support 24/7", icon: <ZapIcon className="text-[#82AAFF]" size={20} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#13111C] rounded-lg flex items-center justify-center border border-[#33323E]">
                      {item.icon}
                    </div>
                    <span className="text-white text-sm font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative p-6 rounded-xl bg-[#181622] border border-[#33323E]">
                <div className="text-center py-8">
                  <div className="text-[#A667E4] text-xs font-mono font-bold tracking-widest uppercase mb-2">
                    Learning Effectiveness
                  </div>
                  <div className="text-5xl font-extrabold text-white">95%</div>
                  <div className="text-[#6C6B7B] text-xs font-medium mt-2">Average Spoken Fluency Gain</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="mt-20 text-center pb-12">
          <h3 className="text-lg font-medium text-white mb-6">
            Have questions about our plans?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="btn-railway-secondary px-8 py-3 text-sm font-medium rounded-lg"
            >
              Contact Support
            </Link>
            <Link
              href="/Topics"
              className="btn-railway-primary px-8 py-3 text-sm font-medium rounded-lg"
            >
              Explore Lessons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
