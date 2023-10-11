import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

// types
export type MenuItem = { title: string; link: string };

export type CompareResult = { isMatch: boolean; start: number };

export type CompareObject = { raagName: string; startNote: number };

export type RawRaagObject = {
	id: string;
	name: string;
	notes: string[];
};

export type RaagObject = {
	id: string;
	name: string;
	notes: string[];
	distances: number[];
	moorchhana: CompareObject[];
};

// variables
export const noteMap = new Map([
	['S', { short: 'Sā', long: 'Shadaj (Madhya)', row: 'top' }],
	['r', { short: 'Re (Komal)', long: 'Komal Rishabh', row: 'bottom' }],
	['R', { short: 'Re (Shuddh)', long: 'Shuddh Rishabh', row: 'top' }],
	['g', { short: 'Ga (Komal)', long: 'Komal Gandhār', row: 'bottom' }],
	['G', { short: 'Ga (Shuddh)', long: 'Shuddh Gandhār', row: 'bottom' }],
	['M', { short: 'Ma (Shuddh)', long: 'Shuddh Madhyam', row: 'top' }],
	['m', { short: 'Ma (Tivra)', long: 'Tivra Madhyam', row: 'bottom' }],
	['P', { short: 'Pa', long: 'Pancham', row: 'top' }],
	['d', { short: 'Dha (Komal)', long: 'Komal Dhaivat', row: 'bottom' }],
	['D', { short: 'Dha (Shuddh)', long: 'Shuddh Dhaivat', row: 'top' }],
	['n', { short: 'Ni (Komal)', long: 'Komal Nishād', row: 'bottom' }],
	['N', { short: 'Ni (Shuddh)', long: 'Shuddh Nishād', row: 'bottom' }],
	['s', { short: 'Sā', long: 'Shadaj (Taar)', row: 'top' }]
]);

export const allNotes = [...noteMap.keys()];

// helper functions
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

/**
 * Function to trigger a click on key down (for accessibility)
 * @param event HTML key down event
 */
export const onKeyDown = (event: any): void => {
	if (['Enter', 'Space'].includes(event.code)) {
		event.preventDefault();
		event.currentTarget.click();
	}
};

/**
 *
 * @param letter Letter representing the note to be converted to a full name
 * @param isLongFormat Whether to return a short or long name (short: Sa, long: Shadaj)
 * @returns A string containing the full name (long or short) of the inputted letter
 */
export const noteLetterToName = (letter: string, isLongFormat: boolean = false) => {
	const ret = noteMap.get(letter);
	if (ret) {
		return isLongFormat ? ret.long : ret.short;
	} else {
		return 'Invalid note.';
	}
};

/**
 *
 * @param notes the array of notes in a raag
 * @returns An array containing the distances between each neighboring pair of notes
 */
export const findDistanceArray = (notes: string[]) => {
	const distanceArr: number[] = [];

	notes.forEach((note, idx) => {
		const distance = allNotes.findIndex((item) => item === note);
		if (idx > 0) {
			const prevDistance = allNotes.findIndex((item) => item === notes[idx - 1]);
			distanceArr.push(distance - prevDistance);
		}
	});

	return distanceArr;
};

/**
 *
 * @param first array of distances between notes of first raag
 * @param second array of distances between notes of second raag
 * @returns An object that contains 1) if there is a match and 2) what the starting note is in case of a match
 */
export const compareDistanceArrays = (first: number[], second: number[]): CompareResult => {
	// non-optimal cases
	if (first.length !== second.length) {
		return { isMatch: false, start: 0 };
	}

	let [i, j, k] = [0, 0, 0];
	while (k < first.length) {
		if (first[i] === second[j]) {
			i += 1;
			j += 1;
		} else {
			i = 0;
			k += 1;
			j = k;
		}

		if (j === first.length) {
			j = 0;
		}

		if (i >= first.length) {
			return { isMatch: true, start: second.slice(k).reduce((sum, num) => sum + num, 0) };
		}
	}

	return { isMatch: false, start: 0 };
};
