<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	interface Props {
		portableText: BlockComponentProps;
		children?: Snippet;
	}

	let { portableText, children }: Props = $props();

	let style = $derived(portableText.value.style ?? 'normal');

	const styleMap: Record<string, string> = {
		normal: 'text-base leading-[1.8] text-muted-foreground mb-4',
		h1: 'font-serif text-4xl italic text-foreground mt-8 mb-4',
		h2: 'font-serif text-3xl italic text-foreground mt-8 mb-3',
		h3: 'font-serif text-2xl italic text-foreground mt-6 mb-3',
		h4: 'font-serif text-xl italic text-foreground mt-6 mb-2',
		h5: 'text-lg font-semibold text-foreground mt-4 mb-2',
		h6: 'text-base font-semibold text-foreground mt-4 mb-2',
		blockquote: 'border-l-3 border-primary pl-4 italic text-foreground my-6'
	};
	let classes = $derived(styleMap[style] ?? styleMap.normal);

	let el: HTMLElement | undefined = $state();

	onMount(() => {
		if (!el) return;
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
		let node: Text | null;
		while ((node = walker.nextNode() as Text | null)) {
			if (node.nodeValue && node.nodeValue.includes('\u00a0')) {
				node.nodeValue = node.nodeValue.replaceAll('\u00a0', ' ');
			}
		}
	});
</script>

{#if style === 'h1'}
	<h1 bind:this={el} class={classes}>{@render children?.()}</h1>
{:else if style === 'h2'}
	<h2 bind:this={el} class={classes}>{@render children?.()}</h2>
{:else if style === 'h3'}
	<h3 bind:this={el} class={classes}>{@render children?.()}</h3>
{:else if style === 'h4'}
	<h4 bind:this={el} class={classes}>{@render children?.()}</h4>
{:else if style === 'h5'}
	<h5 bind:this={el} class={classes}>{@render children?.()}</h5>
{:else if style === 'h6'}
	<h6 bind:this={el} class={classes}>{@render children?.()}</h6>
{:else if style === 'blockquote'}
	<blockquote bind:this={el} class={classes}>{@render children?.()}</blockquote>
{:else}
	<p bind:this={el} class={classes}>{@render children?.()}</p>
{/if}
