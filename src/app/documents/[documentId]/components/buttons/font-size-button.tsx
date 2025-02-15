"use client";
import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
export function FontSizeButton() {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = React.useState(currentFontSize);
  const [inputValue, setInputValue] = React.useState(fontSize);
  const [isEditing, setIsEditing] = React.useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize.replaceAll("px", ""));
      setInputValue(newSize.replace("px", ""));
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newFontSize = parseInt(fontSize) + 1;
    updateFontSize(`${newFontSize}px`.toString());
  };

  const decrement = () => {
    const newFontSize = parseInt(fontSize) - 1;
    if (newFontSize > 0) {
      updateFontSize(`${newFontSize}px`.toString());
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decrement}
        className="size-4 shrink-0 rounded-sm overflow-hidden text-sm"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          className="w-10 text-center rounded-sm px-1.5 overflow-hidden text-sm cursor-text border-none outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="h-6 w-10 rounded-sm px-1.5 overflow-hidden text-sm"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="size-4 shrink-0 rounded-sm overflow-hidden text-sm"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
