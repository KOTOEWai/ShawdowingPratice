import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { AuthProvider } from "@/features/auth";

export const viewport: Viewport = {
  themeColor: "#1F132A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shawdowing-pratice.vercel.app"),
  title: {
    default: "Shadowing App - Master English Fluency",
    template: "%s | Shadowing English",
  },
  description: "Learn English speaking fluency with sentence-by-sentence shadowing using real-world videos, auto-pause step practice, and instant accent comparison.",
  keywords: ["English Shadowing", "Pronunciation", "IELTS Speaking", "BBC 6 Minute English", "Voice Accent Test", "Learn English"],
  authors: [{ name: "Shadowing App" }],
  openGraph: {
    title: "Shadowing App - Master English Fluency",
    description: "Sentence-by-sentence YouTube shadowing with instant accent feedback and smart auto-pause practice.",
    siteName: "Shadowing App",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadowing App - Master English Fluency",
    description: "Sentence-by-sentence YouTube shadowing with instant accent feedback and smart auto-pause practice.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#2E2E2E] text-[#E9E1D4] min-h-screen font-mono selection:bg-[#B5A642] selection:text-[#1F132A]">
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
