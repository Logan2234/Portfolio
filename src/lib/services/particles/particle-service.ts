import { Particle } from '$lib/classes/particle';

export function createParticle(
	nb: number,
	particles: Particle[],
	canvasElement: HTMLCanvasElement
): void {
	for (let i = 0; i < nb; i++)
		particles.push(
			new Particle(Math.random() * canvasElement.width, Math.random() * canvasElement.height)
		);
}

export function removeParticle(nb: number, particles: Particle[]): void {
	for (let i = 0; i < nb; i++) particles.pop();
}
