<script lang="ts">
  import { signOut } from "firebase/auth";
  import { auth, user, logged } from "../stores";

  const logout = () => {
    signOut($auth);
    logged.update((l) => (l = -1));
  };
</script>

<nav>
  <p class="name">PW</p>
  <div class="spacer" />
  <img src={$user.user.photoURL} alt="profile" />
  <p class="profile">{$user.user.displayName}</p>
  <span class="material-icons-round" on:click={logout}>logout</span>
</nav>

<style>
  .spacer {
    flex-grow: 1;
  }

  nav {
    z-index: 1;
    height: 10vh;
    background-color: hsl(278, 84%, 30%);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    font-size: 1.4rem;
    color: white;
  }

  .name {
    font-weight: 700;
    font-size: 2rem;
  }

  img {
    width: 50px;
    border-radius: 3em;
  }

  p.profile {
    font-weight: 500;
    letter-spacing: 0.1em;
  }

  p.profile:hover {
    text-decoration: underline;
  }

  span {
    cursor: pointer;
  }
</style>
