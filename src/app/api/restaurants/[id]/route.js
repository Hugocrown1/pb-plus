import { bucketName, client } from "@/lib/aws";
import { connectDB } from "@/lib/mongoose";
import { verifyUser } from "@/lib/userAuth";
import Restaurants from "@/models/restaurants";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    await connectDB();
    const restaurant = await Restaurants.findById(id).populate("user");
    if (!restaurant)
      return NextResponse.json(
        { message: "No se encontro el restaurante" },
        { status: 404 }
      );
    return NextResponse.json(restaurant);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const data = await request.json();
    await connectDB();
    const restaurant = await Restaurants.findById(id);
    if (!restaurant)
      return NextResponse.json(
        { message: "No se encontro el restaurante" },
        { status: 404 }
      );
    if (await verifyUser(restaurant.user._id.toString())) {
      const newRestaurant = await Restaurants.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
      );
      return NextResponse.json(newRestaurant);
    }
    return NextResponse.json(
      { message: "Usuario no autorizado" },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    await connectDB();
    const restaurant = await Restaurants.findById(id);
    if (!restaurant)
      return NextResponse.json(
        { message: "No se encontro el restaurante" },
        { status: 404 }
      );
    if (await verifyUser(restaurant.user._id.toString())) {
      const imageKeys = restaurant.images.map((image) => ({
        Key: image.split("/").pop(),
      }));
      await client.send(
        new DeleteObjectsCommand({
          Bucket: bucketName,
          Delete: { Objects: imageKeys },
        })
      );
      const deletedRestaurant = await Restaurants.findByIdAndDelete(id);
      return NextResponse.json(deletedRestaurant);
    }
    return NextResponse.json(
      { message: "Usuario no autorizado" },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
