<script lang="ts">
  import { authClient } from "$lib/auth/client";
  const session = authClient.useSession();
</script>


<div class="flex flex-col items-center justify-center h-screen body">
  {#if $session.data}
    <div>
      <p>{$session?.data?.user.name}</p>
      <button onclick={() => authClient.signOut()}>
        Sign Out
      </button>
    </div>
  {:else}
    <p>Not signed in</p>
    <button
      onclick={() => {
        authClient.signIn.email({
          email: "test@test.com",
          password: "test",
        });
      }}
    >
      Continue with Email
    </button>
  {/if}
</div>


<style>
	.body {
		background-color: rgb(31, 31, 31);
        color: white;
	}
</style>