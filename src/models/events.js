import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  coverImage: String,
  images: [String],
  date: Date,
  title: String,
  category: String,
  address: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  interested: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    default: [],
    required: true,
  },
  publishDate: Date,
});

export default models?.Events || mongoose.model("Events", schema);
