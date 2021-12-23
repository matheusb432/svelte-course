<script lang="ts">
  export let controlType: 'textarea' | null = null;

  export let value: string | number;
  export let type: 'text' | 'email' | 'password' = 'text';
  export let id: string;
  export let label: string;
  export let rows: number | null = null;
  export let valid = true;
  export let validityMsg = '';

  let touched = false;

  $: showValidationErr = !valid && touched;

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }

  function markAsTouched() {
    touched = true;
  }
</script>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <!-- NOTE bind:value will forward allow the value to be binded from the parent component  -->
    <textarea
      class:invalid={showValidationErr}
      {rows}
      {id}
      bind:value
      on:blur={markAsTouched} />
  {:else}
    <input
      class:invalid={showValidationErr}
      use:typeAction
      {id}
      bind:value
      on:blur={markAsTouched} />
  {/if}
  {#if validityMsg && showValidationErr}
    <p class="error-message">{validityMsg}</p>
  {/if}
</div>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }

  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>
