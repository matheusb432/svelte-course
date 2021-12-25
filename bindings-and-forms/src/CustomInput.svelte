<script lang="ts">
  export let val: string;

  export function empty() {
    val = '';
  }

  export function setValToDefault() {
    val = 'default';
  }
</script>

<input type="text" bind:value={val} />
