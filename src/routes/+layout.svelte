<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import shortcuts from '../conf/shortcuts.json';
	import { SHORTCUTS_MAPPER } from '$lib/services/shortcuts/shortcut-service';

	let documentHeight;

	function keydown(event: any) {
		let key_pressed = event.key;
		let shift_pressed = event.shiftKey;
		let alt_pressed = event.altKey;
		let ctrl_pressed = event.ctrlKey;
		let meta_pressed = event.metaKey;

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
