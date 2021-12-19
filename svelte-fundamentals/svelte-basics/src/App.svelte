<script>
	let name = 'Matt';
	let age = 30;

	function changeAge(inc) {
		age += inc ? 1 : -1;
	}
</script>

<main>
	<h1>Hello {name}, my age is {age}!</h1>
	<button on:click={() => changeAge(true)}>Increment Age</button>
	<button on:click={() => changeAge(false)}>Decrement Age</button>

	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
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
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>