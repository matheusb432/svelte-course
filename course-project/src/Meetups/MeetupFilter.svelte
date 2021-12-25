<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Buttons } from './types/buttons.enum';

  let selectedButton: Buttons = Buttons.All;

  const dispatch = createEventDispatcher();

  function filterAll(): void {
    filterAction(Buttons.All);
  }

  function filterFavorite(): void {
    filterAction(Buttons.Favorite);
  }

  function filterAction(buttonType: Buttons = Buttons.All): void {
    selectedButton = buttonType;
    dispatch('select', buttonType);
  }
</script>

<div>
  <button
    type="button"
    class:active={selectedButton === Buttons.All}
    on:click={filterAll}>All</button>
  <button
    type="button"
    class:active={selectedButton === Buttons.Favorite}
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
