import { betterAuth } from "better-auth";
import { db } from "$lib/server/db";
import { randomUUID } from "crypto";

export const auth = betterAuth({
  database: {
    db: db,
  },
  providers: {
    credentials: {
      enabled: true,
    }
  },
  advanced: {
    database: {
      generateId: () => randomUUID()
    }
  }
}); 