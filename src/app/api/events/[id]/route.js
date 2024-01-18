import { bucketName, client } from "@/lib/aws";
import { connectDB } from "@/lib/mongoose";
import Events from "@/models/events";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    await connectDB();
    const event = await Events.findById(id);
    if (!event)
      return NextResponse.json(
        { message: "No se encontro el evento" },
        { status: 404 }
      );
    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const data = await request.json();
    await connectDB();
    const event = await Properties.findById(id);
    if (!event)
      return NextResponse.json(
        { message: "No se encontro el evento" },
        { status: 404 }
      );
    const newEvent = await Events.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );
    return NextResponse.json(newEvent);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    await connectDB();
    const event = await Events.findById(id);
    if (!event)
      return NextResponse.json(
        { message: "No se encontro el evento" },
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
    const deletedEvent = await Events.findByIdAndDelete(id);
    return NextResponse.json(deletedEvent);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
