<script>
  import ContactCard from './ContactCard.svelte';

  let name = 'Matt';
  let jobTitle = 'code man';
  let userImage =
    'https://media.istockphoto.com/photos/programming-source-code-abstract-background-picture-id1047259374?k=20&m=1047259374&s=612x612&w=0&h=pt3XbBvrmiYgoYmVzsaUeXtV8vw_jJI9Ly8P7AL6Qig=';
  let description = 'lorem ipsum you know how it goes';
  let formState = 'empty';

  let createdContacts = [];

  function addContact() {
    if (
      isEmpty(name) ||
      isEmpty(jobTitle) ||
      isEmpty(userImage) ||
      isEmpty(description)
    ) {
      formState = 'invalid';

      return;
    }

    // NOTE It's necessary to ovewrite the array to create a new array reference for Svelte to detect changes
    createdContacts = [
      ...createdContacts,
      { id: Math.random(), userName: name, jobTitle, userImage, description },
    ];

    formState = 'done';
  }

  const isEmpty = (word) => !word || word.trim().length === 0;

  function deleteFirst() {
    createdContacts = createdContacts.slice(1);
  }

  function deleteLast() {
    createdContacts = createdContacts.slice(0, -1);
  }
</script>

<div class="main-container">
  <div class="col">
    <form id="form">
      <div class="form-control">
        <label for="userName">User Name</label>
        <input type="text" bind:value={name} id="userName" />
      </div>
      <div class="form-control">
        <label for="jobTitle">Job Title</label>
        <input type="text" bind:value={jobTitle} id="jobTitle" />
      </div>
      <div class="form-control">
        <label for="image">Image URL</label>
        <input type="text" bind:value={userImage} id="image" />
      </div>
      <div class="form-control">
        <label for="desc">Description</label>
        <textarea rows="3" bind:value={description} id="desc" />
      </div>

      <!-- NOTE preventDefault event modifier to execute event.preventDefault() before the function runs -->
      <button type="submit" on:click|preventDefault={addContact}
        >Add Contact Card</button>
    </form>

    <!-- NOTE inline function -->
    <button on:click={(ev) => (createdContacts = createdContacts.slice(1))}
      >Delete first</button>
    <button on:click={deleteLast}>Delete last</button>
  </div>
  <div class="col">
    <!-- NOTE conditionally rendering content based on a boolean expression -->
    {#if formState === 'invalid'}
      <p>Invalid input!</p>
    {:else}
      <p>Please enter some data</p>
    {/if}

    <div class="main-container">
      <!-- NOTE looping through an array to render multiple elements based on each item -->
      {#each createdContacts as contact, index (contact.id)}
        <h2>#{index + 1}</h2>
        <ContactCard
          userName={contact.userName}
          jobTitle={contact.jobTitle}
          description={contact.description}
          userImage={contact.userImage} />

        <!-- NOTE if createdContacts is falsy (such as an empty array), this will be rendered instead of no items -->
      {:else}
        <p>list is empty, add some contacts!</p>
      {/each}
    </div>
  </div>
</div>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
    margin: 1rem 0;
  }

  .main-container {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
  }

  .col {
    padding: 14px 0;
    margin: 16px;
  }
</style>
