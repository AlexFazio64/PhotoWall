<script lang="ts">
  import html2canvas from "html2canvas";
  import { onMount } from "svelte";
  import { init, getGridArea } from "../packing";
  import { src, uid, auth, logged } from "../stores";
  import { mediaItems } from "../gapi_endpoints";
  import Settings from "./Settings.svelte";
  import { signOut } from "firebase/auth";

  let rows: number, cols: number;
  let images: string[] = [];

  rows = Math.round(Math.random() * 7 + 5);
  cols = Math.round(Math.random() * 7 + 5);
  init(rows, cols);
  let grid = getGridArea();

  export const generateGrid = () => {
    init(rows, cols);
    grid = getGridArea();
  };

  const getRandomImage = () => {
    if (images.length > 0) {
      let idx = Math.round(Math.random() * (images.length - 1));
      return images[idx];
    }

    return "https://picsum.photos/500?random=" + Math.random() * 100;
  };

  const logout = () => {
    signOut($auth);
    logged.update((l) => (l = -1));
    src.update((s) => (s = []));
  };

  const loadImage = async (id: number) => {
    const imageurl = getRandomImage();
    let img = new Image();

    const update = () => {
      let div = document.getElementById("0");
      div.style.backgroundImage = "url(" + imageurl + ")";
      div.style.animation = "fade-in .5s linear forwards";
      img.remove();
    };

    img.addEventListener("load", update);
    img.src = imageurl;
  };

  const getMediaItem = async (id: string) => {
    console.log(id);

    const params = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + $uid,
    };

    await fetch(mediaItems + ":search", {
      method: "post",
      headers: params,
      body: JSON.stringify({
        pageSize: "70",
        albumId: id,
      }),
    }).then(async (resp) => {
      await resp.json().then((body) => {
        for (const a of body.mediaItems) {
          images = [...images, a.baseUrl];
        }
      });
    });
  };

  onMount(async () => {
    if ($src.length > 0) {
      for (const album of $src) {
        await getMediaItem(album);
      }
      generateGrid();
    }
  });
</script>

<Settings
  on:refresh={(ev) => {
    rows = ev.detail.grid.row;
    cols = ev.detail.grid.col;
    generateGrid();
  }}
  on:fullscreen={() => {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }}
  on:save={() => {
    html2canvas(document.getElementById("image-grid")).then((canvas) => {
      let image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      window.location.href = image;
    });
  }}
  on:logout={logout}
/>
<div
  id="image-grid"
  style="
      grid-template-rows: repeat({rows}, 1fr); 
      grid-template-columns: repeat({cols}, 1fr);"
>
  {#await grid then solution}
    {#each solution.positions as pos}
      <div
        class={pos.char}
        style="background: center center / cover;
        background-image: url({getRandomImage()});"
      />
    {/each}
  {/await}
</div>

<style>
  #image-grid {
    padding: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #000;
    display: grid;
    gap: 5px;
  }
</style>
