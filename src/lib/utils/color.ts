import type { ColorHex, ColorRGBA } from '../interfaces/color';

export function randomColor(): ColorRGBA {
	return {
		r: Math.random() * 255,
		g: Math.random() * 255,
		b: Math.random() * 255,
		a: 1
	};
}

// export function HexToRGBA(color: ColorHex): ColorRGBA {
// 	return {
// 		r: parseInt(color.color.slice(1, 2)),
// 		g: parseInt(color.color.slice(3, 4)),
// 		b: parseInt(color.color.slice(5, 6)),
// 		a: 1
// 	};
// }

// export function RGBAtoHex(color: ColorRGBA): ColorHex {

// }

export function RGBAtoString(color: ColorRGBA): string {
	return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}
