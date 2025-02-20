"use client";
import * as React from "react";
import { type Doc } from "../../../../convex/_generated/dataModel";
import { TableRow, TableCell } from "@/components/ui/table";
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface Props {
  document: Doc<"documents">;
}

export function DocumentRow({ document }: Props) {
  return (
    <TableRow className="cursor-pointer select-none">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex ml-auto">
        <Button className="rounded-full" variant="ghost" size="icon">
          <MoreVertical className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
