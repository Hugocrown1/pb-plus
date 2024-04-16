import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Users from "@/models/users";
import Restaurants from "@/models/restaurants";

export async function GET() {
  try {
    await connectDB();

    const restaurants = await Restaurants.find();
    return NextResponse.json(restaurants);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const { images, name, sectionTitle, information, socialMedia } =
      await request.json();

    const user = await Users.findOne({ email: session.user.email });

    const restaurant = await Restaurants.create({
      images,
      name,
      sectionTitle,
      information,
      socialMedia,
      user: user._id,
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
