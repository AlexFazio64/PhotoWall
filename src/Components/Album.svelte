<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let added: boolean = false;
  export let id: string;
  export let cover: string;
  export let title: string;

  const randomLetter = (): string => {
    return "abcdefghijklmnopqrstuvwxyz".charAt(Math.round(Math.random() * 26));
  };

  onMount(() => {
    document.getElementById(id).addEventListener("removeAll", (ev: Event) => {
      ev.stopPropagation();
      added = false;
      dispatch("albumstate", { albumID: id, state: added });
    });
    document.getElementById(id).addEventListener("addAll", (ev: Event) => {
      ev.stopPropagation();
      added = true;
      dispatch("albumstate", { albumID: id, state: added });
    });
  });

  const dispatch = createEventDispatcher();

  const updateAlbumState = () => {
    added = !added;
    dispatch("albumstate", { albumID: id, state: added });
  };
</script>

<article on:click={updateAlbumState} {id}>
  <input
    type="checkbox"
    bind:checked={added}
    style={added ? "display: block;" : ""}
  />
  <img
    src={cover}
    class={added ? "selected" : ""}
    alt="album pic"
    draggable="false"
  />
  <caption>
    <p class={added ? "selected" : ""}>{title}</p>
  </caption>
</article>

<style>
  article {
    position: relative;
    box-sizing: content-box;
    width: 250px;
    /* border: solid 1px black; */
    border-radius: 10px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  article > input[type="checkbox"] {
    z-index: 2;
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    margin: 0.5rem;
    aspect-ratio: 1/1;
  }

  img {
    z-index: 1;
    max-width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: top;
    transform: scale(1);
    transition: transform 0.2s ease;
  }

  img.selected {
    transform: scale(1.25) rotate(10deg);
  }

  caption {
    height: 100%;
    width: 100%;
    z-index: 2;
  }

  p {
    font-size: 1.3rem;
    margin: auto;
    padding: 1rem;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    background-color: #fff;
    transition: all 0.2s;
  }

  p.selected {
    background-color: hsl(278, 84%, 30%);
    color: #fff;
    font-weight: 500;
    letter-spacing: 1px;
  }
</style>
