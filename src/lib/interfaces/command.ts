export interface Command {
	command: string;
	nb_args: number;
	description: string;
	function: string;
	correctUsage: string;
	returnStringOnSuccess: string;
}
