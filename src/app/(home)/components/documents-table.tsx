import { type PaginationStatus } from "convex/react";
import { type Doc } from "../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TableHead,
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";

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
                <TableHead>Shared</TableHead>
                <TableHead>Created at</TableHead>
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
    </div>
  );
}
