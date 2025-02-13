"use client";
import React from "react";
import {
  BoldIcon,
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
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { FontFamilyButton } from "./font-family-button";
import { ToolbarButton } from "./toolbar-button";
import { HeadingLevelButton } from "./heading-level-button";
import { TextColorButton } from "./text-color-button";
import { TextHighlightButton } from "./text-highlight-button";
import { LinkButton } from "./link-button";
import { ImageButton } from "./image-button";
import { TextAlignmentButton } from "./text-alignment-button";
import { ListButton } from "./list-button";

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
    <div className="border border-b px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
      <Separator
        orientation="vertical"
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/50"
      />
      <FontFamilyButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/50"
      />
      <HeadingLevelButton />
      <Separator
        orientation="vertical"
        className="h-6  bg-foreground/30 dark:bg-primary-foreground/50"
      />
      {/* TODO:  Font size*/}
      <Separator
        orientation="vertical"
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/50"
      />

      {sections[1].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}

      <TextColorButton/>
      <TextHighlightButton/>
      <Separator
        orientation="vertical"
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/50"
      />
      <LinkButton/>
      <ImageButton/>
      <TextAlignmentButton/>
      {/* TODO: Line Height */}
      <ListButton/>
      {sections[2].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
    </div>
  );
}
