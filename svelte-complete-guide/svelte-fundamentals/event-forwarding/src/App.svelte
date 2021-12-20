<script lang="ts">
  import type { ProductModel } from './product-model';

  import Product from './Product.svelte';
  import Modal from './Modal.svelte';

  let showModal = false;

  let closable = false;

  let products: ProductModel[] = [
    {
      id: 'p1',
      title: 'A book',
      bestseller: false,
      price: 9.99,
    },
    {
      id: 'p2',
      title: 'A Small Book',
      bestseller: true,
      price: 9.99,
    },
  ];

  function addToCart(event: CustomEvent) {
    console.log(event);
  }

  function deleteProduct(event: CustomEvent) {
    console.log(event.detail);
  }

  function closeModal(event: Event, open: boolean = false) {
    showModal = open;
  }
</script>

{#each products as product}
  <!-- NOTE listening to events on the <Product /> -->
  <!-- NOTE passing the object with the spread `...` operator to shorthand passing the params as properties  -->
  <Product {...product} on:add-to-cart={addToCart} on:delete={deleteProduct} />
{/each}

<button on:click={(ev) => closeModal(ev, true)}>Show Modal</button>

{#if showModal}
  <!-- NOTE passing children elements to the <Modal /> -->
  <Modal on:cancel={closeModal} on:close={closeModal} let:didAgree={closable}>
    <!-- NOTE with slot="header", this will be rendered to slot with the name attribute set to header in <Modal /> -->
    <h1 slot="header">In Header Slot</h1>
    <p>In default slot</p>
    <button slot="footer" on:click={closeModal} disabled={!closable}
      >Confirm</button>
  </Modal>
{/if}
