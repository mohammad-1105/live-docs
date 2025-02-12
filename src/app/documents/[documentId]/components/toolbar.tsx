"use client";
import React from "react";
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { fonts, headings } from "@/constants";
import { type Level } from "@tiptap/extension-heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToolbarButtonProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

// Toolbar button
function ToolbarButton({
  label,
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) {
  return (
    <Hint label={label}>
      <button
        onClick={onClick}
        className={cn(
          "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
          isActive && "bg-neutral-200/80"
        )}
      >
        <Icon className="size-4" />
      </button>
    </Hint>
  );
}

// Font Family Button
function FontFamilyButton() {
  const { editor } = useEditorStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
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
                "flex items-center gap-x-2 px-2 rounded-sm hover:bg-neutral-200/80 w-full cursor-pointer",
                editor?.getAttributes("textStyle").FontFamily === font.value &&
                  "bg-neutral-200/80"
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

// Heading Level Button
function HeadingLevelButton() {
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
        <button className="h-7  shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
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
                  "hover:bg-neutral-200/80")
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

export function Toolbar() {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          console.log("current", current);
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],

    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],

    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("TODO: comment"),
        isActive: false, // TODO: add functionality
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formating",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO:  Font size*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}

      {/* TODO:  text color */}
      {/* TODO:  highlight color */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line Height */}
      {/* TODO: List */}
      {sections[2].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
    </div>
  );
}
