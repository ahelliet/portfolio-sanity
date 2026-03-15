<script lang="ts">
	interface Props {
		number?: string;
		label?: string;
	}

	let { number, label }: Props = $props();
</script>

{#if number || label}
	<div class="flex items-center gap-4">
		{#if number}
			<span class="font-serif text-sm italic text-primary">{number}</span>
		{/if}
		<div class="h-px w-10 bg-primary"></div>
		{#if label}
			<span class="text-sm font-medium tracking-widest">{label}</span>
		{/if}
	</div>
{/if}
