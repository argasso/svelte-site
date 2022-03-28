<script lang="ts">
  import type { FilterParam } from 'src/types'
  import type { Writable } from 'svelte/store'

  import { slide } from 'svelte/transition'

  export let param: FilterParam
  export let query: Writable<string[]>

  const { label, value, children, count } = param

  let checked
  $: checked = $query.includes(value)

  function handleChange(event) {
    const { name, checked } = event.target as HTMLInputElement
    if (checked) {
      query.update((values) => [...values, name])
    } else {
      query.update((values) => values.filter((v) => !v.startsWith(name)))
    }
  }
</script>

<li>
  <label class="inline-flex items-center">
    <input
      type="checkbox"
      name={value}
      value={checked}
      class="m-1 rounded-sm h-6 w-6 text-argasso-600"
      on:change={handleChange}
      bind:checked />
    <span class="pl-0 font-light text-sm overflow-x-hidden">
      <span class="pl-1 capitalize">
        {label}
        {#if !checked}
          <span class="text-gray-400"> ({count})</span>
        {/if}
      </span>
    </span>
  </label>
  {#if checked}
    <ul class="list-none mb-0" transition:slide>
      {#each children as childParam}
        <svelte:self {query} param={childParam} />
      {/each}
    </ul>
  {/if}
</li>
