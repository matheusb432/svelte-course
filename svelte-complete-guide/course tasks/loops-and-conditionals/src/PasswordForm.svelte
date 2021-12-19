<script>
  let password = "";
  let passwordDatas = [];

  $: tooShort = password.trim().length < 5;

  $: tooLong = password.trim().length > 10;

  $: isValid = !tooShort && !tooLong;

  function addPassword() {
    passwordDatas = [...passwordDatas, { id: Math.random(), password }];
  }

  function removePassword(id) {
    passwordDatas = passwordDatas.filter((p) => p.id !== id);
  }
</script>

<input type="password" bind:value={password} />
<button on:click={addPassword} disabled={!isValid}>Add Password</button>

{#if isValid}
  <p>Password is {password}</p>
{:else if tooShort}
  <p>Password needs to have more than 5 characters</p>
{:else}
  <p>Password needs to have less than 10 characters</p>
{/if}

<ul>
  {#each passwordDatas as passwordData, i (passwordData.id)}
    <li>
      #{i + 1} - {passwordData.password} id = {passwordData.id}
      <span on:click={removePassword.bind(this, passwordData.id)}>X</span>
    </li>
  {/each}
</ul>

<style>
  input {
    margin-right: 16px;
  }

  li {
    margin-bottom: 16px;
  }

  li > span {
    padding: 0px 4px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    background-color: rgba(204, 204, 204, 0.212);
    cursor: pointer;
    color: red;
  }
</style>
