import { connectDB } from "@/lib/mongoose";
import Users from "@/models/users";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password, token } = await request.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const existingUser = await Users.findOne({
      email: email,
      resettoken: hashedToken,
      resettokenexpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
      return new NextResponse("Invalid token or has expired", { status: 400 });
    }

    // Verificar si el usuario existe
    if (!existingUser) {
      return NextResponse.json("User not found.", { status: 404 });
    }

    // Si se proporciona una nueva contraseña, cifrarla
    if (password) {
      const updatedPassword = await bcrypt.hash(password, 10);
      existingUser.password = updatedPassword;
      existingUser.resettoken = undefined;
      existingUser.resettokenexpiry = undefined;
    }

    try {
      await existingUser.save();
      return NextResponse.json("User's password is updated.", { status: 200 });
    } catch (err) {
      return NextResponse.json(err.message, { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
