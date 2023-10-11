<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle';
	import { noteMap } from '$lib/utils';

	// props
	export let selectedNotes: string[];

	const notes = [...noteMap.entries()].map((arr) => ({ note: arr[0], properties: arr[1] }));
</script>

<div class="flex flex-col rounded-lg lg:px-4 py-2 aspect-video max-w-xs lg:max-w-full">
	<div class="flex">
		{#each notes as { note, properties }, idx}
			{#if properties.row === 'top'}
				<Toggle
					disabled
					pressed={selectedNotes.includes(note)}
					class="border-2 w-8 h-20 disabled:opacity-100 items-end"
				>
					{note}
				</Toggle>
			{:else if notes[idx].properties.row === 'bottom' && notes[idx - 1].properties.row === 'bottom'}
				<div class="w-4 ml-4 h-20 border-b-2" />
			{:else}
				<div class="w-4 h-20 border-b-2" />
			{/if}
		{/each}
	</div>
	<div class="flex">
		{#each notes as { note, properties }}
			{#if properties.row === 'bottom'}
				<Toggle
					disabled
					pressed={selectedNotes.includes(note)}
					class="border-2 border-t-0 rounded-t-none w-8 h-20 disabled:opacity-100 items-end"
				>
					{note}
				</Toggle>
			{:else}
				<div class="first:w-6 w-4 h-20" />
			{/if}
		{/each}
	</div>
</div>
