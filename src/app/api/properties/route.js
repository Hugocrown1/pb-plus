import { connectDB } from "@/lib/mongoose";
import Properties from "@/models/properties";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const properties = await Properties.find();
    return NextResponse.json(properties);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const {
      cover,
      images,
      title,
      rental,
      publishDate,
      address,
      userID,
      description,
    } = await request.json();

    const property = await Properties.create({
      cover,
      images,
      title,
      rental,
      publishDate,
      address,
      userID,
      description,
    });

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
