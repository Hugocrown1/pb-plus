import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const bucketName = "pb-plus";

export async function GET() {
  try {
    await connectDB();
    const users = await Users.find();
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const file = await request.formData().then((data) => data.get("file"));
    const client = new S3Client({
      region: "us-west-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
    const fileExtension = file.name.split(".").pop();
    const newFileName = Date.now() + "-" + "." + fileExtension;
    console.log({ fileExtension, newFileName });
    await client.send(new PutObjectCommand({}));
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
