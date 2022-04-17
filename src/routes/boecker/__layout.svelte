<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch, page }) => {
    const res = await fetch('/boecker/layout.json')
    if (res.ok) {
      return {
        props: {
          ...(await res.json()),
        },
      }
    }
  }
</script>

<script lang="ts">
  import BookCard from '$lib/BookCard.svelte'
  import { flip } from 'svelte/animate'
  import { fade, blur } from 'svelte/transition'
  import * as eases from 'svelte/easing'
  import { bookSorters } from '$lib/utils/sortUtil'
  import GridSortSelect from '$lib/grid/GridSortSelect.svelte'
  import FilterButton from '$lib/filter/FilterButton.svelte'
  import { getMostSpecificCriteria } from '$lib/filter'
  import type { BookThumb, Filter } from 'src/types'
  import BookFilter from '$lib/filter/BookFilter.svelte'
  import { createBookFilterStore } from '$lib/stores/bookStore'

  export let books: BookThumb[]
  export let filters: Filter[]

  const bookFilterStore = createBookFilterStore(books, filters)
  let filterOpen = false
  let sorterKey = ''
  let criterias
  $: criterias = filters
    .map((filter) => getMostSpecificCriteria(new URLSearchParams(), filter.key))
    .reduce((x, y) => x.concat(y), [])
</script>

<slot />

<div class="container">
  <div class="flex-auto mt-5 pt-5 border-t">
    <div class="flex gap-3 justify-between items-center">
      <h3>Böcker</h3>
      <FilterButton
        {criterias}
        class="lg:hidden flex-none inline-flex items-center justify-center uppercase  text-sm border border-gray-400 py-3 px-4 bg-white"
        bind:filterOpen />
      <GridSortSelect sorters={bookSorters} bind:sorterKey class="uppercase text-sm py-3" />
    </div>

    <!-- <AnimateHeight duration={500} height={filterOpen ? 'auto' : 0}>
          <BookFilter2<T> filters={filters} items={items}></BookFilter2>
        </AnimateHeight> -->

    <div class="flex gap-10 items-start">
      <div class="flex-none w-52 hidden lg:block">
        <div>
          <h4>
            Filter
            {#if true}
              <button on:click={() => bookFilterStore.reset()}>Nollställ filter</button>
            {/if}
          </h4>
        </div>
        {#each $bookFilterStore.filters as filter}
          <div class="flex flex-col md:flex-row md:border-b">
            <BookFilter {filter} />
          </div>
        {/each}
      </div>
      <div
        class="flex-auto grid gap-x-3 gap-y-10 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-start py-10">
        {#each $bookFilterStore.books as bookThumb (bookThumb.href)}
          <div animate:flip={{ duration: 500, easing: eases.backOut }} class="self-end">
            <div class="self-end">
              <BookCard {bookThumb} />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
