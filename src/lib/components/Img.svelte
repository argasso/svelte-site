<script lang="ts">
  export let title: string
  export let src: string
  export let alt = `Bild: ${title}`
</script>

<img {...$$props} {src} {alt} />
<slot />
{#if title}
  <p class="text-gray-500">{title}</p>
{/if}
