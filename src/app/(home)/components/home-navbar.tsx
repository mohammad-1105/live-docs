"use client";

import { Logo } from "@/components/logo";
import Link from "next/link";
import { SearchInput } from "./search-input";

export function HomeNavbar() {
  return (
    <nav className="flex items-center justify-between size-full">
      <span className="flex items-center gap-3 select-none shrink-0 pr-5">
        <Logo />
        <h3>Live Docs</h3>
      </span>
      <SearchInput />
      <div />
    </nav>
  );
}
