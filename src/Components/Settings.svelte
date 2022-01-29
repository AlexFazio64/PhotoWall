<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import OptionRow from "./OptionRow.svelte";
  let showDropdown: boolean = false;

  const dispatch = createEventDispatcher();

  let row: number = 4,
    col: number = 4;

  let newgrid = { row, col };

  const update = (pro, val) => {
    switch (pro) {
      case "r":
        row = val;
        break;
      case "c":
        col = val;
        break;
    }

    newgrid = { row, col };
  };
</script>

<div id="settings" class={showDropdown ? "open" : ""}>
  <div class="head">
    <span
      class="material-icons-round gear"
      on:click={() => (showDropdown = !showDropdown)}
    >
      settings
    </span>
    <span class="title">Settings</span>
  </div>

  <div id="dropdown" class={showDropdown ? "shown" : ""}>
    <OptionRow
      min={4}
      max={8}
      name={"Row"}
      on:update={(e) => {
        update("r", e.detail.value);
      }}
    />
    <OptionRow
      min={4}
      max={8}
      name={"Columns"}
      on:update={(e) => {
        update("c", e.detail.value);
      }}
    />
    <p class="gen">Generate</p>
    <div class="special">
      <span
        class="material-icons-round action"
        on:click={() => dispatch("refresh", { grid: newgrid })}>refresh</span
      >
      <span
        class="material-icons-round action"
        on:click={() => {
          showDropdown = !showDropdown;
          dispatch("fullscreen");
        }}>fullscreen</span
      >
      <span
        class="material-icons-round"
        on:click={() => {
          dispatch("save");
        }}>save</span
      >
      <span
        class="material-icons-round"
        on:click={() => {
          dispatch("savecloud");
        }}>cloud_upload</span
      >
    </div>
  </div>
</div>

<style>
  #settings {
    overflow: hidden;
    width: 3rem;
    height: 3rem;
    border-radius: 2em;
    outline: none;
    background-color: #000;
    color: white;

    z-index: 2;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    transition: width 0.5s, height 0.5s, border-radius 0.1s;
  }

  #settings.open {
    border-radius: 1em;
    width: 250px;
    height: 150px;
  }

  #dropdown {
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: center;
    justify-content: start;
    gap: 5px 10px;

    position: relative;
    left: 100%;
    transition: all 0.2s ease-in;
    opacity: 0;
  }

  #dropdown.shown {
    opacity: 1;
    left: 0;
  }

  .head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    text-decoration: underline;
  }

  .gear {
    font-size: 2.5rem;
    margin: 0.25rem;
    transition: transform 0.5s;
  }

  .gear:hover {
    transform: rotate(60deg);
  }

  .action {
    cursor: pointer;
  }

  .gen {
    margin-left: 1em;
  }

  .special {
    display: flex;
    justify-content: space-evenly;
  }
</style>
