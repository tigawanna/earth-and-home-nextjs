import "dotenv/config";
import { s3Client } from "@/lib/cloudflare/r2/r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

async function listObjects(bucketName: string) {
  const data = await s3Client.send(new ListObjectsV2Command({ Bucket: bucketName }));
  console.log(`Objects in ${bucketName}:`, data.Contents);
}

listObjects("earth-and-home").catch((error) => {
  console.error("Error listing objects:", error);
  process.exit(1);
});
