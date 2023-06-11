<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { SHORTCUTS_MAPPER } from '$lib/constants/shortcut';
	import shortcuts from '$lib/conf/shortcuts.json';
	import { screenSize, scrollY as scrollVertical, documentHeight } from '$lib/stores/stores';
	import { onMount } from 'svelte';

	let innerHeight: number;
	let scrollY: number;
	let clientHeight: number;

	onMount(() => {
		screenSize.set(innerHeight);
		scrollVertical.set(scrollY);
		documentHeight.set(clientHeight);
	});

	function keydown(event: KeyboardEvent) {
		const command = shortcuts.find((elem) => elem.shortcut == event.key);
		if (command != undefined) {
			SHORTCUTS_MAPPER[command.function]();
			if (command.preventDefault) event.preventDefault();
		}
	}

	function handleScroll(scrollEvent: UIEvent & { currentTarget: EventTarget & Window }) {
		scrollVertical.set(scrollEvent.currentTarget.scrollY);
	}
</script>

<svelte:window on:keydown={keydown} bind:innerHeight bind:scrollY on:scroll={handleScroll} />

<div bind:clientHeight>
	<Header />

	<slot />

	<Footer />
</div>
