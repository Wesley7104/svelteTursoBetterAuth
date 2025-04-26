<script lang="ts">
  import { authClient } from "$lib/auth/client";
  import { writable, type Writable } from "svelte/store";

  type SessionData = Awaited<ReturnType<typeof authClient.getSession>>;
  const session: Writable<SessionData | null> = writable(null);

  // Initialize session
  authClient.getSession().then(data => {
    session.set(data);
  });

  let email = "";
  let password = "";
  let name = "";
  let isRegistering = false;
  let error = "";

  async function handleSubmit() {
    error = "";
    try {
      if (isRegistering) {
        await authClient.signUp.email({
          email,
          password,
          name
        });
      } else {
        await authClient.signIn.email({
          email,
          password
        });
      }
    } catch (e) {
      error = e instanceof Error ? e.message : "An error occurred";
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900">
  <div class="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
    {#if $session?.user}
      <div class="text-center">
        <p class="text-xl mb-4">Welcome, {$session.user.name}!</p>
        <button 
          class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          on:click={() => authClient.signOut()}
        >
          Sign Out
        </button>
      </div>
    {:else}
      <div class="space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white mb-2">
            {isRegistering ? "Create Account" : "Sign In"}
          </h2>
          {#if error}
            <p class="text-red-500 mb-4">{error}</p>
          {/if}
        </div>

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          {#if isRegistering}
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                bind:value={name}
                class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
          {/if}
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              bind:value={email}
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              bind:value={password}
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {isRegistering ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div class="text-center">
          <button
            class="text-blue-400 hover:text-blue-300 text-sm"
            on:click={() => {
              isRegistering = !isRegistering;
              error = "";
            }}
          >
            {isRegistering ? "Already have an account? Sign in" : "Need an account? Register"}
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  input {
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid rgb(75, 85, 99);
  }
  
  input:focus {
    outline: 2px solid rgb(59, 130, 246);
    outline-offset: 2px;
  }
</style>