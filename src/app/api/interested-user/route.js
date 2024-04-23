import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Events from "@/models/events";

import { auth } from "../auth/[...nextauth]/route";
import users from "@/models/users";

export async function POST(request) {
  await connectDB();
  const { user } = await auth();
  const { eventId } = await request.json();

  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    if (event.interested.includes(user.id)) {
      return NextResponse.json(
        { message: "User already interested" },
        { status: 400 }
      );
    }

    event.interested = event.interested.concat(user.id);
    await event.save();
    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}

export async function DELETE(request) {
  await connectDB();
  const { user } = await auth();
  const eventId = await request.nextUrl.searchParams.get("eventId");

  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const filteredInterested = event.interested.filter(
      (interestedUser) => interestedUser.toString() !== user.id
    );

    event.interested = filteredInterested;
    await event.save();
    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
