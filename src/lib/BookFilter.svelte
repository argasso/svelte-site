<script lang="ts">
  import type { BookContent } from './content/loader'
  import H4 from '$lib/components/H4.svelte'
  import type { Filter } from './filter/Filter'

  export let filters: Filter<BookContent>[]
  export let items: BookContent[]
</script>

<div>
  <a href="#">Nollställ filter</a>
  <div className="flex flex-col md:flex-row md:border-b">
    {#each filters as filter}
      <div className="block border-b md:border-none py-3">
        <H4>{filter.title}</H4>
        <ul className="md:mr-10">
          <!-- {filter.parameters.map((parameter) => (
                <BookFilterParameter<T>
                  key={parameter.value}
                  parameter={parameter}
                  items={items}
                  filter={filter}
                />
              ))} -->
        </ul>
      </div>
    {/each}
  </div>
</div>
