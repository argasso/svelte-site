<script lang="ts">
  import type { BookContent } from './content/loader'
  import type { Filter } from './filter/Filter'

  export let filters: Filter<BookContent>[]
  export let items: BookContent[]
</script>

<div>
  <a href="#">Nollställ filter</a>
  <div class="flex flex-col md:flex-row md:border-b">
    {#each filters as filter}
      <div class="block border-b md:border-none py-3">
        <h4>{filter.title}</h4>
        <ul class="md:mr-10">
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
