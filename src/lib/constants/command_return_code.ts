export const enum CommandReturnCode {
	HELP = -1, // Special code only used by help command
	SUCCESS, // Command successed
	BAD_USAGE, // Incorrect usage
	UNKNOWN_COMMAND, // Unknown command
	ERROR // Other error: should not appear
}
