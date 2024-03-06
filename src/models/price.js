import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  serviceName: String,
  responses: [
    {
      question: String,
      answer: String,
    },
  ],
  userName: String,
  userPhone: String,
  userEmail: String,
});

export default models?.Prices || mongoose.model("Prices", schema);
