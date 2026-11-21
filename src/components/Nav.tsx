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
      <nav className="sticky top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-3.5 flex items-center justify-between z-40 bg-[#1F132A] border-b border-[#3A3A3A] text-[#E9E1D4]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            width={34}
            height={34}
            alt="logo"
            className="rounded-sm border border-[#3A3A3A]"
          />
          <span className="font-bold font-mono text-[#E9E1D4] tracking-wider hidden sm:inline text-base uppercase">
            Shadowing<span className="text-[#B5A642]">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="text-[#E9E1D4]/80 md:flex hidden items-center gap-8 font-mono text-xs uppercase tracking-wider">
          <li>
            <Link href="/" className="hover:text-[#B5A642] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Topics" className="hover:text-[#B5A642] transition-colors">
              Topics
            </Link>
          </li>
          <li>
            <Link href="/Vocabulary" className="hover:text-[#B5A642] transition-colors">
              Vocabulary
            </Link>
          </li>
          <li>
            <button
              onClick={() => setCustomOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2E2E2E] border border-[#3A3A3A] text-[#B5A642] hover:bg-[#B5A642] hover:text-[#1F132A] transition-colors text-xs font-mono font-bold uppercase cursor-pointer"
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
                className="flex items-center gap-2.5 px-3 py-1.5 bg-[#2E2E2E] border border-[#3A3A3A] hover:border-[#B5A642] rounded-sm transition-colors"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={20}
                    height={20}
                    className="rounded-sm"
                    alt="avatar"
                  />
                ) : (
                  <UserIcon size={16} className="text-[#B5A642]" />
                )}
                <span className="text-xs font-mono text-[#E9E1D4] max-w-[120px] truncate">
                  {session.user?.name}
                </span>
              </Link>
              <button
                onClick={() => signOut()}
                className="p-1.5 rounded-sm bg-[#2E2E2E] text-[#E9E1D4]/70 hover:text-[#8C2727] hover:border-[#8C2727] transition-colors border border-[#3A3A3A] cursor-pointer"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-[#E9E1D4]/80 hover:text-[#B5A642] text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-[#B5A642] text-[#1F132A] hover:bg-[#c4b54e] rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Get started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          aria-label="menu"
          className="md:hidden text-[#E9E1D4] p-1.5 rounded-sm border border-[#3A3A3A]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full left-0 w-full p-6 md:hidden border-b border-[#3A3A3A] bg-[#1F132A] text-[#E9E1D4]">
            <ul className="flex flex-col gap-4 text-[#E9E1D4]/90 font-mono text-xs uppercase tracking-wider">
              <li>
                <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#B5A642]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Topics" onClick={() => setOpen(false)} className="hover:text-[#B5A642]">
                  Topics
                </Link>
              </li>
              <li>
                <Link href="/Vocabulary" onClick={() => setOpen(false)} className="hover:text-[#B5A642]">
                  Vocabulary
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    setCustomOpen(true);
                  }}
                  className="flex items-center gap-2 text-[#B5A642] font-mono text-xs uppercase font-bold"
                >
                  <Plus size={14} />
                  <span>Practice Custom Video</span>
                </button>
              </li>
            </ul>

            {session ? (
              <div className="mt-5 pt-5 border-t border-[#3A3A3A] space-y-3">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 bg-[#2E2E2E] border border-[#3A3A3A] rounded-sm"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      width={32}
                      height={32}
                      className="rounded-sm"
                      alt="avatar"
                    />
                  ) : (
                    <UserIcon size={20} className="text-[#B5A642]" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-[#E9E1D4] text-xs font-mono">{session.user?.name}</p>
                    <p className="text-[11px] text-[#7A7A7A] font-mono">{session.user?.email}</p>
                  </div>
                  <ArrowRight size={14} className="text-[#7A7A7A]" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2E2E2E] text-[#8C2727] hover:bg-[#8C2727] hover:text-[#E9E1D4] rounded-sm text-xs font-mono uppercase font-bold border border-[#3A3A3A] transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div className="mt-5 pt-5 border-t border-[#3A3A3A] flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2E2E2E] text-[#E9E1D4] rounded-sm text-xs font-mono uppercase border border-[#3A3A3A]"
                >
                  <LogIn size={14} /> Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#B5A642] text-[#1F132A] font-bold font-mono text-xs uppercase rounded-sm text-center"
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
