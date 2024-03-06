import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Prices from "@/models/price";

export async function GET() {
  try {
    await connectDB();

    const prices = await Prices.find();
    return NextResponse.json(prices);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { serviceName, responses, userName, userPhone, userEmail } =
      await request.json();

    const price = await Prices.create({
      serviceName,
      responses,
      userName,
      userPhone,
      userEmail,
    });

    return NextResponse.json(price);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
