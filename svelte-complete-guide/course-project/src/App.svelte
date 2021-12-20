<script lang="ts">
  import { Meetup, MeetupGrid, mockMeetups } from './Meetups';

  import { Header, TextInput, Button } from './UI';

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

  function assignTitle(ev: any): void {
    title = ev?.target?.value;
  }

  function assignSubtitle(ev: any): void {
    subtitle = ev?.target?.value;
  }

  function assignAddress(ev: any): void {
    address = ev?.target?.value;
  }

  function assignImageUrl(ev: any): void {
    imageUrl = ev?.target?.value;
  }

  function assignEmail(ev: any): void {
    contactEmail = ev?.target?.value;
  }

  function assignDescription(event: Event): void {
    const element = event?.target as HTMLInputElement;

    description = element?.value;
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
</script>

<Header />

<main>
  <section id="meetupForm">
    <form on:submit|preventDefault={addMeetup}>
      <TextInput
        value={title}
        id={'title'}
        label={'Title'}
        on:input={assignTitle} />
      <TextInput
        value={subtitle}
        id={'subtitle'}
        label={'Subtitle'}
        on:input={assignSubtitle} />
      <TextInput
        value={address}
        id={'address'}
        label={'Address'}
        on:input={assignAddress} />
      <TextInput
        value={imageUrl}
        id={'imageUrl'}
        label={'Image URL'}
        on:input={assignImageUrl} />
      <TextInput
        value={contactEmail}
        id={'contactEmail'}
        label={'Contact Email'}
        type={'email'}
        on:input={assignEmail} />

      <TextInput
        value={description}
        label="Description"
        controlType="textarea"
        id="description"
        on:input={assignDescription} />

      <Button type="submit" caption="Save" />
    </form>
  </section>

  <MeetupGrid
    {meetups}
    on:togglefavorite={toggleFavoriteMeetup}
    on:showdetails={showDetails} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
