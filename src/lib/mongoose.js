import properties from "@/models/properties";
import { connect, connection } from "mongoose";

export async function connectDB() {
  const db = await connect(process.env.MONGODB_URI);
}

connection.on("connected", () => {
  console.log("mongoose is connected");
  const Properties = properties;
});

connection.on("error", (err) => {
  console.log("mongoose is connection error", err);
});
