<script lang="ts">
  export let controlType: 'textarea' | 'input' = 'input';

  export let value: string | number;
  export let type: 'text' | 'email' | 'password' = 'text';
  export let id: string;
  export let label: string;
  export let rows: number = 3;

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <!-- NOTE on:input like this is forwarded to the parent component  -->
    <textarea {rows} {id} {value} on:input />
  {:else}
    <input use:typeAction {id} bind:value />
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
</style>
