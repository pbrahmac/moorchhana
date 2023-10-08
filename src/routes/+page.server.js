import raags from '$lib/raags.json';
import { findDistanceArray } from '$lib/utils';
import { db } from '$lib/firebase';
import { onValue, ref } from 'firebase/database';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// fetch from Firebase
	/**
	 * @type {{id: number; name: string; notes: string[];}[] | undefined}
	 */
	let firebaseDataVar;
	const firebasePath = ref(db, 'raags/');
	onValue(firebasePath, (snapshot) => {
		const firebaseData = snapshot.val();
		firebaseDataVar = firebaseData;
	});

	// fetch object of raag data
	let raagsObj = firebaseDataVar ?? [];

	// calculate distances for each raag
	const newRaagsObj = raagsObj.map((obj) => {
		return {
			distances: findDistanceArray(obj.notes),
			moorchhana: [],
			...obj
		};
	});

	return { raags: newRaagsObj };
}
