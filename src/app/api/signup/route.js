import { connectDB } from "@/lib/mongoose";
import Users from "@/models/users";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password, name, phone } = await request.json();
    const user = await Users.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        email,
        password: hashedPassword,
        name,
        phone,
      });
      return NextResponse.json(newUser);
    }
    return NextResponse.json("Correo electrónico ya utilizado.", {
      status: 500,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
