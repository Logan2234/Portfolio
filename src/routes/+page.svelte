<script>
	import favicon from '$lib/assets/images/favicon.png';
	import AnimatedBackground from '$lib/components/animated_background.svelte';
	import HelpModal from '$lib/components/help_modal.svelte';
	import Cli from '$lib/components/cli.svelte';
	import Section from '$lib/components/section.svelte';
	import About from '$lib/components/about.svelte';
	import ContactForm from '$lib/components/contact_form.svelte';
	import links from '$lib/conf/links.json';
	import { IMG_PATH } from '$lib/constants/other';
</script>

<AnimatedBackground />

<HelpModal />

<Cli />

<main>
	<section class="summary">
		<!-- TODO -->
		<img src={favicon} id="photo" title="Press Shift + , ;)" alt="Logo" />
		<h1 id="summary_name">Logan Willem</h1>
		<h3 id="summary_motto">[MOTTO]</h3>
		<div id="social_media">
			<ul>
				{#each links as link}
					<li class="media">
						<a href={link.href} target="_blank">
							<img
								class="media-img"
								src={IMG_PATH + link.imgSrc}
								alt={link.imgAlt}
								height="30px"
								width="30px"
							/>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<div class="not_summary">
		<Section title="About">
			<About />
		</Section>
		<Section title="Portfolio">
			<div />
		</Section>
		<Section title="Contact" style="box-shadow: 0 5px 10px 0 #080808; position:relative">
			<ContactForm />
		</Section>
	</div>
</main>

<style>
	.not_summary {
		scroll-snap-align: start;
		background-image: linear-gradient(
			to top,
			#202124,
			#293b49,
			#1f596b,
			#007a82,
			#009b8c,
			#009c8d,
			#009d8e,
			#009e8f,
			#007f88,
			#266072,
			#314351,
			#292a2d
		);
	}

	/* Summary */
	.summary {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100vh;
		scroll-snap-align: center;
		text-align: center;
		visibility: hidden;
	}

	#photo {
		animation: forwards rotateToAppear 1.5s 2s;
	}

	#summary_name {
		animation: forwards slideInLeft 1.5s 2s;
		font-size: 4em;
		margin: 20px 0px;
	}

	#summary_motto {
		animation: forwards slideInLeft 1.5s 2s;
		font-size: 1.8em;
		margin: 0 0 30px 0;
	}

	#social_media {
		animation: forwards slideInRight 1.5s 2s;
		max-width: 500px;
		width: 100%;
	}

	#social_media > ul {
		display: flex;
		justify-content: space-evenly;
	}

	.media {
		display: inline;
	}

	.media-img {
		transition: linear 0.1s;
	}

	.media-img:hover {
		opacity: 0.8;
		transform: scale(1.3);
	}

	/* Animations */
	@keyframes slideInLeft {
		0% {
			transform: translateX(-200%);
		}

		50% {
			transform: translateX(10%);
		}

		100% {
			transform: translateX(0);
			visibility: visible;
		}
	}

	@keyframes slideInRight {
		0% {
			transform: translateX(200%);
		}

		50% {
			transform: translateX(-10%);
		}

		100% {
			transform: translateX(0);
			visibility: visible;
		}
	}

	@keyframes rotateToAppear {
		0% {
			transform: scale(0) rotate(0deg);
		}

		100% {
			transform: scale(1) rotate(360deg);
			visibility: visible;
		}
	}
</style>
