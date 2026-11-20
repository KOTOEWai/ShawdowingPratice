"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, LogIn, ArrowRight, Plus } from "lucide-react";
import { CustomVideoModal } from "@/features/shadowing";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <CustomVideoModal isOpen={customOpen} onClose={() => setCustomOpen(false)} />
      <nav className="sticky top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-3.5 flex items-center justify-between z-40 bg-[#13111C]/85 backdrop-blur-md border-b border-[#33323E]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            width={36}
            height={36}
            alt="logo"
            className="rounded-md border border-[#33323E]"
          />
          <span className="font-semibold text-white tracking-tight hidden sm:inline text-base">
            Shadowing<span className="text-[#853BCE]">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="text-[#DCDCE0] md:flex hidden items-center gap-8 font-medium text-sm">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Topics" className="hover:text-white transition-colors">
              Topics
            </Link>
          </li>
          <li>
            <Link href="/Vocabulary" className="hover:text-white transition-colors">
              Vocabulary
            </Link>
          </li>
          <li>
            <button
              onClick={() => setCustomOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F132A] border border-[#853BCE]/40 text-[#A667E4] hover:text-white hover:border-[#853BCE] transition-all text-xs font-mono cursor-pointer"
            >
              <Plus size={13} />
              <span>Custom Video</span>
            </button>
          </li>
        </ul>

      {/* Desktop Button / User Profile */}
      <div className="md:flex hidden items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#1F132A] border border-[#33323E] hover:border-[#853BCE]/50 rounded-lg transition-all"
            >
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  width={22}
                  height={22}
                  className="rounded-full"
                  alt="avatar"
                />
              ) : (
                <UserIcon size={18} className="text-[#A667E4]" />
              )}
              <span className="text-sm font-medium text-white max-w-[120px] truncate">
                {session.user?.name}
              </span>
            </Link>
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg bg-[#1F132A] text-[#A1A0AB] hover:text-[#FFFFFF] hover:bg-[#33323E] transition-all border border-[#33323E]"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-[#DCDCE0] hover:text-white text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn-railway-primary text-sm px-5 py-2 rounded-lg font-medium tracking-tight shadow-md"
            >
              Get started
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Button */}
      <button
        aria-label="menu"
        className="md:hidden text-white p-1.5 rounded-lg border border-[#33323E]"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full p-6 md:hidden border-b border-[#33323E] bg-[#13111C]/95 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-5 text-[#DCDCE0] font-medium text-sm">
            <li>
              <Link href="/" onClick={() => setOpen(false)} className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Topics" onClick={() => setOpen(false)} className="hover:text-white">
                Topics
              </Link>
            </li>
            <li>
              <Link href="/Vocabulary" onClick={() => setOpen(false)} className="hover:text-white">
                Vocabulary
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  setCustomOpen(true);
                }}
                className="flex items-center gap-2 text-[#A667E4] font-medium"
              >
                <Plus size={16} />
                <span>Practice Custom Video</span>
              </button>
            </li>
            <li>
              <Link href="/Pricing" onClick={() => setOpen(false)} className="hover:text-white">
                Pricing
              </Link>
            </li>
          </ul>

          {session ? (
            <div className="mt-6 pt-6 border-t border-[#33323E] space-y-4">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3.5 bg-[#1F132A] border border-[#33323E] rounded-lg hover:border-white/20 transition-all"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={36}
                    height={36}
                    className="rounded-full"
                    alt="avatar"
                  />
                ) : (
                  <UserIcon size={24} className="text-[#A667E4]" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{session.user?.name}</p>
                  <p className="text-xs text-[#A1A0AB]">{session.user?.email}</p>
                </div>
                <ArrowRight size={16} className="text-[#A1A0AB]" />
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-center gap-2.5 py-3 bg-[#1F132A] text-rose-400 hover:text-white hover:bg-rose-900/30 rounded-lg text-sm font-medium border border-rose-500/20 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t border-[#33323E] flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1F132A] text-white rounded-lg text-sm font-medium border border-[#33323E]"
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 btn-railway-primary text-sm font-medium rounded-lg text-center"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
    </>
  );
}
