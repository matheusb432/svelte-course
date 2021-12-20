<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let agreed = false;
</script>

<div class="backdrop" on:click={() => dispatch('cancel')} />
<div class="modal">
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
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    /* overflow: scroll; */
    overflow: hidden;
  }

  header {
    border-bottom: 1px solid #ccc;
  }
</style>
