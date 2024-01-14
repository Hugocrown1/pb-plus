import { client, bucketName } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

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
    const formData = await request.formData();
    const file = formData.get("file");

    const fileExtension = file.name.split(".").pop();
    const newFileName = Date.now() + "." + fileExtension;

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
