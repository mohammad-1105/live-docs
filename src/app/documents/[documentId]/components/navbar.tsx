"use client";

import { Logo } from "@/components/logo";
import { DocumentInput } from "./document-input";
import { DocumentMenubar } from "./document-menubar";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import { Avatars } from "./avatars";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Logo />
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <DocumentMenubar />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <Avatars />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}
