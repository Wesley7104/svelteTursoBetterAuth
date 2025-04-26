import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
  // Default configuration
  baseURL: "/",
  // Add any additional client configuration here
});
