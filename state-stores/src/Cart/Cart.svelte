<script>
  import { onDestroy } from 'svelte';
  import { timer } from '../timer-store';

  import cartItems from './cart-store';
  import CartItem from './CartItem.svelte';

  const unsubscribe = timer.subscribe((count) => {
    console.log('Cart: ' + count);
  });

  onDestroy(() => {
    unsubscribe();
  });

  // NOTE alternate way
  // export let items = [];

  // const cartUnsubscribe = cartItems.subscribe((storeItems) => {
  //   items = storeItems;
  // });

  // // NOTE unsubscribing from cartItems when this component is destroyed to avoid a memory leak
  // onDestroy(() => {
  //   cartUnsubscribe();
  // });
</script>

<section>
  <h1>Cart</h1>
  <ul>
    <!-- NOTE ${store} syntax to access the store's value without needing to manage a subscription -->
    {#each $cartItems as item (item.id)}
      <CartItem id={item.id} title={item.title} price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
    border-bottom: 2px solid #ccc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
