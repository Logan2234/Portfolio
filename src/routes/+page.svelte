<script>
	import AnimatedBackground from '$lib/components/animated_background.svelte';
	import HelpModal from '$lib/components/help_modal.svelte';
	import Cli from '$lib/components/cli.svelte';
	import Section from '$lib/components/section.svelte';
	import About from '$lib/components/about.svelte';
	import ContactForm from '$lib/components/contact_form.svelte';
	import links from '$lib/conf/links.json';
	import Portfolio from '$lib/components/portfolio.svelte';
	import LinkWithIcon from '$lib/components/link_with_icon.svelte';
</script>

<HelpModal />

<Cli />

<AnimatedBackground />

<main>
	<section class="summary">
		<h1 class="summary-name">Logan Willem</h1>
		<h3 class="summary-motto">Software Engineer</h3>
		<div class="social-media">
			{#each links as link}
				<LinkWithIcon href={link.href} icon={link.icon} />
			{/each}
		</div>
		<a class="down" href="#about"
			><i class="fa fa-angle-double-down fa-3x" aria-hidden="true" />
		</a>
	</section>

	<div id="about">
		<Section title="About">
			<About />
		</Section>
		<Section title="Portfolio">
			<Portfolio />
		</Section>
		<Section title="Contact" style="box-shadow: 0 5px 10px 0 #080808; position:relative">
			<ContactForm />
		</Section>
	</div>
</main>

<style>
	.down {
		position: absolute;
		top: 90vh;
		animation: fly 1.5s infinite;
	}

	.summary {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 30px;
		height: calc(97vh - 1.3em);
	}

	.summary-name {
		font-size: 7em;
		margin: 20px 0px;
		font-family: 'Montserrat';
		text-align: center;
	}

	.summary-motto {
		font-size: 3em;
		margin: 0 0 30px 0;
		text-align: center;
	}

	.social-media {
		max-width: 500px;
		width: 100%;
	}

	.social-media {
		display: flex;
		justify-content: space-evenly;
	}

	@keyframes fly {
		from,
		to {
			opacity: 1;
			top: 90vh;
		}

		50% {
			opacity: 0.4;
			top: 91vh;
		}
	}
</style>
