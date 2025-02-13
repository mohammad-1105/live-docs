"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { SketchPicker, type ColorResult } from "react-color";
import { Hint } from "@/components/hint";
export function TextColorButton() {
  const { editor } = useEditorStore();

  const currentValue = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <Hint label="Text Color">
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
            <span className="text-xs" style={{ color: currentValue }}>
              A
            </span>
            <div
              className="h-0.5 w-full"
              style={{
                backgroundColor: currentValue,
              }}
            />
          </button>
        </DropdownMenuTrigger>
      </Hint>

      <DropdownMenuContent className="p-0 border-none outline-none">
        <SketchPicker
          className="w-full"
          color={currentValue}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
