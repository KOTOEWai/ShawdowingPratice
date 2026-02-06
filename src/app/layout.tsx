import type { Metadata } from "next";

import "./globals.css";
import Nav from "@/components/Nav";




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
        className={` antialiased`}
      >
        <Nav/>
        {children}
      </body>
    </html>
  );
}
