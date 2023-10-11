<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { compareDistanceArrays, type RaagObject } from '$lib/utils';
	import type { PageData } from './$types';
	import { writable, type Writable } from 'svelte/store';
	import { RaagCard } from '$lib';

	export let data: PageData;

	const selectedRaag: Writable<RaagObject | undefined> = writable();
	const filteredRaagStore: Writable<RaagObject[]> = writable([]);

	const submitSelect = (event: any | undefined) => {
		if (event.value === 'default') {
			filteredRaagStore.set([]);
			selectedRaag.set(undefined);
			return;
		}
		selectedRaag.set(data.raags.find((raag) => raag.id === event.value));
		const filtered = data.raags.filter((raag) => {
			if (!$selectedRaag) {
				return false;
			}
			if (raag.name === $selectedRaag?.name) {
				return false;
			}
			const compare = compareDistanceArrays(raag.distances, $selectedRaag?.distances ?? []);
			if (compare.isMatch) {
				const moorchhana = { raagName: $selectedRaag?.name, startNote: 12 - compare.start };
				if (!raag.moorchhana.find((obj) => obj.raagName === $selectedRaag?.name)) {
					raag.moorchhana.push(moorchhana);
					// selectedRaag?.moorchhana.push({ raagName: raag.name, startNote: compare.start });
				}
			}
			return compare.isMatch;
		});
		filteredRaagStore.set(filtered);
	};
</script>

<div class="fullPageContainer p-6 flex flex-col items-center">
	<!-- <h1 class="text-4xl font-bold">Moorchhana</h1> -->
	<div class="flex items-center justify-center py-8 w-full">
		<Select.Root onSelectedChange={(event) => submitSelect(event)}>
			<Select.Trigger class="max-w-lg">
				<Select.Value placeholder="Choose a raag" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="default">Choose a raag</Select.Item>
				{#each data.raags as raag}
					<Select.Item value={raag.id}>{raag.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	{#if $selectedRaag}
		<div class="flex flex-col items-center justify-center w-full">
			<RaagCard raag={$selectedRaag} />
			<Separator class="my-6" />
		</div>
	{/if}

	<div class="flex flex-wrap justify-center gap-4">
		{#each $filteredRaagStore as raag}
			<RaagCard {raag} selectedRaag={$selectedRaag} />
		{/each}
		{#if $filteredRaagStore.length === 0}
			<p>No raags to show.</p>
		{/if}
	</div>
</div>
