import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3 Click Infographics — Turn Topics Into Infographics",
  description: "Turn topics into infographics with 3 clicks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen">{children}</body>
    </html>
  );
}
