<script lang="ts">
	import '../app.postcss';
	import { Navbar, ViewTransition } from '$lib';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	// dark mode toggle stuff
	let darkModeStore: Writable<boolean>;
	onMount(() => {
		const currentPreference =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		darkModeStore = writable(currentPreference);
		if (currentPreference) {
			document.documentElement.classList.add('dark');
			darkModeStore.set(true);
		} else {
			document.documentElement.classList.remove('dark');
			darkModeStore.set(false);
		}
	});
</script>

<div class="main">
	<ViewTransition />
	<Navbar {darkModeStore} />
	<slot />
</div>

<style>
	.main {
		min-height: 100svh;
	}
</style>
