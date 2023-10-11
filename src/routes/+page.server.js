import { areArraysEqual, findDistanceArray } from '$lib/utils';
import { db } from '$lib/firebase';
import { get, ref } from 'firebase/database';
import { setError, superValidate } from 'sveltekit-superforms/client';
import { addRaagSchema } from '$lib/schemas';
import { fail } from '@sveltejs/kit';

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
	let raags =
		rawRaags?.map((obj) => {
			return {
				distances: findDistanceArray(obj.notes),
				moorchhana: [],
				...obj
			};
		}) ?? [];

	const addRaagForm = await superValidate(addRaagSchema);

	return {
		raags: raags.sort((a, b) => a.name.localeCompare(b.name)),
		addRaagForm: addRaagForm
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	addRaag: async (event) => {
		// fetch raag list from Firebase
		/**
		 * @type {import('$lib/utils').RawRaagObject[]}
		 */
		const rawRaags = (await get(ref(db, 'raags/'))).val();
		const [raagNames, raagNotes] = [
			rawRaags?.map((obj) => obj.name),
			rawRaags?.map((obj) => obj.notes)
		];

		// validate form submission
		const form = await superValidate(event, addRaagSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// get notes array
		/**
		 * @type {string[]}
		 */
		let notes = [];
		Object.entries(form.data).forEach(([k, v]) => {
			if (k !== 'name' && v) {
				notes.push(k);
			}
		});

		// check if raag already exists in Firebase
		if (raagNames.includes(form.data.name)) {
			return setError(form, 'name', 'Raag name already exists.', { status: 400 });
		} else if (raagNotes.find((item) => areArraysEqual(item, notes))) {
			return setError(form, 'name', 'Raag notes already exist.', { status: 400 });
		}

		console.log('Form validated!');

		// calculate distance array
		const distanceArr = findDistanceArray(notes);

		// find moorchhana pairings
	}
};
