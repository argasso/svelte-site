<script lang="ts">
  import type { BookContent } from './content/loader'
  import type { Filter } from './filter/Filter'
  import type { FilterParameter } from './filter/FilterParameter'
  export let parameter: FilterParameter
  export let items: BookContent[]
  export let filter: Filter<BookContent>
  let count = 0
  let selected = false
  let handleOnChange = () => {}
</script>

<li>
  <label class="inline-flex items-center">
    <input
      type="checkbox"
      name={filter.key}
      value={parameter.value}
      class="m-1 rounded-sm h-6 w-6 text-red-500"
      onChange={handleOnChange}
      checked={selected} />
    <span class="pl-0 font-light text-sm overflow-x-hidden">
      <span class="pl-1 capitalize">
        {parameter.label}
        {#if !selected}
          <span class="text-gray-400"> ({count})</span>
        {/if}
      </span>
    </span>
  </label>

  {#if parameter.getParameters()}
    <!-- <AnimateHeight duration={500} height={selected ? 'auto' : 0}> -->
    <ul class="ml-8">
      {#each parameter.getParameters() as parameter}
        <!-- <BookFilterParameter key={p.value} parameter={p} {items} {filter} /> -->
      {/each}
    </ul>
    <!-- </AnimateHeight> -->
  {/if}
</li>
