import { db } from "$lib/server/db";
import { user, session } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Handle } from "@sveltejs/kit";

// Define the user type for locals
declare global {
  namespace App {
    interface Locals {
      user: {
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
      } | null;
    }
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("session");

  if (!sessionId) {
    event.locals.user = null;
    return await resolve(event);
  }

  const [userSession] = await db.select().from(session).where(eq(session.id, sessionId));

  if (userSession) {
    const [userData] = await db.select().from(user).where(eq(user.id, userSession.userId));
    event.locals.user = userData || null;
  } else {
    event.locals.user = null;
  }

  return await resolve(event);
}; 