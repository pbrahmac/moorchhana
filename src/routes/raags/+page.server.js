import { db } from '$lib/firebase';
import { findDistanceArray } from '$lib/utils';
import { get, ref } from 'firebase/database';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// fetch from Firebase
	const firebasePath = ref(db, 'raags/');
	/**
	 * @type {import('$lib/utils').RawRaagObject[]}
	 */
	const rawRaags = (await get(firebasePath)).val() ?? [];

	/**
	 * @type {import('$lib/utils').RaagObject[]}
	 */
	const raags = rawRaags.map((raag) => ({
		...raag,
		distances: findDistanceArray(raag.notes),
		moorchhana: []
	}));

	return { raags: raags.sort((a, b) => a.name.localeCompare(b.name)) };
}
