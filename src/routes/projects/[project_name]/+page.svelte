<script lang="ts">
	import { page } from '$app/stores';
	import LanguageBadges from '$lib/components/language_badges.svelte';
	import LinkWithIcon from '$lib/components/link_with_icon.svelte';
	import projects from '$lib/conf/projects.json';
	import { IMG_PATH } from '$lib/constants/other';
	import type { Project } from '$lib/interfaces/project';

	const project: Project = projects.filter(
		(project: Project) => project.url === $page.params.project_name
	)[0];
</script>

<div class="container">
	<h1>{project.name}</h1>
	<div class="center">
		<img
			class="project-img"
			src="{IMG_PATH}{project.img !== '' ? project.img : 'default-image-placeholder.png'}"
			alt="Project"
		/>
		<div class="right-panel">
			<h2 class="info-title">Info</h2>
			<LanguageBadges languages={project.language}>{project.language}</LanguageBadges>
			<div>Status: {project.ongoing ? 'Ongoing' : 'Finished'}</div>
			<div>
				Personal project:&nbsp;
				{#if project.personalProject}
					<i style="color:var(--primary-color)" class="fa fa-check" aria-hidden="true" />
				{:else}
					<i style="color:red" class="fa fa-times-circle" aria-hidden="true" />
				{/if}
			</div>
			<LinkWithIcon href={project.github} icon="fa-github" />
		</div>
	</div>
	<div class="description">{project.description}</div>
</div>

<style>
	.container {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 50px;
		margin: 10px 0;
	}

	.project-img {
		height: auto;
		width: 400px;
	}

	.center {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 50px;
		justify-content: space-evenly;
		width: 100%;
	}

	.right-panel {
		border: 2px solid grey;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 25%;
		padding: 20px;
	}

	.info-title {
		padding: 8px;
		text-align: center;
	}

	.description {
		border: 2px solid grey;
		border-radius: 12px;
		max-width: 80%;
		padding: 20px;
		text-align: center;
	}
</style>
