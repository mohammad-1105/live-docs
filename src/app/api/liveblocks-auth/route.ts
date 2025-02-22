import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser, type User } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveBlocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user: User | null = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { docId: room });

  if (!document) {
    return new Response("Document not found", { status: 404 });
  }

  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === sessionClaims.org_id
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized", { status: 401 });
  }

  const session = liveBlocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? "Anonymous",
      avatar: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
