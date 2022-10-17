<script lang="ts">
  import { authorMeta } from '$lib/stores/meta'
  import AuthorLayout from '$lib/layouts/AuthorLayout.svelte'
  $: author = $authorMeta || {}
</script>

<svelte:head>
  <title>{author.name}</title>
</svelte:head>

<AuthorLayout {author}>
  <slot />
</AuthorLayout>
