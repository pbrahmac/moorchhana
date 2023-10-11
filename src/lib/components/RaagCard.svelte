<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { KeyboardNotes } from '$lib';
	import type { RaagObject, RawRaagObject } from '$lib/utils';

	// props
	export let raag: RaagObject | RawRaagObject;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl">{raag.name}</Card.Title>
	</Card.Header>
	<Card.Content>
		<KeyboardNotes selectedNotes={raag.notes} />
	</Card.Content>
</Card.Root>
