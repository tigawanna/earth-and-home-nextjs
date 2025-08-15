import { serverEnvs } from "../envs/server-env";
import { EnhancedQueryLogger } from "drizzle-query-logger";





// import { drizzle } from "drizzle-orm/neon-http";
// export const db = drizzle(serverEnvs.DATABASE_URL, {
//   logger: new EnhancedQueryLogger(),
// });




import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(serverEnvs.DATABASE_URL, {
  logger: new EnhancedQueryLogger(),
});

