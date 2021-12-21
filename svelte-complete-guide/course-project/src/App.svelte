<script lang="ts">
  import { Meetup, MeetupGrid, EditMeetup, mockMeetups } from './Meetups';

  import { Header, TextInput, Button, Modal } from './UI';

  let meetups = [...mockMeetups];

  let editMode: string = '';

  function addMeetup(event: CustomEvent): void {
    const { newMeetup } = event.detail;

    meetups = [...meetups, newMeetup];

    editMode = '';
  }

  function toggleFavoriteMeetup(ev: CustomEvent): void {
    const id: string = ev.detail.id;

    const updatedMeetup = { ...meetups.find((m) => m.id === id) } as Meetup;

    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

    const meetupIndex = meetups.findIndex((m) => m.id === id);

    const updatedMeetups = [...meetups];

    updatedMeetups[meetupIndex] = updatedMeetup;

    meetups = updatedMeetups;
  }

  function showDetails({ detail }: CustomEvent): void {
    const meetup = { ...meetups.find((m) => m.id === detail?.id) };
  }

  function cancelEdit() {
    editMode = '';
  }

  // const isAddMode = (): boolean => editMode === 'add';

  // const isEditMode = (): boolean => editMode === 'edit';
</script>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>

  {#if editMode}
    <EditMeetup {editMode} on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}

  <MeetupGrid
    {meetups}
    on:togglefavorite={toggleFavoriteMeetup}
    on:showdetails={showDetails} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
