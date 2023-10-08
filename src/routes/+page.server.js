import raags from '$lib/raags.json';
import { findDistanceArray } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// fetch object of raag data
	let raagsObj = raags;

	// calculate distances for each raag
	const newRaagsObj = raagsObj.map((obj) => {
		return {
			id: obj.id,
			name: obj.name,
			notes: obj.notes,
			distances: findDistanceArray(obj.notes)
		};
	});

	return { raags: newRaagsObj };
}
