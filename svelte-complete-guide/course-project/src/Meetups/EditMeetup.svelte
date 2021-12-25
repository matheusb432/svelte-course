<script lang="ts">
  import meetupsStore from './meetups-store';
  import { TextInput, Button, Modal } from '../UI';
  import { Meetup } from './meetup.model';
  import { createEventDispatcher } from 'svelte';
  import { emailRegex, isEmpty, notEmpty } from '../helpers/validation';
  import {
    postMeetup,
    updateMeetup,
    deleteMeetup as httpDeleteMeetup,
  } from './meetups-service';

  export let editMode = '';

  export let id: string | null = null;

  let title = 'mock title';
  let subtitle = 'subtitle';
  let address = 'add test';
  let contactEmail = 'contact@meeeeeeeeeeeeeeeeeeeeee.adhfsdhdsdfdhjndfsg';
  let description = 'tset';
  let imageUrl =
    'https://spaces-wp.imgix.net/2016/06/coding-in-the-classroom.png?auto=compress,format&q=50';

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = !isEmpty(contactEmail) && emailRegex.test(contactEmail);
  $: descriptionValid = !isEmpty(description);
  $: formValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    emailValid &&
    descriptionValid &&
    imageUrlValid;

  if (id) {
    meetupsStore.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);

      if (selectedMeetup == null) return;

      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      contactEmail = selectedMeetup.contactEmail;
      imageUrl = selectedMeetup.imageUrl;
      description = selectedMeetup.description;
    });
  }

  const dispatch = createEventDispatcher();

  async function submitForm(): Promise<void> {
    const newMeetup = new Meetup(
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail
    );

    if (id) {
      await updateMeetup(id, newMeetup).catch((err) => {
        dispatch('save');
      });

      meetupsStore.updateMeetup(id, newMeetup);
    } else {
      const responseData = (await postMeetup(newMeetup).catch((err) => {
        dispatch('save');
      })) as any;

      meetupsStore.addMeetup(newMeetup, responseData.name);
    }

    dispatch('save');
  }

  function cancel(): void {
    dispatch('cancel');
  }

  async function deleteMeetup(): Promise<void> {
    if (id == null) return;

    await httpDeleteMeetup(id);

    meetupsStore.removeMeetup(id);

    dispatch('save');
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
      validityMsg={`Title ${notEmpty}`}
      label="Title" />
    <TextInput
      bind:value={subtitle}
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMsg={`Subtitle ${notEmpty}`} />
    <TextInput
      bind:value={address}
      id="address"
      label="Address"
      valid={addressValid}
      validityMsg={`Address ${notEmpty}`} />
    <TextInput
      bind:value={imageUrl}
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMsg={`Image URL ${notEmpty}`} />
    <TextInput
      bind:value={contactEmail}
      id="contactEmail"
      label="Contact Email"
      type="email"
      valid={emailValid}
      validityMsg={`Enter a valid email`} />

    <TextInput
      bind:value={description}
      label="Description"
      controlType="textarea"
      id="description"
      valid={descriptionValid}
      validityMsg={`Description ${notEmpty}`} />
  </form>

  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button
      type="button"
      color="success"
      on:click={submitForm}
      disabled={!formValid}>Save Meetup</Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
