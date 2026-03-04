"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, LogIn, ArrowRight } from "lucide-react";
export default function Nav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex items-center justify-between z-50 glass-card border-x-0 border-t-0 rounded-none bg-slate-950/60">

      {/* Logo */}
      <Link href="/">
        <Image src={'/logo.jpg'}
          width={40}
          height={40}
          alt="logo"
          className="rounded" />
      </Link>

      {/* Desktop Menu */}
      <ul className="text-slate-200 md:flex hidden items-center gap-10 font-medium">
        <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
        <li><Link href="/Topics" className="hover:text-indigo-400 transition-colors">Topics</Link></li>
        <li><Link href="/Vocabulary" className="hover:text-indigo-400 transition-colors">Vocabulary</Link></li>
        <li><Link href="/Pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
      </ul>

      {/* Desktop Button / User Profile */}
      <div className="md:flex hidden items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              {session.user?.image ? (
                <Image src={session.user.image} width={24} height={24} className="rounded-full" alt="avatar" />
              ) : (
                <UserIcon size={20} className="text-indigo-400" />
              )}
              <span className="text-sm font-bold text-white max-w-[100px] truncate">{session.user?.name}</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-200 hover:text-indigo-400 font-bold transition-colors">
              Login
            </Link>
            <Link href="/register" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm px-8 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform">
              Get started
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Button */}
      <button
        aria-label="menu"
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full glass-card p-6 md:hidden border-x-0 border-b-0 rounded-none bg-slate-900/95 animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-6 text-slate-200 font-medium">
            <li><Link href="/" onClick={() => setOpen(false)} className="hover:text-indigo-400">Home</Link></li>
            <li><Link href="/Topics" onClick={() => setOpen(false)} className="hover:text-indigo-400">Topics</Link></li>
            <li><Link href="/Vocabulary" onClick={() => setOpen(false)} className="hover:text-indigo-400">Vocabulary</Link></li>
            <li><Link href="/Pricing" onClick={() => setOpen(false)} className="hover:text-indigo-400">Pricing</Link></li>
          </ul>

          {session ? (
            <div className="mt-8 space-y-4">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-4 glass-card border-white/10 rounded-2xl hover:bg-white/5 transition-all"
              >
                {session.user?.image ? (
                  <Image src={session.user.image} width={40} height={40} className="rounded-full" alt="avatar" />
                ) : (
                  <UserIcon size={32} className="text-indigo-400" />
                )}
                <div className="flex-1">
                  <p className="font-black text-white">{session.user?.name}</p>
                  <p className="text-xs text-slate-500">{session.user?.email}</p>
                </div>
                <ArrowRight size={18} className="text-slate-500" />
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-center gap-3 py-4 bg-rose-600/20 text-rose-400 rounded-2xl font-bold border border-rose-500/20"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/10"
              >
                <LogIn size={20} /> Login ဝင်မယ်
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
