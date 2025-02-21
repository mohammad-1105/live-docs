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

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;


    const docId: Id<"documents"> = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerId: user.subject,
      organizationId
    });

    return docId;
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, search }) => {
    // verify user is authenticated
    const user: UserIdentity | null = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    // search for documents owned by the user in the organization
    if (search && organizationId) {
      const docs: PaginationResult<Doc<"documents">> = await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
      return docs;
    }

    // search for documents owned by the user
    if (search) {
      const docs: PaginationResult<Doc<"documents">> = await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
      return docs;
    }

    if (organizationId) {
      // get all documents owned by the user in the organization
      const docs: PaginationResult<Doc<"documents">> = await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
      return docs;
    }

    // get all documents owned by the user
    const docs: PaginationResult<Doc<"documents">> = await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);

    return docs;
  },
});

export const deleteDocById = mutation({
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

export const updateDocById = mutation({
  args: { docId: v.id("documents"), title: v.string() },
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

    return await ctx.db.patch(args.docId, { title: args.title });
  },
});
