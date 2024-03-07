import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  serviceName: String,
  responses: [
    {
      question: String,
      answer: String,
    },
  ],
  extraInfo: String,
  userName: String,
  userPhone: String,
  userEmail: String,
  date: Date,
  pdfFile: String,
});

export default models?.Prices || mongoose.model("Prices", schema);
