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
        description: "စတင်လေ့လာသူများအတွက် အခြေခံအဆင့်",
        icon: <Star className="text-slate-400" size={24} />,
        features: [
            "Access to 3 Daily Lessons",
            "Basic Shadowing Toolkit",
            "Standard Audio Quality",
            "Community Dashboard Access",
            "Progress Tracking (Limited)"
        ],
        buttonText: "Free နဲ့ စတင်မယ်",
        highlight: false,
        color: "slate"
    },
    {
        name: "Pro Professional",
        priceMonthly: "9,900",
        priceYearly: "8,250",
        description: "ကျွမ်းကျင်မှုအတွက် အကောင်းဆုံးရွေးချယ်မှု",
        icon: <Zap className="text-indigo-400" size={24} />,
        features: [
            "Unlimited Lessons Access",
            "AI Voice Feedback (Normal)",
            "Smart Vocabulary SRS",
            "High Fidelity Audio (HD)",
            "Daily Goal Reminders",
            "No Third Party Ads"
        ],
        buttonText: "Pro ကို ရယူမယ်",
        highlight: true,
        color: "indigo"
    },
    {
        name: "Ultimate Elite",
        priceMonthly: "19,900",
        priceYearly: "16,500",
        description: "အတားအဆီးမရှိ လေ့လာချင်သူများအတွက်",
        icon: <Crown className="text-amber-400" size={24} />,
        features: [
            "Everything in Pro",
            "Unlimited AI Feedback",
            "Offline Mode for Mobile",
            "Exclusive Masterclasses",
            "Personalized Learning Path",
            "Priority VIP Support"
        ],
        buttonText: "Ultimate ဝယ်ယူမယ်",
        highlight: false,
        color: "amber"
    }
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="relative min-h-screen bg-transparent py-20 px-4 md:px-8 lg:px-16 overflow-hidden font-sans">
            {/* Dynamic Background Blurs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[5%] w-[40vw] h-[40vw] bg-indigo-600/15 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] -right-[10%] w-[35vw] h-[35vw] bg-violet-600/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute bottom-0 left-[20%] w-[50vw] h-[30vw] bg-cyan-600/5 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 mt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 mb-8 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl"
                    >
                        <Sparkles size={16} className="text-amber-400" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">New Plans Available</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none"
                    >
                        Unlock <span className="text-gradient">Fluency</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium"
                    >
                        သင့်ရဲ့ အင်္ဂလိပ်စာ အရည်အချင်းကို နောက်တစ်ဆင့် တက်လှမ်းဖို့ အကောင်းဆုံး Plan ကို ရွေးချယ်ပါ။
                    </motion.p>

                    {/* Billing Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 flex items-center justify-center gap-4"
                    >
                        <span className={`text-sm font-bold transition-colors ${billingCycle === "monthly" ? "text-white" : "text-slate-500"}`}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                            className="relative w-16 h-8 bg-white/10 rounded-full p-1 transition-all border border-white/5"
                        >
                            <motion.div
                                animate={{ x: billingCycle === "monthly" ? 0 : 32 }}
                                className="w-6 h-6 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                            />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold transition-colors ${billingCycle === "yearly" ? "text-white" : "text-slate-500"}`}>Yearly</span>
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-md border border-emerald-500/20 uppercase">Save 20%</span>
                        </div>
                    </motion.div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-6">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            whileHover={{ y: -8 }}
                            className={`relative group flex flex-col p-1 bg-gradient-to-b ${tier.highlight ? "from-indigo-500/30 to-transparent" : "from-white/5 to-transparent"} rounded-[3rem] transition-all`}
                        >
                            <div className={`flex flex-col h-full bg-slate-950/80 backdrop-blur-3xl rounded-[2.9rem] p-8 md:p-10 border border-white/5`}>
                                {tier.highlight && (
                                    <div className="absolute -top-4 right-10 px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full shadow-xl shadow-indigo-600/30 tracking-widest uppercase">
                                        Recommended
                                    </div>
                                )}

                                <div className="mb-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tier.highlight ? "bg-indigo-600/20" : "bg-white/5"}`}>
                                        {tier.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">{tier.description}</p>
                                </div>

                                <div className="mb-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={billingCycle}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex items-baseline gap-2"
                                        >
                                            <span className="text-5xl font-black text-white tracking-tighter">
                                                {billingCycle === "monthly" ? tier.priceMonthly : tier.priceYearly}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">KS / per mo</span>
                                                {billingCycle === "yearly" && tier.priceYearly !== "0" && (
                                                    <span className="text-indigo-400 text-[10px] font-bold">Billed annually</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="h-px w-full bg-white/5 mb-10" />

                                <ul className="flex-1 space-y-5 mb-12">
                                    {tier.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-4 group/item">
                                            <div className={`mt-1 p-0.5 rounded-full ${tier.highlight ? "bg-indigo-500/20 text-indigo-400 font-bold" : "bg-white/5 text-slate-500"}`}>
                                                <Check size={16} />
                                            </div>
                                            <span className="text-slate-300 text-sm font-medium group-hover/item:text-white transition-colors">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`relative overflow-hidden w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all group/btn ${tier.highlight
                                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                    }`}>
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {tier.buttonText} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                    {tier.highlight && (
                                        <motion.div
                                            animate={{ x: ["-100%", "200%"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                        />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Feature Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 lg:p-16 rounded-[4rem] glass-card border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Why upgrade to Pro?</h2>
                            <p className="text-slate-400 font-medium mb-10 leading-relaxed text-lg">
                                အင်္ဂလိပ်စာ လေ့ကျင့်ရာမှာ အကန့်အသတ်မရှိဘဲ လွတ်လပ်စွာ လုပ်ဆောင်နိုင်ဖို့အတွက် Pro Plan က အကောင်းဆုံး အထောက်အကူပြုမှာပါ။
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Smart Progress tracking", icon: <ShieldCheck className="text-emerald-400" /> },
                                    { title: "AI-Powered Instant Feedback", icon: <Sparkles className="text-amber-400" /> },
                                    { title: "Priority Support 24/7", icon: <ZapIcon className="text-indigo-400" /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                                            {item.icon}
                                        </div>
                                        <span className="text-white font-bold">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] rounded-full" />
                            <div className="relative glass-card p-4 rounded-[2rem] border-white/10">
                                <div className="w-full h-64 bg-slate-900/50 rounded-[1.5rem] flex items-center justify-center border border-white/5">
                                    <div className="text-center">
                                        <div className="text-indigo-400 text-sm font-bold animate-pulse mb-2 tracking-widest">SYSTEM ANALYSIS</div>
                                        <div className="text-5xl font-black text-white">95%</div>
                                        <div className="text-slate-500 text-xs font-bold mt-2">AVG. FLUENCY GAIN</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ - Quick Contact */}
                <div className="mt-24 text-center pb-20">
                    <h3 className="text-xl font-bold text-slate-300 mb-6 font-medium tracking-wide">
                        မေးမြန်းလိုသည်များ ရှိပါသလား?
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/" className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10">
                            Messenger ကနေ မေးမယ်
                        </Link>
                        <Link href="/" className="px-10 py-4 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 font-bold rounded-2xl transition-all border border-indigo-500/20">
                            Payment Guide
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
