<script lang="ts">
	import { Particle } from '$lib/classes/particle';
	import { Particles } from '$lib/classes/particles';
	import { BackgroundAnimationType, DIST_LINK } from '$lib/constants/background';
	import { COMMANDS_MAPPER } from '$lib/constants/command';
	import { SHORTCUTS_MAPPER } from '$lib/constants/shortcut';
	import {
		addParticles,
		removeParticles,
		toggleColor,
		toggleGravity
	} from '$lib/services/command-service';
	import { backgroundAnimationType, hasScrolled } from '$lib/stores/stores';
	import { distanceWithCoord } from '$lib/utils/math';
	import { onMount } from 'svelte';

	let documentWidth: number;
	let documentHeight: number;
	let canvasElement: HTMLCanvasElement;
	let canvasContext: CanvasRenderingContext2D;

	let particles = new Particles([]);
	// TODO: Add a onDestroy parce que sinon en changeant de page on obtient du lag (particules toujours en vie)
	onMount(() => {
		// Add shortcuts to shortcut mapper
		SHORTCUTS_MAPPER.createParticle = () => particles.addParticles(1, canvasElement);
		SHORTCUTS_MAPPER.removeParticle = () => particles.removeParticles(1);
		SHORTCUTS_MAPPER.toggleColor = () => toggleColor(particles);
		SHORTCUTS_MAPPER.toggleGravity = () => toggleGravity(particles);

		// Add commands to command mapper
		COMMANDS_MAPPER.add = (nb) => addParticles(particles, nb, canvasElement);
		COMMANDS_MAPPER.remove = (nb) => removeParticles(particles, nb);
		COMMANDS_MAPPER.color = () => toggleColor(particles);
		COMMANDS_MAPPER.gravity = () => toggleGravity(particles);

		canvasContext = canvasElement.getContext('2d')!;

		setTimeout(() => {
			particles.addParticles(
				Math.round((canvasElement.width * canvasElement.height) / 10000),
				canvasElement
			);
			particles.move(canvasElement, canvasContext);
		}, 1);

		backgroundAnimationType.subscribe((value) => {
			if (value === BackgroundAnimationType.PARTICLES)
				particles.move(canvasElement, canvasContext);
		});
	});

	hasScrolled.subscribe((value) =>
		backgroundAnimationType.set(
			value ? BackgroundAnimationType.NONE : BackgroundAnimationType.PARTICLES
		)
	);

	function mouseMove(event: MouseEvent): void {
		for (const elt of particles.getParticles) {
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
		let pos_x = event.x;
		let pos_y = event.y;
		particles.addParticle(new Particle(pos_x, pos_y));
	}
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
