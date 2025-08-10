import { serverEnvs } from "@/lib/envs/server-env";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({ 
    region: "auto",
     endpoint: serverEnvs.R2_ENDPOINT,
     credentials: {
       accessKeyId: serverEnvs.R2_ACCESS_KEY_ID,
       secretAccessKey: serverEnvs.R2_SECRET_ACCESS_KEY,
     },
});
