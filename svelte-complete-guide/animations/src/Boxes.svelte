<script lang="ts">
  import { fade, fly, scale, slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicIn } from 'svelte/easing';

  //   let boxes: string[] = ['Apples', 'Bananas', 'Oranges'];
  let boxes: string[] = [];
  let boxInput: HTMLInputElement;

  let showParagraph = false;

  function addBox(): void {
    const box = boxInput.value;

    boxes = [...boxes, box];
  }

  function discard(value: string): void {
    boxes = boxes.filter((b) => b !== value);
  }
</script>

<button on:click={() => (showParagraph = !showParagraph)}>Toggle</button>

{#if showParagraph}
  <!-- NOTE if an animation is cancelled midway, it will cancel the initial animation and then animate backwards/forwards -->
  <!-- NOTE in/out are not cancellable but allow for different animations when animating something in or out -->
  <p in:fade out:fly={{ x: 300, y: 0 }}>Can you see me?</p>
{/if}
<hr />

<form on:submit|preventDefault={addBox}>
  <input type="text" bind:this={boxInput} />
  <button type="button" on:click={addBox}>Add</button>
</form>

{#if showParagraph}
  <!-- NOTE with the transition directive, it's possible to apply an animation to a dynamic DOM element -->
  <!-- NOTE animation:flip enables this list to rearrange itself in a smooth way when items are removed -->
  {#each boxes as box (box)}
    <div
      class="box"
      transition:fly|local={{ x: 200, y: 0 }}
      on:click={discard.bind(this, box)}
      on:introstart={() => console.log('Adding the element starts')}
      on:introend={() => console.log('Adding the element ends')}
      on:outrostart={() => console.log('Removing the element starts')}
      on:outroend={() => console.log('Removing the element ends')}
      animate:flip={{ duration: 300 }}>
      {box}
    </div>
  {/each}
{/if}

<style>
  div {
    width: 10rem;
    height: 10rem;
    background-color: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    padding: 1rem;
  }
</style>
