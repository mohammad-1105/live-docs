"use client";

const AVATAR_SIZE = 34;

import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { useSelf, useOthers } from "@liveblocks/react/suspense";

export function Avatars() {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
}

function AvatarStack() {
  const self = useSelf();
  const others = useOthers();

  if (others.length === 0) return null;

  return (
    <>
      <div className="flex items-center">
        {self && (
          <div className="relative ml-2">
            <Avatar src={self.info.avatar} name="self" />
          </div>
        )}

        <div className="flex">
          {others.map(({ connectionId, info }) => (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          ))}
        </div>
      </div>

      <Separator orientation="vertical" className="h-6" />
    </>
  );
}

interface Props {
  src: string;
  name: string;
}
function Avatar({ src, name }: Props) {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 bg-gray-500 rounded-full"
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-xs rounded-lg mt-2.5 z-10 whitespace-nowrap transition-opacity">
        {name}
      </div>

      <img src={src} alt={name} className="size-full rounded-full" />
    </div>
  );
}
