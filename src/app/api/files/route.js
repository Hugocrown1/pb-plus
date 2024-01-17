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

    const imageUrls = [];

    for (const [key, file] of formData.entries()) {
      const fileExtension = file.name.split(".").pop();
      const timestamp = Date.now();
      const randomSuffix = Math.floor(Math.random() * 1000); // Número aleatorio entre 0 y 999
      const newFileName = `${timestamp}_${randomSuffix}.${fileExtension}`;

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
      imageUrls.push(link);
    }

    return NextResponse.json(imageUrls);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
