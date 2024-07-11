import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  artist: {
    required: true,
    type: String,
  },
});

export const Report =
  mongoose.models?.Report || mongoose.model("Report", reportSchema);
