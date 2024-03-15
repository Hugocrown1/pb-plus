import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Consultations from "@/models/consultations";

export async function GET() {
  try {
    await connectDB();

    const consultations = await Consultations.find();
    return NextResponse.json(consultations);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const { serviceName, userName, userPhone, userEmail, message, date } =
      await request.json();

    const consultation = await Consultations.create({
      serviceName,
      userName,
      userPhone,
      userEmail,
      message,
      date,
    });

    return NextResponse.json(consultation);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
