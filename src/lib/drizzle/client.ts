import { drizzle } from "drizzle-orm/neon-http";
import { serverEnvs } from "../env";

const db = drizzle(serverEnvs.DATABASE_URL);
