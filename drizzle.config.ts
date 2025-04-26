import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const isLocal = process.env.DATABASE_URL?.includes("127.0.0.1") || process.env.DATABASE_URL?.includes("localhost");

export default {
	schema: "./src/lib/server/db/schema.ts",
	out: "./drizzle",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
		...(isLocal ? {} : { authToken: process.env.DATABASE_AUTH_TOKEN as string })
	},
	verbose: true,
	strict: true,
} satisfies Config;
