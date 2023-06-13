<script lang="ts">
	import projects from '$lib/conf/projects.json';
</script>

<div class="portfolio-container">
	{#each projects as project}
		<div class={'project ' + (project.id % 2 ? 'project-impair' : 'project-pair')}>
			{project.name}
		</div>
		<div class={'project ' + (project.id % 2 ? 'project-impair' : 'project-pair')}>
			{project.name}
		</div>
	{/each}
</div>

<style>
	.portfolio-container {
		height: 100vh;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.project:hover {
		border: 2px solid rgb(100, 100, 100);
		box-shadow: 1px 1px 3px 1px rgb(100, 100, 100);
	}

	.project-pair:hover {
		transform: rotate(3deg);
	}

	.project-impair:hover {
		transform: rotate(-3deg);
	}

	.project {
		background-color: white;
		border-radius: 4px;
		border: 1px solid rgb(200, 200, 200);
		box-shadow: 1px 1px 2px 1px rgb(200, 200, 200);
		color: black;
		cursor: pointer;
		display: flex;
		height: 300px;
		min-width: 300px;
		padding: 10px;
		align-items: center;
		justify-content: center;
		transition: linear 0.1s;
		width: 25%;
	}
</style>
