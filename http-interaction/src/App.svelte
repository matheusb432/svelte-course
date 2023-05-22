<script lang="ts">
  import { onMount } from 'svelte';
  import hobbiesStore from './hobby-store';

  let hobbies: string[] = [];
  let hobbyInput: HTMLInputElement;
  let isLoading = false;

  const firebaseUrl = 'https://svelte-meetus-5382f-default-rtdb.firebaseio.com';
  const hobbiesUrl = `${firebaseUrl}/hobbies.json`;

  /*
  let getHobbiesAlt = fetch(hobbiesUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then((data) => {
      isLoading = false;
      hobbies = Object.values(data);
      const keys = Object.keys(data);

      return hobbies;
    })
    .catch((err) => {
      isLoading = false;
      console.log(err);
    });
  */

  onMount(async () => {
    hobbiesStore.setHobbies(await getHobbies());
  });

  function addHobby(): void {
    const hobby = hobbyInput.value;

    hobbiesStore.addHobby(hobby);

    postHobbies(hobby);
  }

  async function getHobbies(): Promise<string[]> {
    const response = (await fetchHobbies()) as Response;

    const jsonBody = await response.json();

    return Object.values(jsonBody);
  }

  async function postHobbies(hobby: string): Promise<void> {
    isLoading = true;
    fetch(hobbiesUrl, {
      method: 'POST',
      body: JSON.stringify(hobby),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed!');
        }
        isLoading = false;
      })
      .catch((err) => {
        console.log(err);

        isLoading = false;
      });
  }

  async function fetchHobbies(): Promise<void | Response> {
    isLoading = true;
    return fetch(hobbiesUrl)
      .then((hobbies) => {
        isLoading = false;
        return hobbies;
      })
      .catch((err) => {
        isLoading = false;
        console.log(err);
      });
  }
</script>

<label for="hobby">hobby</label>
<input type="text" name="hobby" id="hobby" bind:this={hobbyInput} />
<button on:click={addHobby}>Add hobby</button>

{#if isLoading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each $hobbiesStore as hobby}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}

<!-- NOTE Svelte's await block, will render #await while it waits for the Promise to resolve -->
<!-- NOTE when it resolves, will render :then, and if it throws an error, renders :catch  -->
<!-- NOTE also important to note that this only executes when the page renders, so it's useful for static data coming from the server, not dynamic data like a CRUD list -->
<!-- {#await getHobbiesAlt}
  <p>Loading</p>
{:then hobbyData}
  {#if hobbyData}
    <ul>
      {#each hobbyData as hobby}
        <li>{hobby}</li>
      {/each}
    </ul>
  {/if}
{:catch error}
  <p>{error.message}</p>
{/await} -->
