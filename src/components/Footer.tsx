import React from "react";
import { Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#13111C] border-t border-[#33323E] text-[#A1A0AB] pt-20 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg tracking-tight">
              Shadowing<span className="text-[#853BCE]">.</span>
            </h3>
            <p className="text-sm leading-relaxed text-[#A1A0AB]">
              Accelerate your English speaking fluency through modern shadowing techniques and interactive native video practice.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#1F132A] border border-[#33323E] flex items-center justify-center text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#1F132A] border border-[#33323E] flex items-center justify-center text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#1F132A] border border-[#33323E] flex items-center justify-center text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#1F132A] border border-[#33323E] flex items-center justify-center text-[#A1A0AB] hover:text-white hover:border-[#853BCE]/50 transition-all"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
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
                <Link href="/Pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#853BCE] shrink-0 mt-0.5" />
                <span className="leading-snug">Global Online Platform</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#853BCE] shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#853BCE] shrink-0" />
                <span>support@shadowing.app</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#33323E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6C6B7B] gap-4">
          <p>© {new Date().getFullYear()} Shadowing App. All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#42946E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#42946E] animate-pulse" />
            <span>Systems Normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
