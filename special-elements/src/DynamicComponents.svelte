<script lang="ts">
  import Product from './Product.svelte';
  import CartItem from './CartItem.svelte';

  // NOTE renderedComponent will store the component constructor
  let renderedComponent = { cmp: Product, title: 'Test Product', id: 'p1' };

  function toggle() {
    if (renderedComponent.cmp === Product) {
      renderedComponent = { cmp: CartItem, title: 'Cart Item', id: 'p2' };
    } else {
      renderedComponent = { cmp: Product, title: 'Test Product', id: 'p1' };
    }
  }
</script>

<button on:click={toggle}>Toggle Display</button>

<!-- NOTE dynamically rendered component -->
<svelte:component
  this={renderedComponent.cmp}
  title={renderedComponent.title}
  id={renderedComponent.id} />

<!-- {#if showProduct}
    <Product title="Test Product" id="p1" />
  {:else}
    <CartItem title="Another Product" id="p2" />
  {/if} -->
