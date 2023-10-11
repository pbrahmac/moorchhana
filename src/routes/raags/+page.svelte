<script lang="ts">
	import type { PageData } from './$types';
	import { RaagCard } from '$lib';

	// props
	export let data: PageData;
</script>

<div class="fullPageContainer p-6">
	<div class="flex flex-wrap justify-center gap-4">
		{#each data.raags as raag}
			<RaagCard {raag} />
		{/each}
	</div>
</div>
