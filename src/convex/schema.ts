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

export const cellSchema = v.object({
  position: v.object({
    row: v.number(),
    col: v.number(),
  }),
  color: v.string(),
  disabled: v.optional(v.boolean()),
});

export const piecesGridSchema = v.object({
  grid: v.array(v.array(cellSchema)),
  rows: v.number(),
  cols: v.number(),
  playingFieldId: v.id("playingFields"),
});

export default defineSchema({
  playingFields: defineTable(playingFieldSchema),
  piecesGrids: defineTable(piecesGridSchema),
});
