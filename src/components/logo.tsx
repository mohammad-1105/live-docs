"use client"

import { SignatureIcon } from "lucide-react";
import Image from "next/image";

export function Logo() {
  return (
    <span
      onClick={() => window.location.reload()}
      className="hover:cursor-pointer"
    >
      <Image
        src="/assets/logo.svg"
        alt="logo"
        width={40}
        height={40}
        className="hover:cursor-pointer"
      />
    </span>
  );
}
