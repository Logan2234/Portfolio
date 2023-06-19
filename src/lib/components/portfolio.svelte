<script lang="ts">
	import projects from '$lib/conf/projects.json';
	import { IMG_PATH } from '$lib/constants/other';
</script>

<div class="portfolio-container">
	{#each projects as project}
		<a class="project-wrapper" href={'/projects/' + project.url}>
			<div class="project">
				<img
					class="project-image"
					src={IMG_PATH +
						(project.img != '' ? project.img : 'default-image-placeholder.png')}
					alt="Project"
				/>
				<div class="project-info">{project.name}</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.portfolio-container {
		display: flex;
		flex-wrap: wrap;
		margin: auto;
		max-width: 80%;
	}

	.project-wrapper {
		align-items: center;
		margin: 20px;
		display: flex;
		flex: 1 0 34%;
		justify-content: center;
	}

	.project {
		background-color: rgb(100, 100, 100);
		border-radius: 4px;
		display: flex;
		height: 400px;
		min-width: 400px;
		align-items: center;
		justify-content: center;
		transition: linear 0.1s;
	}

	.project:hover {
		box-shadow: 5px 5px 20px 3px rgb(100, 100, 100);
		transform: scale(1.1);
	}

	.project-info {
		position: absolute;
		visibility: hidden;
	}

	.project-image {
		border-radius: 4px;
		height: 100%;
		width: 100%;
	}

	.project:hover > .project-image {
		filter: blur(5px) grayscale(50%) opacity(0.7);
	}

	.project:hover > .project-info {
		visibility: visible;
	}
</style>
