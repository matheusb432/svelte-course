<script>
  import ContactCard from "./ContactCard.svelte";

  let userName = "Matt";
  let jobTitle = "Software dev";
  let description = "just a guy";
  let userImage =
    "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F021%2F807%2Fig9OoyenpxqdCQyABmOQBZDI0duHk2QZZmWg2Hxd4ro.jpg";

  let age = 21;

  // NOTE `$:` syntax updates uppercaseName whenever the value of `name` changes
  $: uppercaseName = userName.toUpperCase();

  $: console.log(userName);

  $: if (userName === "Maximilian") {
    age = 35;
  } else {
    age = 21;
  }

  function changeAge(inc) {
    age += inc ? 1 : -1;
  }

  function toggleName() {
    userName = userName === "Matt" ? "Maximilian" : "Matt";
  }

  function nameInput(event) {
    const enteredValue = event.target.value;

    userName = enteredValue;
  }
</script>

<main>
  <h1>Hello World!</h1>
  <h2>Name's {uppercaseName}, my age is {age}!</h2>
  <button on:click={() => changeAge(true)}>Increment Age</button>
  <button on:click={toggleName}>Change Name</button>

  <!-- NOTE one-way databinding -->
  <!-- <input type="text" value="{name}"> -->

  <!-- NOTE manual two-way databinding (nameInput function updates the value) -->
  <!-- <input type="text" value="{name}" on:input="{nameInput}"> -->

  <div class="form-container">
    <!-- NOTE two-way databinding  -->
    <input type="text" bind:value={userName} />

    <input type="text" bind:value={jobTitle} />

    <textarea rows="3" bind:value={description} />

    <input type="text" bind:value={userImage} />
  </div>

  <!-- NOTE `{description}` is shorthand for `description="{description}"` -->
  <ContactCard {userName} {jobTitle} {description} {userImage} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .form-container {
    display: flex;
    flex-direction: column;
    margin: 24px 0px;
  }

  input,
  textarea {
    margin-bottom: 16px;
    padding: 12px 8px;
  }
</style>
