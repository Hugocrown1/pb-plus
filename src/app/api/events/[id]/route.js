import { bucketName, client } from "@/lib/aws";
import { connectDB } from "@/lib/mongoose";
import { verifyUser } from "@/lib/userAuth";
import Events from "@/models/events";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    await connectDB();
    const event = await Events.findById(id).populate("user");
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
    if (await verifyUser(event.user._id.toString())) {
      const newEvent = await Events.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
      );
      return NextResponse.json(newEvent);
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
    const event = await Events.findById(id);
    if (!event)
      return NextResponse.json(
        { message: "No se encontro el evento" },
        { status: 404 }
      );
    if (await verifyUser(event.user._id.toString())) {
      const imageKeys = event.images.map((image) => ({
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
