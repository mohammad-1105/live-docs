import { Logo } from "@/components/logo";
import { DocumentInput } from "./document-input";
import { DocumentMenubar } from "./document-menubar";

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
    </nav>
  );
}
