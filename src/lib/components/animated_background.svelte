<script lang="ts">
	import { Particle } from '$lib/classes/particle';
	import {
		BackgroundAnimationType,
		DIST_LINK,
		ParticleAnimationMode
	} from '$lib/constants/background';
	import { distanceWithCoord } from '$lib/utils/math';
	import { onMount } from 'svelte';

	// import { randomColor } from './randomcolor.js';

	const particle_array: Particle[] = [];

	let documentWidth: number;
	let documentHeight: number;
	let canvasElement: HTMLCanvasElement;
	let canvasContext: CanvasRenderingContext2D;

	let animationType = BackgroundAnimationType.PARTICLES;
	let particleMode = ParticleAnimationMode.NONE;

	onMount(() => {
		canvasContext = canvasElement.getContext('2d')!;
		setTimeout(() => {
			createParticle(Math.round((canvasElement.width * canvasElement.height) / 10000));
			move();
		}, 1);
	});

	function createParticle(nb: number): void {
		for (let i = 0; i < nb; i++)
			particle_array.push(
				new Particle(
					Math.random() * canvasElement.width,
					Math.random() * canvasElement.height
				)
			);
	}

	function removeParticle(nb: number): void {
		for (let i = 0; i < nb; i++) particle_array.pop();
	}

	function move(): void {
		console.log('move');
		canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
		for (const elt of particle_array) {
			if (particleMode) elt.computeGravity(particle_array);

			elt.move(canvasElement.width, canvasElement.height);
			elt.draw(canvasContext, particle_array, particleMode);
		}
		setTimeout(move, 0.05);
	}

	function mouseMove(event: MouseEvent): void {
		for (const elt of particle_array) {
			const dist = distanceWithCoord(event.x, event.y, elt.getX, elt.getY);
			if (dist <= DIST_LINK) {
				canvasContext.moveTo(event.x, event.y);
				canvasContext.lineTo(elt.getX, elt.getY);
				const transparence = 1 - dist / ((DIST_LINK * 4) / 3);
				canvasContext.strokeStyle = `rgba(150,150,150,${transparence})`;
				canvasContext.stroke();
			}
		}
	}

	function mouseClick(event: MouseEvent): void {
		console.log(event.button);
		console.log(event.buttons);
		// if (event.button == )
		let pos_x = event.x;
		let pos_y = event.y;
		particle_array.push(new Particle(pos_x, pos_y));
	}

	// function toggleColor() {
	// 	if (color_mode) {
	// 		for (let elt of particle_array) {
	// 			elt.setColor('rgb(150, 150, 150)');
	// 		}
	// 		color_mode = 0;
	// 	} else {
	// 		for (let elt of particle_array) {
	// 			if (gravity_mode) {
	// 				elt.resetMode();
	// 			}
	// 			// eslint-disable-next-line no-undef
	// 			elt.setColor(randomColor({ format: 'rgb' }));
	// 		}
	// 		gravity_mode = 0;
	// 		color_mode = 1;
	// 	}
	// }

	// export function toggleGravity() {
	// 	if (gravity_mode) {
	// 		for (let elt of particle_array) {
	// 			elt.resetMode();
	// 		}
	// 		gravity_mode = 0;
	// 	} else {
	// 		for (let elt of particle_array) {
	// 			if (Math.random() <= 0.5) {
	// 				elt.modeRepulsive();
	// 			} else {
	// 				elt.modeAttractive();
	// 			}
	// 		}
	// 		color_mode = 0;
	// 		gravity_mode = 1;
	// 	}
	// }

	// backgroundInit();
	// main();

	// // Main loop
	// function main() {
	// 	if (play_animation) {
	// 		move();
	// 		setTimeout(main, 20);
	// 	}
	// }

	// export function turnOffBg() {
	// 	document.getElementsByTagName('canvas')[0].getContext('2d').clearRect(0, 0, 3000, 3000);
	// 	play_animation = false;
	// }

	// export function turnOnBg() {
	// 	play_animation = true;
	// 	main();
	// }
</script>

<svelte:window bind:innerWidth={documentWidth} bind:innerHeight={documentHeight} />

<canvas
	width={documentWidth - 15}
	height={documentHeight}
	bind:this={canvasElement}
	on:click={mouseClick}
	on:mousemove={mouseMove}
/>

<style>
	canvas {
		position: absolute;
	}
</style>
