import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <main className="container px-10 py-16 ">{children}</main>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
