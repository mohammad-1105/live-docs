"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ExternalLinkIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { type Doc } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { DeleteDocumentAlertDialog } from "@/components/delete-document-alert-dialog";
import { RenameDocumentDialog } from "@/components/rename-document-dialog";

interface Props {
  document: Doc<"documents">;
}

export function DocumentMenu({ document }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button className="rounded-full" variant="ghost" size="icon">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/documents/${document._id}`} target="_blank">
          <DropdownMenuItem className="p-2">
            <ExternalLinkIcon className="size-4 mr-1" />
            Open in a new tab
          </DropdownMenuItem>
        </Link>
        <DeleteDocumentAlertDialog id={document._id}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="w-full"
          >
            <TrashIcon className="size-4 mr-1" />
            Delete
          </DropdownMenuItem>
        </DeleteDocumentAlertDialog>
        <RenameDocumentDialog id={document._id} initialTitle={document.title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="w-full"
          >
            <PencilIcon className="size-4 mr-1" />
            Rename
          </DropdownMenuItem>
        </RenameDocumentDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
