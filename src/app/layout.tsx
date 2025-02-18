import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import ThemeToggle from "@/components/theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Live Docs",
  description: "Docs like google docs and microsoft word",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className}  antialiased `}>
        <Providers>
          {children}

          <ThemeToggle className="absolute bottom-5 right-5" />
        </Providers>
      </body>
    </html>
  );
}
