import Link from "next/link";
import { Disc3, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#2E2E2E] min-h-[85vh] text-[#E9E1D4] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1F132A] border border-[#3A3A3A] p-6 sm:p-8 rounded-sm shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#2E2E2E] border border-[#B5A642]/40 flex items-center justify-center text-[#B5A642] animate-spin-slow">
            <Disc3 size={32} />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#B5A642] uppercase font-bold">
            [ Error 404 // Lost Track ]
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-[#E9E1D4] uppercase">
            Lesson Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7A7A] font-mono leading-relaxed">
            The lesson ID or topic you are trying to access doesn&apos;t exist or might have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/Topics"
            className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-[#B5A642] text-[#1F132A] hover:bg-[#B5A642]/90 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Compass size={14} />
            <span>Explore Practice Topics</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] text-[#E9E1D4] text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
