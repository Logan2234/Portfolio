export class Position {
	private x: number;
	private y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	get getX(): number {
		return this.x;
	}

	get getY(): number {
		return this.y;
	}

	set setX(x: number) {
		this.x = x;
	}

	set setY(y: number) {
		this.y = y;
	}

	public add(x: number, y: number): void {
		this.x += x;
		this.y += y;
	}
}
