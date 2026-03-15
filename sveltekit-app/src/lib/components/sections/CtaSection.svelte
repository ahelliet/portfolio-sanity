<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import type { SectionCta } from "$lib/sanity/queries";
	import { resolveLink } from "$lib/utils/index.js";

	interface Props {
		section: SectionCta;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="flex flex-col items-center gap-6 px-20 py-20 text-center {bgClass}">
	<div class="h-px w-15 bg-primary"></div>

	{#if section.title}
		<h2 class="font-serif text-4xl italic">{section.title}</h2>
	{/if}

	{#if section.description}
		<p class="max-w-[500px] text-base leading-[1.6] text-muted-foreground">{section.description}</p>
	{/if}

	{#if section.button?.label}
		{@const resolved = resolveLink(section.button.link)}
		<Button
			href={resolved.href}
			target={resolved.external ? "_blank" : undefined}
			rel={resolved.external ? "noopener noreferrer" : undefined}
			class="bg-primary hover:bg-primary/90"
		>
			{section.button.label}
		</Button>
	{/if}
</section>
