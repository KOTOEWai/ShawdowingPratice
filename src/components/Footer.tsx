import React from 'react';
import { Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';




export default function Footer() {
  return (
    <footer className="bg-slate-950/60 backdrop-blur-2xl border-t border-white/5 text-slate-400 pt-24 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand အပိုင်း */}
          <div className="space-y-4">

            <p className="text-sm leading-relaxed">
              အင်္ဂလိပ်စာ စကားပြောစွမ်းရည်ကို အချိန်တိုအတွင်း ထိရောက်စွာ တိုးတက်စေမည့် မြန်မာနိုင်ငံ၏ ပထမဆုံးသော Shadowing platform။
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/30 transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"><Github size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 uppercase tracking-widest">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-indigo-400 shrink-0" />
                <span className="leading-relaxed">No. 123, Pyay Road, Kamayut Township, Yangon.</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-indigo-400 shrink-0" />
                <span>+95 9 123 456 789</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-indigo-400 shrink-0" />
                <span>support@shadowing.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 text-center text-xs text-slate-500 font-bold tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Shadowing App. All rights reserved. Designed for Myanmar Students.</p>
        </div>
      </div>
    </footer>
  )
}
