import "dotenv/config";
import { s3Client } from "@/lib/cloudflare/r2/r2";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

import fs from "fs/promises";

async function listObjects(bucketName: string) {
  // betterUploadS3.send(new ListBucketsCommand({}))
  const data = await s3Client.send(new ListObjectsV2Command({ Bucket: bucketName }));
  console.log(`Objects in ${bucketName}:`, data.Contents);
}

async function uploadImage() {
  const filePath = "real/cute-house.jpg";
  const fileContent = await fs.readFile(filePath);
  await s3Client.send(new PutObjectCommand({
    Bucket: "earth-and-home",
    Key: "cute-house.jpg",
    Body: fileContent,
  }));
}

// listObjects("earth-and-home")
uploadImage().catch((error) => {
  console.error("Error uploading image:", error);
  process.exit(1);
});

