<script lang="ts">
	import { documentHeight, hasScrolled, screenSize, scrollY } from '$lib/stores/stores';

	let progressBar = 0;

	scrollY.subscribe((value) => (progressBar = (value / ($documentHeight - $screenSize)) * 100));
</script>

<header class:scrolled={$hasScrolled}>
	<div style:--scroll-ratio={progressBar + '%'} class="progress_bar" />
	<nav>
		<ul class="nav_links">
			<li class="inside_link_item"><a class="inside_link" href="/">Home</a></li>
			<li class="inside_link_item"><a class="inside_link" href="/projects">Projects</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		animation: forwards slideBottomTotop 1.5s 1s;
		display: flex;
		height: 5%;
		position: sticky;
		transition: linear 0.2s;
		top: 0;
		visibility: hidden;
		width: 100%;
		z-index: 1;
	}

	nav {
		width: 100%;
	}

	.nav_links {
		display: flex;
		margin-top: 2px;
	}

	.inside_link_item {
		display: block;
		flex-grow: 1;
		text-align: center;
	}

	.inside_link {
		color: white;
		display: block;
		font-size: 1.3em;
		padding: 2vh 2vw;
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
		position: fixed;
		width: var(--scroll-ratio);
	}

	@keyframes slideBottomTotop {
		0% {
			transform: translateY(100vh);
		}

		50% {
			transform: translateY(-2vh);
		}

		100% {
			transform: translateY(0);
			visibility: visible;
		}
	}
</style>
