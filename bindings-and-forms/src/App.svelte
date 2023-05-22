<script lang="ts">
  import { onMount } from 'svelte';

  import CustomInput from './CustomInput.svelte';
  import Toggle from './Toggle.svelte';
  import { isValidEmail } from './validation';

  let val = 'Max';
  let selectedOption = 1;
  let price = 0;
  let agreed: boolean;
  let favColor = 'green';
  let favColorArr = ['red', 'green'];
  let singleFavColor = 'red';
  let usernameInput: HTMLInputElement;
  let someDiv: HTMLDivElement;
  // NOTE if the element reference is to a component, it can be typed to that component
  let customInput: CustomInput;
  let enteredEmail = '';
  let formIsValid = false;

  $: if (isValidEmail(enteredEmail)) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  $: console.log(val);
  $: console.log(selectedOption);
  // NOTE Svelte automatically converts the event.target.value to a number since the binded prop is a number.
  $: console.log(price);
  $: console.log(agreed);
  $: console.log(favColor);
  $: console.log(favColorArr);
  $: console.log(singleFavColor);
  $: console.log(customInput);

  // NOTE customInput is acessible as soon as onMount triggers, so it's possible to execute exported functions of the component like so.
  onMount(() => {
    customInput.setValToDefault();
  });

  function saveData(): void {
    console.dir(usernameInput);

    console.dir(someDiv);

    customInput.empty();

    console.log(usernameInput.value);
  }

  function submitForm() {
    console.log(enteredEmail);
  }
</script>

<main>
  <h1>Bindings & Forms</h1>

  <h2>Binding to an input component prop</h2>
  <!-- NOTE binding to an input prop, ideal use case for two-way binding between components -->
  <CustomInput bind:val bind:this={customInput} />

  <h2>Binding to a component prop</h2>
  <!-- NOTE binding to a non input prop, not good practice but possible to do. -->
  <Toggle bind:chosenOption={selectedOption} />

  <h2>Number inputs</h2>
  <input type="number" bind:value={price} />

  <h2>Checkbox inputs</h2>
  <label>
    <!-- NOTE on checkbox input, bind:checked must be used to bind it's value to a prop -->
    <input type="checkbox" bind:checked={agreed} />
    Agree to terms?
  </label>

  <h2>Radio Input</h2>
  <label>
    <!-- NOTE on radio inputs, bind:group must be used to bind the same prop to a group of inputs -->
    <input type="radio" name="color" value="red" bind:group={favColor} />
    Red
  </label>
  <label>
    <input type="radio" name="color" value="green" bind:group={favColor} />
    Green
  </label>
  <label>
    <input type="radio" name="color" value="blue" bind:group={favColor} />
    Blue
  </label>

  <h2>Group of Inputs</h2>
  <label>
    <!-- NOTE on checkbox inputs, bind:group will set `favColorArr` to an array containing all values-->
    <input type="checkbox" name="color" value="red" bind:group={favColorArr} />
    Red
  </label>
  <label>
    <input
      type="checkbox"
      name="color"
      value="green"
      bind:group={favColorArr}
    />
    Green
  </label>
  <label>
    <input type="checkbox" name="color" value="blue" bind:group={favColorArr} />
    Blue
  </label>

  <h2>Select Input</h2>
  <select bind:value={singleFavColor}>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>

  <h2>Input Local Reference</h2>

  <!-- NOTE getting a reference to this element with bind:this, similar to Angular's local references -->
  <input type="text" id="username" bind:this={usernameInput} />
  <button on:click={saveData}>Save Data</button>

  <div bind:this={someDiv} />

  <h2>Custom Validation</h2>

  <form on:submit|preventDefault={submitForm}>
    <input
      type="email"
      bind:value={enteredEmail}
      class:invalid={isValidEmail(enteredEmail) ? '' : 'invalid'}
    />
    <button type="submit" disabled={!formIsValid}>Save</button>
  </form>
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

  h2 {
    color: #ff3e00;
    font-size: 2em;
    font-weight: 100;
  }

  .invalid {
    border: 1px solid red;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
