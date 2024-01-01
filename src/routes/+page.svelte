<script lang="ts">
	import { AddRaagDialog, RaagCard } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import { cn, compareDistanceArrays, type RaagObject } from '$lib/utils';
	import { CaretSort, Check } from 'radix-icons-svelte';
	import { tick } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const selectedRaag: Writable<RaagObject | undefined> = writable();
	const filteredRaagStore: Writable<RaagObject[]> = writable([]);

	// combobox stuff
	let open = false;
	// let value = '';

	const closeAndFocusTrigger = (triggerId: string) => {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	};

	const submitSelectRaag = (currentValue: string) => {
		if (currentValue === 'default') {
			filteredRaagStore.set([]);
			$selectedRaag = undefined;
			return;
		}
		$selectedRaag = data.raags.find((raag) => raag.id === currentValue);
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
				}
			}
			return compare.isMatch;
		});
		$filteredRaagStore = filtered;
	};
</script>

<div class="fullPageContainer p-6 flex flex-col items-center">
	<div class="flex items-center justify-center space-x-4 py-8 w-full">
		<Popover.Root bind:open let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					class="max-w-lg justify-between"
				>
					{$selectedRaag?.name ?? 'Choose a raag'}
					<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content class="max-w-lg p-0">
				<Command.Root>
					<Command.Input placeholder="Search for raag..." class="h-9" />
					<Command.Empty>No raag found.</Command.Empty>
					<Command.Group>
						<Command.Item
							value="default"
							onSelect={(currentValue) => {
								submitSelectRaag(currentValue);
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							<Check class={cn('mr-2 h-4 w-4', $selectedRaag && 'text-transparent')} />
							—
						</Command.Item>
						{#each data.raags as raag}
							<Command.Item
								value={raag.id}
								onSelect={(currentValue) => {
									submitSelectRaag(currentValue);
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Check
									class={cn('mr-2 h-4 w-4', $selectedRaag?.id !== raag.id && 'text-transparent')}
								/>
								{raag.name}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<AddRaagDialog form={data.addRaagForm} />
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
		{#if $filteredRaagStore.length === 0 && $selectedRaag}
			<p>No raags to show.</p>
		{/if}
	</div>
</div>
