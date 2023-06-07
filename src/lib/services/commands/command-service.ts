import { CommandReturnCode } from '$lib/constants/command_return_code';

export function clearCLI(answerDiv: Element): number {
	answerDiv.innerHTML = '';
	setTimeout(() => (answerDiv.innerHTML = ''), 1500);
	return CommandReturnCode.SUCCESS;
}

export function link(media: string): number {
	switch (media) {
		case 'mail':
			navigator.clipboard.writeText('loganwi322@gmail.com');
			break;
		case 'linkedin':
			navigator.clipboard.writeText('https://www.linkedin.com/in/logan-willem/');
			break;
		case 'github':
			navigator.clipboard.writeText('https://github.com/Logan2234/');
			break;
		case 'facebook':
			navigator.clipboard.writeText('https://www.facebook.com/logan.wi322/');
			break;
		case 'steam':
			navigator.clipboard.writeText('https://steamcommunity.com/id/logan2234/');
			break;
		default:
			return CommandReturnCode.BAD_USAGE;
	}
	return CommandReturnCode.SUCCESS;
}

export function help(): number {
	return CommandReturnCode.HELP;
}

export function reload(): number {
	location.reload();
	return CommandReturnCode.SUCCESS;
}
