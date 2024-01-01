<script lang="ts">
	import { page } from '$app/stores';
	import { CompactModeSwitch, LightSwitch, MobileNavbar, SignInButton } from '$lib';
	import { Separator } from '$lib/components/ui/separator';
	import type { MenuItem } from '$lib/utils';
	import type { Writable } from 'svelte/store';

	// props
	export let darkModeStore: Writable<boolean>;

	// menu items
	const items: MenuItem[] = [
		{ title: 'Moorchhana Finder', link: '/' },
		{ title: 'Raag Index', link: '/raags' }
	];
</script>

<!-- mobile -->
<MobileNavbar {items} {darkModeStore} />

<!-- desktop -->
<nav class="hidden lg:flex items-center justify-between h-20 border-b-2 shadow-sm">
	<a
		href="/"
		class="ml-6 lowercase text-3xl font-semibold underline underline-offset-4 transition-all hover:underline-offset-8"
		>moorchhana</a
	>

	<div class="h-10 flex items-center space-x-2 last:mr-4">
		<ul class="flex items-center justify-center text-muted-foreground">
			{#each items as item}
				<a
					class="ml-2 px-3 py-2 rounded text-sm transition-colors hover:bg-secondary"
					href={item.link}
					class:text-foreground={$page.url.pathname === item.link}
					class:bg-secondary={$page.url.pathname === item.link}
				>
					{item.title}
				</a>
			{/each}
		</ul>
		<Separator orientation="vertical" />
		<CompactModeSwitch />
		<LightSwitch {darkModeStore} />
		<Separator orientation="vertical" />
		<SignInButton />
	</div>
</nav>
