<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Lightbulb } from 'lucide-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import type { addRaagSchema } from '$lib/schemas';
	import { FormKeyboardNotes } from '$lib';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import Button from './ui/button/button.svelte';
	import { writable } from 'svelte/store';
	import { makeCamelCase } from '$lib/utils';

	// props
	export let form: SuperValidated<typeof addRaagSchema>;

	let open = false;

	const submitAddRaag: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type == 'success') {
				await invalidateAll();
				open = false;
			}
			await applyAction(result);
		};
	};
</script>

<Dialog.Root bind:open>
	<Button on:click={() => (open = true)}>Add Raag</Button>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add Raag</Dialog.Title>
			<Dialog.Description>
				<div class="flex items-center justify-start w-full mt-2">
					<Lightbulb class="mr-2 w-4 h-4" />
					Disable compact mode to visualize notes!
				</div>
			</Dialog.Description>
		</Dialog.Header>
		<div>
			<Form.Root {form} schema={$page.data.addRaagSchema} let:config asChild>
				<form action="?/addRaag" method="post" use:enhance={submitAddRaag}>
					<Form.Field {config} name="name">
						<Form.Item>
							<Form.Label>Raag Name</Form.Label>
							<Form.Input />
							<Form.Validation />
						</Form.Item>
					</Form.Field>
					<FormKeyboardNotes {config} />
					<Dialog.Footer class="mt-6">
						<Form.Button type="submit">Add</Form.Button>
					</Dialog.Footer>
				</form>
			</Form.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
