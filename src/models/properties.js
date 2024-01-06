import mongoose from "mongoose";

const schema = new mongoose.Schema({
  coverImage: String,
  title: String,
  rental: Number,
  publishDate: Date,
  address: String,
  userID: String,
  description: String,
});

export default mongoose.model("Properties", schema);
