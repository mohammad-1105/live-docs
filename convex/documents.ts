import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { type Doc, type Id } from "./_generated/dataModel";
import {
  type PaginationResult,
  type UserIdentity,
  paginationOptsValidator,
} from "convex/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // verify user is authenticated
    const user: UserIdentity | null = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const docId: Id<"documents"> = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerId: user.subject,
    });

    return docId;
  },
});

export const get = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    // verify user is authenticated
    const user: UserIdentity | null = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const docs: PaginationResult<Doc<"documents">> = await ctx.db
      .query("documents")
      .paginate(args.paginationOpts);

    return docs;
  },
});

export const deleteDoc = mutation({
  args: { docId: v.id("documents") },
  handler: async (ctx, args) => {
    // verify user is authenticated
    const user: UserIdentity | null = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const doc: Doc<"documents"> | null = await ctx.db.get(args.docId);
    if (!doc) {
      throw new ConvexError("Document not found");
    }

    if (doc.ownerId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.delete(args.docId);
  },
});
