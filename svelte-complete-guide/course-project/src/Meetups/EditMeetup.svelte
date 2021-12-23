<script lang="ts">
  import meetupsStore from './meetups-store';
  import { TextInput, Button, Modal } from '../UI';
  import { Meetup } from './meetup.model';
  import { createEventDispatcher } from 'svelte';
  import { emailRegex, isEmpty, notEmpty } from '../helpers/validation';

  export let editMode = '';

  export let id: string | null = null;

  let title = '';
  let subtitle = '';
  let address = '';
  let contactEmail = '';
  let description = '';
  let imageUrl = '';

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

  function submitForm(): void {
    const newMeetup = new Meetup(
      `${Math.random()}`,
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail
    );

    if (id) {
      meetupsStore.updateMeetup(id, newMeetup);
    } else {
      meetupsStore.addMeetup(newMeetup);
    }

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
    <Button type="button" on:click={submitForm} disabled={!formValid}
      >Save Meetup</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
