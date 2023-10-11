<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// use Context API to get compact mode store
	const compactModeStore: Writable<boolean> = getContext('compactMode');
</script>

<div class="px-2 flex items-center justify-center space-x-2">
	<Switch
		checked={$compactModeStore}
		id="compactMode"
		on:click={() => ($compactModeStore = !$compactModeStore)}
	/>
	<Label for="compactMode">Compact Mode</Label>
</div>
