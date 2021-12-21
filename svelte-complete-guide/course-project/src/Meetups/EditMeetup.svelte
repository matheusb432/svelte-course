<script lang="ts">
  import { TextInput, Button, Modal } from '../UI';
  import { Meetup } from './meetup.model';
  import { createEventDispatcher } from 'svelte';
  import { isEmpty } from '../helpers/validation';

  export let editMode: string = '';

  let title: string = '';
  let titleValid = false;
  let subtitle: string = '';
  let imageUrl: string = 'image url';
  let contactEmail: string = 'ok@asdhav.coamfsdfsfsfsfsfsdfahjaje5do';
  let address: string = 'Address';
  let description: string = 'Description';

  $: titleValid = !isEmpty(title);

  $: subtitleValid = !isEmpty(subtitle);

  const dispatch = createEventDispatcher();

  function submitForm(): void {
    const newMeetup = new Meetup(
      `${Math.random()}`,
      //   '',
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail
    );

    dispatch('save', { newMeetup });
  }

  const isAddMode = (): boolean => editMode === 'add';

  const isEditMode = (): boolean => editMode === 'edit';
</script>

<Modal title={isEditMode() ? 'Edit Meetup' : 'Create Meetup'} on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      bind:value={title}
      id="title"
      valid={titleValid}
      validityMsg="Title must not be empty."
      label="Title" />
    <TextInput
      bind:value={subtitle}
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMsg="Subtitle must not be empty." />
    <TextInput bind:value={address} id="address" label="Address" />
    <TextInput bind:value={imageUrl} id="imageUrl" label="Image URL" />
    <TextInput
      bind:value={contactEmail}
      id="contactEmail"
      label="Contact Email"
      type="email" />

    <TextInput
      bind:value={description}
      label="Description"
      controlType="textarea"
      id="description" />
  </form>

  <div slot="footer">
    <Button type="button" on:click={submitForm}>Save Meetup</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
