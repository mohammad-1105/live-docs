"use client";
import React from "react";
import { HomeNavbar } from "./components/home-navbar";
import { TemplatesGallery } from "./components/templates-gallery";
import ThemeToggle from "@/components/theme-toggle";
import {usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./components/documents-table";
export default function HomePage() {
  const { isLoading, loadMore, results, status } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 }
  );

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed top-0 inset-x-0 z-10 h-16">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          isLoading={isLoading}
          loadMore={loadMore}
          status={status}
        />
      </div>
      <ThemeToggle className="fixed bottom-5 right-5" />
    </main>
  );
}
