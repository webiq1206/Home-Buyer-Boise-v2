import { drizzle } from "drizzle-orm/neon-http";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "@/shared/schema";

// Lazy initialization of database connection
let sql: NeonQueryFunction<false, false> | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getConnection() {
  if (!sql) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    sql = neon(connectionString);
  }
  return sql;
}

function getDb() {
  if (!dbInstance) {
    dbInstance = drizzle(getConnection(), { schema });
  }
  return dbInstance;
}

// Export a proxy that lazily initializes the database
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    const instance = getDb();
    const value = (instance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});
