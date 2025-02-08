import { mutation } from "$/_generated/server";
import { v } from "convex/values";

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
