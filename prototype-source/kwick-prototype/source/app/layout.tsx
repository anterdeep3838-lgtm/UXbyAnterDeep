import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KwicK — Home services, clearly handled",
  description: "A premium home-service booking experience for India.",
  icons: {
    icon: "/kwick-icon.png",
    shortcut: "/kwick-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
