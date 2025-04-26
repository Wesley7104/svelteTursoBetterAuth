import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
  // Default configuration
  baseURL: "http://localhost:5173",
  // Add any additional client configuration here
});
