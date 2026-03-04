"use client";

import Link from "next/link";
import React from "react";
import { Check, Zap, Crown, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const pricingTiers = [
    {
        name: "Free",
        price: "0",
        description: "စတင်လေ့လာသူများအတွက် အကန့်အသတ်ဖြင့် အခမဲ့",
        icon: <Star className="text-slate-400" size={24} />,
        features: [
            "Daily 3 Videos access",
            "Basic Shadowing tool",
            "Community support",
            "Standard audio quality"
        ],
        buttonText: "အခုပဲ စမ်းသုံးမယ်",
        highlight: false,
        delay: 0.1
    },
    {
        name: "Pro",
        price: "9,900",
        description: "ပိုမိုထိရောက်စွာ လေ့ကျင့်လိုသူများအတွက်",
        icon: <Zap className="text-indigo-400" size={24} />,
        features: [
            "Unlimited Videos access",
            "AI Voice Feedback (100/mo)",
            "Vocabulary Saving (SRS)",
            "High-quality audio",
            "Ad-free experience"
        ],
        buttonText: "Pro ကို ရယူမယ်",
        highlight: true,
        delay: 0.2
    },
    {
        name: "Premium",
        price: "19,900",
        description: "Fluency ကို အမြန်ဆုံး ရောက်ရှိလိုသူများအတွက်",
        icon: <Crown className="text-amber-400" size={24} />,
        features: [
            "Everything in Pro",
            "Unlimited AI Feedback",
            "Offline Practice Mode",
            "Priority Lesson access",
            "Personalized Progress report"
        ],
        buttonText: "Premium ဝယ်ယူမယ်",
        highlight: false,
        delay: 0.3
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-transparent py-24 px-6 lg:px-20 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[-20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[-20%] w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full"
                    >
                        Flexible Pricing
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-black text-white mb-8"
                    >
                        Choose Your <span className="text-gradient">Plan</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        သင့်ရဲ့ Skill level နဲ့ လိုအပ်ချက်ပေါ်မူတည်ပြီး ကြိုက်နှစ်သက်ရာ Plan ကို ရွေးချယ်နိုင်ပါတယ်။ Professional လို ကျွမ်းကျင်ဖို့ အခုပဲ စတင်လိုက်ပါ။
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: tier.delay, duration: 0.6 }}
                            className={`relative flex flex-col p-10 rounded-[2.5rem] glass-card border-white/5 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)] group ${tier.highlight ? "border-indigo-500/30 scale-105 z-10 bg-slate-900/60 shadow-2xl shadow-indigo-500/10" : ""
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tier.highlight ? "bg-indigo-500/20" : "bg-white/5"}`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                                <p className="text-slate-400 text-sm font-medium">{tier.description}</p>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-white">{tier.price}</span>
                                    <span className="text-slate-500 font-bold">Ks / month</span>
                                </div>
                            </div>

                            <ul className="flex-1 space-y-5 mb-12">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center gap-3 group/item">
                                        <div className={`p-1 rounded-full ${tier.highlight ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-slate-500"}`}>
                                            <Check size={14} />
                                        </div>
                                        <span className="text-slate-300 font-medium group-hover/item:text-white transition-colors">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${tier.highlight
                                ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30"
                                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                                }`}>
                                {tier.buttonText} <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Support Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-32 text-center p-12 glass-card rounded-[3rem] border-white/5"
                >
                    <h2 className="text-3xl font-black text-white mb-6">လုပ်ဆောင်ရတာ အခက်အခဲရှိနေပါသလား?</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium">
                        ငွေပေးချေမှုမှာဖြစ်စေ၊ အသုံးပြုရတာမှာဖြစ်စေ အကူအညီလိုအပ်ပါက ကျွန်ုပ်တို့ရဲ့ Support Team ကို အချိန်မရွေး ဆက်သွယ်နိုင်ပါတယ်။
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/" className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10">
                            Message Us
                        </Link>
                        <Link href="/" className="px-10 py-4 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 font-bold rounded-2xl transition-all border border-indigo-500/20">
                            User Guide
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
