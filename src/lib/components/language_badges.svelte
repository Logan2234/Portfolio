<script lang="ts">
	import code_language from '$lib/conf/code_language.json';

	export let languages: String[];
</script>

<div class="badges">
	{#each languages as language}
		<div
			class="badge"
			style:--color={code_language.filter((elem) => elem.name === language)[0].color}>
			{language}
		</div>
	{/each}
</div>

<style>
	.badges {
		border-top: 1px solid grey;
		border-bottom: 1px solid grey;
		justify-content: space-evenly;
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		padding: 10px;
	}

	.badge {
		background-color: var(--color);
		border-radius: 24px;
		color: black;
		padding: 6px 10px;
	}
</style>
