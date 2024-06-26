import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export const bucketName = "pb-plus-main";
