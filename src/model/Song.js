import mongoose, { Schema } from "mongoose";

const songSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  artist: {
    required: true,
    type: String,
  },
  hiragana: {
    required: true,
    type: String,
  },
  romaji: {
    required: true,
    type: String,
  },
  kanji: {
    required: true,
    type: String,
  },
});

export const Song = mongoose.models?.Song || mongoose.model("Song", songSchema);
