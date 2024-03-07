import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  image: String,
  role: { type: String, default: "user" },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Properties",
    },
  ],
  emailVerified: Boolean,
});

export default models?.Users || mongoose.model("Users", schema);
