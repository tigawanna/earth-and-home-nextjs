import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "./drizzle/client";
import { user } from "./drizzle/schema";
import { createAuthMiddleware, APIError } from "better-auth/api";
import * as schema from "@/lib/drizzle/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    // make the payload admin if this is the first user being created
    before: createAuthMiddleware(async (ctx) => {
      // Only apply this logic for sign up requests
      if (ctx.path === "/sign-up/email") {
        try {
          // Count existing users in the database
          const userCount = await db.select().from(user).limit(1);
          
          // If this is the first user, make them an admin
          if (userCount.length === 0) {
            ctx.body = {
              ...ctx.body,
              role: "admin"
            };
          }
        } catch (error) {
          console.error("Error checking user count:", error);
          // Don't throw here to avoid breaking signup flow
        }
      }
      
      return ctx;
    }),
  },
  plugins: [admin(), nextCookies()], // nextCookies should be last
});
