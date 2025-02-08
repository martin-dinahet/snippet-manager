import { mutation, query } from "$/_generated/server";
import { v } from "convex/values";

export const getSnippets = query({
  handler: async (ctx) => {
    return ctx.db.query("snippets");
  },
});

export const getSnippet = query({
  args: { id: v.id("snippets") },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createSnippet = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    language: v.string(),
    tags: v.array(v.string()),
    content: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("snippets", {
      title: args.title,
      description: args.description,
      language: args.language,
      tags: args.tags,
      content: args.content,
    });
    return "success";
  },
});

export const updateSnippet = mutation({
  args: {
    id: v.id("snippets"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    language: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    content: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      language: args.language,
      tags: args.tags,
      content: args.content,
    });
    return "success";
  },
});

export const deleteSnippet = mutation({
  args: { id: v.id("snippets") },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return "success";
  },
});
