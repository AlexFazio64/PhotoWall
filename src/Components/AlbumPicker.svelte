<script lang="ts">
  import { uid, user } from "../stores";
  import Album from "./Album.svelte";
  let req: string = "https://photoslibrary.googleapis.com/v1/mediaItems";
  let response;

  const request = async () => {
    fetch(req, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + $uid,
      },
    }).then((resp) => {
      resp.json().then((text) => (response = text));
    });
  };
</script>

<main>
  <h1>Select which albums to include</h1>
  <!-- <span>Select all button</span> -->
  <section>
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
  </section>
  <button type="submit" on:click={() => {}}>Next</button>
</main>

<style>
  main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 1rem;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 1rem auto;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 400;
  }
</style>
