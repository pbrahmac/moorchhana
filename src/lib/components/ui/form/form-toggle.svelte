<script lang="ts">
	import { getFormField } from 'formsnap';
	import type { Toggle as TogglePrimitive } from 'bits-ui';
	import { Toggle } from '$lib/components/ui/toggle';
	type $$Props = TogglePrimitive.Props;
	type $$Events = TogglePrimitive.Events;

	export let onPressedChange: $$Props['onPressedChange'] = undefined;

	const { name, setValue, attrStore, value } = getFormField();
	const { name: nameAttr, value: valueAttr, ...rest } = $attrStore;
</script>

<Toggle
	{...rest}
	pressed={typeof $value === 'boolean' ? $value : false}
	onPressedChange={(v) => {
		onPressedChange?.(v);
		setValue(v);
	}}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</Toggle>
<input hidden {name} value={$value} />
