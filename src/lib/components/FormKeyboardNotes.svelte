<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { allNotes, noteMap } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// props
	export let config: any;

	// compact mode store (from Context API)
	const compactModeStore: Writable<boolean> = getContext('compactMode');

	const notes = [...noteMap.entries()].map((arr) => ({ note: arr[0], properties: arr[1] }));
</script>

{#if $compactModeStore}
	<div class="flex flex-wrap items-center justify-center gap-1 rounded-lg px-3 py-2">
		{#each allNotes as note}
			<Form.Field {config} name={note}>
				<Form.Item>
					<Form.Toggle class="border-2">{note}</Form.Toggle>
				</Form.Item>
			</Form.Field>
		{/each}
	</div>
{:else}
	<div
		class="lg:border-2 lg:shadow-inner flex flex-col items-center justify-center aspect-video rounded-lg"
	>
		<div class="flex w-full justify-center">
			{#each notes as { note, properties }, idx}
				{#if properties.row === 'top'}
					<Form.Field {config} name={note}>
						<Form.Item>
							<Form.Toggle class="border-2 w-8 h-20 items-end">{note}</Form.Toggle>
						</Form.Item>
					</Form.Field>
				{:else if notes[idx].properties.row === 'bottom' && notes[idx - 1].properties.row === 'bottom'}
					<div class="w-4 ml-4 h-20 border-b-2" />
				{:else}
					<div class="w-4 h-20 border-b-2" />
				{/if}
			{/each}
		</div>
		<div class="flex w-full justify-center">
			{#each notes as { note, properties }}
				{#if properties.row === 'bottom'}
					<Form.Field {config} name={note}>
						<Form.Item>
							<Form.Toggle class="border-2 border-t-0 rounded-t-none w-8 h-20 items-end"
								>{note}</Form.Toggle
							>
						</Form.Item>
					</Form.Field>
				{:else}
					<div class="w-4 h-20" />
				{/if}
			{/each}
		</div>
	</div>
{/if}
