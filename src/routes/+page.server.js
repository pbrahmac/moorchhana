import { areArraysEqual, findDistanceArray } from '$lib/utils';
import { db } from '$lib/firebase';
import { get, ref } from 'firebase/database';
import { superValidate } from 'sveltekit-superforms/client';
import { addRaagSchema } from '$lib/schemas';
import { z } from 'zod';
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
	const raags =
		rawRaags?.map((obj) => {
			return {
				distances: findDistanceArray(obj.notes),
				moorchhana: [],
				...obj
			};
		}) ?? [];

	const addRaagForm = await superValidate(addRaagSchema);

	return { raags: raags, addRaagForm: addRaagForm };
}

/** @type {import('./$types').Actions} */
export const actions = {
	addRaag: async (event) => {
		// fetch raag list from Firebase
		/**
		 * @type {import('$lib/utils').RawRaagObject[] | undefined}
		 */
		const rawRaags = (await get(ref(db, 'raags/'))).val();

		const [raagNames, raagNotes] = [
			rawRaags?.map((obj) => obj.name),
			rawRaags?.map((obj) => obj.notes)
		];

		// validate form submission
		const form = await superValidate(event, addRaagSchema);

		console.log(form.data);

		if (!form.valid) {
			return fail(400, { form });
		}
	}
};
