<script lang="ts">
	import { CompactModeSwitch, LightSwitch } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import type { MenuItem } from '$lib/utils';
	import { Cross1, HamburgerMenu } from 'radix-icons-svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	// props
	export let darkModeStore: Writable<boolean>;
	export let items: MenuItem[];

	$: isMenuOpen = false;
</script>

<nav
	class="w-screen h-16 flex items-center justify-between lg:hidden"
	class:border-b-2={!isMenuOpen}
	class:shadow-sm={!isMenuOpen}
>
	<a
		href="/"
		class="ml-6 lowercase text-xl font-semibold underline underline-offset-4 transition-all hover:underline-offset-8"
		>moorchhana</a
	>
	<div class="flex items-center space-x-2 last:mr-6">
		<LightSwitch {darkModeStore} />
		<Button variant="ghost" size="sm" on:click={() => (isMenuOpen = !isMenuOpen)}>
			{#if isMenuOpen}
				<Cross1 class="h-5 w-5" />
			{:else}
				<HamburgerMenu class="h-5 w-5" />
			{/if}
			<span class="sr-only">Hamburger Menu</span>
		</Button>
	</div>
</nav>
{#if isMenuOpen}
	<ul
		class="py-4 flex flex-col space-y-2 justify-center items-center border-b-2 shadow-sm"
		transition:slide
	>
		{#each items as item}
			<li>
				<Button on:click={() => (isMenuOpen = !isMenuOpen)} variant="link" href={item.link}
					>{item.title}</Button
				>
			</li>
		{/each}
		<div class="flex items-center justify-center py-2 w-full">
			<Separator class="w-1/3" />
		</div>
		<CompactModeSwitch />
	</ul>
{/if}
