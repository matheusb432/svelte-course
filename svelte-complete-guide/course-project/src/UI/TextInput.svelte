<script lang="ts">
  export let controlType: 'textarea' | 'input' = 'input';

  export let value: string | number;
  export let type: 'text' | 'email' | 'password' = 'text';
  export let id: string;
  export let label: string;
  export let rows: number = 3;
</script>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <!-- NOTE on:input like this is forwarded to the parent component  -->
    <textarea {rows} {id} {value} on:input />
  {:else}
    <!-- <input {type} {id} bind:value={value} /> -->
    <input type="text" {id} {value} on:input />
  {/if}
</div>
