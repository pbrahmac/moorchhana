<script lang="ts">
	import { Navbar, ViewTransition } from '$lib';
	import type { User } from 'firebase/auth';
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import '../app.postcss';

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

	// compact mode toggle (using Context API)
	let compactModeStore: Writable<boolean> = writable(false);
	setContext('compactMode', compactModeStore);

	// user state (using Context API)
	let user: Writable<User | null> = writable(null);
	setContext('user', user);
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
