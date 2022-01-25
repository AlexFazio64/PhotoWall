<script lang="ts">
  import { init, getGridArea } from "../packing";

  let rows: number, cols: number;

  rows = Math.round(Math.random() * 7 + 5);
  cols = Math.round(Math.random() * 7 + 5);
  init(rows, cols);

  let grid = getGridArea();

  const generateGrid = () => {
    rows = Math.round(Math.random() * 7 + 5);
    cols = Math.round(Math.random() * 7 + 5);
    init(rows, cols);
    grid = getGridArea();
  };

  const getRandomImage = () => {
    return "https://picsum.photos/500?random=" + Math.random() * 100;
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
</script>

<button
  id="refresh"
  class="material-icons-round"
  type="reset"
  on:click={generateGrid}
>
  replay_circle_filled
</button>

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
  #refresh {
    outline: none;
    border: white;
    border-radius: 100%;
    background-color: #000;
    color: white;
    font-size: 2.5rem;

    z-index: 2;
    position: absolute;
    top: -4rem;
    right: 2rem;
    transition: all 0.25s;
    animation: pop-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 1s forwards,
      wiggle 0.5s linear 2s;
  }

  #refresh:hover {
    transform: rotate(-360deg);
  }

  #image-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #000;
    display: grid;
    gap: 5px;
  }
</style>
