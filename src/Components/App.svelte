<script lang="ts">
  import { logged, uid, user, auth, provider } from "../stores";
  import {
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
  } from "firebase/auth";
  import Grid from "./Grid.svelte";
  import User from "./User.svelte";

  const signin = (_e) => {
    signInWithRedirect($auth, $provider);
  };

  getRedirectResult($auth).then((cred) => {
    if (cred) {
      const tok = GoogleAuthProvider.credentialFromResult(cred).accessToken;
      logged.update((o) => (o = 1));
      uid.update((o) => (o = tok));
      user.update((o) => (o = cred));
    } else {
      logged.update((o) => (o = -1));
    }
  });
</script>

{#if $logged == 1}
  <User />
{:else}
  <main>
    <Grid />

    <div class="login-flex">
      <p class="google-descr">
        Log into your Google Account to start customizing your wallpaper
      </p>

      <button
        id="loading-btn"
        on:click|preventDefault={signin}
        disabled={$logged == 0}
        style={$logged == 0 ? "cursor: initial; filter: brightness(.5);" : ""}
      >
        Login {#if $logged == 0}<div class="spinner" />{:else}with Google{/if}
      </button>
    </div>
  </main>
{/if}

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  .google-descr {
    font-size: 1.5rem;
    text-align: justify;
  }

  .login-flex {
    min-width: min(100%, 500px);
    max-width: 45%;
    background-color: rgb(0, 0, 0, 0.85);
    color: white;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 2em;

    padding: 2rem;
  }

  #loading-btn {
    cursor: pointer;
    background-color: #1565c0;
    color: white;
    outline: none;
    border: none;

    padding: 0.6em;
    border-radius: 1.5em;
    font-size: 1.25rem;
    width: max-content;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }
</style>
