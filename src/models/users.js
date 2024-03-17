import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: { type: String, default: "000-000-0000" },
  image: String,
  role: { type: String, default: "user" },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Properties",
    },
  ],
  emailVerified: { type: Boolean, default: false },
  date: Date,
  resettoken: {type: String, required: false},
  resettokenexpiry: {type: Date, required: false}
});

export default models?.Users || mongoose.model("Users", schema);
