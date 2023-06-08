import { cliDisplayed, helpDisplayed } from '$lib/stores/stores';

export const SHORTCUTS_MAPPER: { [name: string]: (...args: unknown[]) => void } = {
	displayHelp: () => helpDisplayed.update((help_displayed) => !help_displayed),
	displayCLI: () => cliDisplayed.update((cli_displayed) => !cli_displayed)
};
