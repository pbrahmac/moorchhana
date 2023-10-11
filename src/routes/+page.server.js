import { findDistanceArray } from '$lib/utils';
import { db } from '$lib/firebase';
import { get, ref } from 'firebase/database';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// fetch from Firebase
	const firebasePath = ref(db, 'raags/');
	/**
	 * @type {import('$lib/utils').RawRaagObject[] | undefined}
	 */
	const rawRaags = (await get(firebasePath)).val();

	// calculate distances for each raag
	/**
	 * @type {import('$lib/utils').RaagObject[]}
	 */
	const raags =
		rawRaags?.map((obj) => {
			return {
				distances: findDistanceArray(obj.notes),
				moorchhana: [],
				...obj
			};
		}) ?? [];

	return { raags: raags };
}
