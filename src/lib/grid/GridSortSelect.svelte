<script lang="ts">
  import { createQueryStore } from '$lib/URLSearchParamsStore'
  import type { BookSortOption, SortOption } from '$lib/utils/sortUtil'

  const sort = createQueryStore('sort')

  let className = ''
  export { className as class }

  export let sorters: BookSortOption[]

  // export let sorter = sorters[0]

  export let sorterKey: string
  // export let sorter: BookSortOption
  // $: sorter = sorters.find((sorter) => sorter.key === $sort)
  $: sorterKey = $sort
  $: console.log('GridSortSelect', 'sortQueryStore', $sort)
</script>

<select class={className} bind:value={$sort}>
  {#each sorters as s}
    <option value={s.key}>
      {s.key === $sort ? 'Visar' : 'Visa'}
      {s.title}
    </option>
  {/each}
</select>
