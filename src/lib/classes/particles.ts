import { BackgroundAnimationType, ParticleAnimationMode } from '$lib/constants/background';
import { WHITE } from '$lib/constants/color';
import { backgroundAnimationType } from '$lib/stores/stores';
import { get } from 'svelte/store';
import { Particle } from './particle';
import { RGBAtoString, randomColor } from '$lib/utils/color';

export class Particles {
	private particles: Particle[];

	constructor(particles: Particle[]) {
		this.particles = particles;
	}

	get getParticles(): Particle[] {
		return this.particles;
	}

	public addParticles(nb: number, canvasElement: HTMLCanvasElement): void {
		for (let i = 0; i < nb; i++)
			this.particles.push(
				new Particle(
					Math.random() * canvasElement.width,
					Math.random() * canvasElement.height
				)
			);
	}

	public addParticle(particle: Particle): void {
		this.particles.push(particle);
	}

	public removeParticles(nb: number): void {
		for (let i = 0; i < nb; i++) this.particles.pop();
	}

	public move(canvasElement: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D): void {
		canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
		if (get(backgroundAnimationType) === BackgroundAnimationType.PARTICLES) {
			for (const elt of this.particles) {
				if (Particle.mode) elt.computeGravity(this.particles);

				elt.move(canvasElement.width, canvasElement.height);
				elt.draw(canvasContext, this.particles, Particle.mode);
			}
			setTimeout(() => this.move(canvasElement, canvasContext), 10);
		}
	}

	public toggleColor(): void {
		if (Particle.mode === ParticleAnimationMode.COLOR) {
			for (const elt of this.particles) {
				elt.setColor = WHITE;
			}
			Particle.mode = ParticleAnimationMode.NONE;
		} else {
			for (const elt of this.particles) {
				if (Particle.mode === ParticleAnimationMode.GRAVITY) elt.resetMode();
				elt.setColor = RGBAtoString(randomColor());
			}
			Particle.mode = ParticleAnimationMode.COLOR;
		}
	}

	public toggleGravity() {
		if (Particle.mode === ParticleAnimationMode.GRAVITY) {
			Particle.mode = ParticleAnimationMode.NONE;
			for (const elt of this.particles) {
				elt.resetMode();
			}
		} else {
			Particle.mode = ParticleAnimationMode.GRAVITY;
			for (const elt of this.particles) {
				if (Math.random() <= 0.5) {
					elt.modeRepulsive();
				} else {
					elt.modeAttractive();
				}
			}
		}
	}
}
