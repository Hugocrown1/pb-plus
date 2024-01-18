import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Users from "@/models/users";
import Events from "@/models/events";

export async function GET() {
  try {
    await connectDB();

    const events = await Events.find();
    return NextResponse.json(events);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const { images, date, title, address, description } = await request.json();

    const user = await Users.findOne({ email: session.user.email });

    const event = await Events.create({
      images,
      title,
      address,
      description,
      date,
      coverImage: images[0],
      user: user._id,
    });

    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
