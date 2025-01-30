import { mutation, query } from "./_generated/server";
import { Doc } from "../convex/_generated/dataModel";
import { WithoutSystemFields } from "convex/server";
import { playingFieldSchema } from "./schema";
import { v } from "convex/values";

export const listPlayingFields = query({
  handler: async ({ db }) => {
    return await db.query("playingFields").collect();
  },
});

export const createPlayingField = mutation({
  args: { data: playingFieldSchema },
  handler: async ({ db }, { data }) => {
    return await db.insert("playingFields", data);
  },
});

export const updatePlayingField = mutation({
  args: {
    _id: v.id("playingFields"),
    data: playingFieldSchema,
  },
  handler: async ({ db }, { _id, data }) => {
    return await db.patch(_id, data);
  },
});

export const deletePlayingField = mutation({
  args: {
    _id: v.id("playingFields"),
  },
  handler: async ({ db }, { _id }) => {
    return await db.delete(_id);
  },
});

export const getPlayingField = query({
  args: {
    _id: v.id("playingFields"),
  },
  handler: async ({ db }, { _id }) => {
    return await db.get(_id);
  },
});
