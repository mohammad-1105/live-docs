import { Editor } from "./components/editor";
import { Navbar } from "./components/navbar";
import { Room } from "./components/room";
import { Toolbar } from "./components/toolbar";

export default function DocumentPage() {
  return (
    <div>
      <div className="flex flex-col w-full px-4 pt-2 gap-y-2 fixed top-0 inset-x-0 z-[10] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
}
