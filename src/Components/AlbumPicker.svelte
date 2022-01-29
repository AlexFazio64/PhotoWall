<script lang="ts">
  import Album from "./Album.svelte";
  import { uid, src } from "../stores";
  import { albums as url, IAlbum } from "../gapi_endpoints";

  let userAlbums: Array<IAlbum> = [];
  let albums: Array<string> = [];
  let checked: boolean = false;
  let next: number = 0;

  $: checked = albums.length < userAlbums.length;

  const fetchAlbums = async (page: string = undefined) => {
    const reqUrl = page == undefined ? url : url + "&pageToken=" + page;
    const params = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + $uid,
    };

    await fetch(reqUrl, { headers: params }).then((resp) => {
      resp.json().then(async (body) => {
        if (body.nextPageToken == undefined) return Promise.resolve();
        for (const a of body.albums) {
          let curr: IAlbum = new IAlbum();
          curr.cover = a.coverPhotoBaseUrl;
          curr.id = a.id;
          curr.title = a.title;
          userAlbums = [...userAlbums, curr];
        }
        await fetchAlbums(body.nextPageToken);
      });
    });
  };

  const handleAlbum = (_e) => {
    const { albumID, state } = _e.detail;
    if (state) albums = [...albums, albumID];
    else albums = albums.filter((album) => album != albumID);
  };

  const selectAll = () => {
    const ev: Event = new Event(checked ? "addAll" : "removeAll");
    albums = [];

    for (const card of document.getElementsByTagName("article"))
      card.dispatchEvent(ev);
  };
</script>

<main>
  <h1>Select which albums to include</h1>

  {#await fetchAlbums()}
    <div class="spinner" style="--size: 6rem; --w: 4px;" />
  {:then _l}
    <button type="reset" on:click={selectAll}
      >{checked ? "Select all" : "Deselect all"}
      <span class="material-icons-outlined"
        >{checked ? "check_box" : "check_box_outline_blank"}</span
      ></button
    >
    <section>
      {#each userAlbums as a}
        <Album
          on:albumstate={handleAlbum}
          id={a.id}
          cover={a.cover}
          title={a.title}
        />
      {/each}
    </section>
  {/await}

  <button
    disabled={albums.length === 0}
    on:click={() => src.update((s) => (s = [...albums]))}
    >Next<span class="material-icons">arrow_forward</span></button
  >
</main>

<style>
  main {
    min-height: 90vh;
    background-size: 200% 200%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;

    /* background-color: #4158d0;
    background-image: linear-gradient(
      135deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    ); */

    background-color: #21d4fd;
    background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);

    animation: shift 5s infinite alternate-reverse;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  h1 {
    color: white;
    margin-top: 1rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 400;
  }

  button {
    display: flex;
    font-size: 1.5rem;
    padding: 0.5em;
    align-items: center;
    gap: 0.3em;
    margin: 0.5em;
    border-color: transparent;
    border-radius: 2em;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
  }

  button[type="reset"] {
    font-size: 1rem;
    align-self: flex-end;
    margin: 0 1.3em 0 0;
  }

  button[type="reset"] > span {
    font-size: 1rem;
  }
</style>
