<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { SHORTCUTS_MAPPER } from '$lib/constants/shortcut';
	import shortcuts from '$lib/conf/shortcuts.json';

	let documentHeight;

	function keydown(event: KeyboardEvent) {
		const command = shortcuts.find((elem) => elem.shortcut == event.key);
		if (command != undefined) {
			SHORTCUTS_MAPPER[command.function]();
			if (command.preventDefault) event.preventDefault();
		}
	}
</script>

<svelte:window on:keydown={keydown} />

<div bind:clientHeight={documentHeight}>
	<Header {documentHeight} />

	<slot />

	<Footer />
</div>
