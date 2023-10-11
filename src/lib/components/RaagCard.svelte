<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { KeyboardNotes } from '$lib';
	import { allNotes, noteLetterToName, type RaagObject } from '$lib/utils';

	// props
	export let raag: RaagObject;
	export let selectedRaag: RaagObject | undefined = undefined;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl">{raag.name}</Card.Title>
	</Card.Header>
	<Card.Content>
		<KeyboardNotes selectedNotes={raag.notes} />
		{#if selectedRaag}
			{@const startNotes = raag.moorchhana
				.filter((moorchhana) => moorchhana.raagName === selectedRaag?.name)
				.map((obj) => obj.startNote)}
			{#each startNotes as note}
				<ul>
					<li>
						{`Start on ${noteLetterToName(allNotes.at(note) ?? '')} of ${selectedRaag?.name}`}
					</li>
				</ul>
			{/each}
		{/if}
	</Card.Content>
</Card.Root>
