<script lang="ts">
  import { Meetup } from './meetup.model';
  import MeetupFilter from './MeetupFilter.svelte';
  import MeetupItem from './MeetupItem.svelte';
  import { Button } from '../UI';
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';

  export let meetups: Meetup[];
  let favsOnly = false;

  $: filteredMeetups = meetups.filter((m) => !favsOnly || m.isFavorite);

  const dispatch = createEventDispatcher();

  function setFilter(event: CustomEvent) {
    favsOnly = event.detail === 1;
  }
</script>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>
{#if filteredMeetups?.length === 0}
  <p id="no-meetups">No meetups found, you can start adding some</p>
{/if}
<section id="meetups">
  {#each filteredMeetups as { id, title, subtitle, description, imageUrl, address, contactEmail, isFavorite } (id)}
    <article animate:flip={{ duration: 500 }}>
      <MeetupItem
        {id}
        {title}
        {subtitle}
        {description}
        {imageUrl}
        {address}
        {contactEmail}
        {isFavorite}
        on:showdetails
        on:edit />
    </article>
  {/each}
</section>

<style>
  #no-meetups {
    margin: 1rem;
  }
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
