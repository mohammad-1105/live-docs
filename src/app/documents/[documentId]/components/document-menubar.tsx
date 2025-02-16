"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  Grid2X2,
  ItalicIcon,
  PrinterIcon,
  RedoIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  Table,
  TextIcon,
  TrashIcon,
  Underline,
  UndoIcon,
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

export function DocumentMenubar() {
  const { editor } = useEditorStore();

  return (
    <Menubar className="border-none bg-transparent shadow-none h-auto p-0 print:hidden">
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-sm py-0.5 px-[7px] rounded-sm h-auto hover:bg-muted">
          File
        </MenubarTrigger>
        <MenubarContent className="print:hidden">
          <MenubarSub>
            <MenubarSubTrigger>
              <FileIcon className="size-4 mr-2" /> Save
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <FileJsonIcon className="mr-2 size-4" /> JSON
              </MenubarItem>
              <MenubarItem>
                <GlobeIcon className="mr-2 size-4" /> HTML
              </MenubarItem>
              <MenubarItem>
                <FileTextIcon className="mr-2 size-4" /> TEXT
              </MenubarItem>
              <MenubarItem>
                <FaFilePdf className="mr-2 size-4" /> PDF
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            <FilePlusIcon className="size-4 mr-2" />
            New Document
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem>
            <FilePenIcon className="size-4 mr-2" />
            Rename
          </MenubarItem>
          <MenubarItem>
            <TrashIcon className="size-4 mr-2" />
            Remove
          </MenubarItem>

          <MenubarSeparator />
          <MenubarItem
            onClick={() => window.print()}
            className="flex items-center justify-between"
          >
            <PrinterIcon className="size-4 mr-2" />
            Print
            <MenubarShortcut>Ctrl + P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-sm py-0.5 px-[7px] rounded-sm h-auto hover:bg-muted">
          Edit
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
            <UndoIcon className="size-4 mr-2" /> Undo{" "}
            <MenubarShortcut>Ctrl + Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
            <RedoIcon className="size-4 mr-2" /> Redo{" "}
            <MenubarShortcut>Ctrl + Y</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-sm py-0.5 px-[7px] rounded-sm h-auto hover:bg-muted">
          Insert
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <Table className="size-4 mr-2" />
              Table
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Grid2X2 className="size-4 mr-2" />1 x 1
              </MenubarItem>
              <MenubarItem>
                {" "}
                <Grid2X2 className="size-4 mr-2" />2 x 2
              </MenubarItem>
              <MenubarItem>
                {" "}
                <Grid2X2 className="size-4 mr-2" />3 x 3
              </MenubarItem>
              <MenubarItem>
                {" "}
                <Grid2X2 className="size-4 mr-2" />4 x 4
              </MenubarItem>
              <MenubarItem>
                {" "}
                <Grid2X2 className="size-4 mr-2" />5 x 5
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-sm py-0.5 px-[7px] rounded-sm h-auto hover:bg-muted">
          Format
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <TextIcon className="size-4 mr-2" /> Format
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                <BoldIcon className="size-4 mr-2" /> Bold{" "}
                <MenubarShortcut>Ctrl + B</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                <ItalicIcon className="size-4 mr-2" /> Italic{" "}
                <MenubarShortcut>Ctrl + I</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
              >
                <Underline className="size-4 mr-2" /> Underline{" "}
                <MenubarShortcut className="pl-2">Ctrl + U</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleStrike().run()}
              >
                <StrikethroughIcon className="size-4 mr-2" /> Strike through
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem
            onClick={() => editor?.chain().focus().unsetAllMarks().run()}
          >
            <RemoveFormattingIcon className="size-4 mr-2" /> Clear formatting
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
