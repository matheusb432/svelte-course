<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import meetupsStore from './meetups-store';
  import { scale } from 'svelte/transition';

  import { Button, Badge } from '../UI';

  export let id: string;
  export let title: string;
  export let subtitle: string;
  export let imageUrl: string;
  export let contactEmail: string;
  export let address: string;
  export let description: string;
  export let isFavorite: boolean;

  const dispatch = createEventDispatcher();

  function toggleFavorite(): void {
    meetupsStore.toggleFavorite(id);
  }

  function showDetails(): void {
    dispatch('showdetails', { id });
  }
</script>

<article transition:scale>
  <header>
    <h1>
      {title}
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>

  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button href="mailto:{contactEmail}">Contact</Button>
    <Button
      mode="outline"
      type="button"
      on:click={() => dispatch('edit', { id })}>Edit</Button>
    <Button
      mode="outline"
      color={isFavorite ? null : 'success'}
      on:click={toggleFavorite}
      >{isFavorite ? 'Unfavorite' : 'Favorite'}</Button>
    <Button on:click={showDetails}>Show Details</Button>
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  .content,
  header,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: 'Roboto Slab', sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
