<!-- NOTE this script will only run once the component is imported, so only once 
  in this scenario even though this component gets instantiated 4 times -->
<script context="module">
  console.log('script context module');

  let deactivateNode;
</script>

<script lang="ts">
  import { children } from 'svelte/internal';
  import type { NodeType } from './types/node-type';

  console.log('script main');

  let isActive;

  export let member: NodeType;

  function deactivate() {
    isActive = false;

    // NOTE setting the module context variable to point to this function, meaning any instances of this component will be able to know it has changed
    deactivateNode = deactivate;
  }

  function activate() {
    if (deactivateNode) {
      deactivateNode();
    }
    isActive = true;
    deactivateNode = deactivate;
  }
</script>

<div on:click={activate} class:active={isActive}>
  <h1>{member.name}</h1>
  {#if member.isParent}
    <article style="display: flex; width:{200 * member.nthChild}px;">
      <hr style="width: {200 * member.nthChild}px;" />
    </article>

    {#each member.children as child}
      <article style="margin-left: {200 * member.nthChild}px;">
        <!-- NOTE svelte:self recursively renders this component inside of itself -->
        <svelte:self member={child} />
      </article>
    {/each}
  {/if}
</div>

<style>
  .active {
    color: red;
  }
</style>
