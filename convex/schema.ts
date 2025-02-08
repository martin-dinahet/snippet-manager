import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  snippets: defineTable({
    content: v.string(),
    description: v.string(),
    language: v.string(),
    tags: v.array(v.string()),
    title: v.string(),
  }),
});
