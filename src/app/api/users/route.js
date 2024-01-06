import { connectDB } from "@/lib/mongoose";
import Users from "@/models/users";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await Users.find();
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
