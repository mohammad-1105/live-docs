import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
        <ThemeProvider>
          <ConvexClientProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
