<script lang="ts">
	import './layout.css';
	import { PreviewMode, QueryLoader, VisualEditing } from '@sanity/sveltekit';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { client } from '$lib/sanity/client';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { ModeWatcher } from "mode-watcher";
	import Toaster from "$lib/components/ui/sonner/sonner.svelte";

	const { children, data }: LayoutProps = $props();

	// svelte-ignore state_referenced_locally -- previewEnabled only changes on full page reload
	const { previewEnabled, layout } = data;
</script>

<ModeWatcher />
<Toaster />
<PreviewMode enabled={previewEnabled}>
	<VisualEditing enabled={previewEnabled}>
		<QueryLoader enabled={previewEnabled} client={client}>
			{#if previewEnabled}
				<a
					href={resolve('/preview/disable', { redirect: page.url.pathname })}
					class="preview-toggle"
				>
					<span>Preview Enabled</span>
					<span>Disable Preview</span>
				</a>
			{/if}

			<div class="flex min-h-screen flex-col">
				<Navbar {layout} />
				<main class="flex-1">{@render children()}</main>
				<Footer {layout} />
			</div>
		</QueryLoader>
	</VisualEditing>
</PreviewMode>

<style>
.preview-toggle {
		backdrop-filter: blur(12px);
		border-radius: 0.25rem;
		bottom: 1rem;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
		color: #1f2937;
		display: block;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1rem;
		padding: 0.5rem 0.75rem;
		position: fixed;
		right: 1rem;
		text-align: center;
		text-decoration: none;
		z-index: 50;
	}

	.preview-toggle:hover {
		background-color: #ef4444;
		color: #ffffff;
	}

	.preview-toggle span:first-child {
		display: block;
	}

	.preview-toggle:hover span:first-child {
		display: none;
	}

	.preview-toggle span:last-child {
		display: none;
	}

	.preview-toggle:hover span:last-child {
		display: block;
	}
</style>
