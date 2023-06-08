import { BackgroundAnimationType } from '$lib/constants/background';
import { writable } from 'svelte/store';

export const helpDisplayed = writable(false);
export const cliDisplayed = writable(false);
export const backgroundAnimationType = writable(BackgroundAnimationType.PARTICLES);
