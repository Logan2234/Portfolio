import type { Position } from '$lib/classes/position';

export function distanceWithCoord(x0: number, y0: number, x1: number, y1: number) {
	return Math.hypot(x1 - x0, y1 - y0);
}

export function distanceWithPoints(point1: Position, point2: Position): number {
	return Math.hypot(point2.getX - point1.getX, point2.getY - point1.getY);
}
