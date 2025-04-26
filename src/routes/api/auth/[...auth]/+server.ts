import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { user, session, account } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export const GET: RequestHandler = async ({ url, locals }) => {
  const path = url.pathname.split("/").pop();
  
  if (path === "get-session") {
    return json(locals.user ? {
      user: locals.user
    } : null);
  }

  return json({ error: "Invalid request" }, { status: 400 });
};

export const POST: RequestHandler = async ({ request, url, cookies }) => {
  try {
    const segments = url.pathname.split("/");
    const action = segments[segments.length - 2];
    const provider = segments[segments.length - 1];

    if (action === "sign-up" && provider === "email") {
      const { email, password } = await request.json();
      
      if (!email || !password) {
        return json({ error: "Email and password are required" }, { status: 400 });
      }

      const [existingUser] = await db.select().from(user).where(eq(user.email, email));
      if (existingUser) {
        return json({ error: "User already exists" }, { status: 400 });
      }

      const userId = randomUUID();
      const [newUser] = await db.insert(user).values({
        id: userId,
        email,
        name: email.split("@")[0],
        emailVerified: false,
      }).returning();

      await db.insert(account).values({
        id: randomUUID(),
        userId,
        accountId: userId,
        providerId: "credentials",
        password
      });

      // Create session
      const sessionId = randomUUID();
      await db.insert(session).values({
        id: sessionId,
        userId,
        token: randomUUID(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      // Set session cookie
      cookies.set("session", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });

      return json({ user: newUser });
    }

    if (action === "sign-in" && provider === "email") {
      const { email, password } = await request.json();
      
      if (!email || !password) {
        return json({ error: "Email and password are required" }, { status: 400 });
      }

      // Find user and account
      const [userAccount] = await db
        .select()
        .from(account)
        .innerJoin(user, eq(user.id, account.userId))
        .where(
          and(
            eq(user.email, email),
            eq(account.password, password),
            eq(account.providerId, "credentials")
          )
        );

      if (!userAccount) {
        return json({ error: "Invalid credentials" }, { status: 400 });
      }

      // Create session
      const sessionId = randomUUID();
      await db.insert(session).values({
        id: sessionId,
        userId: userAccount.user.id,
        token: randomUUID(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      // Set session cookie
      cookies.set("session", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });

      return json({ user: userAccount.user });
    }

    return json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}; 