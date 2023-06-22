<script lang="ts">
	import { page } from '$app/stores';
	import LanguageBadges from '$lib/components/language_badges.svelte';
	import LinkWithIcon from '$lib/components/link_with_icon.svelte';
	import projects from '$lib/conf/projects.json';
	import { IMG_PATH } from '$lib/constants/other';
	import type { Project } from '$lib/interfaces/project';
	import { fade } from 'svelte/transition';

	let zoomImg: HTMLImageElement | null = null;

	const project: Project = projects.filter(
		(project: Project) => project.url === $page.params.project_name
	)[0];

	function toogleZoom(
		event:
			| (KeyboardEvent & { currentTarget: EventTarget & HTMLImageElement })
			| (MouseEvent & { currentTarget: EventTarget & HTMLImageElement })
	): void {
		zoomImg = zoomImg === null ? event.currentTarget : null;
	}
</script>

<div class="container">
	{#if zoomImg}
		<div transition:fade={{ duration: 100 }} class:zoom-container={zoomImg} />
	{/if}
	<h1 class="title">{project.name}</h1>
	<div class="center">
		<img
			on:click={toogleZoom}
			on:keydown={toogleZoom}
			class:zoom-in={zoomImg !== null}
			class="project-img"
			src="{IMG_PATH}{project.img !== '' ? project.img : 'default-image-placeholder.png'}"
			alt="Project" />
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
	.zoom-container {
		background-color: rgba(40, 40, 40, 0.9);
		height: 100%;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	.title {
		text-align: center;
	}

	.container {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 50px;
		margin: 10px 0;
	}

	.project-img {
		cursor: zoom-in;
		border-radius: 6px;
		height: auto;
		transition: linear 0.1s;
		width: 400px;
	}

	.center {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		justify-content: space-evenly;
		width: 100%;
	}

	.right-panel {
		border: 2px solid grey;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		max-width: 51%;
		min-width: 12%;
		padding: 20px;
	}

	.info-title {
		text-align: center;
	}

	.description {
		border: 2px solid grey;
		border-radius: 12px;
		max-width: 80%;
		padding: 20px;
		text-align: center;
	}

	.zoom-in {
		transform: scale(1.4) translateX(12.75vw) translateY(5vh);
		z-index: 1;
	}
</style>
