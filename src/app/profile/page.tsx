"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
    User as UserIcon,
    Settings,
    BookOpen,
    Flame,
    Award,
    Clock,
    Calendar,
    ChevronRight,
    Shield,
    CreditCard,
    Bell
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        redirect("/login");
    }

    const stats = [
        { label: "Lessons Done", value: "12", icon: <BookOpen className="text-indigo-400" />, color: "indigo" },
        { label: "Day Streak", value: "5", icon: <Flame className="text-orange-400" />, color: "orange" },
        { label: "Achievements", value: "8", icon: <Award className="text-amber-400" />, color: "amber" },
        { label: "Hours Studied", value: "4.5", icon: <Clock className="text-cyan-400" />, color: "cyan" }
    ];

    return (
        <div className="min-h-screen bg-transparent pt-28 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Sidebar - Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="glass-card p-8 rounded-[3rem] border-white/5 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[50px] -z-10 group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/5 shadow-2xl mx-auto bg-slate-800 flex items-center justify-center">
                                    {session.user?.image ? (
                                        <Image src={session.user.image} alt="Profile" width={128} height={128} className="object-cover" />
                                    ) : (
                                        <UserIcon size={64} className="text-slate-500" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center border-4 border-slate-950 shadow-lg text-white">
                                    <Flame size={18} />
                                </div>
                            </div>

                            <h2 className="text-2xl font-black text-white mb-2">{session.user?.name}</h2>
                            <p className="text-slate-400 text-sm font-medium mb-8">{session.user?.email}</p>

                            <div className="flex flex-col gap-3">
                                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/20">
                                    Edit Profile
                                </button>
                                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5">
                                    Subscription Plan
                                </button>
                            </div>
                        </div>

                        {/* Account Menu */}
                        <div className="glass-card p-6 rounded-[2.5rem] border-white/5">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 px-4">Account Settings</h3>
                            <div className="space-y-2">
                                {[
                                    { label: "Notification Settings", icon: <Bell size={18} /> },
                                    { label: "Security & Privacy", icon: <Shield size={18} /> },
                                    { label: "Billing & Payment", icon: <CreditCard size={18} /> },
                                    { label: "Application Settings", icon: <Settings size={18} /> }
                                ].map((item, i) => (
                                    <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group">
                                        <div className="flex items-center gap-4 text-slate-300 group-hover:text-white transition-colors">
                                            <div className="p-2 transition-colors">
                                                {item.icon}
                                            </div>
                                            <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-8 space-y-8"
                    >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group">
                                    <div className="mb-4 p-3 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Activity Chart Placeholder */}
                        <div className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">Learning Activity</h3>
                                    <p className="text-slate-400 text-sm font-medium">လက်ရှိတစ်ပတ်အတွင်း သင်ယူမှုမှတ်တမ်း</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-2xl text-slate-400">
                                    <Calendar size={20} />
                                </div>
                            </div>

                            <div className="h-64 flex items-end justify-between gap-4 py-4">
                                {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.1, duration: 1 }}
                                            className={`w-full max-w-[40px] rounded-2xl relative transition-all duration-500 overflow-hidden ${h > 75 ? "bg-indigo-600" : "bg-white/10"
                                                }`}
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                                        </motion.div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievement Highlights */}
                        <div className="glass-card p-10 rounded-[3rem] border-white/5">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-white">Latest Achievements</h3>
                                <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                    View all <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Fast Learner", desc: "Complete 5 lessons in a day", color: "indigo" },
                                    { title: "Voice Master", desc: "Get 90%+ accuracy in 10 shadows", color: "amber" }
                                ].map((ach, i) => (
                                    <div key={i} className="flex items-center gap-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 group hover:bg-white/10 transition-all cursor-default">
                                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${ach.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                            <Award size={32} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white text-lg mb-1">{ach.title}</h4>
                                            <p className="text-slate-500 text-sm font-medium">{ach.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
