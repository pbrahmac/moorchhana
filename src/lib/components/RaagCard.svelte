<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Toggle } from '$lib/components/ui/toggle';
	import { KeyboardNotes } from '$lib';
	import { allNotes, noteLetterToName, type RaagObject } from '$lib/utils';

	// props
	export let raag: RaagObject;
	export let selectedRaag: RaagObject | undefined = undefined;

	// compact mode store (from Context API)
	const compactModeStore: Writable<boolean> = getContext('compactMode');

	const startingNote = raag.moorchhana.find(
		(moorchhana) => moorchhana.raagName === selectedRaag?.name
	)?.startNote;
</script>

<Card.Root>
	<Card.Header>
		<div class="flex items-center justify-between space-x-4">
			<Card.Title class="text-xl">{raag.name}</Card.Title>
			{#if startingNote}
				<Badge>{noteLetterToName(allNotes.at(startingNote) ?? '')}</Badge>
			{/if}
		</div>
	</Card.Header>
	<Card.Content>
		{#if $compactModeStore}
			<div class="flex items-center justify-center rounded-lg px-3 py-2">
				{#each raag.notes as note}
					<Toggle disabled class="disabled:opacity-100">{note}</Toggle>
				{/each}
			</div>
		{:else}
			<KeyboardNotes selectedNotes={raag.notes} />
		{/if}
	</Card.Content>
</Card.Root>
