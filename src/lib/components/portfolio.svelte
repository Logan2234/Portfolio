<script lang="ts">
	import projects from '$lib/conf/projects.json';
	import defaultImage from '$lib/assets/images/default-image-placeholder.png';
</script>

<div class="portfolio-container">
	{#each projects as project}
		<div class="project-wrapper">
			<div class={'project ' + (project.id % 2 ? 'project-impair' : 'project-pair')}>
				<!-- TODO defualt image -->
				<img
					class="project-image"
					src={project.img != '' ? project.img : ''}
					alt="Project graphic"
				/>
				Github:&nbsp;<a href={project.github}>{project.name}</a>
			</div>
		</div>
	{/each}
</div>

<style>
	.portfolio-container {
		height: 100vh;
		display: flex;
		flex-wrap: wrap;
		gap: 5%;
		margin: auto;
		max-width: 75%;
	}

	.project-wrapper {
		align-items: center;
		display: flex;
		flex: 1 0 34%;
		justify-content: center;
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
		height: 400px;
		min-width: 400px;
		padding: 10px;
		align-items: center;
		justify-content: center;
		transition: linear 0.1s;
	}
</style>
