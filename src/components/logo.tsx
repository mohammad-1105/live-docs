"use client";

import { SignatureIcon } from "lucide-react";

export function Logo() {
  return (
    <span
      onClick={() => window.location.reload()}
      className="hover:cursor-pointer p-2"
    >
      <SignatureIcon className="size-6 relative" />
    </span>
  );
}
