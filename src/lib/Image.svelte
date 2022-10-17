<script lang="ts">
  export let src: string | undefined
  export let alt: string
  export let ops = ''
  let className = ''
  export { className as class }
</script>

{#if import.meta.env.PROD}
  <img data-blink-src={src} data-blink-ops={ops} {alt} class={className} />
{:else}
  <img {src} {alt} class={className} />
{/if}
