<script lang="ts">
  import { onMount } from 'svelte';

  const { portableText }: any = $props();

  // Strip Sanity stega encoding (invisible Unicode characters used for click-to-edit)
  function cleanStega(str: string): string {
    return str.replace(/[\u200B\u200C\u200D\uFEFF\u2060\u180E\u034F]/g, '');
  }

  let container: HTMLDivElement;
  let error = $state('');

  onMount(async () => {
    const raw = portableText.value?.code;
    if (!raw) return;

    const code = cleanStega(raw);

    try {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: false });
      const { svg } = await mermaid.render(`mermaid-${crypto.randomUUID()}`, code);
      container.innerHTML = svg;
    } catch (e: any) {
      error = e.message || 'Failed to render diagram';
    }
  });
</script>

{#if error}
  <pre style="color: red; font-size: 0.85em;">{error}</pre>
{/if}
<div bind:this={container}></div>
