<script lang="ts">
  import { Meetup } from './meetup.model';
  import MeetupDetail from './MeetupDetail.svelte';
  import MeetupItem from './MeetupItem.svelte';

  export let meetups: Meetup[];
  let detailsId: string;

  function showDetails(event: CustomEvent) {
    detailsId = event.detail.id;
  }
</script>

<section id="meetups">
  {#each meetups as { id, title, subtitle, description, imageUrl, address, contactEmail, isFavorite } (id)}
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
      on:edit>
      {#if detailsId}
        <MeetupDetail id={detailsId} />
      {/if}
    </MeetupItem>
  {/each}
</section>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
