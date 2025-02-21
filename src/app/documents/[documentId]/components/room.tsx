"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_bGSsnE4C58wfc3kUKjyYDaRYX4d9fWL1NyyjlXp0p5KMst-QJjTpStB4B-Fgni2u"
      }
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={
            <div className="flex items-center justify-center h-[50%]">
              <Loader className="size-6 mr-2 animate-spin " />
              Loading…
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
