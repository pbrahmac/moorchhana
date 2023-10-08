<script lang="ts">
	import KeyboardNotes from '$lib/components/KeyboardNotes.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { noteLetterToName } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="fullPageContainer flex flex-col space-y-2 items-center p-6">
	<h1 class="text-4xl font-bold">Moorchhana</h1>
	<div class="flex items-center justify-center py-8 w-full">
		<Select.Root>
			<Select.Trigger class="max-w-lg">
				<Select.Value placeholder="Choose a raag" />
			</Select.Trigger>
			<Select.Content>
				{#each data.raags as raag}
					<Select.Item value={raag.id}>{raag.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex flex-wrap justify-center gap-4">
		{#each data.raags as raag}
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
