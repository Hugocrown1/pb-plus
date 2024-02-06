import { connectDB } from "@/lib/mongoose";
import Users from "@/models/users";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password, name, phone } = request.body;
    const user = await Users.find({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        email,
        hashedPassword,
        name,
        phone,
      });
      return NextResponse.json(newUser);
    }
    return NextResponse.json("Correo electrónico ya utilizado", {
      status: 500,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
