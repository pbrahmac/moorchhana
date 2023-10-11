<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Lightbulb } from 'lucide-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import type { addRaagSchema } from '$lib/schemas';
	import { FormKeyboardNotes } from '$lib';

	// props
	export let form: SuperValidated<typeof addRaagSchema>;
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Add Raag</Dialog.Trigger>
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
			<Form.Root
				action="?/addRaag"
				method="POST"
				{form}
				schema={$page.data.addRaagSchema}
				let:config
			>
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
			</Form.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
