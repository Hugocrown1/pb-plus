import { connectDB } from "@/lib/mongoose";
import Users from "@/models/users";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    await connectDB();

    const { token } = await request.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const existingUser = await Users.findOne({
      resettoken: hashedToken,
      resettokenexpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
      return new NextResponse("Invalid token or has expired", { status: 400 });
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
