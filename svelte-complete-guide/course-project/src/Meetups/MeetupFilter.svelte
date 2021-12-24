<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let selectedButton: 0 | 1 = 0;

  const dispatch = createEventDispatcher();

  function filterAll(): void {
    filterAction(0);
  }

  function filterFavorite(): void {
    filterAction(1);
  }

  function filterAction(buttonType: 0 | 1 = 0): void {
    selectedButton = buttonType;
    dispatch('select', buttonType);
  }
</script>

<div>
  <!-- NOTE 0 = All Button & 1 = Favorite Button, maybe change this to enum? -->
  <button type="button" class:active={selectedButton === 0} on:click={filterAll}
    >All</button>
  <button
    type="button"
    class:active={selectedButton === 1}
    on:click={filterFavorite}>Favorite</button>
</div>

<style>
  div {
    font-size: 0px;
  }

  button {
    background: #aaaaaa;
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.5rem 1rem;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  button:active,
  .active {
    background: #cf0056;
    border-color: #cf0056;
    color: white;
  }
</style>
