import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Visits from "@/models/visits";

export async function POST(request) {
  try {
    await connectDB();
    const { page, device, user, dateTime } = await request.json();

    const visit = await Visits.create({
        page, device, user, dateTime
    });
    return NextResponse.json(visit);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const visits = await Visits.find({});
    return NextResponse.json(visits);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
