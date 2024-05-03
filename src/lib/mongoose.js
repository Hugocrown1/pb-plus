import properties from "@/models/properties";
import users from "@/models/users";
import events from "@/models/events";
import { connect, connection } from "mongoose";

export async function connectDB() {
  const db = await connect(process.env.MONGODB_URI);
}

connection.on("connected", () => {
  const Properties = properties;
  const Events = events;
  const Users = users;
});

connection.on("error", (err) => {
  console.error("mongoose connection error", err);
});
