<script lang="ts">
  import { createSingleValueQueryStore } from '$lib/URLSearchParamsStore'
  import type { BookSortOption } from '$lib/utils/sortUtil'

  const sort = createSingleValueQueryStore('sort')

  let className = ''
  export { className as class }
  export let sorters: BookSortOption[]
  export let sorterKey: string
  $: sorterKey = $sort
</script>

<select class={className} bind:value={$sort}>
  {#each sorters as s}
    <option value={s.key}>
      {s.key === $sort ? 'Visar' : 'Visa'}
      {s.title}
    </option>
  {/each}
</select>
