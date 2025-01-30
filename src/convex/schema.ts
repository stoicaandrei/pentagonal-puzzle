import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const playingFieldSchema = v.object({
  rows: v.number(),
  cols: v.number(),
  title: v.string(),
  validPositions: v.array(
    v.object({
      row: v.number(),
      col: v.number(),
    })
  ),
});

export default defineSchema({
  playingFields: defineTable(playingFieldSchema),
});
