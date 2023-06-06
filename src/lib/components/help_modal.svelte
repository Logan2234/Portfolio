<script lang="ts">
	import { help_displayed } from '$lib/stores/stores';

	let displayHelp = true;
	let timeoutReached = true;
	let helpLoaded = false;

	function handleHelpDisplayedChange() {
		displayHelp = !displayHelp;
		if (timeoutReached)
			setTimeout(() => {
				timeoutReached = !timeoutReached;
				if (!helpLoaded) helpLoaded = true;
			}, 500);
		else timeoutReached = !timeoutReached;
	}

	help_displayed.subscribe(handleHelpDisplayedChange);
</script>

{#if timeoutReached && helpLoaded}
	<div id="help">
		<div class={displayHelp ? 'help_shown' : 'help_hidden'} id="help_content">
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

	.help_shown {
		animation: showHelp 0.4s forwards;
	}

	.help_hidden {
		animation: hideHelp 0.4s forwards;
	}

	.command_item {
		padding: 7px 0;
	}

	.key {
		border-radius: 5px;
		padding: 4px;
		border: rgb(70, 70, 70) thin groove;
	}

	@keyframes showHelp {
		0% {
			transform: scale(0);
		}

		50% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes hideHelp {
		0% {
			transform: scale(1);
		}

		40% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(0);
		}
	}
</style>
