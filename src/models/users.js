import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Properties",
    },
  ],
  emailVerified: Boolean,
});

export default models?.Users || mongoose.model("Users", schema);
