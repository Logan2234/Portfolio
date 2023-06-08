import { writable } from 'svelte/store';

export const helpDisplayed = writable(false);
export const cliDisplayed = writable(false);

export const SHORTCUTS_MAPPER = writable<{ [name: string]: (...args: any) => unknown }>({
	// "toggleColor": toggleColor,
	// "toggleGravity": toggleGravity,
	displayHelp: () => helpDisplayed.update((help_displayed) => !help_displayed),
	displayCLI: () => cliDisplayed.update((cli_displayed) => !cli_displayed)
});
