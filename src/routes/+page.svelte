<script lang="ts">
	import KeyboardNotes from '$lib/components/KeyboardNotes.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { compareDistanceArrays } from '$lib/utils';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';

	export let data: PageData;

	const filteredRaagStore = writable(data.raags);

	const submitSelect = (event: any | undefined) => {
		if (event.value === 'default') {
			filteredRaagStore.set(data.raags);
			return;
		}
		const selectedRaag = data.raags.find((raag) => raag.id === event.value);
		const filtered = data.raags.filter(
			(raag) => compareDistanceArrays(raag.distances, selectedRaag?.distances ?? []).isMatch
		);
		filteredRaagStore.set(filtered);
	};
</script>

<div class="fullPageContainer flex flex-col space-y-2 items-center p-6">
	<h1 class="text-4xl font-bold">Moorchhana</h1>
	<div class="flex items-center justify-center py-8 w-full">
		<Select.Root onSelectedChange={(event) => submitSelect(event)}>
			<Select.Trigger class="max-w-lg">
				<Select.Value placeholder="Choose a raag" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="default">All</Select.Item>
				{#each data.raags as raag}
					<Select.Item value={raag.id}>{raag.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex flex-wrap justify-center gap-4">
		{#each $filteredRaagStore as raag}
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-xl">{raag.name}</Card.Title>
				</Card.Header>
				<Card.Content>
					<KeyboardNotes selectedNotes={raag.notes} />
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>

<style>
	.fullPageContainer {
		min-height: 100svh;
	}
</style>
