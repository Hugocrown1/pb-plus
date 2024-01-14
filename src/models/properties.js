import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  coverImage: String,
  images: [String],
  title: String,
  type: String,
  price: Number,
  bathrooms: Number,
  bedrooms: Number,
  publishDate: Date,
  address: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  description: String,
});

export default models?.Properties || mongoose.model("Properties", schema);
