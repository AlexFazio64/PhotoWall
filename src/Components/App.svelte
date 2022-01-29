<script lang="ts">
  import { logged, uid, user, auth, provider, src } from "../stores";
  import {
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
  } from "firebase/auth";
  import Grid from "./Grid.svelte";
  import User from "./User.svelte";

  const signin = (_e) => signInWithRedirect($auth, $provider);

  getRedirectResult($auth).then((cred) => {
    if (cred) {
      const tok = GoogleAuthProvider.credentialFromResult(cred).accessToken;
      uid.update((o) => (o = tok));
      user.update((o) => (o = cred));
      logged.update((o) => (o = 1));
    } else {
      logged.update((o) => (o = -1));
    }
  });
</script>

{#if $src.length != 0}
  <Grid />
{:else if $logged == 1}
  <User />
{:else}
  <main>
    <Grid />

    <div class="login-flex">
      <p class="google-descr">
        Log into your Google Account to start customizing your wallpaper
      </p>

      <button id="loading-btn" on:click={signin} disabled={$logged == 0}>
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
    user-select: none;
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

  #loading-btn:hover:not(#loading-btn:disabled) {
    filter: brightness(1.2);
  }

  #loading-btn:disabled {
    cursor: progress;
    filter: brightness(0.5);
  }
</style>
