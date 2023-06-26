import { cliDisplayed } from '$lib/stores/stores';

export const SHORTCUTS_MAPPER: { [name: string]: (...args: unknown[]) => void } = {
	displayCLI: () => cliDisplayed.update((cli_displayed) => !cli_displayed)
};
