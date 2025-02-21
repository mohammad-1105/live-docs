import { type PaginationStatus } from "convex/react";
import { type Doc } from "../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";

interface Props {
  documents: Doc<"documents">[] | undefined;
  isLoading: boolean;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export function DocumentsTable({
  documents,
  isLoading,
  loadMore,
  status,
}: Props) {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
      {isLoading ? (
        <div className="size-full flex items-center justify-center">
          <Loader className="size-5 animate-spin" />
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none select-none">
                <TableHead>Home</TableHead>
                <TableHead>&nbsp;</TableHead>
                <TableHead className="hidden md:table-cell">Shared</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
              </TableRow>
            </TableHeader>
            {documents?.length === 0 ? (
              <TableBody className="select-none">
                <TableRow className="bg-transparent hover:bg-transparent">
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No Documents Found
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {documents?.map((document) => (
                  <DocumentRow key={document._id} document={document} />
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      )}

      <div className="flex items-center justify-center">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            loadMore(5);
          }}
          disabled={status !== "CanLoadMore"}
        >
          {  status === "CanLoadMore"
            ? "Load More"
            : "No More Documents"}
        </Button>
      </div>
    </div>
  );
}
