<script lang="ts">
  import { bookMeta } from '$lib/stores/meta'
  import BookLayout from '$lib/layouts/BookLayout.svelte'
  $: book = $bookMeta || {}
</script>

<svelte:head>
  <title>{book.title}</title>
</svelte:head>

<BookLayout {book}>
  <slot />
</BookLayout>
