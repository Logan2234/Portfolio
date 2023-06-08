<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { SHORTCUTS_MAPPER } from '$lib/constants/shortcut';
	import shortcuts from '../conf/shortcuts.json';

	let documentHeight;

	function keydown(event: KeyboardEvent) {
		let key_pressed = event.key;
		const command = shortcuts.find((elem) => elem.shortcut == key_pressed);
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
