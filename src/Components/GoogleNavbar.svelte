<script lang="ts">
  import { signOut } from "firebase/auth";
  import { auth, user, logged } from "../stores";

  const logout = () => {
    signOut($auth);
    logged.update((l) => (l = -1));
    console.log("sloggato", $logged);
  };
</script>

<nav>
  <img src={$user.user.photoURL} alt="profile" />
  <p>{$user.user.displayName}</p>
  <span class="material-icons-round" on:click={logout}>logout</span>
</nav>

<style>
  nav {
    z-index: 1;
    height: 10vh;
    background-color: #7e11bf;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-right: 1rem;
    align-items: center;
    font-size: 1.4rem;
    color: white;
  }

  img {
    width: 50px;
    border-radius: 3em;
  }

  p {
    font-weight: 500;
    letter-spacing: 0.1em;
  }

  p:hover {
    text-decoration: underline;
  }

  span {
    cursor: pointer;
  }
</style>
