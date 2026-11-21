"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { LogIn, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center px-4 bg-[#13111C]">
      {/* Background Nocturnal Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-[#853BCE]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-[#553F83]/15 rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1F132A] border border-[#33323E] p-8 sm:p-10 rounded-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#853BCE]/15 border border-[#853BCE]/30 rounded-lg flex items-center justify-center text-[#A667E4] mx-auto mb-4">
            <LogIn size={22} />
          </div>
          <h1 className="hero-headline text-2xl sm:text-3xl font-normal text-white mb-2">Welcome Back</h1>
          <p className="text-[#A1A0AB] text-xs sm:text-sm">
            Sign in to your account to continue practicing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#DCDCE0]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6C6B7B]" size={16} />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-[#13111C] border border-[#33323E] rounded-lg py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-[#6C6B7B] focus:outline-none focus:border-[#853BCE] focus:ring-1 focus:ring-[#853BCE] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#DCDCE0]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6C6B7B]" size={16} />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-[#13111C] border border-[#33323E] rounded-lg py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-[#6C6B7B] focus:outline-none focus:border-[#853BCE] focus:ring-1 focus:ring-[#853BCE] transition-all"
              />
            </div>
          </div>

          {error && <p className="text-rose-400 text-xs font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 btn-railway-primary text-sm font-medium rounded-lg flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#33323E]" />
          <span className="text-[#6C6B7B] text-[11px] font-mono uppercase tracking-wider">Or continue with</span>
          <div className="h-px flex-1 bg-[#33323E]" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full mt-6 py-2.5 bg-[#13111C] border border-[#33323E] hover:border-white/20 text-[#DCDCE0] hover:text-white text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2.5"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 text-center text-[#A1A0AB] text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#A667E4] hover:text-white font-medium ml-1">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
