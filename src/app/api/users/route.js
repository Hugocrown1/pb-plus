import { connectDB } from "@/lib/mongoose";
import { isAdmin } from "@/lib/userAuth";
import Users from "@/models/users";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    if (isAdmin()) {
      const users = await Users.find();
      return NextResponse.json(users);
    }
    return NextResponse.json(
      { message: "Usuario no autorizado" },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
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
          role: "user",
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
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
