import { Position } from './position';
import { DIST_LINK, GravityParticleType, ParticleAnimationMode } from '$lib/constants/background';
import { distanceWithPoints } from '$lib/utils/math';

export class Particle {
	private readonly position: Position;
	private readonly angle = Math.random() * Math.PI * 2;
	private v = 1;
	private color = 'rgb(150, 150, 150, 255)';
	private particleMode = GravityParticleType.NONE;
	private vx = this.v * Math.cos(this.angle);
	private vy = this.v * Math.sin(this.angle);

	constructor(x: number, y: number) {
		this.position = new Position(x, y);
	}

	public get getPos(): Position {
		return this.position;
	}

	public get getX(): number {
		return this.position.getX;
	}

	public get getY(): number {
		return this.position.getY;
	}

	public get getMode(): number {
		return this.particleMode;
	}

	public get getColor(): string {
		return this.color;
	}

	public set setColor(value: string) {
		this.color = value;
	}

	public resetMode(): void {
		this.vx = Math.cos(this.angle);
		this.vy = Math.sin(this.angle);
		this.color = 'rgba(150,150,150, 255)';
		this.particleMode = GravityParticleType.NONE;
	}

	public modeRepulsive(): void {
		this.color = 'rgba(255, 120, 120, 255)';
		this.particleMode = GravityParticleType.REPULSIVE;
	}

	public modeAttractive(): void {
		this.color = 'rgba(120, 120, 255, 255)';
		this.particleMode = GravityParticleType.ATTRACTIVE;
	}

	public draw(
		canvasContext: CanvasRenderingContext2D,
		particle_array: Particle[],
		mode: ParticleAnimationMode
	): void {
		canvasContext.fillStyle = this.color;

		canvasContext.beginPath();
		canvasContext.arc(this.getX, this.getY, 2, 0, Math.PI * 2);
		canvasContext.fill();

		particle_array.forEach((elt) => {
			const dist = distanceWithPoints(this.position, elt.getPos);
			if (this !== elt && dist <= DIST_LINK) {
				const transparence = 1 - dist / DIST_LINK;
				canvasContext.moveTo(this.getX, this.getY);
				canvasContext.lineTo(elt.getX, elt.getY);
				if (mode === ParticleAnimationMode.COLOR) {
					const rgb_curr = this.color.replace('rgba(', '').replace(')', '').split(', ');
					const rgb_elt = elt.getColor.replace('rgba(', '').replace(')', '').split(', ');
					const res = []; // TODO to change the way this is computed
					for (let i = 0; i < 3; i++)
						res.push((parseInt(rgb_curr[i]) + parseInt(rgb_elt[i])) / 2);

					canvasContext.strokeStyle = `rgba(${res[0]}, ${res[1]}, ${res[2]}, ${transparence})`;
				} else {
					canvasContext.strokeStyle = `rgba(100, 100, 100, ${transparence})`;
				}
				canvasContext.stroke();
			}
		});
	}

	public move(canvasWidth: number, canvasHeight: number): void {
		this.position.add(this.vx, this.vy);
		if (this.getX < 0 || this.getX > canvasWidth) {
			this.vx = -this.vx;
		} else if (this.getY < 0 || this.getY >= canvasHeight) {
			this.vy = -this.vy;
		}
	}

	public computeGravity(particle_array: Particle[]): void {
		for (const elt of particle_array) {
			if (elt != this) {
				const dist = distanceWithPoints(this.position, elt.getPos);
				if (dist <= DIST_LINK) {
					const force = (this.particleMode * elt.getMode) / dist;
					const angle = Math.atan((this.getY - elt.getY) / (this.getX - elt.getX));
					if (
						(this.getY - elt.getY <= 0 && this.getX - elt.getX <= 0) ||
						(this.getY - elt.getY >= 0 && this.getX - elt.getX <= 0)
					) {
						this.vx -= force * Math.cos(angle);
						this.vy -= force * Math.sin(angle);
					} else {
						this.vx += force * Math.cos(angle);
						this.vy += force * Math.sin(angle);
					}
				}
			}
		}
	}
}
