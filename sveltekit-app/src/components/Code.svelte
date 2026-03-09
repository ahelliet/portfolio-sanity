<script lang="ts">
  import { onMount } from 'svelte';

  const { portableText }: any = $props();
  const { code, language } = portableText.value;

  let html = $state('');

  onMount(async () => {
    const { codeToHtml } = await import('shiki');
    html = await codeToHtml(code, {
      lang: language || 'text',
      theme: 'github-dark',
    });
  });
</script>

{#if html}
  {@html html}
{:else}
  <pre><code>{code}</code></pre>
{/if}
