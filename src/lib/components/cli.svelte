<script lang="ts">
	import { COMMANDS_MAPPER, CommandReturnCode } from '$lib/constants/command';
	import type { Command } from '$lib/interfaces/command';
	import { clearCLI } from '$lib/services/command-service';
	import { cliDisplayed } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import commands from '../../conf/commands.json';
	import { RED } from '$lib/constants/color';

	let displayCLI: boolean;

	cliDisplayed.subscribe((value) => (displayCLI = value));

	const history: string[] = [];
	let inputValue = '';
	$: tokens = inputValue.split(' ').filter((elt) => elt.length > 0);
	$: command = commands.find((elem) => elem.command == tokens[0]);
	$: valid = command != undefined && command.nb_args == tokens.length - 1;
	let answerDiv: Element;
	let history_num = 0;
	let currentCommand = '';

	let helpString = '';
	onMount(() => {
		// Add commands to command_mapper
		COMMANDS_MAPPER.clear = () => clearCLI(answerDiv);

		// Compute help string
		helpString += '<div>';
		helpString += '<p>=============== List of commands ===============</p><br>';
		for (const entries of commands)
			helpString +=
				'<p><strong>' + entries.command + '</strong>' + ': ' + entries.description + '</p>';
		helpString += '<br><p>============================================</p></div>';
	});

	function cliKeyPress(event: KeyboardEvent) {
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
			if (command.nb_args != tokens.length - 1)
				manageOutput(command, CommandReturnCode.BAD_USAGE);
			else manageOutput(command, COMMANDS_MAPPER[command.command](tokens));
		} else {
			manageOutput(command, CommandReturnCode.UNKNOWN_COMMAND);
		}
	}

	function manageOutput(command: Command | undefined, code: number) {
		let new_p = document.createElement('p');
		let string_p = '';
		let color = RED;

		switch (code) {
			case CommandReturnCode.HELP:
				string_p = helpString;
				color = 'lightgreen';
				break;
			case CommandReturnCode.SUCCESS:
				string_p = command!.returnStringOnSuccess;
				color = 'lightgreen';
				break;
			case CommandReturnCode.BAD_USAGE:
				string_p = command!.correctUsage;
				break;
			case CommandReturnCode.UNKNOWN_COMMAND:
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
