import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  serviceName: String,
  userName: String,
  userPhone: Number,
  userEmail: String,
  date: Date,
  message: String,
});

export default models?.Pricing || mongoose.model("Pricing", schema);
