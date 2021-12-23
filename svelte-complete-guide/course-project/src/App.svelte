<script lang="ts">
  import { MeetupGrid, EditMeetup } from './Meetups';

  import { Header, Button } from './UI';

  import meetupsStore from './Meetups/meetups-store';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';

  let editMode: string = '';
  let page: 'overview' | 'details' = 'overview';
  let detailId: string;
  let editId: string;

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

  function closeDetails(): void {
    page = 'overview';
    detailId = '';
  }

  function cancelEdit() {
    setEditState();
  }

  function setEditState(id?: string): void {
    editId = id ? id : '';
    editMode = id ? 'edit' : '';
  }
</script>

<Header />

<main>
  {#if page === 'overview'}
    <div class="meetup-controls">
      <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
    </div>

    {#if editMode}
      <EditMeetup
        id={editId}
        {editMode}
        on:save={addMeetup}
        on:cancel={cancelEdit} />
    {/if}

    <MeetupGrid
      meetups={$meetupsStore}
      on:showdetails={showDetails}
      on:edit={startEdit} />
  {:else}
    <MeetupDetail id={detailId} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
