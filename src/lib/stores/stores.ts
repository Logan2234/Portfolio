import { BackgroundAnimationType } from '$lib/constants/background';
import { get, writable } from 'svelte/store';

export const documentHeight = writable(1);
export const screenSize = writable(1);
export const scrollY = writable(0);
export const hasScrolled = writable(false);
scrollY.subscribe((value) => hasScrolled.set(value > get(screenSize) - 1));

export const cliDisplayed = writable(false);
export const backgroundAnimationType = writable(BackgroundAnimationType.PARTICLES);
