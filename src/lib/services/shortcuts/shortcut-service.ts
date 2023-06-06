import { cli_displayed } from '$lib/stores/shortcut-stores';
import { help_displayed } from '$lib/stores/stores';

export const SHORTCUTS_MAPPER: { [name: string]: () => unknown } = {
	// "toggleColor": toggleColor,
	// "toggleGravity": toggleGravity,
	// "createParticle": createParticle,
	// "removeParticle": removeParticle,
	displayHelp: () => {
		help_displayed.update((help_displayed) => !help_displayed);
	},
	displayCLI: () => {
		cli_displayed.update((cli_displayed) => !cli_displayed);
	}
};
