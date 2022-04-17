<script lang="ts">
  export let src: string
  export let alt: string
  let className = ''
  export { className as class }
</script>

<!-- {#if import.meta.env.PROD} -->
<img data-blink-src={src} {alt} class={className} />
<!-- {:else}
  <img {src} {alt} class={className} />
{/if} -->
