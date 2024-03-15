import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  page: String,
  device: String,
  user: String,
  dateTime: Date,
});

export default models?.Visits || mongoose.model("Visits", schema);
