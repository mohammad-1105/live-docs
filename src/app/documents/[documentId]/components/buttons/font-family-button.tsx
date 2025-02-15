"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fonts } from "@/constants";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDownIcon } from "lucide-react";

export function FontFamilyButton() {
  const { editor } = useEditorStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
          <span className="truncate ">
            {editor?.getAttributes("textStyle").FontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col p-1 gap-y-1 max-h-48 overflow-y-auto">
        {fonts.map((font) => (
          <DropdownMenuItem key={font.label} asChild>
            <button
              className={cn(
                "flex items-center gap-x-2 px-2 rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 w-full cursor-pointer",
                editor?.getAttributes("textStyle").FontFamily === font.value &&
                  "bg-foreground/5 dark:bg-primary-foreground/10"
              )}
              style={{
                fontFamily: font.value,
              }}
              onClick={() =>
                editor?.chain().focus().setFontFamily(font.value).run()
              }
            >
              <span className="text-sm truncate">{font.label}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
