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
  import { BookBindingFilter } from '$lib/filter/BookBindingFilter'
  import { bookSorters } from '$lib/utils/sortUtil'
  import GridSortSelect from '$lib/grid/GridSortSelect.svelte'
  import FilterButton from '$lib/filter/FilterButton.svelte'
  import { getMostSpecificCriteria } from '$lib/filter'
  import type { BookThumb } from 'src/types'

  export let books: BookThumb[]
  export let sorter = bookSorters[0]

  const bookBindingFilter = new BookBindingFilter()
  //const bookCategoryFilter = new BookCategoryFilter(categories)
  const filters = [bookBindingFilter]
  let filterOpen = false
  let sorterKey = ''
  $: sorter = bookSorters.find((sorter) => sorter.key === sorterKey)
  $: books = sorter ? sorter.sort(books).slice(1) : bookSorters[0].sort(books)

  let criterias
  $: criterias = filters
    .map((filter) => getMostSpecificCriteria(new URLSearchParams(), filter.key))
    .reduce((x, y) => x.concat(y), [])
</script>

<slot />

<div class="container">
  <div class="border-t pt-10">
    <div class="flex-auto">
      <div class="flex gap-3 justify-between items-center py-2">
        <h3>Böcker</h3>
        <FilterButton
          {criterias}
          class="flex-none inline-flex items-center justify-center uppercase"
          bind:filterOpen />
        <GridSortSelect sorters={bookSorters} bind:sorterKey class="hidden md:block" />
      </div>

      {#if filterOpen}
        <div>
          <!-- <a href="#">Nollställ filter</a> -->
          <div class="flex flex-col md:flex-row md:border-b">
            <div class="block border-b md:border-none py-3">
              <h4>Filter title</h4>
              <!-- <BookCategorySelect {category} /> -->
            </div>
          </div>
        </div>
      {/if}

      <!-- <AnimateHeight duration={500} height={filterOpen ? 'auto' : 0}>
          <BookFilter2<T> filters={filters} items={items}></BookFilter2>
        </AnimateHeight> -->
      <div
        class="grid gap-x-3 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-start py-10">
        {#each books as bookThumb (bookThumb.href)}
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
