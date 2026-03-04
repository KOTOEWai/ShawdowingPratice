import type { Metadata } from "next";

import "./globals.css";
import Nav from "@/components/Nav";
import AuthProvider from "@/components/AuthProvider";





export const metadata: Metadata = {
  title: "Shawdowing App",
  description: "This is a shadowing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-mesh min-h-screen font-sans`}
      >
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
