<script lang="ts">
  export let added: boolean = false;
  // export let id: string = "";
</script>

<article on:click|capture={() => (added = !added)}>
  <input
    type="checkbox"
    bind:checked={added}
    style={added ? "display: block;" : ""}
  />
  <img src="https://picsum.photos/500" alt="album pic" draggable="false" />
  <caption>
    <p>
      ALBUM NAME VERY LONG ALBUM NAME LOL I DON'T EVEN KNOW, MAYBE I WILL EVEN
      FIT AN ENTIRE PARAGRAPH OF LOREM IPSUM Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Ratione, laudantium.
    </p>
  </caption>
</article>

<style>
  article {
    position: relative;
    box-sizing: content-box;
    width: 250px;
    border: solid 1px black;
    border-radius: 10px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  article > input[type="checkbox"] {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    margin: 0.5rem;
    aspect-ratio: 1/1;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  caption {
    height: 100%;
    width: 100%;
  }

  p {
    margin: auto;
    padding: 1em 0.5em;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
