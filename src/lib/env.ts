import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.url(),
//   API_KEY: z.string().min(32).max(32),
});


const { success, data, error } = serverEnvSchema.safeParse(process.env);
if (!success) {
  console.error("Invalid server environment variables:", error.format());
  throw new Error("Invalid server environment variables");
}

export const serverEnvs = data;
