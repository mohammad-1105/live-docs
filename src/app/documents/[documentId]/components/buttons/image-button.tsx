"use client";

import { Hint } from "@/components/hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { useEditorStore } from "@/store/use-editor-store";
import { ImageIcon, Search, Upload } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ImageButton() {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const onChange = (url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <Hint label="Upload Image">
          <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10 px-1.5 overflow-hidden text-sm">
              <ImageIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </Hint>

        <DropdownMenuContent className="p-0 border-none outline-none">
          <DropdownMenuItem
            className="flex items-center  gap-x-2 cursor-pointer"
            onClick={onUpload}
          >
            <Upload className="size-4" /> <span>Upload</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <Search className="size-4" /> <span>Paste Image Url</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image Url</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="https://example.com"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleImageUrlSubmit()}
          />
          <Button onClick={handleImageUrlSubmit}>Upload</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
