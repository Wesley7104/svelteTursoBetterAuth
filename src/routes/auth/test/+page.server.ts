import { auth } from "$lib/auth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  return {
    session: await auth.handler(request)
  };
}; 