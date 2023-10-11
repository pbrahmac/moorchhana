<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { compareDistanceArrays } from '$lib/utils';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { RaagCard } from '$lib';

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

<div class="fullPageContainer p-6 flex flex-col space-y-2 items-center">
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
			<RaagCard {raag} />
		{/each}
	</div>
</div>
