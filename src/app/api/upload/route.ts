import { createUploadRouteHandler, route, type Router } from "better-upload/server";
import { r2 } from "better-upload/server/helpers";
import { serverEnvs } from "@/lib/envs/server-env";

// Create R2 client using Better Upload's helper
const s3Client = r2({
  accountId: serverEnvs.CLOUDFLARE_ACCOUNT_ID,
  accessKeyId: serverEnvs.R2_ACCESS_KEY_ID,
  secretAccessKey: serverEnvs.R2_SECRET_ACCESS_KEY,
});

const router: Router = {
  client: s3Client,
  bucketName: serverEnvs.R2_BUCKET_NAME,
  routes: {
    // Property images upload route
    propertyImages: route({
      fileTypes: ["image/*"],
      multipleFiles: true,
      maxFiles: 10, // Allow up to 10 images per property
      maxFileSize: 5 * 10 * 1024 * 1024, // 5MB in bytes
      onBeforeUpload(data) {
        const { files, clientMetadata } = data;
        
        // Use property title as the folder prefix (one level nesting)
        const propertyTitle = (clientMetadata as any)?.propertytitle || "unknown-property";
        
        return {
          generateObjectKey: ({ file }) => {
            // Create a slug from the original filename
            const fileSlug = file.name.toLowerCase()
              .replace(/[^a-z0-9.-]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
            
            // Return the key with just property title prefix (one level)
            return `properties/${propertyTitle}/${crypto.randomUUID()}-${fileSlug}`;
          }
        };
      },
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
      onBeforeUpload(data) {
        const { files, clientMetadata } = data;
        
        // Use property title as the folder prefix (one level nesting)
        const propertyTitle = (clientMetadata as any)?.propertytitle || "unknown-property";
        
        return {
          generateObjectKey: ({ file }) => {
            const fileSlug = file.name.toLowerCase()
              .replace(/[^a-z0-9.-]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
            
            // Return the key with just property title prefix (one level)
            return `documents/${propertyTitle}/${crypto.randomUUID()}-${fileSlug}`;
          }
        };
      },
    }),
  },
};

export const { POST } = createUploadRouteHandler(router);
