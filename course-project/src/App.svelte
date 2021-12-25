<script lang="ts">
  import { MeetupGrid, EditMeetup } from './Meetups';

  import {
    Header,
    LoadingSpinner,
    Error,
    loadingStore,
    errorStore,
  } from './UI';

  import meetupsStore from './Meetups/meetups-store';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';
  import { onMount } from 'svelte';
  import { getMeetups } from './Meetups/meetups-service';

  let editMode: string = '';
  let page: 'overview' | 'details' = 'overview';
  let detailId: string;
  let editId: string;

  onMount(async () => {
    loadingStore.setLoading(true);
    const meetupsResponse = await getMeetups();
    loadingStore.setLoading(false);

    if (!meetupsResponse) return;

    const meetups = meetupsResponse;

    console.log(meetups);

    meetupsStore.setMeetups(meetups);
  });

  function addMeetup(event: CustomEvent): void {
    setEditState();
  }

  function showDetails(event: CustomEvent): void {
    const id = event.detail.id;

    page = 'details';
    detailId = id;
  }

  function startEdit(event: CustomEvent): void {
    const id = event.detail.id;

    setEditState(id);
  }

  function startAdd(event: CustomEvent): void {
    editMode = 'add';
  }

  function closeDetails(): void {
    page = 'overview';
    detailId = '';
  }

  function cleanError(): void {
    errorStore.setError('');
  }

  function cancelEdit() {
    setEditState();
  }

  function setEditState(id?: string): void {
    editId = id ? id : '';
    editMode = id ? 'edit' : '';
  }
</script>

{#if $errorStore}
  <Error message={$errorStore} on:cancel={cleanError} />
{/if}

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode}
      <EditMeetup
        id={editId}
        {editMode}
        on:cancel={cancelEdit}
        on:save={addMeetup} />
    {/if}

    {#if $loadingStore}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetupsStore}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={startAdd} />
    {/if}
  {:else}
    <MeetupDetail id={detailId} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
