import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gagan Deep Singh | Full Stack Developer",
  description: "Full Stack Developer with expertise in React, Node.js, and TypeScript. Creating scalable web applications and optimizing system performance.",
  keywords: ["Full Stack Developer", "React", "Node.js", "TypeScript", "Web Development", "Software Engineer"],
  authors: [{ name: "Gagan Deep Singh" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: {
      rel: "mask-icon",
      url: "/favicon.svg",
      color: "#4F46E5"
    }
  },
  openGraph: {
    title: "Gagan Deep Singh | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies and scalable solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gagan Deep Singh | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies and scalable solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
