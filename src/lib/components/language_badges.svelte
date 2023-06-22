<script lang="ts">
	import code_language from '$lib/conf/code_language.json';

	export let languages: string[];

	function getColor(languageName: string) {
		const language = code_language.filter((elem) => elem.name === languageName)[0];
		return language !== undefined ? language.color : 'white';
	}
</script>

<div class="badges">
	{#each languages as language}
		<div class="badge" style:--color={getColor(language)}>
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
		padding: 15px;
	}

	.badge {
		background-color: var(--color);
		border-radius: 24px;
		color: black;
		font-weight: bold;
		padding: 6px 10px;
	}
</style>
