"use client";

import React, { useState, useEffect } from "react";
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
  Bell,
  Bookmark,
  Play,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { StreakTracker, loadStreakData, StreakData } from "@/features/shadowing";

interface SavedLesson {
  id: string;
  title: string;
  addedAt: string;
}

interface CompletedLesson {
  id: string;
  title: string;
  completedAt: string;
  masteredCount: number;
  totalLines: number;
  reason?: "mastery" | "playthrough" | "manual";
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [savedLessons, setSavedLessons] = useState<SavedLesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<CompletedLesson[]>([]);
  const [activeTab, setActiveTab] = useState<"completed" | "saved">("completed");
  const [streakData, setStreakData] = useState<StreakData>(loadStreakData);
  const [studyHours, setStudyHours] = useState("0.5");

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("saved_study_lessons") || "[]");
      setSavedLessons(list);

      const completed: CompletedLesson[] = JSON.parse(
        localStorage.getItem("completed_shadowing_lessons") || "[]"
      );
      setCompletedLessons(completed);

      const sData = loadStreakData();
      setStreakData(sData);

      const studySec = parseInt(localStorage.getItem("shadowing_study_seconds") || "0", 10);
      if (studySec > 0) {
        setStudyHours((studySec / 3600).toFixed(1));
      }
    } catch (e) {
      console.warn("Storage error:", e);
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#13111C] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#853BCE] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  const handleUncomplete = (e: React.MouseEvent, lessonId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const existing = JSON.parse(localStorage.getItem("completed_shadowing_lessons") || "[]");
      const updated = existing.filter((l: { id: string }) => l.id !== lessonId);
      localStorage.setItem("completed_shadowing_lessons", JSON.stringify(updated));
      setCompletedLessons(updated);
    } catch (err) {
      console.warn("Uncomplete error:", err);
    }
  };

  const handleRemoveSaved = (e: React.MouseEvent, lessonId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const existing = JSON.parse(localStorage.getItem("saved_study_lessons") || "[]");
      const updated = existing.filter((l: { id: string }) => l.id !== lessonId);
      localStorage.setItem("saved_study_lessons", JSON.stringify(updated));
      setSavedLessons(updated);
    } catch (err) {
      console.warn("Remove saved error:", err);
    }
  };

  const stats = [
    { label: "Lessons Done", value: String(completedLessons.length), icon: <BookOpen size={20} className="text-[#82AAFF]" /> },
    { label: "Day Streak", value: String(streakData.streak), icon: <Flame size={20} className="text-orange-400" /> },
    { label: "Mastered Lines", value: String(streakData.todayCount), icon: <Award size={20} className="text-[#A667E4]" /> },
    { label: "Hours Studied", value: studyHours, icon: <Clock size={20} className="text-[#42946E]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#13111C] text-[#DCDCE0] pt-12 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] bg-[#853BCE]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-[#553F83]/12 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-[#1F132A] border border-[#33323E] p-6 sm:p-8 rounded-xl text-center shadow-xl">
              <div className="relative inline-block mb-5">
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#33323E] shadow-xl mx-auto bg-[#181622] flex items-center justify-center">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon size={44} className="text-[#6C6B7B]" />
                  )}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#853BCE] rounded-lg flex items-center justify-center border-2 border-[#1F132A] shadow text-white">
                  <Flame size={14} />
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-1 tracking-tight">{session.user?.name}</h2>
              <p className="text-[#A1A0AB] text-xs font-mono mb-6">{session.user?.email}</p>

              <div className="flex flex-col gap-2.5">
                <button className="w-full py-2.5 btn-railway-primary text-xs sm:text-sm font-medium rounded-lg cursor-pointer">
                  Edit Profile
                </button>
                <Link
                  href="/Pricing"
                  className="w-full py-2.5 btn-railway-secondary text-xs sm:text-sm font-medium rounded-lg text-center"
                >
                  Subscription Plan
                </Link>
              </div>
            </div>

            {/* Account Menu */}
            <div className="bg-[#1F132A] border border-[#33323E] p-4 sm:p-5 rounded-xl shadow-xl">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-[#6C6B7B] mb-3 px-3">
                Account Settings
              </h3>
              <div className="space-y-1">
                {[
                  { label: "Notification Settings", icon: <Bell size={16} /> },
                  { label: "Security & Privacy", icon: <Shield size={16} /> },
                  { label: "Billing & Payment", icon: <CreditCard size={16} /> },
                  { label: "Application Settings", icon: <Settings size={16} /> },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-3 hover:bg-[#13111C] rounded-lg transition-all group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3 text-[#DCDCE0] group-hover:text-white">
                      <span className="text-[#A1A0AB] group-hover:text-[#A667E4]">{item.icon}</span>
                      <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-[#6C6B7B] group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#1F132A] border border-[#33323E] p-4 sm:p-5 rounded-xl shadow-xl group hover:border-[#853BCE]/40 transition-all"
                >
                  <div className="mb-3 p-2 bg-[#13111C] border border-[#33323E] rounded-lg w-fit">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-0.5 tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-[#A1A0AB]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 7-Day Flame & Streak Freeze Tracker */}
            <StreakTracker data={streakData} />

            {/* Lessons & Playlists Section */}
            <div className="bg-[#1F132A] border border-[#33323E] p-6 sm:p-8 rounded-xl shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#33323E]">
                {/* Tabs */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "completed"
                        ? "bg-[#853BCE] text-white shadow-lg shadow-[#853BCE]/25"
                        : "bg-[#13111C] text-[#A1A0AB] hover:text-white border border-[#33323E]"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                    <span>Completed Lessons</span>
                    <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-black/25">
                      {completedLessons.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("saved")}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "saved"
                        ? "bg-[#853BCE] text-white shadow-lg shadow-[#853BCE]/25"
                        : "bg-[#13111C] text-[#A1A0AB] hover:text-white border border-[#33323E]"
                    }`}
                  >
                    <Bookmark size={16} />
                    <span>Saved Playlist</span>
                    <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-black/25">
                      {savedLessons.length}
                    </span>
                  </button>
                </div>

                <Link href="/Topics" className="text-xs font-mono text-[#A667E4] hover:text-white transition-colors">
                  Browse Lessons ↗
                </Link>
              </div>

              {/* Tab 1: Completed Lessons */}
              {activeTab === "completed" && (
                <div>
                  {completedLessons.length === 0 ? (
                    <div className="p-8 rounded-lg bg-[#13111C] border border-dashed border-[#33323E] text-center">
                      <Trophy size={28} className="mx-auto text-[#6C6B7B] mb-2" />
                      <p className="text-xs sm:text-sm text-[#DCDCE0] font-medium mb-1">
                        No completed lessons yet
                      </p>
                      <p className="text-xs text-[#A1A0AB] max-w-sm mx-auto mb-4">
                        Master at least 80% of lines in a lesson or shadow through the full video to earn your completion badge.
                      </p>
                      <Link
                        href="/Topics"
                        className="inline-flex items-center gap-1.5 px-4 py-2 btn-railway-primary text-xs rounded-lg font-medium"
                      >
                        Start a Shadowing Lesson ↗
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {completedLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] hover:border-[#42946E]/50 transition-all group"
                        >
                          <Link
                            href={`/lessons/shadowing/${lesson.id}`}
                            className="flex items-center gap-3 flex-1 min-w-0"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#26543F]/60 border border-[#367859] flex items-center justify-center text-[#42946E] shrink-0">
                              <CheckCircle2 size={16} />
                            </div>
                            <div className="truncate">
                              <div className="text-xs sm:text-sm font-medium text-white group-hover:text-[#42946E] transition-colors truncate">
                                {lesson.title}
                              </div>
                              <div className="text-[10px] font-mono text-[#6C6B7B]">
                                {lesson.completedAt
                                  ? new Date(lesson.completedAt).toLocaleDateString()
                                  : "Completed"}
                                {lesson.reason && ` • by ${lesson.reason}`}
                              </div>
                            </div>
                          </Link>

                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <button
                              onClick={(e) => handleUncomplete(e, lesson.id)}
                              className="px-2 py-1 rounded bg-[#181622] hover:bg-rose-950/60 border border-[#33323E] hover:border-rose-500/50 text-[#6C6B7B] hover:text-rose-300 text-[10px] font-mono transition-all flex items-center gap-1 cursor-pointer"
                              title="Uncomplete and remove from completed records"
                            >
                              <RotateCcw size={11} />
                              <span className="hidden sm:inline">Uncomplete</span>
                            </button>
                            <Link
                              href={`/lessons/shadowing/${lesson.id}`}
                              className="text-[10px] font-mono text-[#42946E] hover:underline"
                            >
                              Practice ↗
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Saved Playlist */}
              {activeTab === "saved" && (
                <div>
                  {savedLessons.length === 0 ? (
                    <div className="p-8 rounded-lg bg-[#13111C] border border-dashed border-[#33323E] text-center text-xs text-[#A1A0AB]">
                      No saved lessons yet. Click the &quot;Save Lesson&quot; bookmark button on any shadowing video to build your study playlist.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {savedLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] hover:border-[#853BCE]/50 transition-all group"
                        >
                          <Link
                            href={`/lessons/shadowing/${lesson.id}`}
                            className="flex items-center gap-2.5 flex-1 min-w-0"
                          >
                            <Play size={14} className="text-[#A667E4] group-hover:translate-x-0.5 transition-transform shrink-0" />
                            <span className="text-xs sm:text-sm font-medium text-white group-hover:text-[#A667E4] truncate">
                              {lesson.title}
                            </span>
                          </Link>

                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <button
                              onClick={(e) => handleRemoveSaved(e, lesson.id)}
                              className="p-1.5 rounded hover:bg-rose-950/60 text-[#6C6B7B] hover:text-rose-400 transition-colors cursor-pointer"
                              title="Remove from playlist"
                            >
                              <Trash2 size={12} />
                            </button>
                            <Link
                              href={`/lessons/shadowing/${lesson.id}`}
                              className="text-[10px] font-mono text-[#6C6B7B] group-hover:text-white"
                            >
                              Practice ↗
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Activity Chart */}
            <div className="bg-[#1F132A] border border-[#33323E] p-6 sm:p-8 rounded-xl shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="hero-headline text-xl sm:text-2xl font-normal text-white mb-1">
                    Learning Activity
                  </h3>
                  <p className="text-[#A1A0AB] text-xs sm:text-sm">Weekly learning and study log</p>
                </div>
                <div className="p-2.5 bg-[#13111C] border border-[#33323E] rounded-lg text-[#A1A0AB]">
                  <Calendar size={18} />
                </div>
              </div>

              <div className="h-52 flex items-end justify-between gap-3 py-2">
                {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className={`w-full max-w-[36px] rounded-md transition-all ${
                        h > 75 ? "bg-[#853BCE] shadow-md shadow-[#853BCE]/30" : "bg-[#33323E]"
                      }`}
                    />
                    <span className="text-[10px] font-mono text-[#6C6B7B]">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Highlights */}
            <div className="bg-[#1F132A] border border-[#33323E] p-6 sm:p-8 rounded-xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="hero-headline text-xl sm:text-2xl font-normal text-white">
                  Recent Achievements
                </h3>
                <button className="text-[#A667E4] text-xs font-medium flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                  View all <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Fast Learner", desc: "Complete 5 lessons in a day", color: "purple" },
                  { title: "Streak Master", desc: "Maintain a 5+ day practice streak", color: "amber" },
                ].map((ach, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-[#13111C] rounded-lg border border-[#33323E] hover:border-[#853BCE]/40 transition-all"
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border ${
                        ach.color === "purple"
                          ? "bg-[#853BCE]/15 text-[#A667E4] border-[#853BCE]/30"
                          : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      <Award size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-0.5">{ach.title}</h4>
                      <p className="text-[#A1A0AB] text-xs">{ach.desc}</p>
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
