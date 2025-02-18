import React from "react";
import { HomeNavbar } from "./components/home-navbar";
import { TemplatesGallery } from "./components/templates-gallery";
import ThemeToggle from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed top-0 inset-x-0 z-10 h-16">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
      </div>
      <ThemeToggle className="fixed bottom-5 right-5" />
    </main>
  );
}
