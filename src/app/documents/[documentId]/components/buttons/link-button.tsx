"use client";

import * as React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hint } from "@/components/hint";
import { Link2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LinkButton() {
  const { editor } = useEditorStore();
  const [value, setValue] = React.useState<string>("");
  const onChange = (href: string): void => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) =>
        open && setValue(editor?.getAttributes("link").href || "")
      }
    >
      <Hint label="Link">
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
            <Link2Icon className="size-4" />
          </button>
        </DropdownMenuTrigger>
      </Hint>

      <DropdownMenuContent className="p-2.5 border-none outline-none">
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="https://example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => onChange(value)}
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
