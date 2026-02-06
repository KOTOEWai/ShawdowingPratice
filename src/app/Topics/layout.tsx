// app/Topics/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard ,BriefcaseBusiness , GraduationCap,MessageSquareText  } from 'lucide-react';

const TOPICS = [
  { id: "movie", label: " Short Movies", slug: "shortMovies", icon:  Clapperboard },
  { id: "daily", label: " Daily English", slug: "dailyEnglish" , icon: MessageSquareText },
  { id: "business", label: "Business", slug: "business" , icon: BriefcaseBusiness },
  { id: "ielts", label: " IELTS", slug: "ielts"  , icon: GraduationCap },
];

export default function TopicsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* Side Navigation (Desktop) */}
      <aside className="w-64 border-r border-slate-800 p-6 sticky top-0 h-screen hidden lg:block">
        <h2 className="text-xl font-bold text-white mb-8">Learning Hub</h2>
        <nav className="space-y-2">
          {TOPICS.map((topic) => {
            const isActive = pathname.includes(topic.slug);
            const Icon = topic.icon;
            return (
              <Link
                key={topic.id}
                href={`/Topics/${topic.slug}`}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {Icon && <Icon className="w-5 h-5 mr-3 text-blue-600" />}
                {topic.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      {/* pb-24 ထည့်ခြင်းဖြင့် Mobile Nav bar က Content တွေကို ဖုံးမသွားအောင် လုပ်ပေးပါတယ် */}
      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-amber-50-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-3 flex justify-around items-center z-100 shadow-[0_-10px_20px_rgba(0,0,0,0.4)]">
        {TOPICS.map((topic) => {
          const isActive = pathname.includes(topic.slug);
          const Icon = topic.icon;
          return (
            <Link 
              key={topic.id} 
              href={`/Topics/${topic.slug}`} 
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-blue-500" : "text-slate-500"
              }`}
            >
              {Icon ? <Icon className="w-5 h-5" /> : null}
             
            </Link>
          );
        })}
      </nav>
    </div>
  );
}