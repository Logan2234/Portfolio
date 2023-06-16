<script lang="ts">
	import projects from '$lib/conf/projects.json';
	import { goto } from '$app/navigation';
	import { IMG_PATH } from '$lib/constants/other';

	function handleClick(url: string): void {
		goto(`project/${url}`);
	}
</script>

<div class="portfolio-container">
	{#each projects as project}
		<div
			class="project-wrapper"
			on:keypress={() => handleClick(project.url)}
			on:click={() => handleClick(project.url)}
		>
			<div class="project">
				<!-- TODO defualt image -->
				<img
					class="project-image"
					src={IMG_PATH +
						(project.img != '' ? project.img : 'default-image-placeholder.png')}
					alt="Project graphic"
				/>
				<div class="project-info">{project.name}</div>
			</div>
		</div>
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
		cursor: pointer;
		display: flex;
		flex-direction: column;
		height: 400px;
		min-width: 400px;
		align-items: center;
		justify-content: center;
		transition: linear 0.1s;
	}

	.project:hover {
		border: 2px solid rgb(100, 100, 100);
		box-shadow: 5px 5px 20px 3px rgb(100, 100, 100);
		transform: scale(1.1);
	}

	.project-info {
		align-items: center;
		display: flex;
		justify-content: center;
		position: absolute;
		visibility: hidden;
	}
	.project-image {
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
