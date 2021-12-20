<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let title: string;
  export let price: number;
  export let bestseller = false;

  const dispatch = createEventDispatcher();

  function addToCart() {
    // NOTE dispatching an event to any component that is listening to this event
    dispatch('add-to-cart', { id: 'p1' });
  }

  function deleteProduct() {
    dispatch('delete', { id: 'p1' });
  }
</script>

<article>
  <h1>{title}</h1>
  <h2>{price}</h2>
  {#if bestseller}
    <h3>BESTSELLER</h3>
  {/if}
  <button on:click={addToCart}>Add to Cart</button>
  <button on:click={() => dispatch('delete', { id: 'p1' })}>Delete</button>
</article>
