<script lang="ts">
  import { authClient } from "$lib/auth/client";
  const session = authClient.useSession();

  async function handleSignIn() {
    try {
      await authClient.signIn.email({
        email: "test@test.com",
        password: "test",
      });
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  }

  async function handleSignOut() {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen gap-4">
  {#if $session.data}
    <div class="text-center">
      <p class="mb-4">Signed in as: {$session.data.user.email}</p>
      <button
        class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        on:click={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  {:else}
    <div class="text-center">
      <p class="mb-4">Not signed in</p>
      <button
        class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        on:click={handleSignIn}
      >
        Sign In (Test Account)
      </button>
    </div>
  {/if}
</div> 