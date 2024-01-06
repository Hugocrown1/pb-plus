import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: String,
  email: String,
  image: String,
  emailVerified: Boolean,
});

export default mongoose.model("Users", schema);
