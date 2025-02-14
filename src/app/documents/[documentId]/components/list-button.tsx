"use client";

import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ListIcon, ListOrderedIcon, type LucideIcon } from "lucide-react";
import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

export function ListButton() {
  const { editor } = useEditorStore();

  const list: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive: () => boolean | undefined;
  }[] = [
    {
      label: "Bullet List",
      icon: ListIcon,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: () => editor?.isActive("bulletList"),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor?.isActive("orderedList"),
    },
  ];

  return (
    <DropdownMenu>
      <Hint label="Lists">
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
            <ListIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
      </Hint>

      <DropdownMenuContent className="border-0 p-1 flex justify-center items-center gap-4">
        {list.map((item) => (
          <Hint label={item.label} key={item.label}>
            <button
              onClick={item.onClick}
              className={cn(
                "h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm",
                item.isActive() &&
                  "bg-foreground/5 dark:bg-primary-foreground/10"
              )}
            >
              <item.icon className="size-4" />
            </button>
          </Hint>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
