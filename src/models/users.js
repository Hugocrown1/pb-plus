import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
});

export default models?.Users || mongoose.model("Users", schema);
