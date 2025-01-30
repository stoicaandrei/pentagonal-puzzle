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
  args: {
    playingField: playingFieldSchema,
  },
  handler: async ({ db }, { playingField }) => {
    return await db.insert("playingFields", playingField);
  },
});

export const updatePlayingField = mutation({
  args: {
    _id: v.id("playingFields"),
    playingField: playingFieldSchema,
  },
  handler: async ({ db }, { _id, playingField }) => {
    return await db.patch(_id, playingField);
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
