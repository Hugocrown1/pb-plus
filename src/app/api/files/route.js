import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import fs from "fs";
import mime from "mime-types";

const bucketName = "pb-plus";

export async function GET() {
  try {
    return NextResponse.json("Consiguiendo archivos...");
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
    const newFileName = Date.now() + "." + fileExtension;
    console.log( file.path );
    const buffer = Buffer.from(await file.arrayBuffer());
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: buffer,
        ACL: "public-read",
        ContentType: file.type,
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    return NextResponse.json(link);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
