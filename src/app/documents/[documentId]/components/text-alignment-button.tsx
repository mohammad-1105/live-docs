"use client";

import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  type LucideIcon,
} from "lucide-react";
import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

export function TextAlignmentButton() {
  const { editor } = useEditorStore();

  const alignments: {
    label: string;
    value: string;
    icon: LucideIcon;
  }[] = [
    {
      label: "Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <Hint label="Text Align">
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
            {" "}
            <AlignCenterIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent className="border-0 p-1 flex justify-center items-center gap-4">
        {alignments.map((alignment) => (
          <Hint label={alignment.label} key={alignment.value}>
            <button
              className={cn(
                "h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm",
                editor?.isActive({ textAlign: alignment.value }) &&
                  "bg-foreground/5 dark:bg-primary-foreground/10"
              )}
              onClick={() =>
                editor?.chain().focus().setTextAlign(alignment.value).run()
              }
            >
              <alignment.icon className="size-4" />
            </button>
          </Hint>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
