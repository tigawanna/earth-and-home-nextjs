import { createUploadRouteHandler, route, type Router } from 'better-upload/server';
import { r2 } from 'better-upload/server/helpers';
import { serverEnvs } from '@/lib/env';

// Create R2 client using Better Upload's helper
const s3Client = r2({
  accountId: serverEnvs.CLOUDFLARE_ACCOUNT_ID,
  accessKeyId: serverEnvs.R2_ACCESS_KEY_ID,
  secretAccessKey: serverEnvs.R2_SECRET_ACCESS_KEY,
});

export const  betterUploadS3 = s3Client;

const router: Router = {
  client: s3Client,
  bucketName: "earth-and-home", // TODO: Replace with your actual bucket name
  routes: {
    // Property images upload route
    propertyImages: route({
      fileTypes: ["image/*"],
      multipleFiles: true,
      maxFiles: 10, // Allow up to 10 images per property
      maxFileSize: 5 * 1024 * 1024, // 5MB in bytes
    }),

    // Property documents upload route (for future use)
    propertyDocuments: route({
      fileTypes: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      multipleFiles: true,
      maxFiles: 5,
      maxFileSize: 10 * 1024 * 1024, // 10MB in bytes
    }),
  },
};

export const { POST } = createUploadRouteHandler(router);
