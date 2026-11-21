import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { AuthProvider } from "@/features/auth";

export const metadata: Metadata = {
  title: "Shadowing App - Master English Fluency",
  description: "Learn English with the Shadowing Method using real-world videos and AI voice analysis.",
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
