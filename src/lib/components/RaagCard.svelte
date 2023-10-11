<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { KeyboardNotes } from '$lib';
	import { allNotes, noteLetterToName, type RaagObject } from '$lib/utils';

	// props
	export let raag: RaagObject;
	export let selectedRaag: RaagObject | undefined = undefined;

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
		<KeyboardNotes selectedNotes={raag.notes} />
	</Card.Content>
</Card.Root>
