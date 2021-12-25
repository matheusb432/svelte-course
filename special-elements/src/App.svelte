<script lang="ts">
  import DynamicComponents from './DynamicComponents.svelte';
  import RecursiveComponents from './RecursiveComponents.svelte';

  let y: number;

  let currentTitle = 'My app';

  function switchTitle() {
    currentTitle = 'A new title';
  }

  $: console.log(y);
</script>

<!-- NOTE declarative way of interacting with the window object -->
<svelte:window bind:scrollY={y} />
<svelte:body on:mouseenter />

<svelte:head>
  <title>{currentTitle}</title>
</svelte:head>
<button on:click={switchTitle}>Switch Title</button>

<RecursiveComponents />

<DynamicComponents />
