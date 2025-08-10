import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32).max(64),
  BETTER_AUTH_URL: z.url().default("http://localhost:3000"),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  R2_ENDPOINT: z.url(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  //   API_KEY: z.string().min(32).max(32),
});


const { success, data, error } = serverEnvSchema.safeParse(process.env);
if (!success) {
  console.error("Invalid server environment variables:", error.format());
  throw new Error("Invalid server environment variables");
}

export const serverEnvs = data;
