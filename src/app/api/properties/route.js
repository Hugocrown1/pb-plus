import { connectDB } from "@/lib/mongoose";
import Properties from "@/models/properties";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Users from "@/models/users";

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
    const session = await getServerSession(authOptions);
    const {
      images,
      bedrooms,
      bathrooms,
      type,
      title,
      price,
      zone,
      address,
      description,
    } = await request.json();

    const user = await Users.findOne({ email: session.user.email });

    if (!user)
      return NextResponse.json(
        { message: "No se encontro el usuario" },
        { status: 404 }
      );

    const property = await Properties.create({
      images,
      bedrooms: parseFloat(bedrooms),
      bathrooms: parseFloat(bathrooms),
      type,
      title,
      price: parseFloat(price),
      zone,
      address,
      description,
      publishDate: new Date(),
      coverImage: images[0],
      user: user._id,
    });

    user.properties = user.properties.concat(property._id);

    await user.save();

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
