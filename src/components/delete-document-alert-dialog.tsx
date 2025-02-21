"use client";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

interface Props {
  id: string;
  children: React.ReactNode;
}
export function DeleteDocumentAlertDialog({ id, children }: Props) {
  const [_isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const mutation = useMutation(api.documents.deleteDocById);

  const handleDeleteConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    mutation({ docId: id as Id<"documents"> })
      .then(() => toast.success("Document deleted"))
      .catch(() => toast.error("Failed to delete document"))
      .finally(() => setIsDeleting(false));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
