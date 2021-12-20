<script lang="ts">
  import { Meetup, MeetupGrid, mockMeetups } from './Meetups';

  import { Header, TextInput } from './UI';

  export let title: string = 'Title';
  export let subtitle: string = 'Subtitle';
  export let imageUrl: string = 'image url';
  export let contactEmail: string = 'ok@asdhav.coamfsdfsfsfsfsfsdfahjaje5do';
  export let address: string = 'Address';
  export let description: string = 'Description';

  let meetups = [...mockMeetups];

  function addMeetup(): void {
    const newMeetup = new Meetup(
      `${Math.random()}`,
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail
    );

    meetups = [...meetups, newMeetup];
  }

  function assignValue(ev: any): void {
    title = ev?.target?.value;
  }
</script>

<Header />

<main>
  <section id="meetupForm">
    <form on:submit|preventDefault={addMeetup}>
      <TextInput
        value={title}
        id={'title'}
        label={'Title'}
        on:input={assignValue} />
      <TextInput value={subtitle} id={'subtitle'} label={'Subtitle'} />
      <TextInput value={address} id={'address'} label={'Address'} />
      <TextInput value={imageUrl} id={'imageUrl'} label={'Image URL'} />
      <TextInput
        value={contactEmail}
        id={'contactEmail'}
        label={'Contact Email'} />

      <TextInput
        value={description}
        label="Description"
        controlType="textarea"
        id="description" />

      <!-- 
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" id="title" bind:value={title} />
        </div>
     -->

      <!-- <div class="form-control">
        <label for="subtitle">Subtitle</label>
        <input type="text" id="subtitle" bind:value={subtitle} />
      </div>
      <div class="form-control">
        <label for="address">address</label>
        <input type="text" id="address" bind:value={address} />
      </div>
      <div class="form-control">
        <label for="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" bind:value={imageUrl} />
      </div>
      <div class="form-control">
        <label for="contactEmail">Email</label>
        <input type="email" id="contactEmail" bind:value={contactEmail} />
      </div> -->

      <!-- <div class="form-control">
        <label for="description">Description</label>
        <textarea rows="3" id="description" bind:value={description} />
      </div> -->
      <button type="submit">Save</button>
    </form>
  </section>

  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
