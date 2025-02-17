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
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  type LucideIcon,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { FontFamilyButton } from "./buttons/font-family-button";
import { ToolbarButton } from "./buttons/toolbar-button";
import { HeadingLevelButton } from "./buttons/heading-level-button";
import { TextColorButton } from "./buttons/text-color-button";
import { TextHighlightButton } from "./buttons/text-highlight-button";
import { LinkButton } from "./buttons/link-button";
import { ImageButton } from "./buttons/image-button";
import { TextAlignmentButton } from "./buttons/text-alignment-button";
import { ListButton } from "./buttons/list-button";
import { FontSizeButton } from "./buttons/font-size-button";
import { LineHeightButton } from "./buttons/line-height-button";

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
      {
        label: "Strike Through",
        icon: StrikethroughIcon,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
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
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/100"
      />
      <FontFamilyButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/100"
      />
      <HeadingLevelButton />
      <Separator
        orientation="vertical"
        className="h-6  bg-foreground/30 dark:bg-primary-foreground/100"
      />
      <FontSizeButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/100"
      />

      {sections[1].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}

      <TextColorButton />
      <TextHighlightButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-foreground/30 dark:bg-primary-foreground/100"
      />
      <LinkButton />
      <ImageButton />
      <TextAlignmentButton />
      <LineHeightButton />
      <ListButton />
      {sections[2].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
    </div>
  );
}
