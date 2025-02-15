"use client";
import { Hint } from "@/components/hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { TableOfContentsIcon } from "lucide-react";
export function LineHeightButton() {
  const { editor } = useEditorStore();

  const lineHeights: {
    label: string;
    value: string;
  }[] = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <DropdownMenu>
      <Hint label="Line Height">
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
            <TableOfContentsIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
      </Hint>

      <DropdownMenuContent>
        {lineHeights.map((lineHeight) => (
          <DropdownMenuItem key={lineHeight.label}>
            <button
              className={cn(
                "text-sm h-7 w-full flex items-center justify-start rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10",
                editor?.getAttributes("paragraph").lineHeight ===
                  lineHeight.value &&
                  "bg-foreground/5 dark:bg-primary-foreground/10"
              )}
              onClick={() => {
                console.log("lineHeight.value", lineHeight.value),
                  editor?.chain().focus().setLineHeight(lineHeight.value).run();
              }}
            >
              {lineHeight.label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
