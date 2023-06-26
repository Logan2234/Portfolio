<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let displayHelp = false;

	function handleKeypress(event: KeyboardEvent) {
		// TODO wait this is supposed to be found in shortcuts.json
		if (event.key === '?' && event.shiftKey === true) displayHelp = !displayHelp;
	}
</script>

<svelte:body on:keypress={(event) => handleKeypress(event)} />

{#if displayHelp}
	<div id="help" transition:fade={{ duration: 200 }}>
		<div transition:fly={{ duration: 500, y: -200 }} id="help_content">
			<h2>Commands:</h2>
			<ul>
				<!-- TODO FOREACH -->
				<li class="command_item">
					<span class="key">Shift</span> + <span class="key">?</span> : Toggle this help menu
				</li>
				<li class="command_item">
					<span class="key">Shift</span> + <span class="key">C</span> : Toggle color mode
				</li>
				<li class="command_item">
					<span class="key">Shift</span> + <span class="key">G</span> : Toggle gravity mode
				</li>
				<li class="command_item">
					<span class="key">Shift</span> + <span class="key">+</span> : Adds a particle
				</li>
				<li class="command_item">
					<span class="key">Shift</span> + <span class="key">-</span> : Removes a particle
				</li>
				<li class="command_item">
					<span class="key">Left click</span> : Adds a particle at cursor position
				</li>
			</ul>
		</div>
	</div>
{/if}

<style>
	#help {
		display: flex;
		background-color: rgba(50, 50, 50, 0.9);
		align-items: center;
		justify-content: center;
		height: 100%;
		position: fixed;
		width: 100%;
		z-index: 2;
	}

	#help_content {
		background-color: rgb(25, 25, 25);
		padding: 50px 50px 50px 50px;
		border-radius: 30px;
		box-shadow: black 2px 2px 10px 0;
	}

	.command_item {
		padding: 7px 0;
	}

	.key {
		border-radius: 5px;
		padding: 4px;
		border: rgb(70, 70, 70) thin groove;
	}
</style>
