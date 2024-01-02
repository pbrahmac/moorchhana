<script lang="ts">
	import { RaagCard } from '$lib';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';

	// props
	export let data: PageData;

	$: searchStore = '';
	let searchHitsStore = writable(data.raags);

	const searchForRaags = () => {
		$searchHitsStore = data.raags.filter((raagObj) =>
			raagObj.name.toLowerCase().includes(searchStore.toLowerCase())
		);
	};
</script>

<div class="fullPageContainer p-6">
	<div class="flex flex-col justify-center items-center space-y-4">
		<div class="flex items-center border rounded-md px-3 w-11/12 md:w-1/3 max-w-sm">
			<Search class="h-4 w-4" />
			<Input
				class="flex w-full bg-transparent py-3 border-0"
				placeholder="Search for raag..."
				bind:value={searchStore}
				on:input={searchForRaags}
			/>
		</div>
		<div class="flex flex-wrap justify-center gap-4">
			{#each $searchHitsStore as raag}
				<RaagCard {raag} />
			{/each}
		</div>
	</div>
</div>
