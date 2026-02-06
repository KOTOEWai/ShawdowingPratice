"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative w-full px-6 md:px-16 lg:px-24 xl:px-32 h-17.5 flex items-center justify-between z-30 bg-linear-to-r from-indigo-700 to-violet-500">

      {/* Logo */}
      <Link href="/">
         <Image src={'/logo.jpg'}
          width={40}
          height={40}
         alt="logo" 
         className="rounded"/>
      </Link>

      {/* Desktop Menu */}
      <ul className="text-white md:flex hidden items-center gap-10">
        <li><Link href="/" className="hover:text-white/70">Home</Link></li>
        <li><Link  href="/Topics" className="hover:text-white/70">Topics</Link></li>
        <li><Link href="/Vocabulary" className="hover:text-white/70">Vocabulary</Link></li>
        <li><Link href="/" className="hover:text-white/70">Pricing</Link></li>
      </ul>

      {/* Desktop Button */}
      <button className="bg-white text-gray-700 md:inline hidden text-sm w-40 h-11 rounded-full">
        Get started
      </button>

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
        <div className="absolute top-17.5 left-0 w-full bg-linear-to-r from-indigo-700 to-violet-500 p-6 md:hidden">
          <ul className="flex flex-col gap-4 text-white">
            <li>Home</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>Pricing</li>
          </ul>

          <button className="bg-white text-gray-700 mt-6 w-40 h-11 rounded-full">
            Get started
          </button>
        </div>
      )}
    </nav>
  );
}
