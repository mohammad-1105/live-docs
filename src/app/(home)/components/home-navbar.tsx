"use client";

import { Logo } from "@/components/logo";
import { SearchInput } from "./search-input";
import { UserButton } from "@clerk/clerk-react";
export function HomeNavbar() {
  return (
    <nav className="flex items-center justify-between size-full px-4">
      <span className="flex items-center gap-3 select-none shrink-0 pr-5">
        <Logo />
        <h3>Live Docs</h3>
      </span>
      <SearchInput />
      <div>
        <UserButton/>
      </div>
    </nav>
  );
}
