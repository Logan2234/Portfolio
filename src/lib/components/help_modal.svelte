<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import shortcuts from '$lib/conf/shortcuts.json';

	let displayHelp = false;

	function handleKeypress(event: KeyboardEvent) {
		if (
			event.key === shortcuts.filter((elem) => elem.name === 'Help')[0].shortcut &&
			event.target instanceof HTMLBodyElement
		)
			displayHelp = !displayHelp;
	}
</script>

<svelte:body on:keypress={(event) => handleKeypress(event)} />

{#if displayHelp}
	<div class="help-container" transition:fade={{ duration: 200 }}>
		<div transition:fly={{ duration: 500, y: -200 }} class="help-content">
			<h2 class="help-title">Commands</h2>
			<ul class="commands">
				{#each shortcuts as shortcut}
					<li class="command-item">
						<p>
							<span class="key">{shortcut.shortcut.toUpperCase()}</span>: {shortcut.description}
						</p>
					</li>
				{/each}
				<li class="command_item">
					<span class="key">Left click</span> : Adds a particle at cursor position
				</li>
			</ul>
		</div>
	</div>
{/if}

<style>
	.help-container {
		align-items: center;
		background-color: rgba(50, 50, 50, 0.9);
		display: flex;
		justify-content: center;
		height: 100%;
		position: fixed;
		width: 100%;
		z-index: 2;
	}

	.help-content {
		background-color: rgb(25, 25, 25);
		border-radius: 30px;
		box-shadow: lightgrey 0 0 6px;
		padding: 50px;
	}

	.help-title {
		margin-bottom: 30px;
	}

	.commands {
		display: flex;
		flex-direction: column;
		list-style: none;
	}

	.key {
		border: 1px solid rgb(70, 70, 70);
		border-radius: 6px;
		display: inline-block;
		margin: 10px 5px;
		padding: 6px 10px;
	}
</style>
