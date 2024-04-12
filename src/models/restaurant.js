import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  coverImage: String,
  images: [String],
  name: String,
  sectionTitle: String,
  information: [String],
  calendar: [[String]],
  socialMedia: { Facebook: String, Instagram: String, Twitter: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export default models?.Events || mongoose.model("Events", schema);
