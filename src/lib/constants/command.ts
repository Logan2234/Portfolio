import { help, link, reload, toggleAnimation } from '$lib/services/command-service';

export const enum CommandReturnCode {
	HELP = -1, // Special code only used by help command
	SUCCESS, // Command successed
	BAD_USAGE, // Incorrect usage
	UNKNOWN_COMMAND, // Unknown command
	ERROR // Other error: should not appear
}

export const COMMANDS_MAPPER: { [name: string]: (...args: any) => number } = {
	help: help,
	link: ([_, media]) => link(media),
	reload: reload,
	toggleAnimation: toggleAnimation
};
