"use client";
import * as React from "react";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  Grid,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DocumentMenubar() {
  const [rows, setRows] = React.useState<string>("");
  const [cols, setCols] = React.useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRows(e.target.value);
  };
  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCols(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    insertTable({ rows: parseInt(rows), cols: parseInt(cols) });
    setRows("");
    setCols("");
    setIsDialogOpen(false);
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, "document.json"); // TODO add document name
  };
  const onSaveHTML = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const blob = new Blob([html], {
      type: "text/html",
    });
    onDownload(blob, "document.html"); // TODO add document name
  };
  const onSaveText = () => {
    if (!editor) return;
    const text = editor.getText();
    const blob = new Blob([text], {
      type: "text/plain",
    });
    onDownload(blob, "document.txt"); // TODO add document name
  };

  const { editor } = useEditorStore();
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().insertTable({ rows, cols, withHeaderRow: false }).run();
  };

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
              <MenubarItem onClick={() => onSaveJSON()}>
                <FileJsonIcon className="mr-2 size-4" /> JSON
              </MenubarItem>
              <MenubarItem onClick={() => onSaveHTML()}>
                <GlobeIcon className="mr-2 size-4" /> HTML
              </MenubarItem>
              <MenubarItem onClick={() => onSaveText()}>
                <FileTextIcon className="mr-2 size-4" /> TEXT
              </MenubarItem>
              <MenubarItem onClick={() => window.print()}>
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
              <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                <Grid2X2 className="size-4 mr-2" />1 x 1
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                {" "}
                <Grid2X2 className="size-4 mr-2" />2 x 2
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                {" "}
                <Grid2X2 className="size-4 mr-2" />3 x 3
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                {" "}
                <Grid2X2 className="size-4 mr-2" />4 x 4
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 5, cols: 5 })}>
                {" "}
                <Grid2X2 className="size-4 mr-2" />5 x 5
              </MenubarItem>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full flex items-center justify-start p-2 text-sm"
                    size="sm"
                    variant={"ghost"}
                  >
                    <Grid className="size-4" /> <span>Custom</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create your Custom Table</DialogTitle>
                  </DialogHeader>
                  <form
                    className="flex items-center gap-3"
                    onSubmit={handleSubmit}
                  >
                    <Input
                      placeholder="rows"
                      name="rows"
                      value={rows}
                      onChange={handleRowsChange}
                      required
                      maxLength={3}
                    />
                    <Input
                      placeholder="columns"
                      name="cols"
                      value={cols}
                      onChange={handleColsChange}
                      required
                      maxLength={3}
                    />

                    <Button type="submit">Create Table</Button>
                  </form>
                </DialogContent>
              </Dialog>
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
