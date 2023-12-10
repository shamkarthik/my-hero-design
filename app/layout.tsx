import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/favicon-A.png",
        href: "/images/favicon-A.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/favicon-B.png",
        href: "/images/favicon-B.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container px-4 pt-24 md:px-10 md:py-16 ">
            {children}
          </main>
          <footer className=" flex flex-col md:flex-row justify-between gap-10 px-10 py-10">
            <div className="p-10 rounded-2xl border border-black drop-shadow-solid flex flex-col gap-5 justify-between">
              <Link href="/">
                {/* <Image src={logo} alt="Logo" /> */}
                LOGO
              </Link>
            </div>
            {/* <SocialLinks /> */}
          </footer>
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
