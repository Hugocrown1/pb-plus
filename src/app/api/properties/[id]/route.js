import { bucketName, client } from "@/lib/aws";
import { connectDB } from "@/lib/mongoose";
import Properties from "@/models/properties";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    await connectDB();
    const property = await Properties.findById(id).populate("user");
    if (!property)
      return NextResponse.json(
        { message: "No se encontro la propiedad" },
        { status: 404 }
      );
    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const data = await request.json();
    await connectDB();
    const property = await Properties.findById(id);
    if (!property)
      return NextResponse.json(
        { message: "No se encontro la propiedad" },
        { status: 404 }
      );
    const newProperty = await Properties.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );
    return NextResponse.json(newProperty);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    await connectDB();
    const property = await Properties.findById(id);
    if (!property)
      return NextResponse.json(
        { message: "No se encontro la propiedad" },
        { status: 404 }
      );
    const imageKeys = property.images.map((image) => ({
      Key: image.split("/").pop(),
    }));
    await client.send(
      new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: { Objects: imageKeys },
      })
    );
    const deletedProperty = await Properties.findByIdAndDelete(id);
    return NextResponse.json(deletedProperty);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
