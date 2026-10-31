import type { Metadata } from "next";
import "./globals.css";
import "./dashboard-polish.css";
import "./resolve-system.css";
import {ProductApp} from '@/components/experience';

export const metadata: Metadata = {
  title: "ResolveAI — Support, in harmony",
  description: "AI-powered customer support, with humans when it matters. Explore the ResolveAI support operating system.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><ProductApp/></body>
    </html>
  );
}
