import { db } from '$lib/firebase';
import { addRaagSchema } from '$lib/schemas';
import { areArraysEqual, findDistanceArray, makeCamelCase } from '$lib/utils';
import { fail } from '@sveltejs/kit';
import { get, ref, set } from 'firebase/database';
import { setError, superValidate } from 'sveltekit-superforms/client';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// init form
	const addRaagForm = await superValidate(addRaagSchema);

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
				moorchhana: [],
				...obj
			};
		}) ?? [];

	return {
		raags: raags.sort((a, b) => a.name.localeCompare(b.name)),
		addRaagForm: addRaagForm
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	addRaag: async (event) => {
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
			if ((k !== 'name' && v) || (k === 's' && form.data.S)) {
				notes.push(k);
			}
		});

		// fetch raag list from Firebase for validation
		/**
		 * @type {import('$lib/utils').RawRaagObject[]}
		 */
		const rawRaags = (await get(ref(db, 'raags/'))).val() ?? [];
		const [raagNames, raagNotes] = [
			rawRaags?.map((obj) => obj.name),
			rawRaags?.map((obj) => obj.notes)
		];

		// check if raag already exists in Firebase
		if (raagNames.includes(form.data.name)) {
			return setError(form, 'name', 'Raag name already exists.', { status: 400 });
		} else if (raagNotes.find((item) => areArraysEqual(item, notes))) {
			return setError(form, 'name', 'Raag notes already exist.', { status: 400 });
		}

		// set up data object to push to db
		const dataObj = {
			id: makeCamelCase(form.data.name),
			name: form.data.name,
			notes: notes,
			distances: findDistanceArray(notes)
		};

		// write to Firebase
		set(ref(db, 'raags/' + rawRaags.length), dataObj);

		return { form };
	}
};
