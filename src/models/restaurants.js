import mongoose, { models } from "mongoose";

const schema = new mongoose.Schema({
  images: {
    Profile: String,
    Cover: String,
    AboutUs: String,
    MeetUs1: String,
    MeetUs2: String,
    MeetUs3: String,
    CustomSection: String,
    Gallery: [String],
  },
  name: String,
  address: String,
  category: String,
  sectionTitle: String,
  information: { AboutUs: String, CustomSection: String },
  calendar: {
    Monday: [String],
    Tuesday: [String],
    Wednesday: [String],
    Thursday: [String],
    Friday: [String],
    Saturday: [String],
    Sunday: [String],
  },
  socialMedia: { Facebook: String, Instagram: String, Twitter: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export default models?.Restaurants || mongoose.model("Restaurants", schema);
