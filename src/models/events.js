import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  coverImage: String,
  images: [String],
  date: Date,
  title: String,
  category: String,
  address: String,
  description: String,
  interestedUsers: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export default models?.Events || mongoose.model("Events", schema);
