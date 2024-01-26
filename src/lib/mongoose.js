import properties from "@/models/properties";
import users from "@/models/users";
import { connect, connection } from "mongoose";

export async function connectDB() {
  const db = await connect(process.env.MONGODB_URI);
}

connection.on("connected", () => {
  console.log("mongoose is connected");
  const Properties = properties;
  const Users = users;
});

connection.on("error", (err) => {
  console.log("mongoose is connection error", err);
});
