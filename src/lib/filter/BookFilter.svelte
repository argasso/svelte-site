<script lang="ts">
  import type { Filter } from 'src/types'
  import { createQueryStore } from '../URLSearchParamsStore'
  import BookFilterItem from './BookFilterItem.svelte'

  export let filter: Filter

  const query = createQueryStore(filter.key)
</script>

<div class="block border-b md:border-none py-3">
  <p class="mb-1 font-medium text-md">{filter.title}</p>
  <ul class="m-0 p-0 list-none">
    {#each filter.params as param}
      <BookFilterItem {query} {param} />
    {/each}
  </ul>
</div>
