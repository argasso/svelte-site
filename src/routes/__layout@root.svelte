<script lang="ts">
  import { categoryMeta } from '$lib/stores/meta'
  import CategoryLayout from '$lib/layouts/CategoryLayout.svelte'
  $: category = $categoryMeta || {}
</script>

<svelte:head>
  <title>{category.title}</title>
</svelte:head>

<CategoryLayout {category}>
  <slot />
</CategoryLayout>
