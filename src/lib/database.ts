import { drizzle } from "drizzle-orm/neon-http";
import { serverEnvs } from "./env";
import { EnhancedQueryLogger } from "drizzle-query-logger";

export const db = drizzle(serverEnvs.DATABASE_URL, {
  logger: new EnhancedQueryLogger(),
});
