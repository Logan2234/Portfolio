<script lang="ts">
	import { documentHeight, hasScrolled, screenSize, scrollY } from '$lib/stores/stores';
	import projects from '$lib/conf/projects.json';

	let progressBar = 0;

	scrollY.subscribe((value) => (progressBar = (value / ($documentHeight - $screenSize)) * 100));
</script>

<header class:scrolled={$hasScrolled}>
	<div style:--scroll-ratio={!$scrollY ? '0%' : progressBar + '%'} class="progress_bar" />
	<nav>
		<ul class:margin-top={!$scrollY ? 0 : '2px'} class="nav_links">
			<li class="inside_link_item"><a class="inside_link" href="/">Home</a></li>
			<li class="inside_link_item project-dropdown">
				<a class="inside_link" href="/projects">Projects</a>
				<div class="dropdown-menu">
					{#each projects as project}
						<a class="dropdown-item" href="/projects/{project.url}">{project.name}</a>
					{/each}
				</div>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		position: sticky;
		transition: linear 0.2s;
		top: 0;
		z-index: 1;
	}

	.nav_links {
		display: flex;
		justify-content: left;
	}

	ul {
		list-style: none;
	}

	.inside_link_item {
		max-width: 150px;
		width: 15%;
		min-width: fit-content;
		text-align: center;
	}

	.inside_link {
		color: white;
		display: block;
		font-size: 1.3em;
		padding: 1.5vh 2vw;
		transition: linear 0.2s;
	}

	.scrolled {
		background-color: #292a2d;
		box-shadow: 0 1px 5px 0 black;
	}

	.inside_link:hover {
		background-color: white;
		color: black;
		text-decoration: none;
	}

	.progress_bar {
		background-color: rgb(70, 197, 123);
		height: 2px;
		position: sticky;
		top: 0;
		width: var(--scroll-ratio);
	}

	.dropdown-menu {
		align-items: flex-start;
		background-color: white;
		border-radius: 0 12px 12px 12px;
		display: none;
		flex-direction: column;
		position: fixed;
		visibility: hidden;
		width: max-content;
	}

	.project-dropdown:hover > .dropdown-menu {
		display: flex;
		visibility: visible;
	}

	.dropdown-item {
		color: black;
		padding: 10px;
		text-align: left;
		transition: linear 0.1s;
		width: 100%;
	}

	.dropdown-item:hover {
		background-color: #292a2d;
		color: white;
		text-decoration: none;
	}
</style>
