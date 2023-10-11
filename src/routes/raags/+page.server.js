import { db } from '$lib/firebase';
import { get, ref } from 'firebase/database';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// fetch from Firebase
	const firebasePath = ref(db, 'raags/');
	/**
	 * @type {import('$lib/utils').RawRaagObject[]}
	 */
	const rawRaags = (await get(firebasePath)).val() ?? [];

	return { raags: rawRaags };
}
