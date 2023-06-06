<script lang="ts">
	import { BAD_USAGE, HELP, SUCCESS, UNKNOWN_COMMAND } from '$lib/constants/command_error_code';
	import type { Command } from '$lib/interfaces/command';
	import { clearCLI, help, link, reload } from '$lib/services/commands/command-service';
	// import { turnOffBg, turnOnBg } from '../main.js';
	// import { createParticle, removeParticle, toggleColor, toggleGravity } from './background.js';

	import { cli_displayed } from '$lib/stores/shortcut-stores';
	import { onMount } from 'svelte';
	import commands from '../../conf/commands.json';

	let displayCLI: boolean;

	cli_displayed.subscribe((value) => (displayCLI = value));

	const history: string[] = [];
	let inputValue = '';
	let valid = false;
	let answerDiv: Element;
	let helpString = '';

	onMount(() => {
		helpString += '<div>';
		helpString += '<p>=============== List of commands ===============</p><br>';
		for (const entries of commands)
			helpString +=
				'<p><strong>' + entries.command + '</strong>' + ': ' + entries.description + '</p>';
		helpString += '<br><p>============================================</p></div>';
	});

	const COMMANDS_MAPPER: { [name: string]: (...args: any) => number } = {
		// add: () => createParticle,
		// remove: () => removeParticle,
		clear: () => clearCLI(answerDiv),
		help: help,
		// color: () => toggleColor,
		// gravity: () => toggleGravity,
		link: ([_, media]: [string, string]) => link(media),
		reload: reload
		// toggleBackgroundAnimation: () => toggleBackgroundAnimation
	};

	function cliKeyPress(event: KeyboardEvent) {
		let history_num = 0;
		let currentCommand = '';
		const tokens = inputValue.split(' ').filter((elt) => elt.length > 0);
		const command: Command | undefined = commands.find((elem) => elem.command == tokens[0]);
		valid = command != undefined && command.nb_args == tokens.length - 1;

		if (event.key == 'Enter' && tokens[0] !== undefined) {
			history.push(inputValue);
			parseCommand(tokens, command);
			inputValue = '';
			history_num = history.length;
		} else if (event.key == 'ArrowUp' && history_num > 0) {
			history_num--;
			if (currentCommand.length == 0) currentCommand = inputValue;
			inputValue = history[history_num];
		} else if (event.key == 'ArrowDown' && history_num < history.length) {
			history_num++;
			if (history_num == history.length) {
				inputValue = currentCommand;
				currentCommand = '';
			} else inputValue = history[history_num];
		}
	}

	function parseCommand(tokens: string[], command: Command | undefined) {
		if (command != undefined) {
			if (command.nb_args != tokens.length - 1) manageOutput(command, BAD_USAGE);
			else manageOutput(command, COMMANDS_MAPPER[command.command](tokens));
		} else {
			manageOutput(command, UNKNOWN_COMMAND);
		}
	}

	function manageOutput(command: Command | undefined, code: number) {
		let new_p = document.createElement('p');
		let string_p = '';
		let color = 'red';

		switch (code) {
			case HELP:
				string_p = helpString;
				color = 'lightgreen';
				break;
			case SUCCESS:
				string_p = command!.returnStringOnSuccess;
				color = 'lightgreen';
				break;
			case BAD_USAGE:
				string_p = command!.correctUsage;
				break;
			case UNKNOWN_COMMAND:
				string_p = 'Unknown command';
				break;
			default:
				string_p = 'INTERNAL ERROR';
		}

		new_p.innerHTML = string_p;
		new_p.style.color = color;
		answerDiv.appendChild(new_p);
	}
</script>

{#if displayCLI}
	<div id="cli">
		<div id="cli_answer" bind:this={answerDiv} />
		<!-- svelte-ignore a11y-autofocus -->
		<input
			autofocus
			autocomplete="off"
			id="cli_prompt"
			type="text"
			name="command"
			style:color={valid ? 'rgb(70, 197, 123)' : 'rgb(197, 70, 70)'}
			on:keyup={cliKeyPress}
			bind:value={inputValue}
		/>
	</div>
{/if}

<style>
	#cli {
		background-color: rgba(150, 150, 150, 0.3);
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: flex-end;
		position: fixed;
		width: 100%;
		z-index: 2;
	}

	#cli_answer {
		margin: 2px;
	}

	#cli_prompt {
		background-color: black;
		border: white 2px solid;
		color: white;
		font-family: 'Courier New', Courier, monospace;
		font-size: 1em;
		width: 40%;
	}

	#cli_prompt:focus {
		outline: none;
	}
</style>
