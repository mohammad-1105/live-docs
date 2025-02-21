"use client";

import * as React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { type Id } from "../../convex/_generated/dataModel";

interface Props {
  id: string;
  initialTitle: string;
  children: React.ReactNode;
}

export function RenameDocumentDialog({ id, initialTitle, children }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(initialTitle);
  const mutation = useMutation(api.documents.updateDocById);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpdating(true);
    mutation({
      docId: id as Id<"documents">,
      title: value ?? "Untitled Document",
    })
      .then(() => {
        toast.success("Document renamed");
        setOpen(false);
      })
      .catch(() => toast.error("Failed to rename document"))
      .finally(() => setIsUpdating(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            This action will rename the document.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            type="text"
            value={value}
            placeholder="Document name"
            className="w-full"
            disabled={isUpdating}
            onChange={(e) => setValue(e.target.value)}
          />

          <DialogFooter>
            <Button
              variant={"secondary"}
              type="button"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button variant={"default"} disabled={isUpdating} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
