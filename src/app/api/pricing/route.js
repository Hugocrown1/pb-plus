import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Pricing from "@/models/pricing";

export async function GET() {
  try {
    await connectDB();

    const pricingForms = await Pricing.find();
    return NextResponse.json(pricingForms);
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

    const pricingForm = await Pricing.create({
      serviceName,
      userName,
      userPhone,
      userEmail,
      message,
      date,
    });

    return NextResponse.json(pricingForm);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
