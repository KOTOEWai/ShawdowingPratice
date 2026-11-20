"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, BriefcaseBusiness, GraduationCap, MessageSquareText } from "lucide-react";

const TOPICS = [
  { id: "movie", label: "Short Movies", slug: "shortMovies", icon: Clapperboard },
  { id: "daily", label: "Daily English", slug: "dailyEnglish", icon: MessageSquareText },
  { id: "business", label: "Business", slug: "business", icon: BriefcaseBusiness },
  { id: "ielts", label: "IELTS", slug: "ielts", icon: GraduationCap },
];

export default function TopicsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#13111C]">
      {/* Side Navigation (Desktop) */}
      <aside className="w-64 border-r border-[#33323E] bg-[#1F132A]/30 p-6 sticky top-0 h-screen hidden lg:block">
        <h2 className="text-base font-semibold text-white mb-6 uppercase tracking-wider">Learning Hub</h2>
        <nav className="space-y-1.5">
          {TOPICS.map((topic) => {
            const isActive = pathname.includes(topic.slug);
            const Icon = topic.icon;
            return (
              <Link
                key={topic.id}
                href={`/Topics/${topic.slug}`}
                className={`flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#853BCE] text-white shadow-md shadow-[#853BCE]/30"
                    : "text-[#A1A0AB] hover:bg-[#1F132A] hover:text-white"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-4 h-4 mr-3 ${isActive ? "text-white" : "text-[#A667E4]"}`}
                  />
                )}
                {topic.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#13111C]/95 backdrop-blur-lg border-t border-[#33323E] px-2 py-3 flex justify-around items-center z-50">
        {TOPICS.map((topic) => {
          const isActive = pathname.includes(topic.slug);
          const Icon = topic.icon;
          return (
            <Link
              key={topic.id}
              href={`/Topics/${topic.slug}`}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-[#A667E4]" : "text-[#6C6B7B]"
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
