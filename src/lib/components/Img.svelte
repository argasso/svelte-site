<script lang="ts">
  export let title: string
  export let alt = `Bild: ${title}`
</script>

<div class="my-6">
  <img {...$$props} {alt} />
  {#if title}
    <p class="text-gray-500">{title}</p>
  {/if}
</div>
