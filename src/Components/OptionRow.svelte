<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let name: string;
  export let min: number;
  export let value: number = min;
  export let max: number;

  const decrement = () => {
    value = Math.max(min, value - 1);
    dispatch("update", { value });
  };

  const increment = () => {
    value = Math.min(max, value + 1);
    dispatch("update", { value });
  };
</script>

<p class="name">{name}</p>
<span>
  <span class="material-icons cmd" on:click={decrement}>remove_circle</span>
  <p>{value}</p>
  <span class="material-icons cmd" on:click={increment}>add_circle</span>
</span>

<style>
  p {
    font-size: 1.5rem;
  }

  .name {
    margin-left: 1rem;
    font-size: 1rem;
  }

  .name ~ span {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-evenly;
  }

  .cmd {
    cursor: pointer;
    transition: 0.2s linear;
  }

  .cmd:hover {
    color: gold;
  }
</style>
