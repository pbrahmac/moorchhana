<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const user: Writable<User | null> = getContext('user');

	const loginWithGoogle = () => {
		signInWithPopup(auth, new GoogleAuthProvider()).then((userCredential) => {
			$user = userCredential.user;
		});
	};

	const logout = () => {
		signOut(auth);
		$user = null;
	};

	$: console.log($user);
</script>

<div>
	{#if $user}
		<Button on:click={logout}>Sign Out</Button>
	{:else}
		<Button on:click={loginWithGoogle}>Sign in with Google</Button>
	{/if}
</div>
