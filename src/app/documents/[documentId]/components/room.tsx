"use client";

import { ReactNode, useState, useEffect, useMemo } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { getUsers } from "../actions";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      setUsers([]);
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
      }}
      resolveRoomsInfo={() => []}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      throttle={16}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={
            <div className="flex items-center justify-center h-screen text-slate-600">
              <Loader className="size-6 mr-2 animate-spin " />
              Room Loading…
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
