<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Moon, Sun } from 'radix-icons-svelte';
	import type { Writable } from 'svelte/store';

	// props
	export let darkModeStore: Writable<boolean>;

	const switchLightMode = () => {
		window.document.documentElement.classList.toggle('dark');
		$darkModeStore = !$darkModeStore;
	};
</script>

<div class="flex items-center justify-center">
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button variant="ghost" on:click={switchLightMode}>
				{#if $darkModeStore}
					<Sun class="h-5 w-5" />
					<span class="sr-only">Light</span>
				{:else}
					<Moon class="h-5 w-5" />
					<span class="sr-only">Dark</span>
				{/if}
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>Toggle dark mode</Tooltip.Content>
	</Tooltip.Root>
</div>
