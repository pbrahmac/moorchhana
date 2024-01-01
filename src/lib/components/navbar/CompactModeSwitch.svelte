<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { KeyboardMusic, SquareStack } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import * as Tooltip from '$lib/components/ui/tooltip';

	// use Context API to get compact mode store
	const compactModeStore: Writable<boolean> = getContext('compactMode');
</script>

<div class="flex items-center justify-center">
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button variant="ghost" on:click={() => ($compactModeStore = !$compactModeStore)}>
				{#if $compactModeStore}
					<KeyboardMusic class="h-5 w-5" />
				{:else}
					<SquareStack class="h-5 w-5" />
				{/if}
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>Toggle compact mode</Tooltip.Content>
	</Tooltip.Root>
</div>
