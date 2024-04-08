import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  coverImage: String,
  images: [String],
  title: String,
  information: [String],
  calendar: [[String]],
  socialMedia: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export default models?.Events || mongoose.model("Events", schema);
