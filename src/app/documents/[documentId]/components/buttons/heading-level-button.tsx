"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { headings } from "@/constants";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";

export function HeadingLevelButton() {
  const { editor } = useEditorStore();
  const getCurrentHeading = (): string => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return `Normal text`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7  shrink-0 flex items-center justify-between rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {headings.map((heading) => (
          <button
            key={heading.label}
            className={cn(
              "flex items-center gap-x-2 px-2 rounded-sm w-full cursor-pointer ",
              (heading.value === 0 && !editor?.isActive("heading")) ||
                (!editor?.isActive("heading", { level: heading.value }) &&
                  "hover:bg-foreground/5 dark:hover:bg-primary-foreground/10")
            )}
            style={{
              fontSize: heading.fontSize,
            }}
            onClick={() => {
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
              }
            }}
          >
            {heading.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
