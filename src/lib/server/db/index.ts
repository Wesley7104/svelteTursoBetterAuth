import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const client = createClient({
  url: "http://127.0.0.1:8080"
});

export const db = drizzle(client, { schema });

// Helper type for the database
export type Database = typeof db;
