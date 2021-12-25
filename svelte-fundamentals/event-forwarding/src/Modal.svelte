<script lang="ts">
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate,
  } from 'svelte';

  const dispatch = createEventDispatcher();

  let agreed = false;
  let autoscroll = false;

  // NOTE onMount gets executed after the script executes and the DOM is mounted
  // NOTE Mounting is the process of outputting the virtual representation of a component into the final UI representation (e.g. DOM or Native Components).
  onMount(() => {
    console.log('onMount');
  });

  // NOTE onDestroy triggers on component cleanup
  onDestroy(() => {
    console.log('onDestroy');
  });

  // NOTE beforeUpdate triggers just before Svelte executes updates the DOM when it detects changes
  beforeUpdate(() => {
    console.log('beforeUpdate');
    autoscroll = agreed;
  });

  // NOTE afterUpdate triggers just after Svelte updates the DOM
  afterUpdate(() => {
    console.log('afterUpdate');
    if (autoscroll) {
      const modal = document.getElementById('modalContainer');

      modal.scrollTo(0, modal.scrollHeight);
    }
  });

  console.log('script executed');
</script>

<div class="backdrop" on:click={() => dispatch('cancel')} />
<div class="modal" id="modalContainer">
  <header>
    <!-- NOTE unnamed slots will be the default, while named ones require specification -->
    <slot name="header" />
  </header>
  <div class="content">
    <!-- NOTE with <slot />, any children elements of this component will be rendered here -->
    <slot />
  </div>
  <div class="disclaimer">
    <p>Before you close, you need to agree to our terms!</p>
    <button on:click={() => (agreed = true)}>Agree</button>
  </div>
  <footer>
    <slot name="footer" didAgree={agreed}>
      <!-- NOTE this content will only be rendered if the `footer` slot is not provided -->
      <button on:click={() => dispatch('close')} disabled={!agreed}
        >Close</button>
    </slot>
  </footer>
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    /* max-height: 80vh; */
    max-height: 15vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
    /* overflow: hidden; */
  }

  header {
    border-bottom: 1px solid #ccc;
  }
</style>
